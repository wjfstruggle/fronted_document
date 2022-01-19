// function Person() {}
// var p = new Person();
// console.log(p); // Person {}

// function Person(name,age,height) {
//   this.name = name;
//   this.age = age;
//   this.height = height;
//   this.eating = function() {
//     console.log(`${this.name}： eating`);
//   }
//   this.running = function() {
//     console.log(`${this.name}： running`);
//   }
// }

// let p = new Person("wujf",20,1.88)
// console.log(p);
// // Person {
// //   name: 'wujf',
// //   age: 20,
// //   height: 1.88,
// //   eating: [Function (anonymous)],
// //   running: [Function (anonymous)]
// // }
// p.eating();
// p.running();

// function Person() {}

// console.log(Person.prototype); // {constructor: ƒ}

// var obj = {};
// console.log(obj.age);
// obj.__proto__.age = 19
// console.log(obj.age);
// console.log(Object.getPrototypeOf(obj));

function Person() {}
var person1 = new Person();
var person2 = new Person();

// 上面操作相当于会进行下面操作
var p = {}
// console.log(p.__proto__);

console.log(person1.__proto__=== Person.prototype); // true
console.log(person2.__proto__=== Person.prototype); // true
console.log(person2.__proto__=== person1.__proto__); // true
console.log(Person.prototype.constructor); // [Function: Person]
console.log(person2.__proto__.constructor); // [Function: Person]
console.log(person2.__proto__.constructor.name); // Person

