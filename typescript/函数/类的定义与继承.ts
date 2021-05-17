// 类的定义

class Person4 {
  name = 'wujf';
  getName() {
    console.log(this.name)
  }
}

const person = new Person4();
// person.getName()

// 类的继承
class Techer extends Person4 {
  getTecherName() {
    console.log('techer')
  }
  // 父类的方法重写
  // getName() {
  //   console.log('重写父类的方法')
  // }
  // 重新调用父类的方法
  getName() {
    console.log(super.getName()+'重写父类的方法')
  }
}
const techer = new Techer();
techer.getTecherName();
techer.getName();