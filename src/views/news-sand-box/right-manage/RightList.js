import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal;
function RightList() {
    const [dataSource, setDataSource] = useState([]) //表格数据
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="purple">{key}</Tag>
            }
        },
        {
            title: '操作',
            align: 'center',
            render: (item) => {
                return <div>
                    <Popover content={<div style={{ textAlign: "center" }}>
                        <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
                    </div>} title="页面配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} style={{ marginRight: '10px' }} />
                    </Popover>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => showConfirmDelete(item)} />
                </div>
            }
        },
    ];
    useEffect(() => {
        axios.get('http://localhost:3000/rights?_embed=children').then(res => {
            res.data.forEach((item) => item.children?.length === 0 ? item.children = "" : item.children); //剔除首页的children
            setDataSource(res.data)
        })
    }, [])

    //开关用户功能权限
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        setDataSource([...dataSource]) //页面更新
        if (item.grade === 1) { //一级路由
            axios.patch(`http://localhost:3000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        } else { //二级路由
            axios.patch(`http://localhost:3000/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
    }
    //点击删除按钮 弹出对话框
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
        if (item.grade === 1) { //如果是一级路由
            setDataSource(dataSource.filter(data => data.id !== item.id)); //页面同步
            axios.delete(`http://localhost:3000/rights/${item.id}`)//后端删除
        } else {  //如果是二级子路由
            let list = dataSource.filter(data => data.id === item.rightId)//找出所属一级路由
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setDataSource([...dataSource]); //页面更新
            axios.delete(`http://localhost:3000/children/${item.id}`) //后端更新
        }
    }

    return (
        <Table dataSource={dataSource} columns={columns} pagination={
            { pageSize: 5 }
        } bordered={true} />
    )
}
export default RightList
