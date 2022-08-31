import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, Modal, Tag, notification } from 'antd'
import { DeleteOutlined, EditOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal
function NewsDraft() {
    /*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
    /* publishState  0未发布  1 待发布  2 已发布  3 已下线 */
    const { username } = JSON.parse(localStorage.getItem("token")) //拿取登录用户名
    const [dataSource, setdataSource] = useState([])  //表格数据
    const [refresh, setRefresh] = useState(false) //自动刷新
    let navigate = useNavigate()
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
                return <a style={{ textDecoration: 'underline', color: 'blue' }} href={`#/news-manage/preview/${item.id}`}>{title}</a>
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
                    <Button shape="circle" type="primary" icon={<EditOutlined />} style={{ marginRight: '10px' }}
                        onClick={() => {
                            navigate(`/news-manage/update/${item.id}`)
                        }} />

                    <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={() => showConfirmUp(item.id)} />
                </div>
            }
        }
    ];
    //审核对话框
    const showConfirmUp = (id) => {
        confirm({
            title: '确定要提交审核吗？',
            icon: <ExclamationCircleOutlined />,
            content: '将此新闻提交审核',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                deleteUp(id) //确定提交审核
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //确定提交审核
    const deleteUp = (id) => {
        axios.patch(`/news/${id}`, {
            auditState: 1
        }).then(setRefresh).then(() => {
            notification['success']({
                message: `系统消息`,
                description: (
                    <div>
                        操作成功！您可以到<span style={{ color: '#7546c9' }}>审核管理/审核列表</span>中查看您的新闻。
                    </div>
                ),
                placement: "topRight",
                duration: '2.5',
                top: '60px'
            });
        })
    }
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
