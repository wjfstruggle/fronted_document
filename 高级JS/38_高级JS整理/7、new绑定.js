function Foo(name) {
  console.log(this); //Foo {}
  this.name = name
}

var foo = new Foo("wujf");
console.log(foo); // Foo {name: 'wujf'}