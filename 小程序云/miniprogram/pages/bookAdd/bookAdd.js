// pages/bookAdd/bookAdd.js
Page({
  data(){
    bookList:[]
    price:''
    name:''
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
    // 往数据库集合添加数据
    btnAdd(){
      let {_id,name,price} = this.data
      let db = wx.cloud.database().collection("book")
      db.add({
        data:{
          name:name,
          price:price,
          createdTime:new Date()
        }
      }).then(res => {
        console.log("添加成功",res)
        this.getBookList();
      }).catch(res => {
        console.log("添加失败",res)
      })
    },
})