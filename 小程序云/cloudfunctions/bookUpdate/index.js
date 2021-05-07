// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // let _id = event._id
  // let name = event.name
  // let price = event.price
  const result = await cloud.database().collection('book')
  .doc(event._id)
  .update({
    data:{
      name:event.name,
      price:event.price
    }
  })
  return {
    result
  }
  // return {
  //   _id:event._id,
  //   name:event.name,
  //   price:event.price
  // }
}