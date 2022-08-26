/* 路由配置文件  登录&系统首页*/
import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/login'
import NewsSandBox from '../views/news-sand-box'
function IndexRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={localStorage.getItem("token") ? <NewsSandBox /> : <Navigate to="/login" />} />
            </Routes>
        </HashRouter>
    )
}
export default IndexRouter
