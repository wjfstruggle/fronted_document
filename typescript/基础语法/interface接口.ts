// interface接口

interface Person {
  name:string,
  age:number
}
const getPersonName = (person:Person):void => {
  console.log(person.name);
}

const setPersonName = (person:Person,name:string):void => {
  person.name = name
  console.log(person.name);
  
}
// 调用
const person = {
  name:'wujf',
  age:18
}
getPersonName(person)
setPersonName(person,'lee')

// 属性可有可无
interface Person1 {
  // 只读属性
  // readonly name:string,
  name:string;
  age?:number;
  [propName:string]:any; // 多出类型属性
  say():string; // 定义方法
}

const getPersonName1 = (person:Person1):void => {
  console.log(person.name);
}

const setPersonName1 = (person:Person1,name:string):void => {
  person.name = name
  console.log(person.name);
  
}
// 调用
const person1 = {
  name:'wujf',
  age:18,
  say() {
    return ''
  }
}
getPersonName1(person1)
setPersonName1(person1,'lee')

// 构造一个class，与其对应的属性和方法

class User2 implements Person1 {
  name = 'lee';
  say() {
    return ''
  }
}

// 继承,继承了person1的属性和方法，同时也可以拥有自己的属性和方法

interface Player extends Person1 {
  techer():string
}

// 调用
const person3 = {
  name:'wujf',
  age:18,
  say() {
    return 'say'
  },
  techer() {
    return 'techer'
  }
}
const setPersonName3 = (person:Player,name:string):void => {
  person.name = name
  console.log(person.name);
}
setPersonName3(person3,'led')