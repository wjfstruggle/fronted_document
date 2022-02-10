// 定义父类构造函数
function Person() {
  this.name = "why"
}

// 父类原型上添加方法
Person.prototype.running = function() {
  console.log(`${this.name}: 在running`);
}

// 定义子类构造函数
function Student() {
  this.age = 18
}

// 创建父类p对象

var p = new Person();
Student.prototype = p;

Student.prototype.studying = function() {
  console.log(`${this.name}: 在studying`);
}

var stu = new Student();
stu.studying()
console.log(stu); // Person { age: 18 }