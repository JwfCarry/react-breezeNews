import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
/* import {
    UploadOutlined,
    UserOutlined,
} from '@ant-design/icons'; */
import logoURL from '../../../assets/images/logo.png' //引入大logo图片
const { Sider } = Layout;//结构侧边栏UI结构
//侧导航栏数据
/* const menuList = [
    {
        key: '/home',
        icon: <UserOutlined />,
        label: '首页',
    },
    {
        key: "/user-manage",
        label: "用户管理",
        icon: <UserOutlined />,
        children: [
            {
                key: "/user-manage/list",
                label: "用户列表",
                icon: <UserOutlined />,
            },
        ],
    },
    {
        key: '/right-manage',
        icon: <UploadOutlined />,
        label: '权限管理',
        children: [{ label: '角色列表', key: '/right-manage/role/list', icon: <UploadOutlined /> },
        {
            key: "/right-manage/right/list",
            label: "权限列表",
            icon: <UploadOutlined />,
        },
        ]
    },
] */

function SideMenu() {
    const [collapsed] = useState(false);
    const [menuList, setMenuList] = useState()
    let navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/rights?_embed=children').then(res => {
            setMenuList(res.data)
            console.log(res.data);
        })
    }, [])
    //点击侧边栏函数
    const menuClick = (e) => {
        navigate(e.key)
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
                <img style={{ width: '200px', height: '73px' }} src={logoURL} alt="" />
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuList}
                onClick={menuClick}
            />
        </Sider>

    )
}
export default SideMenu
