### 1.变量转字符串

将值转换为字符串是一个非常常见的需求，在Javascript中，有两个函数将值转换为字符串：

- `String()`
- `JSON.stringify()`

这两个功能具有不同的机制，请看下面代码：

```js
console.log(String(null)); // null
console.log(JSON.stringify(null)); // null

console.log(String(undefined)); // "undefined" 这里是字符串
console.log(JSON.stringify(undefined)); // undefined 这里是变量

console.log(String("abc")); // abc
console.log(JSON.stringify("abc")); // "\"abc\""

console.log(String({ key: "value" })); // [object Object]
console.log(JSON.stringify({ key: "value" })); // {"key":"value"}

console.log(String([1, 2, 3])); // "1,2,3"
console.log(JSON.stringify([1, 2, 3])); // "[1,2,3]"

const obj = {
    title: "devpoint",
    toString() {
        return "obj";
    },
};
console.log(String(obj)); // "[object Object]"
console.log(JSON.stringify(obj)); // {"title":"devpoint"}
```

从上面输出结果来看，两个方法将对象转为字符串机制存在差异，如何选择呢？

- 实际开发中我们需要将`null`和`undefined`转换为字符串时，经常是希望它返回一个空字符串。
- 当需要将一个数组和一个普通对象转换为字符串时，经常使用`JSON.stringify`。
- 如果需要对象的`toString`方法被重写，则需要使用String()。
- 在其他情况下，使用`String()`将变量转换为字符串。

为了满足以上条件，Vue源码的实现如下：

```js
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}
function toString(val) {
    if (val === null || val === undefined) return "";
    if (Array.isArray(val)) return JSON.stringify(val);
    if (isPlainObject(val) && val.toString === Object.prototype.toString)
        return JSON.stringify(val);
    return String(val);
}

const obj = {
    title: "devpoint",
    toString() {
        return "obj";
    },
};
console.log(toString(obj)); // obj
console.log(toString([1, 2, 3])); // [1, 2, 3]
console.log(toString(undefined)); // ""
console.log(toString(null)); // ""
```

### 2.普通对象

`Object.prototype.toString`允许将对象转换为字符串。对于普通对象，当调用此方法时，总是返回`[object object]`。

```js
const runToString = (obj) => Object.prototype.toString.call(obj);
console.log(runToString({})); // [object Object]
console.log(runToString({ title: "devpoint" })); // [object Object]
console.log(runToString({ title: "devpoint", author: { name: "devpoint" } })); // [object Object]
```

类似上面这种对象我们称之为普通对象。

在Javascript中还有一些特殊的对象，如`Array`、`String`和`RegExp`，它们在Javascript引擎中具有特殊的设计。当它们调用`Object.prototype.toString`方法时，会返回不同的结果。

```js
const runToString = (obj) => Object.prototype.toString.call(obj);
console.log(runToString(["devpoint", 2021])); // [object Array]
console.log(runToString(new String("devpoint"))); // [object String]
console.log(runToString(/devpoint/)); // [object RegExp]
复制代码
```

为了区分特殊设计对象和普通对象，可以用下面的函数来实现。

```js
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}
```

### 3.once

很多时候，我们希望一个函数只执行一次。如果多次调用该函数，则只会执行第一次。

```js
function once(fn) {
    let called = false;
    return function () {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}

function launchRocket() {
    console.log("我已经执行了");
}
const launchRocketOnce = once(launchRocket);
launchRocketOnce();
launchRocketOnce();
launchRocketOnce();
```

