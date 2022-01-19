function foo() {
  console.log(this);
}

var obj = {
  name:"wujf",
  fn:foo
}

var obj2 = {
  name:"wujf",
}
obj.fn(); // obj对象
(obj.foo = obj.fn)(); // window