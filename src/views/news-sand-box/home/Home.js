import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as Echarts from 'echarts'
import _ from 'lodash' //用来处理新闻分类数据进行图标展示
const { Meta } = Card;
function Home() {
    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token"))
    const [viewList, setviewList] = useState([])     //用户浏览最多数据
    const [starList, setstarList] = useState([])    //用户点赞最多数据
    const [allList, setallList] = useState([])  //所有已发布新闻数据
    const [visible, setvisible] = useState(false)   //右侧抽屉展示
    const [pieChart, setpieChart] = useState(null)
    const barRef = useRef()
    const pieRef = useRef()
    let navigate = useNavigate()
    useEffect(() => {
        //用户浏览最多数据
        axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res => {
            // console.log(res.data)
            setviewList(res.data)
        })
    }, [])
    useEffect(() => {
        //用户点赞最多数据
        axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res => {
            // console.log(res.data)
            setstarList(res.data)
        })
    }, [])
    useEffect(() => {
        //拿去所有已发布新闻数据
        axios.get("/news?publishState=2&_expand=category").then(res => {
            renderBarView(_.groupBy(res.data, item => item.category.title)) //处理新闻数据 成分组形式 传给eharts
            setallList(res.data)
        })

        return () => {
            window.onresize = null  //销毁后解绑监听事件
        }
    }, [])
    //柱状图
    const renderBarView = (obj) => {
        var myChart = Echarts.init(barRef.current);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '新闻发布数据'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: Object.keys(obj),
                axisLabel: {
                    rotate: "45",
                    interval: 0
                }
            },
            yAxis: {
                minInterval: 1
            },
            series: [{
                name: '数量',
                type: 'bar',
                data: Object.values(obj).map(item => item.length)
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize = () => {
            myChart.resize()  //使图标具有响应式
        }
    }
    //饼状图
    const renderPieView = (obj) => {
        //数据处理工作
        var currentList = allList.filter(item => item.author === username)
        var groupObj = _.groupBy(currentList, item => item.category.title)
        var list = []
        for (var i in groupObj) {
            list.push({
                name: i,
                value: groupObj[i].length
            })
        }
        var myChart;
        if (!pieChart) {
            myChart = Echarts.init(pieRef.current);
            setpieChart(myChart)
        } else {
            myChart = pieChart
        }
        var option;

        option = {
            title: {
                text: '当前用户新闻分类图示',
                // subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '发布数量',
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option && myChart.setOption(option);

    }
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://api.yimian.xyz/img?type=wallpaper"
                            />
                        }
                        //https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png
                        actions={[
                            <PieChartOutlined key="setting" onClick={() => {
                                setvisible(true)
                                setTimeout(() => {
                                    // init初始化
                                    renderPieView() //渲染饼状图
                                }, 0)
                            }} />,
                            <EditOutlined key="edit" onClick={() => {
                                navigate('/user-manage/list')
                            }} />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={username}
                            description={
                                <div>
                                    <b>{region ? region : "全球"}</b>
                                    <span style={{
                                        paddingLeft: "30px"
                                    }}>{roleName}</span>
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size="small"
                            // bordered
                            dataSource={starList}
                            renderItem={item => <List.Item>
                                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size="small"
                            // bordered
                            dataSource={viewList}
                            renderItem={item => <List.Item><a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                        />
                    </Card>
                </Col>
            </Row>

            <div ref={barRef} style={{
                width: '45%',
                height: "340px",
                marginTop: "20px",
                border: '1px solid #f0f0f0',
                borderRadius: '15px',
                padding: '10px'
            }}></div>
            <Drawer
                width="500px"
                title="个人新闻分类"
                placement="right"
                closable={true}
                onClose={() => {
                    setvisible(false)
                }}
                visible={visible}
            >
                <div ref={pieRef} style={{
                    width: '100%',
                    height: "400px",
                    marginTop: "30px"
                }}></div>
            </Drawer>
        </div>
    )
}
export default Home
