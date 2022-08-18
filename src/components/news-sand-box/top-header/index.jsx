import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;
//下拉菜单
const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    '超级管理员'
                ),
            },
            {
                key: '2',
                danger: true,
                label: '退出',
            },
        ]}
    />
);
function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
            {/* 右侧个人头像结构 */}
            <div style={{ float: 'right' }}>
                <span>欢迎admin回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>

        </Header>
    )
}
export default TopHeader
