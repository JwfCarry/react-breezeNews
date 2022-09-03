import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../store/index'  //导入Mobx数据
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;
function TopHeader() {
    const store = useStore()
    let collapsed = store.collapsedStore.collapsed //状态栏数据
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
                onClick: () => store.collapsedStore.changeCollapsed(),
            })}
            {/* 右侧个人头像结构 */}
            <div style={{ float: 'right' }}>
                <a target="_blank" rel='noopener noreferrer' href='https://github.com/JwfCarry/react-breezeNews'><GithubOutlined style={{ marginRight: '15px', fontSize: '20px', color: 'black', }} /></a>
                <span style={{ marginRight: '10px' }}>欢迎您,<span style={{ color: '#5e17eb', marginLeft: '3px' }}>{username}</span></span>
                <Dropdown overlay={menu}>
                    <a href='javascipt:;'>
                        <Avatar size={35} icon={<UserOutlined />} src='https://joeschmoe.io/api/v1/random' />
                        <DownOutlined />
                    </a>

                </Dropdown>

            </div>

        </Header>
    )
}
export default observer(TopHeader)
