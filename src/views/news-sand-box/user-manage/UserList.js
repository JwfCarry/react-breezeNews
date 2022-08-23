import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Switch, Tag, Form, Input, Select } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal;
const { Option } = Select;
function UserList() {
    const [dataSource, setDataSource] = useState([]) //表格数据
    const [roleList, setRoleList] = useState([]) //角色选择框数据
    const [regionList, setreGionList] = useState([]) //区域选择框数据
    const [isModalVisible, setIsModalVisible] = useState(false) //控制添加用户对话框弹出消失
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return <b>{region === '' ? '全球' : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return <p>{role?.roleName}</p>
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            render: (username) => {
                return <Tag color="purple">{username}</Tag>
            }
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default} />

            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ marginRight: '10px' }} disabled={item.default} />
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => showConfirmDelete(item)} disabled={item.default} />
                </div>
            }
        },
    ];
    //拿取后端数据
    useEffect(() => {
        //表格数据
        axios.get('http://localhost:3000/users?_expand=role').then(res => {
            setDataSource(res.data)
        });
        //区域选择框数据
        axios.get("http://localhost:3000/regions").then(res => {
            const list = res.data
            setreGionList(list)
        })
        //角色选择框数据
        axios.get("http://localhost:3000/roles").then(res => {
            const list = res.data
            setRoleList(list)
        })
    }, [])
    //删除对话框
    const showConfirmDelete = (item) => {
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '删除此用户权限',
            okText: '确定',
            cancelText: '取消',
            onOk() { //确定删除
                deleteHandle(item)
            },

            onCancel() {
                console.log('Cancel');
            },
        });
    };
    //确定删除事件
    const deleteHandle = (item) => {

    }
    //添加用户确定按钮事件
    const handleOk = () => {

    }
    return (
        <div>
            <Button type='primary' onClick={() => { setIsModalVisible(true) }} style={{ marginBottom: '10px' }}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns} pagination={
                { pageSize: 5 }
            } rowKey={item => item.id} />
            <Modal title="添加用户" visible={isModalVisible} onOk={handleOk} onCancel={() => { setIsModalVisible(false) }}
                okText={'确定'} cancelText={'取消'}
            >
                <Form
                    name="basic"
                    layout='vertical'
                >
                    <Form.Item
                        label="username"
                        name="用户名"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="password"
                        name="密码"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="region"
                        label="区域"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Select>
                            {
                                regionList.map(item =>
                                    <Option value={item.value} key={item.id}>{item.title}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        label="角色"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Select>
                            {
                                roleList.map(item =>
                                    <Option value={item.id} key={item.id}>{item.roleName}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default UserList
