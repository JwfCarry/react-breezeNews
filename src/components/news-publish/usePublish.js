/* 发布管理hooks */
import { useEffect, useState } from 'react'
import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
const { confirm } = Modal
function usePublish(type) {
    /*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
    /* publishState  0未发布  1 待发布  2 已发布  3 已下线 */
    const [dataSource, setDataSource] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const { username } = JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
        axios.get(`/news?author=${username}&publishState=${type}&_expand=category`).then(res => {
            // console.log(res.data);
            setDataSource(res.data)
        })
    }, [username, type, refresh])

    //发布新闻
    const handleUnpublished = (id) => {
        confirm({
            title: '确定要发布吗？',
            icon: <ExclamationCircleOutlined />,
            content: '发布此新闻',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                axios.patch(`/news/${id}`, {
                    "publishState": 2,
                    "publishTime": Date.now()
                }).then(setRefresh).then(() => {
                    notification['success']({
                        message: `系统消息`,
                        description: (
                            <div>
                                发布成功！您可以到<span style={{ color: '#7546c9' }}>发布管理/已经发布</span>中查看您的新闻。
                            </div>
                        ),
                        placement: "topRight",
                        duration: '2.5',
                        top: '60px'
                    });
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //下线新闻
    const handlePublished = (id) => {
        confirm({
            title: '确定要下线吗？',
            icon: <ExclamationCircleOutlined />,
            content: '下线此新闻',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                axios.patch(`/news/${id}`, {
                    "publishState": 3,
                }).then(setRefresh).then(() => {
                    notification['success']({
                        message: `系统消息`,
                        description: (
                            <div>
                                下线成功！您可以到<span style={{ color: '#7546c9' }}>发布管理/已经下线</span>中查看您的新闻。
                            </div>
                        ),
                        placement: "topRight",
                        duration: '2.5',
                        top: '60px'
                    });
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //删除新闻
    const handleSunset = (id) => {
        confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleOutlined />,
            content: '删除此新闻',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                axios.delete(`/news/${id}`).then(setRefresh).then(() => {
                    notification['success']({
                        message: `系统消息`,
                        description: (
                            <div>
                                删除成功！您以及<span style={{ color: '#7546c9' }}>删除</span>了此篇新闻。
                            </div>
                        ),
                        placement: "topRight",
                        duration: '2.5',
                        top: '60px'
                    });
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        {
            dataSource,
            handleUnpublished,
            handlePublished,
            handleSunset
        }
    )
}
export default usePublish
