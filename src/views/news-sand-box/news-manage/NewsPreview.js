import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageHeader, Button, Descriptions } from 'antd';
import axios from 'axios';

function NewsPreview() {
    const [newsInfo, setNewsInfo] = useState(null)
    const params = useParams() //获取跳转路由参数
    useEffect(() => {
        console.log(params)
        axios.get(`/news/${params.id}&_expand=category&_expand=role`).then(res => {
            setNewsInfo(res.data)
        })
    }, [params.id])
    return (
        <div>
            <PageHeader
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="创建时间">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="发布时间">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="区域">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="审核状态">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="发布状态">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="访问数量">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="评论数量">Lili Qu</Descriptions.Item>

                </Descriptions>
            </PageHeader>

        </div>
    )
}
export default NewsPreview
