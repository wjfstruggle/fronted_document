function foo(x) {
  return function(y) {
    return function(z) {
      console.log(x+ y + z);
    }
  }
}

foo(1)

var bar = x => y => z => x + y + z
console.log(bar(1)(2)(3));