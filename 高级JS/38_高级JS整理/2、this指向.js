// var obj = {
//   names:"wujf",
//   eating() {
//     console.log(`${obj.names}: 在 eating`);
//   },
//   running() {
//     console.log(`${obj.names}: 在 running`);
//   },
//   studying() {
//     console.log(`${obj.names}: 在 studying`);
//   }
// }
// obj.eating()
// obj.running()
// obj.studying()

// var obj = {
//   names:"wujf",
//   eating() {
//     console.log(`${this.names}: 在 eating`);
//   },
//   running() {
//     console.log(`${this.names}: 在 running`);
//   },
//   studying() {
//     console.log(`${this.names}: 在 studying`);
//   }
// }
// obj.eating()
// obj.running()
// obj.studying()

// console.log(this);

// var name = "wujf"

// console.log(this.name);
// console.log(window.name);

// 定义一个函数
// function foo() {
//   console.log(this);
// }
// // 1、直接调用
// foo(); // window

// // 2、foo函数放入obj里面调用
// var obj = {
//   names: "wujf",
//   foo:foo
// }

// obj.foo(); // obj对象

// // 3、通过call,bind,apply绑定调用
// foo.call("abc") // String {'abc'}
// foo.call(123) // Number {123}