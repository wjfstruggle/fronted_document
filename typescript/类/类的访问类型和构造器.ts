// public 允许在类的内部和外部被调用
// private 允许在类的内部被调用
// protected 允许在类的内部和继承的子类被调用
class Person {
  public name:string;
  // private age = 18;
  private age:number;
  // protected job:string;
  protected job = '前端';
  sayHi() {
    return this.name
  }
  sayAge() {
    return this.age
  }
  sayJob() {
    return this.job
  }
}
class Son extends Person {
  constructor(protected job:string) {
    super()
  }
}


let person = new Person();
let son = new Son('前端');
person.name = 'wujf'
// person.age = 18
// console.log(person.name)
// console.log(person.sayHi())
// console.log(person.sayAge())
console.log(son.sayJob())