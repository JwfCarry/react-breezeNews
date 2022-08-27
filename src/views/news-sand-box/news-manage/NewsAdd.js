import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import NewsEditor from '../../../components/news-manage/NewsEditor';
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from 'axios';
const { Step } = Steps;
const { Option } = Select
function NewsAdd() {
    const [current, setCurrent] = useState(0) //当前步骤 
    const [categoryList, setCategoryList] = useState([]); //新闻分类选择框数据
    const [newsTitleAndCategory, setNewsTitleAndCategory] = useState([]);//新闻标题与类别数据
    const [newsContent, setNewsContent] = useState('')
    const formRef = useRef(null) //表单实例
    const User = JSON.parse(localStorage.getItem("token")) //拿去登录用户信息
    const navigate = useNavigate() //路由跳转
    //拿取后端数据
    useEffect(() => {
        //新闻分类选择框数据
        axios.get('/categories').then(res => {
            setCategoryList(res.data)
        })
    }, [])

    //下一步按钮
    const handleNext = () => {
        if (current === 0) { //如果是第一步
            //表单验证是否放行
            formRef.current.validateFields().then((res) => {
                setNewsTitleAndCategory(res) //存储新闻标题与类别数据
                setCurrent(current + 1)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            if (newsContent === '' || newsContent.trim() === '<p></p>') {
                message.error('新闻内容不能为空！')
            } else {
                setCurrent(current + 1)

            }
        }

    }
    //上一步按钮
    const handlePrevious = () => {
        setCurrent(current - 1)
    }
    //保存到草稿箱或者是提交审核
    const handleSave = (auditState) => {
        axios.post('/news', {
            ...newsTitleAndCategory,
            "content": newsContent,
            "region": User.region ? User.region : "全球",
            "author": User.username,
            "roleId": User.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 0
        }).then(res => {
            //草稿箱页面 :审核列表
            navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')

            notification['success']({
                message: `系统消息`,
                description: (
                    <div>
                        操作成功！您可以到<span style={{ color: '#7546c9' }}>{auditState === 0 ? '草稿箱' : '审核列表'}</span>中查看您的新闻。
                    </div>
                ),
                placement: "topRight",
                duration: '3',
                top: '50px'
            });
        })
    }
    return (
        <div>
            {/* 顶部文字 */}
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
            />
            {/* 顶部步骤条 */}
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>
            {/* 0: 新闻标题，新闻分类  1：新闻主体内容   2：保存草稿或者提交审核  */}
            {/* 步骤条相应内容区域 */}
            <div style={{ marginTop: '20px' }}>
                <div className={current === 0 ? '' : style.noactive}>
                    <Form
                        ref={formRef}
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="新闻标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新闻标题!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择新闻分类!',
                                },
                            ]}
                        >
                            <Select>
                                {
                                    categoryList.map((item) => {
                                        return <Option value={item.id} key={item.id}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>


                </div>
                <div className={current === 1 ? '' : style.noactive}>
                    <NewsEditor getContent={(content) => {
                        setNewsContent(content)
                    }}></NewsEditor>
                </div>
                <div className={current === 2 ? '' : style.noactive}></div>
            </div>
            {/* 按钮区域 */}
            <div style={{ marginTop: "40px" }}>
                {
                    current === 2 && <span>
                        <Button className={style.btn} type="primary" onClick={() => { handleSave(0) }}>保存草稿箱</Button>
                        <Button className={style.btn} danger onClick={() => { handleSave(1) }}>提交审核</Button>
                    </span>
                }
                {current > 0 && <Button className={style.btn} type="primary" onClick={handlePrevious}>上一步</Button>

                }
                {
                    current < 2 && <Button className={style.btn} type="primary" onClick={handleNext}>下一步</Button>
                }
            </div>
        </div>
    )
}
export default NewsAdd