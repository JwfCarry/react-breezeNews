/* 侧边栏功能路由配置文件 */
/* 此文件旨在用户登录后 根据此用户所拥有的权限动态创建路由  防止用户在地址栏中直接跳转到他所没有的权限页面 */
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../views/news-sand-box/home/Home'
import Nopermission from '../views/news-sand-box/nopermission/Nopermission'
import RightList from '../views/news-sand-box/right-manage/RightList'
import RoleList from '../views/news-sand-box/right-manage/RoleList'
import UserList from '../views/news-sand-box/user-manage/UserList'
import NewsCategory from "../views/news-sand-box/news-manage/NewsCategory";
import NewsAdd from "../views/news-sand-box/news-manage/NewsAdd";
import NewsDraft from "../views/news-sand-box/news-manage/NewsDraft";
import NewsPreview from '../views/news-sand-box/news-manage/NewsPreview';
import Audit from "../views/news-sand-box/audit-manage/Audit";
import AuditList from "../views/news-sand-box/audit-manage/AuditList";
import Unpublished from "../views/news-sand-box/publish-manage/Unpublished";
import Published from "../views/news-sand-box/publish-manage/Published";
import Sunset from "../views/news-sand-box/publish-manage/Sunset";
import axios from 'axios'
//路由对应组件
const LocalRouterMap = {
    "/home": <Home />,
    "/user-manage/list": <UserList />,
    "/right-manage/role/list": <RoleList />,
    "/right-manage/right/list": <RightList />,
    "/news-manage/add": <NewsAdd />,
    "/news-manage/draft": <NewsDraft />,
    "/news-manage/category": <NewsCategory />,
    "/news-manage/preview/:id": <NewsPreview />,
    "/audit-manage/audit": <Audit />,
    "/audit-manage/list": <AuditList />,
    "/publish-manage/unpublished": <Unpublished />,
    "/publish-manage/published": <Published />,
    "/publish-manage/sunset": <Sunset />,
};
function NewsRouter() {
    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))  //拿取用户 权限数据
    const [backRouteList, setBackRouteList] = useState([]); //后端返回侧边栏路由数据 
    //后端拿取数据
    useEffect(() => {
        Promise.all([
            axios.get("/rights"), //一级路由
            axios.get("/children"),  //子路由
        ]).then((res) => {
            //console.log([...res[0].data, ...res[1].data]);
            setBackRouteList([...res[0].data, ...res[1].data]);  //将所有路由合并成一个数组
        });
    }, [])
    // 将没有配置的路由过滤（后端返回的路由有一部分在此系统侧边栏中没有配置） && 权限是否开启显示||新闻预览界面
    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }
    //用户权限与全部权限相匹配 有的话返回true
    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }
    return (
        <div>
            <Routes>
                {
                    /* 渲染路由出口 */
                    backRouteList.map((item) => {

                        if (checkRoute(item) && checkUserPermission(item)) {
                            return <Route path={item.key} key={item.key} element={LocalRouterMap[item.key]} />
                        }
                        return null


                    })
                }
                <Route path="/" element={<Navigate replace from="/" to="home" />} />
                <Route path="/*" element={<Nopermission />} />
            </Routes>
        </div>
    )
}
export default NewsRouter
