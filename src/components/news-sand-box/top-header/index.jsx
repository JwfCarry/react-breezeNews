import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;
function TopHeader() {
    const [collapsed, setCollapsed] = useState(false); //顶部收缩按钮
    let navigate = useNavigate()// 路由跳转
    const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token')) //获取当前登录信息
    //下拉菜单项数据
    const menu = (
        <Menu>
            <Menu.Item>
                {roleName}
            </Menu.Item>
            <Menu.Item danger onClick={() => {
                localStorage.removeItem('token');
                navigate('login');
            }}>退出</Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
            {/* 右侧个人头像结构 */}
            <div style={{ float: 'right' }}>
                <span>欢迎{username}回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>

        </Header>
    )
}
export default TopHeader
