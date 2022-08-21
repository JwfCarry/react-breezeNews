import React, { useState, useEffect, } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
/* import {
    UserOutlined,
} from '@ant-design/icons'; */
import logoURL from '../../../assets/images/logo.png' //引入大logo图片
const { Sider } = Layout;//结构侧边栏UI结构
const { SubMenu } = Menu
//侧导航栏数据
/* const iconList = {
    "/home": <UserOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />
    //.......
} */
function SideMenu() {
    const [collapsed] = useState(false);
    const [menus, setMenuList] = useState([])
    let navigate = useNavigate()
    let location = useLocation()
    const selectKeys = [location.pathname]; // 路由路径
    const openKeys = ["/" + location.pathname.split("/")[1]]; //截取外层一级路由路径
    useEffect(() => {
        axios.get('http://localhost:3001/rights?_embed=children').then(res => {
            setMenuList(res.data)
        })
    }, [])
    const checkPagePermission = (item) => {
        return item.pagepermisson
    }
    //渲染数据
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return <SubMenu key={item.key} title={item.title}>
                    {renderMenu(item.children)}
                </SubMenu>
            }

            return checkPagePermission(item) && <Menu.Item key={item.key} onClick={() => {
                //  console.log(props)
                navigate(item.key)
            }}>{item.title}</Menu.Item>
        })
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{ display: 'flex', 'flexDirection': 'column', height: '100%' }}>
                <div className="logo">
                    <img style={{ width: '200px', height: '73px' }} src={logoURL} alt="" />
                </div>
                <div style={{ flex: 1, 'overflow': 'auto' }}>
                    <Menu
                        theme="light"
                        mode="inline"
                        selectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}
                    >  {renderMenu(menus)}</Menu>
                </div>
            </div>
        </Sider>

    )
}
export default SideMenu
