// function foo (x,y,z) {
//   // console.log(arguments); //Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

//   // auguments 转数组

//     console.log(arguments.length);

//     var arr = [];
//     for (let i = 0; i < arguments.length; i++) {
//       arr.push(arguments[i])
//     }
//     console.log(arr); //[ 1, 2, 3 ]

//     var arr1 = Array.prototype.slice.call(arguments)
//     var arr2 = [].slice.call(arguments)
//     var arr3 = Array.from(arguments)
//     var arr4 = [...arguments]
//     console.log(arr4);
// }

// foo(1,2,3) 

// function foo (x,y,z) {
//   console.log(arguments[0]); // 1
//   console.log(arguments.length); // 3
// }

// foo(1,2,3)

var foo = (x,y,z)=> {
  console.log(arguments); // 上层作用域是window
}

foo(1,2,3)

function bar(x,y,z) {
  return (n,m) => {
    console.log(arguments); //上层作用域是bar [Arguments] { '0': 1, '1': 2, '2': 3 }
  }
}
var fn = bar(1,2,3)
fn(4,5)