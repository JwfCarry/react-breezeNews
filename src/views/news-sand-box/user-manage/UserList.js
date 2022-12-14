import React, { useEffect, useState, useRef } from 'react'
import UserForm from '../../../components/user-manage/UserForm';
import { Table, Button, Modal, Switch, Tag, notification } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal;
function UserList() {
    const addForm = useRef(null) //  添加用户表单dom
    const updateForm = useRef(null) //更新用户表单dom
    const [dataSource, setDataSource] = useState([]) //表格数据
    const [roleList, setRoleList] = useState([]) //角色选择框数据
    const [regionList, setreGionList] = useState([]) //区域选择框数据
    const [isModalVisible, setIsModalVisible] = useState(false) //控制添加用户对话框弹出消失
    const [isUpdateVisible, setIsUpdateVisible] = useState(false) //控制更新用户对话框弹出消失
    const [refresh, setRefresh] = useState(false) //自动刷新
    const [currentUserID, setCurrentUserID] = useState(); //点击更新编辑按钮后 获取当前项的Id 方便后续更新
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            align: 'center',
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{
                        color: filtered ? '#5030e5' : undefined,
                    }}
                />
            ),
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value
                })),
                {
                    text: "全球",
                    value: "全球"
                }

            ],
            onFilter: (value, item) => {
                if (value === "全球") {
                    return item.region === ""
                }
                return item.region === value
            },
            render: (region) => {
                return <b>{region === '' ? '全球' : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            align: 'center',
            render: (role) => {
                return <p>{role?.roleName}</p>
            }
        },
        {
            title: '用户名',
            align: 'center',
            dataIndex: 'username',
            render: (username) => {
                return <Tag color="purple">{username}</Tag>
            }
        },
        {
            title: '用户状态',

            align: 'center',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default} onChange={() => switchChange(item)} />

            }
        },
        {
            title: '操作',
            align: 'center',
            render: (item) => {
                return <div>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ marginRight: '10px' }} disabled={item.default} onClick={() => showUpdate(item)} />
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => showConfirmDelete(item)} disabled={item.default} />
                </div>
            }
        },
    ];
    const { roleId, region, username } = JSON.parse(localStorage.getItem('token')); //拿取用户信息
    //拿取后端数据
    useEffect(() => {
        //表格数据
        axios.get('/users?_expand=role').then(res => {
            const list = res.data;
            //这里判断是什么管理员 返回相应的权限 超级管理员拥有所有成员  区域管理员拥有区域所有成员(包括编辑)  编辑只有自己
            //1: 超级管理员  2： 区域管理员 3：编辑 
            setDataSource(roleId === 1 ? list : [...list.filter(item => item.username === username),
            ...list.filter(item => item.region === region && item.roleId === 3)
            ])
        });
    }, [refresh, roleId, region, username])
    useEffect(() => {
        //区域选择框数据
        axios.get("/regions").then(res => {
            const list = res.data
            setreGionList(list)
        })
        //角色选择框数据
        axios.get("/roles").then(res => {
            const list = res.data
            setRoleList(list)
        })
    }, [])

    //删除对话框 
    const showConfirmDelete = (item) => {
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '从系统中删除此用户',
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
    //用户状态siwch开关 事件
    const switchChange = (item) => {
        item.roleState = !item.roleState
        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState
        }).then(setRefresh)
    }
    //确定删除事件
    const deleteHandle = (item) => {
        axios.delete(`/users/${item.id}`).then(setRefresh).then(() => {
            notification['success']({
                message: `系统消息`,
                description: (
                    <div>
                        删除成功！已从系统中<span style={{ color: '#7546c9' }}>删除</span>此用户
                    </div>
                ),
                placement: "topRight",
                duration: '2',
                top: '60px'
            });
        }) //后端删除 重新请求
    }
    //添加用户 [确定]按钮事件
    const addHandleOk = () => {
        addForm.current.validateFields().then((value) => {
            setIsModalVisible(false) //关闭弹窗
            addForm.current.resetFields() //清空表单数据
            axios.post(`/users`, { //像后端添加用户数据
                ...value,
                'roleState': true,
                'default': false
            }).then(setRefresh) //重新请求
        })
    }
    //更新用户edit按钮事件
    const showUpdate = (item) => {
        //这里使用setTimeout 解决react更新不是同步的问题
        setIsUpdateVisible(true); //展示更新用户对话框
        setTimeout(() => {
            updateForm.current.setFieldsValue(item) //设置表单内容 根据传入的当前item项
            setCurrentUserID(item.id) //获取当前项id
        }, 0)
    }
    //更新用户 【更新】按钮事件
    const updateHandleOk = () => {
        updateForm.current.validateFields().then((value) => {
            setIsUpdateVisible(false) //关闭弹窗
            axios.patch(`/users/${currentUserID}`, {
                ...value
            }).then(setRefresh)
        })
    }
    return (
        <div>
            <Button type='primary' onClick={() => { setIsModalVisible(true) }} style={{ marginBottom: '10px' }}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns} pagination={
                { pageSize: 5 }
            } rowKey={item => item.id} bordered={true} />
            <Modal title="添加用户" visible={isModalVisible} onOk={addHandleOk} onCancel={() => { setIsModalVisible(false) }}
                okText={'确定'} cancelText={'取消'}
            >
                <UserForm roleList={roleList} regionList={regionList} ref={addForm} />
            </Modal>
            <Modal title="更新用户" visible={isUpdateVisible} onOk={updateHandleOk} onCancel={() => { setIsUpdateVisible(false) }}
                okText={'更新'} cancelText={'取消'}
            >
                <UserForm roleList={roleList} regionList={regionList} ref={updateForm} isUpdate={true} />
            </Modal>
        </div>
    )
}
export default UserList
