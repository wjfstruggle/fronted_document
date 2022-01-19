function foo() {
  console.log(this);
}

var obj = {
  name:"wujf"
}

foo.call(obj) // obj对象
foo.call("123") // String {'123'}
foo.call(window) // window
foo.call(undefined) // window
foo.call(null) // window


function foo() {
  console.log(this);
}

var obj = {
  name:"wujf",
  foo:foo
}

var bar = obj.foo.bind(obj)
bar()
