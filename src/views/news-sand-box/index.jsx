import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from 'antd';
import SideMenu from '../../components/news-sand-box/side-menu'
import TopHeader from '../../components/news-sand-box/top-header'
import Home from './home/Home'
import Nopermission from './nopermission/Nopermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
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
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/user-manage/list" element={<UserList />} />
                        <Route path="/right-manage/role/list" element={<RoleList />} />
                        <Route path="/right-manage/right/list" element={<RightList />} />
                        <Route path="/" element={<Navigate replace from="/" to="home" />} />
                        <Route path="/*" element={<Nopermission />} />
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    )
}
export default NewsSandBox
