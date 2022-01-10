function fn (...args) {
  console.log(...args,this);
}

// 系统调用
// fn.call({}, 20,30,40)
// fn.call("abc")

// jkCall 实现call方法

Function.prototype.jkCall = function(thisArg,...args) {
  var fn = this;

  thisArg = (thisArg!==null && thisArg!==undefined) ? Object(thisArg) : window

  thisArg.fn = fn;

  var result = thisArg.fn(...args)
  delete thisArg.fn()
  return result
}

fn.jkCall({}, 20,30,40)
fn.jkCall("abc")
fn.jkCall(null)