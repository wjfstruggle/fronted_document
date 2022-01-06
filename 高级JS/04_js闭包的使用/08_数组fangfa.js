var num = [1,3,56,78,23,12]
var num1 = num.map((item ,index,arr) => {
  return item % 2 == 0
})
var num2 = num.filter((item ,index,arr) => {
  return item % 2 == 0
})
console.log(num1);
console.log(num2);