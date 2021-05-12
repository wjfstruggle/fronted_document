// 类型注解，告诉TS变量是什么类型
const one = 1;
const tow = 2;
const tatal = one + tow

const obj = {
  name:'wjf',
  age:23
}

// 如果TS能够自动分析变量类型，我们就什么否不用做
// 如果TS不能判断类型的话，就使用类型注解
function getTotal(x:number,y:number){
  return x + y
}
const total = getTotal(1,2)
