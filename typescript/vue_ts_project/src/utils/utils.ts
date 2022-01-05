// 防抖和节流
// 防抖原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
function debounce (fn:Function, delay:number) {
  let timer:any = null;
  return function() {
    let that:unknown = this;
    let args = arguments;
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(that,args)
    },delay)
  }
}
// 节流原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
function throttle(fn:Function, delay:number) {
  let timer:any = null;
  let lastTime:any = null;
  return function(args:[]) {
    let _args = arguments;
    let that:unknown = this;
    let newTime = + new Date();
    if(lastTime && newTime < lastTime + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = newTime;
        fn.apply(that, _args)
      },delay)
    }else {
      lastTime = newTime;
      fn.apply(that, _args)
    }
  }
}
