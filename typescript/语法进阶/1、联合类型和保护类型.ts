interface Brid {
  fly: boolean;
  sing:() => {

  }
}

interface Dog {
  fly: boolean;
  bark:() => {
    
  }
}
// 类型断言的方式
function trainAnimate(animal:Brid | Dog) {
  if(animal.fly) {
    (animal as Brid).sing();
  }else {
    (animal as Dog).bark();
  }
}
// in 语法类型保护
function trainAnimate2(animal:Brid | Dog) {
  if('sing' in animal) {
    animal.sing();
  }else {
    animal.bark();
  }
}
// typeof 数据类型检测
function add(one:string | number , tow:string | number) {
  if(typeof one === 'string' || typeof tow === 'string') {
    return `${one}${tow}`
  }else {
    return one + tow;
  }
}
class countObj {
  count: number;
}
// instanceof 数据类型检测
function addSecond(one:object | countObj , tow:object | countObj) {
  if(one instanceof countObj && tow instanceof countObj) {
    return one.count + tow.count
  }else {
    return 0;
  }
}