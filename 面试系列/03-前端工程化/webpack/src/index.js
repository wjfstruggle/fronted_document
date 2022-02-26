const promise = new Promise((resolve,reject)  => {
  console.log("start");
  setTimeout(() => {
    resolve("2333")
  },1000)
})
console.log("end");
promise.then(res => {
  console.log("res",res);
})

setTimeout(() => {
  console.log("一直等");
},1000)