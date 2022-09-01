import React, { useState, useEffect } from 'react'
import { Table, Button, notification, Tag, } from 'antd'
import axios from 'axios'
//const { confirm } = Modal
function Audit() {
    const [dataSource, setdataSource] = useState([]) //表格数据
    const { roleId, region, username } = JSON.parse(localStorage.getItem("token")) //获取用户数据
    const [refresh, setRefresh] = useState(false) //自动刷新
    useEffect(() => {
        const roleObj = {
            "1": "superadmin",
            "2": "admin",
            "3": "editor"
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data
            //如果是超级管理员 把所有审核中的新闻展示 ，如果是区域管理员 把自己和自己区域的新闻展示 如果是区域编辑只展示改区域编辑的
            setdataSource(roleObj[roleId] === "superadmin" ? list : [
                ...list.filter(item => item.author === username),
                ...list.filter(item => item.region === region &&
                    roleObj[item.roleId] === "editor" &&
                    item.username !== username)
            ])
        })
    }, [roleId, region, username, refresh])

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
                return <Tag color='purple'>{author}</Tag>
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
            title: "操作",
            align: 'center',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => handleAudit(item, 2, 1)} style={{ marginRight: '10px' }}>通过</Button>
                    <Button danger onClick={() => handleAudit(item, 3, 0)}>驳回</Button>
                </div>
            }
        }
    ];
    const handleAudit = (item, auditState, publishState) => {




        axios.patch(`/news/${item.id}`, {
            auditState,
            publishState
        }).then(setRefresh).then(res => {
            notification.info({
                message: `系统消息`,
                description:
                    (
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
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id}
            />
        </div>
    )
}
export default Audit
