function foo (...args) {
  console.log(this,...args);
}

// var bar = foo.bind("abc",123,23)
// bar()

// var bar = foo.bind("abc",123,23)
// bar(0,45) // String {'abc'} 123 23 0 45

Function.prototype.jkBind = function(thisArg, ...argArray) {
  var fn = this;
  var result;

  thisArg = (thisArg!==null && thisArg!==undefined) ? Object(thisArg) : window

  function proxyFn(...args) {
    thisArg.fn = fn;

    newArgArray = [...args,...argArray]

    result = thisArg.fn(...newArgArray)
    
    delete thisArg.fn;
    return result;
  }

  return proxyFn
}

var bar = foo.jkBind({},123,23)
bar(90,89)