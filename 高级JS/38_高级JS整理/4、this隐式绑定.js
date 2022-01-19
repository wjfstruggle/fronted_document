// function foo() {
//   console.log(this); // obj对象
// }

// var obj = {
//   name:"wujf",
//   foo:foo
// }

// obj.foo();

// function foo() {
//   console.log(this); // obj1对象
// }

// var obj1 = {
//   name:"obj1",
//   foo:foo
// }
// var obj2 = {
//   name:"obj2",
//   obj1:obj1
// }

// obj2.obj1.foo()

// 案例3
function foo() {
  console.log(this); // Window对象
}

var obj = {
  name:"wujf",
  foo:foo
}
var bar = obj.foo;
bar()