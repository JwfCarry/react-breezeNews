import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal
function NewsDraft() {
    const { username } = JSON.parse(localStorage.getItem("token")) //拿取登录用户名
    const [dataSource, setdataSource] = useState([])  //表格数据
    const [refresh, setRefresh] = useState(false) //自动刷新
    useEffect(() => {
        //拿去当前登录用户的草稿箱数据
        axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
            setdataSource(res.data)
        })
    }, [username, refresh])
    const columns = [
        {
            title: 'ID',
            align: 'center',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            align: 'center',
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            align: 'center',
            render: (author) => {
                return <Tag color="purple">{author}</Tag>
            }
        },
        {
            title: '分类',
            align: 'center',
            dataIndex: 'category',
            render: (category) => {
                return category.title
            }
        },
        {
            title: "操作",
            align: 'center',
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => showConfirmDelete(item)} style={{ marginRight: '10px' }} />
                    <Button shape="circle" type="primary" icon={<EditOutlined />} style={{ marginRight: '10px' }} />

                    <Button type="primary" shape="circle" icon={<UploadOutlined />} />
                </div>
            }
        }
    ];
    //删除按钮打开对话框
    const showConfirmDelete = (item) => {
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '从草稿箱中删除此新闻',
            okText: '确定',
            cancelText: '取消',
            onOk() { //确定删除
                deleteHandle(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //确定删除
    const deleteHandle = (item) => {
        axios.delete(`/news/${item.id}`).then(setRefresh)
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={
                { pageSize: 5 }
            } rowKey={item => item.id} bordered={true} />
        </div>
    )
}
export default NewsDraft
