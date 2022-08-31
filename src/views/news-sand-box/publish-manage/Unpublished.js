/* 待发布发布 */
/*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
/* publishState  0未发布  1 待发布  2 已发布  3 已下线 */
import React from 'react'
import { Button } from 'antd';
import NewsPublish from '../../../components/news-publish/NewsPublish';
import usePublish from '../../../components/news-publish/usePublish';
function Unpublished() {
    const { dataSource, handleUnpublished } = usePublish(1);  //表格数据 操作函数
    return (

        <NewsPublish dataSource={dataSource} button={(id) => <Button type="primary" onClick={() => handleUnpublished(id)}>
            发布
        </Button>}>
        </NewsPublish>

    )
}
export default Unpublished
