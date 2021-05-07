const obj = {}
const fun = ()=> {}
const arr = []

arr instanceof Array // true
arr instanceof Object // true
fun instanceof Function // true
fun instanceof Object // true
obj instanceof Object // true

Object.prototype.name = "张三"
Object.prototype.age = "16"
const fun1 = ()=> {}

