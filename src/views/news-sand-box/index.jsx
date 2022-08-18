import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Button } from 'antd'
import SideMenu from '../../components/news-sand-box/side-menu'
import TopHeader from '../../components/news-sand-box/top-header'
import Home from './home/Home'
import Nopermission from './nopermission/Nopermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
function NewsSandBox() {
    return (
        <div>
            <SideMenu />
            <TopHeader />
            <Button type='primary'>Primary Button</Button>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/user-manage/list" element={<UserList />} />
                <Route path="/right-manage/role/list" element={<RoleList />} />
                <Route path="/right-manage/right/list" element={<RightList />} />
                <Route path="/" element={<Navigate replace from="/" to="home" />} />
                <Route path="/*" element={<Nopermission />} />
            </Routes>
        </div>
    )
}
export default NewsSandBox
