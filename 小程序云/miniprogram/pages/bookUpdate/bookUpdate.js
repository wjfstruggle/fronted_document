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
    let db = wx.cloud.database().collection("book")
    db.get().then(res => {
      console.log("查询成功",res.data)
      that.setData({
        bookList:res.data
      })
    }).catch(res => {
      console.log("查询失败",res.data)
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
    let db = wx.cloud.database().collection("book")
    db.doc(_id)
    .update({
      data:{
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