import add from './add'
console(add(1,2))

// var add = require('add.js').default
// console(add(1,2))

//收集依赖
// ES6转ES5
// 替换require 和 exports

// (function (list) {
//   function require(file) {
//     var exports = {};
//     (function (exports, code) {
//       eval(code);
//     })(exports, list[file]);
//     return exports;
//   }
//   require("index.js");
// })({
//   "index.js": `
//     var add = require('add.js').default
//     console.log(add(1 , 2))
//         `,
//   "add.js": `exports.default = function(a,b){return a + b}`,
// });