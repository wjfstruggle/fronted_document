import './style/index.scss'
import img from './assets/img/tab-benefits-light.png'
// const promise = new Promise((resolve,reject)  => {
//   console.log("start");
//   setTimeout(() => {
//     resolve("2333")
//   },1000)
// })
// console.log("end");
// promise.then(res => {
//   console.log("res",res);
// })

// setTimeout(() => {
//   console.log("一直等");
// },1000)

(function() {
  let element = document.createElement("div");
  let image = new Image();
  image.src = img
  element.appendChild(image)
  element.innerHTML = `<span>落叶归根</span>`
  element.classList.add("box")
  console.error("捕获错误source-map")
  document.body.append(element)
})()