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

#### 2、基本用法

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

下面代码创造了一个`Promise`实例。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

#### 3、Promise.then()

Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

```javascript
// Promise对象三种状态 pending (进行中)，flufilled(已成功)，rejected（已失败）
let p = new Promise(function(resolve,reject) {
    resolve("success");
    reject("err");
})
console.log(p);
// then方法 接收两个回调函数作为参数，一个是成功时的回调resolve,一个是失败时的回调reject
p.then(function(res){
    console.log("成功回调",res)
},function(err){
    console.log("失败回调",err)
})
```

promise 新建后就会立即执行。

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

- 下面是异步加载图片的例子。

```javascript
function onloadImg1() {
    return new Promise(function (resolve, reject) {
        let img = new Image();
        img.onload = function () {
            resolve("加载完成");
        }
        img.onerror = function () {
            reject("加载失败");
        }
        img.src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2F1812.img.pp.sohu.com.cn%2Fimages%2Fblog%2F2009%2F11%2F18%2F18%2F8%2F125b6560a6ag214.jpg'
    })
}
onloadImg1().then(res => {
    console.log(res);
}, err => {
    console.log(err);
})
```

- 方块的运动Promise改造

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
    let el = window.getComputedStyle(ele, null)["height"]

    function move(ele, arg, target) {
      return new Promise((resolve, reject) => {
        let start = parseInt(window.getComputedStyle(ele, null)[arg])
        let dis = (target - start) / Math.abs(target - start)
        let speed = dis * 5;

        function fn() {
          let now = parseInt(window.getComputedStyle(ele, null)[arg])
          if (now == target) {
            // cb && cb("运动完成")
            resolve("运动完成")
          } else {
            ele.style[arg] = now + speed + 'px'
            setTimeout(fn, 50)
          }
        }
        fn();
      })
    }
    move(ele, "left", 200).then(res => {
      console.log(res);
      return move(ele, "top", 200)
    }).then(res => {
      return move(ele, "left", 0)
      console.log(res);
    }).then(res => {
      return move(ele, "top", 0)
      console.log(res);
    }).then(res => {
      console.log(res);
    })
  </script>
</body>

</html>
```

#### 4、Promise.finally()

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

#### 5、手写Promise

##### 5-1 Promise 的声明

- `Promise`对象是一个构造函数，用来生成`Promise`实例。

- 由于`new Promise((resolve, reject)=>{})`，所以传入一个参数（函数）executor，传入就执行。

- executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）。

- 由于resolve和reject可执行

```javascript
class Promise {
    // 构造器
    constructor(executor) {
        // 成功时回调
        let resolve = () => {}
        // 失败时回调
        let rejtect = () => {}
        // 立即执行
        executor(resolve, reject);
    }
}
```

##### 5-2 解决Promise的状态

- 有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。

- 成功时，不可转为其他状态，且必须有一个不可改变的值（value）

- 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）

- `new Promise((resolve, reject)=>{resolve(value)})` resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。

- `new Promise((resolve, reject)=>{reject(reason)})` reject为失败，接收参数reason，状态改变为rejected，不可再次改变。

- 若是executor函数报错 直接执行reject();

  ```javascript
  class Promise {
      // 构造器
      constructor(executor) {
          // 初始状态
          this.state = 'pending'
          // 成功的值
          this.value = undefined;
          // 失败原因
          this.reason = undefined
          // 成功时回调
          let resolve = (value) => {
              if (this.state = 'pending') {
                  // resolve调用后，state转化为成功状态
                  this.state = 'flufilled'
                  // 存储value的值
                  this.value = value
              }
          }
          // 失败时回调
          let rejtect = (reason) => {
              if (this.state = 'pending') {
                  // resolve调用后，state转化为失败状态
                  this.state = 'rejected'
                  // 存储reason的原因
                  this.reason = reason
              }
          };
          try {
              // 立即执行
              executor(resolve, reject);
          } catch (err) {
              rejtect(err)
          }
      }
  }
  ```

##### 5-3  then方法

- `then`方法的第一个参数是`onFulfilled`状态的回调函数，第二个参数是`onRejected`状态的回调函数，它们都是可选的。成功有成功的值，失败有失败的原因
- 当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason
- onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数

```javascript
class Promise {
    // 构造器
    constructor(executor) {
        // 初始状态
        this.state = 'pending'
        // 成功的值
        this.value = undefined;
        // 失败原因
        this.reason = undefined
        // 成功时回调
        let resolve = (value) => {
            if (this.state = 'pending') {
                // resolve调用后，state转化为成功状态
                this.state = 'flufilled'
                // 存储value的值
                this.value = value
            }
        }
        // 失败时回调
        let rejtect = (reason) => {
            if (this.state = 'pending') {
                // resolve调用后，state转化为失败状态
                this.state = 'rejected'
                // 存储reason的原因
                this.reason = reason
            }
        };
        try {
            // 立即执行
            executor(resolve, reject);
        } catch (err) {
            rejtect(err)
        }
    }
    then(onFlufilled, onRejected) {
        if (this.state == 'fulfilled') {
            // 状态为fulfilled，执行onFulfilled，传入成功的值
            onFlufilled(this.value)
        }
        if (this.state == 'rejected') {
            // 状态为fulfilled，执行onRejected，传入失败的值
            onRejected(this.reason)
        }
    }
}
```

##### 5-4 解决异步实现

由于一个promise可以有多个then，所以存在同一个数组内。

```javascript
// 多个then的情况
let p = new Promise();
p.then();
p.then();
```

- 成功或者失败时，forEach调用它们

```javascript
class Promise {
    // 构造器
    constructor(executor) {
        // 初始状态
        this.state = 'pending'
        // 成功的值
        this.value = undefined;
        // 失败原因
        this.reason = undefined;
        // 存放成功的数组
        this.onResolvedArr = [];
        // 存放失败的数组
        this.onRejectedArr = [];
        // 成功时回调
        let resolve = (value) => {
            if (this.state = 'pending') {
                // resolve调用后，state转化为成功状态
                this.state = 'flufilled'
                // 存储value的值
                this.value = value;
                // 一旦reslove执行，调用成功的数组
                this.onResolvedArr.forEach(fn => fn())
            }
        }
        // 失败时回调
        let rejtect = (reason) => {
            if (this.state = 'pending') {
                // resolve调用后，state转化为失败状态
                this.state = 'rejected'
                // 存储reason的原因
                this.reason = reason;
                // 一旦reject执行，调用失败的数组
                this.onRejectedArr.forEach(fn => fn())
            }
        };
        try {
            // 立即执行
            executor(resolve, reject);
        } catch (err) {
            rejtect(err)
        }
    }
    then(onFlufilled, onRejected) {
        if (this.state == 'fulfilled') {
            // 状态为fulfilled，执行onFulfilled，传入成功的值
            onFlufilled(this.value)
        }
        if (this.state == 'rejected') {
            // 状态为fulfilled，执行onRejected，传入失败的值
            onRejected(this.reason)
        }
        // 当状态state为pending时
        if (this.state == 'pending') {
            this.onResolvedArr.push(() => {
                onFlufilled(this.value)
            })
            this.onRejectedArr.push(() => {
                onRejected(this.reason)
            })
        }
    }
}
```

##### 5-5 解决链式调用

**我门常常用到`new Promise().then().then()`,这就是链式调用，用来解决回调地狱**

1、为了达成链式，我们默认在第一个then里返回一个promise。就是在then里面返回一个新的promise,称为promise2：`promise2 = new Promise((resolve, reject)=>{})`

- 将这个promise2返回的值传递到下一个then中
- 如果返回一个普通的值，则将普通的值传递给下一个then中

2、当我们在第一个then中`return`了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值

onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise

- 首先，要看x是不是promise。
- 如果是promise，则取它的结果，作为新的promise2成功的结果
- 如果是普通值，直接作为promise2成功的结果
- 所以要比较x和promise2
- resolvePromise的参数有promise2（默认返回的promise）、x（我们自己`return`的对象）、resolve、reject
- resolve和reject是promise2的

```javascript
class Promise {
    // 构造器
    constructor(executor) {
        // 初始状态
        this.state = 'pending'
        // 成功的值
        this.value = undefined;
        // 失败原因
        this.reason = undefined;
        // 存放成功的数组
        this.onResolvedArr = [];
        // 存放失败的数组
        this.onRejectedArr = [];
        // 成功时回调
        let resolve = (value) => {
            if (this.state = 'pending') {
                // resolve调用后，state转化为成功状态
                this.state = 'flufilled'
                // 存储value的值
                this.value = value;
                // 一旦reslove执行，调用成功的数组
                this.onResolvedArr.forEach(fn => fn())
            }
        }
        // 失败时回调
        let rejtect = (reason) => {
            if (this.state = 'pending') {
                // resolve调用后，state转化为失败状态
                this.state = 'rejected'
                // 存储reason的原因
                this.reason = reason;
                // 一旦reject执行，调用失败的数组
                this.onRejectedArr.forEach(fn => fn())
            }
        };
        try {
            // 立即执行
            executor(resolve, reject);
        } catch (err) {
            rejtect(err)
        }
    }
    then(onFlufilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.state == 'fulfilled') {
                // 状态为fulfilled，执行onFulfilled，传入成功的值
                onFlufilled(this.value);
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                let x = onFlufilled(this.value);
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state == 'rejected') {
                // 状态为fulfilled，执行onRejected，传入失败的值
                onRejected(this.reason);
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject)
            }
            // 当状态state为pending时
            if (this.state == 'pending') {
                this.onResolvedArr.push(() => {
                    onFlufilled(this.value);
                    let x = onFlufilled(this.value);
                    resolvePromise(promise2, x, resolve, reject)
                })
                this.onRejectedArr.push(() => {
                    onRejected(this.reason);
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
        })
        return promise2;
    }
}
```

##### 5-6 完成resolvePromise函数

让不同的promise代码互相套用，叫做resolvePromise

- 如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误

```javascript
let p = new Promise(resolve => {
  resolve(0);
});
var p2 = p.then(data => {
  // 循环引用，自己等待自己完成，一辈子完不成
  return p2;
})
```

1、判断x

- **Otherwise, if x is an object or function,Let then be x.then**
- x 不能是null
- x 是普通值 直接resolve(x)
- x 是对象或者函数（包括promise），`let then = x.then` 2、当x是对象或者函数（默认promise）
- 声明了then
- 如果取then报错，则走reject()
- 如果then是个函数，则用call执行then，第一个参数是this，后面是成功的回调和失败的回调
- 如果成功的回调还是pormise，就递归继续解析 3、成功和失败只能调用一个 所以设定一个called来防止多次调用

```javascript
function resolvePromise(promise2, x, resolve, reject){
  // 循环引用报错
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') { 
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}

```

##### 5-7 解决其他问题

onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略

- onFulfilled返回一个普通的值，成功时直接等于 `value => value`
- onRejected返回一个普通的值，失败时如果直接等于 value => value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误`reason => throw err` 2、[秘籍](https://promisesaplus.com)规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
- 如果onFulfilled或onRejected报错，则直接返回reject()

```javascript
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // 返回promise，完成链式
    return promise2;
  }
}

```

