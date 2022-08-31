/* 审核列表 */
/*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
/* publishState  0未发布  1 待发布  2 已发布  3 已下线 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Table, Button, Tag, Modal, notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal;
function AuditList() {
    const [dataSource, setdataSource] = useState([])  //表格数据
    const { username } = JSON.parse(localStorage.getItem("token")) //用户数据
    const [refresh, setRefresh] = useState(false)
    let navigate = useNavigate()
    useEffect(() => {    //auditState   0 草稿箱 1 审核中 2 已通过 3未通过      
        //拿取数据     新闻列表中 用户自己&状态不为【未审核0】&发布状态为【未发布0、待发布1】     ne：不等于 lte：小于等于
        axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            console.log(res.data)
            setdataSource(res.data)
        })
    }, [username, refresh])
    const columns = [
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
            title: "新闻分类",
            dataIndex: 'category',
            align: 'center',

            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "审核状态",
            dataIndex: 'auditState',
            align: 'center',

            render: (auditState) => {
                const colorList = ["", 'orange', 'green', 'red']
                const auditList = ["草稿箱", "审核中", "已通过", "未通过"]
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
        {
            title: "操作",
            align: 'center',
            render: (item) => {
                return <div>
                    {
                        item.auditState === 1 && <Button type='primary' onClick={() => showConfirm(item)} >撤销</Button>
                    }
                    {
                        item.auditState === 2 && <Button danger onClick={() => { showPublish(item) }}>发布</Button>
                    }
                    {
                        item.auditState === 3 && <Button type="primary" onClick={() => { handleUpdate(item) }} >更新</Button>
                    }
                </div>
            }
        }
    ];
    //发布对话框
    const showPublish = (item) => {
        confirm({
            title: '确定要发布吗？',
            icon: <ExclamationCircleOutlined />,
            content: '发表这篇新闻',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                //发布状态 状态改为2
                axios.patch(`/news/${item.id}`, {
                    'publishState': 2
                }).then(setRefresh).then(
                    () => {
                        notification['success']({
                            message: `系统消息`,
                            description: (
                                <div>
                                    发布成功！您可以到<span style={{ color: '#7546c9' }}>发布管理/已发布</span>中查看您的新闻。
                                </div>
                            ),
                            placement: "topRight",
                            duration: '2.5',
                            top: '60px'
                        });
                    }
                )
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }
    //更新操作
    const handleUpdate = (item) => {
        //跳转到更新界面
        navigate(`/news-manage/update/${item.id}`)

    }
    //撤销对话框
    const showConfirm = (item) => {
        confirm({
            title: '确定要撤销吗？',
            icon: <ExclamationCircleOutlined />,
            content: '从审核列表中撤销此新闻',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                //确定删除 状态改为0
                axios.patch(`/news/${item.id}`, {
                    auditState: 0
                }).then(setRefresh).then(
                    () => {
                        notification['success']({
                            message: `系统消息`,
                            description: (
                                <div>
                                    操作成功！您可以到<span style={{ color: '#7546c9' }}>草稿箱</span>中查看您的新闻。
                                </div>
                            ),
                            placement: "topRight",
                            duration: '2.5',
                            top: '60px'
                        });
                    }
                )
            },

            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                bordered={true}
                rowKey={item => item.id}
            />
        </div>
    )
}
export default AuditList