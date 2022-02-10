//1、 定义父类构造函数
function Person() {
  this.name = "why"
  this.friends = []
}

//2、 父类原型上添加方法
Person.prototype.running = function() {
  console.log(`${this.name}: 在running`);
}

//3、 定义子类构造函数
function Student() {
  this.sno = 111
}

//4、 创建父类p对象

var p = new Person();
Student.prototype = p;

// 5、子类原型上添加方法
Student.prototype.studying = function() {
  console.log(`${this.name}: 在studying`);
}

var stu = new Student();
stu.studying()
console.log(stu); // Person { sno: 111 }
// 1、第一个弊端：继承的属性是看不到的
// 2、第二个弊端
var stu1 = new Student("why", 18, ["lilei"], 111)
var stu2 = new Student("kobe", 30, ["james"], 112)
