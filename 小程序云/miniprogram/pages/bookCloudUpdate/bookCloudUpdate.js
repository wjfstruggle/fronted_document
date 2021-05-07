// pages/bookAdd/bookAdd.js
let price = ''
let name = ''
Page({
  data(){
    return {
      bookList:[],
      _id:''
    }
  },
  onLoad(){
    this.getBookList();
  },
  // 查询方法
  getBookList(){
    let that = this
    // 简单的get()方法查询
    wx.cloud.callFunction({
      name:'getBookList'
    }).then(res => {
      that.setData({
        bookList:res.result.dbResult.data
      })
      console.log("云函数请求成功",res)
    }).catch(res => {
      console.log("云函数请求失败",res)
    })
  },
  getDetail(e){
    let _id = e.currentTarget.dataset.id
    this.setData({
      _id
    })
  },
  getName(event){
    this.setData({
      name:event.detail.value
    })
  },
  getPrice(event){
    this.setData({
      price:event.detail.value
    })
  },
  // 往数据库集合更新数据
  btnUpdate(){
    let {_id,name,price} = this.data
    wx.cloud.callFunction({
      name:'bookUpdate',
      data: {
        _id:_id,
        name:name,
        price:price
      }
    })
    .then(res => {
      console.log("更新成功",res)
      this.getBookList();
    }).catch(res => {
      console.log("更新失败",res)
    })
  },
})