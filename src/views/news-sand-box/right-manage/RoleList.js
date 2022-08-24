import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal
function RoleList() {
    const [dataSource, setDataSource] = useState([]) //表格数据
    const [isModalVisible, setIsModalVisible] = useState(false) //控制权限分配对话框打开消失
    const [treeData, setTreeData] = useState([]) //树形表格数据
    const [currentData, setCurrentData] = useState([]) //当前拥有的权限数据
    const [currentId, setCurrentId] = useState(0) //当前id 方便更改权限
    const [refresh, setRefresh] = useState(false);//自动刷新
    //从后端拿取数据
    useEffect(() => {
        //表格数据
        axios.get('http://localhost:3000/roles').then(res => {
            setDataSource(res.data)
        })
        //树形结构数据
        axios.get('http://localhost:3000/rights?_embed=children').then(res => {
            setTreeData(res.data)
        })
    }, [refresh])
    const columns = [{    //表格列配置项
        title: 'ID',
        dataIndex: 'id',
        render: (id) => {
            return <b>{id}</b>
        }
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
    }, {
        title: '操作',
        align: 'center',
        render: (item) => {
            return <div>
                <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} style={{ marginRight: '10px' }} onClick={() => {
                    setIsModalVisible(true)
                    setCurrentData(item.rights)
                    setCurrentId(item.id)
                }}
                />
                <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => showConfirmDelete(item)} />
            </div>
        }
    },
    ]
    //点击删除按钮 弹出对话框
    const showConfirmDelete = (item) => {
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '删除此管理员',
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
        axios.delete(`http://localhost:3000/roles/${item.id}`).then(setRefresh)//后端删除 重新请求
    }
    //权限分配确定
    const handleOk = () => {
        setIsModalVisible(false) //关闭弹窗
        axios.patch(`http://localhost:3000/roles/${currentId}`, {
            rights: currentData
        }).then(setRefresh).catch((e) => { console.log(e) })
    }
    //权限分配 取消按钮
    const handleCancel = () => {
        setIsModalVisible(false)

    }
    //更改单选框事件
    const onCheck = (checkKeys) => {
        setCurrentData(checkKeys) //当前是否选中 视图更新
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={
                { pageSize: 5 }
            } rowKey={(item) => item.id} bordered={true} />
            <Modal title="更改管理员权限" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={'确定'} cancelText={'取消'} >
                <Tree
                    checkable
                    treeData={treeData}
                    onCheck={onCheck}
                    checkedKeys={currentData}
                /* checkStrictly //取消父子勾选关联 */
                />
            </Modal>
        </div>
    )
}
export default RoleList
