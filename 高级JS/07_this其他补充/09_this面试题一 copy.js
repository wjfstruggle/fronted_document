var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
var obj = {
  foo() {
    console.log(this);
  },
  bar: () => {
    console.log(this);
  }
}
function sayName() {
  var sss = person.sayName;
  sss(); // "window"
  person.sayName(); //  "person"
  (person.sayName)()// "person"
  // (obj.foo = person.sayName)(); // "window"
}

sayName();
obj.bar();


