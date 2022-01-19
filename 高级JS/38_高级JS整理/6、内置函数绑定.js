setTimeout(function() {
  console.log(this);// window
},1000) 

setTimeout(()=> {
  console.log(this);// window
},1000) 

var obj = {
  name:"wujf"
}
const arr = new Array(4).fill("this绑定")

arr.forEach(function(item){
  console.log(item,this); // obj对象
},obj)

const box = document.querySelector(".box");
box.onclick = function() {
  console.log(this); // <div class="box">点击</div>
  console.log(this === box); // true
}