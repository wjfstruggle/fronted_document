// pages/loadingData/loadingData.js
let page;
Page({
  data: {
    bookList:[]
  },
  onLoad: function (options) {
    page = 0
    this.getBookList()
  },
  getBookList(){
    wx.cloud.callFunction({
      name:'loadingData',
      data:{
        page:page,
        limit:20
      }
    }).then(res => {
      console.log("云函数请求成功",res)
      this.setData({
        bookList:this.data.bookList.concat(res.result.dbResult.data)
      })
    }).catch(res => {
      console.log("云函数请求失败",res)
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page++
    this.getBookList();
    console.log("onReachBottom")
  },
})