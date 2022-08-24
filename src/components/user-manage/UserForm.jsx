import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
    const [isDisabled, setIsDisabled] = useState(false) //当用户选中超级管理员时  控制区域框不可选中
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
                                <Option value={item.value} key={item.id}>{item.title}</Option>
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
                                <Option value={item.id} key={item.id}>{item.roleName}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
})
export default UserForm
