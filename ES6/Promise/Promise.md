# Promise 对象

- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
- 所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

- `Promise`对象有以下两个特点。

  （1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

  （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。

#### 1、回调函数的使用例子

- 方块的运动

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  .box {
    height: 100px;
    width: 100px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: aqua;
  }
</style>
<div class="box"></div>
<body>
  <script>
    // window.getComputedStyleWindow.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 
    let ele = document.querySelector(".box")
    let el = window.getComputedStyle(ele,null)["height"]
    function move(ele,arg,target,cb) {
      let start = parseInt(window.getComputedStyle(ele,null)[arg])// 开始
      let dis = (target - start) / Math.abs(target - start) // dis 大于1表示往右
      let speed = dis * 4; // 速度

      function fn() {
        let now = parseInt(window.getComputedStyle(ele,null)[arg])
        if(now == target) {
          cb&&cb("运动完成")
        }else {
          ele.style[arg] = now + speed + 'px'
          setTimeout(fn, 50)
        }
      }
      fn();
    }
	// 回调
    move(ele,"left",200,function(res){ // 向右运动完
      console.log(res);
      move(ele,"top",200,function(res){ // 到向下运动
        console.log(res);
        move(ele,"left",0,function(res){ // 向左运动
          console.log(res);
          move(ele,"top",0) // 向上运动
        })
      })
    })
  </script>
</body>
</html>
```

