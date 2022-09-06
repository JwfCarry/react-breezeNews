# 项目简介

### 一、项目描述

* 项目简介

  BreezeNews业务管理系统是一个基于`React`开发的新闻后台管理系统，具有用户登录、用户管理、权限管理、新闻撰写、审核新闻、发布管理等功能模块。

* 目录结构描述

  ```
  ├── public  
  ├── node_modules // 依赖的第三方包
  ├── src // 源代码
  │   └── 
  │       ├── components // 通用组件
  │       ├── assets // 公共图片、css资源
  │       ├── router // 路由配置
  │       ├── store // mobx公共数据
  │       ├── util// axios配置
  │       ├── views // 路由主页
  │       ├── App.less // 样式
  │       ├── App.js // 
  │       ├── setupProxy.js //react脚手架代理
  │       └── index.js 项目入口文件
  ├── db.json // 后端Json数据
  ├── .gitignore // 不纳入 git 版本控制的 /文件夹?/ 列表
  ├── package.json // 项目信息文件
  ├── package-lock.json 
  ├──yarn.lock 
  └── README.md // 说明
  
  ```

* 项目展示

![image](https://github.com/JwfCarry/react-breezeNews/blob/main/src/assets/images/image-20220906103746829.png)
...

* 项目启动

  1.安装项目依赖

  ```js
  yarn
  ```

  2.安装json-server

  ```js
  yarn add json-server
  ```

  3.在项目目录中调用终端启动json-server

  ```
  json-server --watch --port 3000 db.json
  ```

  4.启动项目

### 二、技术栈

* React
* React-router
* mobx
* Ant Design
* less
* axios
* echarts
* json-server

   ...



