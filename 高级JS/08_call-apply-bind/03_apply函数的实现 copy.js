function foo (...arg) {
  console.log(this,arg);
}

// foo.apply({},[1,2,3])
// foo.apply(null)
// foo.apply(undefined)

// 实现jkApply

Function.prototype.jkApply = function(thisArg,argArray) {
  var fn = this;

  thisArg = (thisArg!==null && thisArg!==undefined) ? Object(thisArg) : window

  thisArg.fn = fn;
  // 转换成数组

  argArray = argArray||[]

  // argArray = argArray ? argArray: Array.from(argArray)
  // argArray = argArray ? argArray: Object.keys(argArray)
  var result = thisArg.fn(...argArray);
  delete thisArg.fn
  return result;
  
}

foo.jkApply({},[1,2])
foo.jkApply(null)
foo.jkApply(undefined)