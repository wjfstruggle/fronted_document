// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取数据库内容，统计集合记录数或统计查询语句对应的结果记录数
  let dataCount = cloud.database().collection('goods').count();
  let page = event.page
  let limit = event.limit
  let dataBack = ''
  let dbResult = []
  try {
    if (dataCount < page * limit) {
      dataBack =  {errCode: 0,title:"数据已加载完成"}
    }
    dbResult = await cloud.database().collection('goods').skip(page * limit).limit(limit).get()
  } catch (error) {
    console.log(error)
  }
  return {
    dataCount,
    dataBack,
    dbResult
  }
}