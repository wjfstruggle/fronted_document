// var obj = {
//   name: "obj",
//   foo: function() {
//     console.log(this)
//   }
// }

// obj.foo() // obj

// // 1.call/apply的显示绑定高于隐式绑定
// obj.foo.apply('abc') // String {'abc'}
// obj.foo.call('abc') // String {'abc'}

// // 2.bind的优先级高于隐式绑定
// var bar = obj.foo.bind("cba") // String {'abc'}
// bar()

// var obj = {
//   name: "obj",
//   foo: function() {
//     console.log(this) // foo {}
//   }
// }

// // new的优先级高于隐式绑定
// var f = new obj.foo()


var obj = {
  name: "obj",
  foo: function() {
    console.log(this)
  }
}
obj.foo.call("abc")
// new的优先级高于隐式绑定
var f = new obj.foo()
