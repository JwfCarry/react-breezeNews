import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
    const [isDisabled, setIsDisabled] = useState(false) //当用户选中超级管理员时  控制区域框不可选中
    const { roleId, region } = JSON.parse(localStorage.getItem("token")) //拿取用户信息
    const roleObj = {
        "1": "superadmin",
        "2": "admin",
        "3": "editor"
    }
    //区域限制
    const checkRegionDisabled = (item) => {
        //是否点击的是更新按钮
        if (props.isUpdate) {
            if (roleObj[roleId] === "superadmin") {
                return false  //不限制选择框
            } else {
                return true  //限制选择框 地区只能是当前用户管理地区 例如 亚洲管理想更新 他不能选择其他地区 只能在亚洲
            }
        } else {
            //
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return item.value !== region
            }
        }
    }
    //角色限制
    const checkRoleDisabled = (item) => {
        //是否点击的是更新
        if (props.isUpdate) {
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return true
            }
        } else {
            if (roleObj[roleId] === "superadmin") {
                return false
            } else {
                return roleObj[item.id] !== "editor"
            }
        }
    }
    return (
        <div>

            <Form
                name="basic"
                layout='vertical'
                ref={ref}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="区域"
                    rules={isDisabled ? [] : [{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Select disabled={isDisabled} >
                        {
                            props.regionList.map(item =>
                                <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.title}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="角色"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Select onChange={(value) => {
                        if (value === 1) {
                            setIsDisabled(true)
                            ref.current.setFieldsValue({
                                region: ""
                            })
                        } else {
                            setIsDisabled(false)
                        }
                    }}>
                        {
                            props.roleList.map(item =>
                                <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
})
export default UserForm
