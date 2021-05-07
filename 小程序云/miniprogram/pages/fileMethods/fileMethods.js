// pages/fileMethods/fileMethods.js
Page({
  data(){
    return {
      tempFilePaths:''
    }
  },
  onLoad(){
    // this.getFiles()
    // wx.cloud.callFunction({
    //   name:'files'
    // }).then(res => {
    //   console.log("云存储上传成功",res)
    // }).catch(res => {
    //   console.log("云存储上传失败",res)
    // })
  },
  // 云函数调用
  getFiles(tempFilePaths){
    let that = this;
    wx.getFileSystemManager().readFile({
      filePath: tempFilePaths, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        wx.cloud.callFunction({
          name:'files',
          data:{
            path: '2333',
            file: res.data
          }
        }).then(res => {
          console.log("云存储上传成功",res)
        }).catch(res => {
          console.log("云存储上传失败",res)
        })
      }
    })
  },
  chooseImage(){
    let that = this
    wx.chooseImage({
      count: 1,//最多可以选择的图片张数
      sizeType: ['original', 'compressed'],//所选的图片的尺寸
      sourceType: ['album', 'camera'],//选择图片的来源
    }).then(res => {
      console.log("上传成功",res)
      const tempFilePaths = res.tempFilePaths //图片的本地临时文件路径列表 (本地路径)
      that.setData({
        tempFilePaths
      })
      that.getFiles(res.tempFilePaths[0])
      // wx.cloud.uploadFile({
      //   cloudPath: '前端.png', // 上传至云端的路径
      //   filePath: tempFilePaths[0], // 小程序临时文件路径
      // }).then(req => {
      //   console.log("云存储上传成功",req)
      // }).catch(req => {
      //   console.log("云存储上传失败",req)
      // })
    }).catch(res => {
      console.log("上传失败",res)
    })
  },
})