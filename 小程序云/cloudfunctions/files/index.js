// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.uploadFile({
    cloudPath: event.path,
    fileContent: new Buffer(event.file, 'base64')
    // cloudPath: 'demo.jpg',
    // fileContent: fileStream,
  })
}