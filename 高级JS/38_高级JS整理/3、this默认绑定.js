// 案例1
function foo() {
  console.log(this); // window
}
foo()

// 案例2
function test1() {
  console.log(this);// window
  test2()
}
function test2() {
  console.log(this);// window
  test3()
}
function test3() {
  console.log(this);// window
}

test1();


// 案例3
function bar(fn) {
  fn()
}

var obj = {
  name:"wujf",
  bar() {
    console.log(this);
  }
}

bar(obj.bar)