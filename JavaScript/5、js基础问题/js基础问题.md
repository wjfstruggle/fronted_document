# JS基础问题

```javascript
function sayHi() {
    console.log(name) // undefined
    console.log(age); // Uncaught ReferenceError: Cannot access 'age' before initialization
    var name = 'wujf'
    let age = 12;
}
sayHi();
```

- 答案是：undefined和报错 因为var 定义的变量具有变量提升的效果，但是仅仅是变量声明的提升，并未进行赋值，所以是undefined，let定义的变量不具备变量提升的效果，所以是报错的。

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1) // 333 
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1) // 012
}
```

- 答案是：333 和 012，因为JS的事件循环机制，setTimeout属于宏任务，要等到同步代码执行完之后才能执行，var在此处定义的是全局变量，因此同步代码执行完之后i已经变成了3，所以打印3个3，但是let定义的变量会形成一个块级作用域，因此是0 1 2

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter() // 20
shape.perimeter() // NAN
```

- 输出是20和NaN，因为diameter中的this指的是shape中的radius，但是perimeter由于是箭头函数所以，当我们调用 perimeter 时，this 不是指向 shape 对象，而是它的周围作用域（在例子中是 window）。

箭头函数有几个使用注意点。

（1）箭头函数没有自己的`this`对象（详见下文）。

（2）不可以当作构造函数，也就是说，不可以对箭头函数使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

上面四点中，最重要的是第一点。对于普通函数来说，内部的`this`指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的`this`对象，内部的`this`就是定义时上层作用域中的`this`。也就是说，箭头函数内部的`this`指向是固定的，相比之下，普通函数的`this`指向是可变的。

```javascript
// 箭头函数不能使用call，bind等
function myCall() {
    console.log(this)
}
const fn = ()=> console.log(this);
myCall(); // window
myCall.call({}); // {}
fn.call({}); // window
fn(); // window
```

