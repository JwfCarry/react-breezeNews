/* 已下线 */
/*auditState: 0 未审核 1 审核中  2 已通过 3 未通过 */
/* publishState  0未发布  1 待发布  2 已发布  3 已下线 */
import React from 'react'
import { Button } from 'antd';

import NewsPublish from '../../../components/news-publish/NewsPublish';
import usePublish from '../../../components/news-publish/usePublish';
function Sunset() {
    const { dataSource, handleSunset } = usePublish(3);  //表格数据 操作函数

    return (
        <NewsPublish dataSource={dataSource} button={(id) => <Button danger onClick={() => handleSunset(id)}>
            删除
        </Button>}>
        </NewsPublish>
    )
}
export default Sunset
