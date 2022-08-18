import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;//结构侧边栏UI结构

function SideMenu() {
    const [collapsed] = useState(false);
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo"></div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                        children: [{ label: '子菜单项', key: 'submenu-item-1' }]
                    },
                ]}
            />
        </Sider>

    )
}
export default SideMenu
