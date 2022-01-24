

var obj = {
  // name:"wujf",
  // age:20
}

obj.__proto__ = {}

obj.__proto__.__proto__ = {}

// obj.__proto__.__proto__.__proto__ = {
//   address:"北京市"
// }

// console.log(obj.address); // "北京市"

console.log(obj.__proto__.__proto__.__proto__.__proto__);