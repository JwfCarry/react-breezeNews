import React from 'react'
import NewsRouter from '../../router/NewsRouter'
import SideMenu from '../../components/news-sand-box/side-menu'
import TopHeader from '../../components/news-sand-box/top-header'
import { Layout } from 'antd';
import './index.css'
const { Content } = Layout;
function NewsSandBox() {
    return (
        <Layout>
            <SideMenu />
            <Layout className="site-layout">
                <TopHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto'
                    }}
                >
                    <NewsRouter />
                </Content>

            </Layout>
        </Layout>
    )
}
export default NewsSandBox
