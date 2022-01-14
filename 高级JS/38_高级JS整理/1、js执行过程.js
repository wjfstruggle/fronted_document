// var name = "wjf";

// function foo() {
//   var name = "good"
//   console.log(name);
// }

// var num1 = 1;
// var num2 = 2;
// var result = num1 + num2

// console.log(result);

// foo();


// var n = 200
// function bar() {
//   n = 100
// }
// bar();
// console.log(n); // 100

// function test() {
//   console.log(n1); // undefined
//   var n1 = 100;
//   console.log(n1); // 100
// }
// var n1 = 200;
// test();

// var a = 100

// function foo() {
//   console.log(a)
//   return
//   var a = 200
// }

// foo()

function foo() {
  var a = b = 10
  // => 转成下面的两行代码
  // var a = 10
  // b = 10
}

foo()

console.log(a) // a is not defined
console.log(b) // 10
