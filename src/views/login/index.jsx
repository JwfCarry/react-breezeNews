import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import axios from 'axios';
function Login() {
    let navigate = useNavigate()
    //  登录校验
    const onFinish = (values) => {
        axios.get(`/users?username=${values.username}&${values.password}&roleState=true&_expand=role`).then(res => {
            if (res.data.length === 0) {
                message.error('用户名或密码错误！')
            } else {
                localStorage.setItem('token', JSON.stringify(res.data[0]))
                navigate('/home');
            }
        })
    }
    return (
        <div style={{ background: '#c8c4ec', height: "100%" }}>
            <div className="formContainer">
                <div className="logintitle">BreezeNews业务管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入您的用户名！' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入您的密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='donghua'>
                <div className="square">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="circle">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Login
