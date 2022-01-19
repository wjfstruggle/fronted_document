var obj = {
  name:"wujf",
  age:10,
  height:1.9
}

Object.defineProperty(obj,"name",{
  writable:false,
  enumerable:true,
  configurable:false,
  value: "james"
})
console.log(obj);
delete obj.name
console.log(obj);

console.log(Object.getOwnPropertyDescriptors(obj));