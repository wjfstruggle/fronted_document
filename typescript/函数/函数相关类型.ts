function add(){}
let add1 = function() {}
let add3 =() => {}

function sayHello(one:number,tow:number):number {
  return one + tow
}
let total1 = sayHello(1,2)

function sayHi():void {
  // void 无返回值
  console.log('tom')
  // return 123;
}
// 对象的解构赋值
function add4({firstName,secondName}:{firstName:string,secondName:string}):string{
  return firstName+ ' '+secondName
}
let total2 = add4({firstName:'hello',secondName:'tom'})

function getNumber({x}:{x:number}):number {
  return x
}
let count = getNumber({x:1})