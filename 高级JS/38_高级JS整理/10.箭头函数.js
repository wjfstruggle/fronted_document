// var obj = {
//   data:[],
//   getDataList() {
//     var _this = this;
//     setTimeout(function() {
//       _this.data.push(new Array(10).fill("数据"))
//       console.log(obj.data);
//     },1000)
//   }
// }
// obj.getDataList()

// var obj = {
//   data:[],
//   getDataList:()=> {
//     setTimeout(()=> {
//       console.log(this); // window
//     },1000)
//   }
// }
// obj.getDataList()

// var obj = {
//   data:[],
//   getDataList() {
//     setTimeout(()=> {
//       console.log(this); // obj
//     },1000)
//   }
// }
// obj.getDataList()

var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;
  sss(); // window
  person.sayName(); //  person
  (person.sayName)();  //  person
  (b = person.sayName)(); // window
}

sayName();