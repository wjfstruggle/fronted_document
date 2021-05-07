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
    let db = wx.cloud.database().collection("goods")
    db.get().then(res => {
      console.log("查询成功",res.data)
      that.setData({
        bookList:res.data
      })
    }).catch(res => {
      console.log("查询失败",res.data)
    })
  },
  // doc()方法:获取一个记录的数据
  getDetail(e){
    let db = wx.cloud.database().collection("goods")
    console.log(e)
    let _id = e.currentTarget.dataset.id
    db
    // _id = 17453ede607bb3eb0265976314e5edac
    .doc(_id)
    .get().then(res => {
      console.log("查询成功",res.data)
    }).catch(res => {
      console.log("查询失败",res.data)
    })
  },
})