import React, { useState, useEffect, } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import { UserOutlined, HomeOutlined, SolutionOutlined, CommentOutlined, ProjectOutlined, FileTextOutlined } from '@ant-design/icons';
import logoURL from '../../../assets/images/logo.png' //引入大logo图片
const { Sider } = Layout;//结构侧边栏UI结构
const { SubMenu } = Menu
function SideMenu() {
    const [collapsed] = useState(false); //伸缩
    const [menus, setMenuList] = useState([]) //侧边栏数据
    let navigate = useNavigate()
    let location = useLocation()
    const selectKeys = [location.pathname]; // 路由路径
    const openKeys = ["/" + location.pathname.split("/")[1]]; //截取外层一级路由路径
    //侧导航栏数据
    const iconList = {
        "/home": <HomeOutlined />,
        "/user-manage": <UserOutlined />,
        "/news-manage": <FileTextOutlined />,
        "/audit-manage": <ProjectOutlined />,
        "/publish-manage": <CommentOutlined />,
        "/right-manage": <SolutionOutlined />

    }
    useEffect(() => {
        //拿去侧边栏数据
        axios.get('http://localhost:3000/rights?_embed=children').then(res => {
            setMenuList(res.data)
        })
    }, [])
    const { role: { rights } } = JSON.parse(localStorage.getItem('token')); //获取用户所有的使用权限 （侧边栏）
    const checkPagePermission = (item) => {
        return item.pagepermisson && rights.includes(item.key) //跟全部权限比较 判断是否有 可以展示的权限
    }
    //渲染侧边栏数据
    const renderMenu = (menuList) => {
        return menuList.map(item => {

            if (item.children?.length > 0 && checkPagePermission(item)) {
                return <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
                    {renderMenu(item.children)}
                </SubMenu>
            }

            return checkPagePermission(item) && <Menu.Item key={item.key} onClick={() => {
                //  console.log(props)
                navigate(item.key)
            }} icon={iconList[item.key]}>{item.title}</Menu.Item>
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
