function Person(name,age) {
  this.name = name;
  this.age = age;
}

Person.prototype.running = function() {
  console.log(`${this.name}: 在running`);
}

var p = new Person("why",18)
p.running()
console.log(p);
console.log(p.toString());
console.log(p.valueOf());