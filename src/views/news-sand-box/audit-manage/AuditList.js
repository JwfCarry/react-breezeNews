/* 审核列表 */
/*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
import React, { useEffect, useState } from 'react'
import { Table, Button, Tag } from 'antd'
import axios from 'axios'
function AuditList() {
    const [dataSource, setdataSource] = useState([])  //表格数据
    const { username } = JSON.parse(localStorage.getItem("token")) //用户数据
    useEffect(() => {
        //拿取数据     新闻列表中 用户自己&状态不为【未审核0】&发布状态为【未发布0、待发布1】 ne：不等于 lte：小于
        axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            console.log(res.data)
            setdataSource(res.data)
        })
    }, [username])
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
                        item.auditState === 1 && <Button type='primary' >撤销</Button>
                    }
                    {
                        item.auditState === 2 && <Button danger>发布</Button>
                    }
                    {
                        item.auditState === 3 && <Button type="primary" >更新</Button>
                    }
                </div>
            }
        }
    ];


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