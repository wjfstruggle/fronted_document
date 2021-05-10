Function.prototype.myCall = function(context,...arr) {
  if(context == null || context == undefined) {
    context = window
  }else {
    context = Object(context)
  }
  // 存储临时函数
  let s = Symbol();
  context[s] = this; // this指向
  let result = context[s](...arr) // 参数传递
  delete context[s] // 删除上下文对象的属性
  return result
}

// 测试
var obj = {
  count: 10
}
function sum () {
  console.log(this.count = this.count + 1)
}
sum.myCall(obj) // 11
sum.myCall(null) // window 