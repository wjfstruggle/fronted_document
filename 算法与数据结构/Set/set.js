// set数据结构常见用法

// 去重

const arr = [1, 1, 2, 3, 4, 5, 3, 4]

const arr2 = [...new Set(arr)]; // [1,2,3,4,5]

// 判断元素是否在集合里

const set = new Set(arr)

const set1 = set.has(1) // true
const set2 = set.has(6) // false

// 求交集

const set3 = new Set([1, 2])
const el = new Set([...set].filter(item => set3.has(item))) // [1,2]

// set add方法

const addSet = new Set();
addSet.add(1)
const obj = {
  a: 1,
  b: 2
}
addSet.add({
  a: 1,
  b: 2
})
addSet.add(obj) // addSet同时存在两个对象，obj和 {a:1,b:2}两个对象存储的地址不一样
const set4 = addSet.has(obj) // true
const set5 = addSet.has({ // false
  a: 1,
  b: 2
})

// delete 删除集合
addSet.delete(1)
addSet.delete(obj)


console.log(arr2);