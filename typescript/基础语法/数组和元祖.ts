const arr = [1,3,4]


// 字符串+数字数组
type arr2 = (number|string)
const stringArr:arr2[] = [1,2,'3']

type User = (object|number)
const objArr:User[] = [
  {
    name:'yom',
    age:19
  }
]
// 元组