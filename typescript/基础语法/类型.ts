// 静态类型
var a:string = '123'
console.log(a)

// 函数相加
function add(params:{x:number,y:number}) {
  console.log(params.x + params.y)
  return params.x + params.y
}
add({x:1,y:2});

interface Point  {
  x:number,
  y:number
}
const count:Point = {
  x:3,
  y:4
}
// 基础类型，对象类型
const num:number = 123;
const relaName:string = 'wjf'
const nullName:null = null
const undefunedName:undefined = undefined
const booleanName:boolean = false
// 对象类型
const obj:object = {}
const arr:number[] = [1,2,3]
const fn1:() => string =() => {
  return '123'
}
class Person  {} // 构造函数
const getName: Person = new Person();

