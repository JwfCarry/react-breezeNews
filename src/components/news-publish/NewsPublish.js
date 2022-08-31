/* 发布列表组件 */
/*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
/* publishState  0未发布  1 待发布  2 已发布  3 已下线 */
import React from 'react'
import { Table, Tag, } from 'antd'
function NewsPublish(props) {
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            align: 'center',
            render: (title, item) => {
                return <a style={{ textDecoration: 'underline', color: 'blue' }} href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            align: 'center',
            render: (author) => {

                return <Tag color="purple">{author}</Tag>
            }

        },
        {
            title: "新闻分类",
            dataIndex: 'category',
            align: 'center',

            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "操作",
            align: 'center',
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div>
            }
        },
    ];

    return (
        <div>
            <Table dataSource={props.dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                bordered={true}
                rowKey={item => item.id}
            />
        </div>
    )
}
export default NewsPublish