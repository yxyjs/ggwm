/**
 * 使用mockjs提供mock数据接口
 */

import Mock from 'mockjs'
import data from './data'

// 返回goods
Mock.mock('/goods', { code: 0, data: data.goods })
// 返回ratings
Mock.mock('/ratings', { code: 0, data: data.ratings })
// 返回info
Mock.mock('/info', { code: 0, data: data.info })

// export default ???不需要向外暴露任何数据
//只需要保证能执行即可