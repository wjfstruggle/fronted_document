Page({
  onLoad(){
    wx.cloud.callFunction({
      name:'getBookLists'
    }).then(res => {
      console.log("云函数请求成功",res)
    }).catch(res => {
      console.log("云函数请求失败",res)
    })
    // let db = wx.cloud.database().collection("goods")
    // db.get().then(res => {
    //   console.log("本地查询成功",res.data)
    // }).catch(res => {
    //   console.log("本地查询失败",res.data)
    // })
  }
})