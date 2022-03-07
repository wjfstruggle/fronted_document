

let arr = [
  {
    a: 1,
    b: '=',
    c: '通用'
  },
  {
    a: 1,
    b: '=',
    c: '通用'
  }, {
    a: 1,
    b: '=',
    c: '通用'
  }
]
//方式一 利用map判断
function isExistInObj(arr, key) {
  const a = arr.map(value => value.a);
  const b = arr.map(value => value.b);
  const c = arr.map(value => value.c);
  const aSet = new Set(a);
  const bSet = new Set(b);
  const cSet = new Set(c);
  if (aSet.size == bSet.size || bSet.size == cSet.size) {
    console.log("不存在同个值")
    return false
  } else {
    console.log("存在同个值")
    return true
  }
}
function isExistInObj1(array) {
  return array.map((value)=> {
    return value.a + value.b + value.c
  }).some((value, index, array)=> {
    return array.indexOf(value) !== array.lastIndexOf(value);
  })
}
console.log(isExistInObj1(arr));