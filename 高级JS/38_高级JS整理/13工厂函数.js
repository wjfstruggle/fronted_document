function createPerson(name,age,job) {
  var o = new Object();
  o.name = name
  o.age = age
  o.job = job
  o.eating = function() {
    console.log(`${this.name}再吃东西`);
  }

  o.running = function() {
    console.log(`${this.name}再跑步`);
  }
  return o;
}
var p1 = createPerson("张三","20","工人")
var p2 = createPerson("李四","22","工人")
var p3 = createPerson("王五","23","工人")

console.log(p1); 
// {
//   name: '张三',
//   age: '20',
//   job: '工人',
//   eating: [Function (anonymous)],
// }