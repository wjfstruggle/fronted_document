const info = "hello world"
const add = (info) => {
  console.log(info)
}
add(info);

class Person {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  count() {
    return this.x + this.y
  }
  sayHi() {
    console.log("webpack serve")
  }
}

let person = new Person(1,2)
console.log(person.count())
person.sayHi()