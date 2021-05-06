# Object 对象
## Object()

`Object`本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数为空（或者为`undefined`和`null`），`Object()`返回一个空对象。

```javascript
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object // true
```

上面代码的含义，是将`undefined`和`null`转为对象，结果得到了一个空对象`obj`。

`instanceof`运算符用来验证，一个对象是否为指定的构造函数的实例。`obj instanceof Object`返回`true`，就表示`obj`对象是`Object`的实例。

如果参数是原始类型的值，`Object`方法将其转为对应的包装对象的实例（参见《原始类型的包装对象》一章）。

```javascript
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true

var obj = Object('foo');
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true
```

上面代码中，`Object`函数的参数是各种原始类型的值，转换成对象就是原始类型值对应的包装对象。

如果`Object`方法的参数是一个对象，它总是返回该对象，即不用转换。

```javascript
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true
```

利用这一点，可以写一个判断变量是否为对象的函数。

```javascript
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

### Object.prototype.valueOf()

`valueOf`方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

```javascript
var obj = new Object();
obj.valueOf() === obj // true
```

上面代码比较`obj.valueOf()`与`obj`本身，两者是一样的。

`valueOf`方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法（详见《数据类型转换》一章）。

```javascript
var obj = new Object();
1 + obj // "1[object Object]"
```

上面代码将对象`obj`与数字`1`相加，这时 JavaScript 就会默认调用`valueOf()`方法，求出`obj`的值再与`1`相加。所以，如果自定义`valueOf`方法，就可以得到想要的结果。

```javascript
var obj = new Object();
obj.valueOf = function () {
  return 2;
};

1 + obj // 3
```

上面代码自定义了`obj`对象的`valueOf`方法，于是`1 + obj`就得到了`3`。这种方法就相当于用自定义的`obj.valueOf`，覆盖`Object.prototype.valueOf`。

### Object.prototype.toString()

`toString`方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

```javascript
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"
```

上面代码表示，对于一个对象调用`toString`方法，会返回字符串`[object Object]`，该字符串说明对象的类型。

字符串`[object Object]`本身没有太大的用处，但是通过自定义`toString`方法，可以让对象在自动类型转换时，得到想要的字符串形式。

```javascript
var obj = new Object();

obj.toString = function () {
  return 'hello';
};

obj + ' ' + 'world' // "hello world"
```

上面代码表示，当对象用于字符串加法时，会自动调用`toString`方法。由于自定义了`toString`方法，所以返回字符串`hello world`。

数组、字符串、函数、Date 对象都分别部署了自定义的`toString`方法，覆盖了`Object.prototype.toString`方法。

```javascript
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

上面代码中，数组、字符串、函数、Date 对象调用`toString`方法，并不会返回`[object Object]`，因为它们都自定义了`toString`方法，覆盖原始方法。

### toString() 的应用：判断数据类型

`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。

```javascript
var obj = {};
obj.toString() // "[object Object]"
```

上面代码调用空对象的`toString`方法，结果返回一个字符串`object Object`，其中第二个`Object`表示该值的构造函数。这是一个十分有用的判断数据类型的方法。

由于实例对象可能会自定义`toString`方法，覆盖掉`Object.prototype.toString`方法，所以为了得到类型字符串，最好直接使用`Object.prototype.toString`方法。通过函数的`call`方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。

```javascript
Object.prototype.toString.call(value)
```

上面代码表示对`value`这个值调用`Object.prototype.toString`方法。

不同数据类型的`Object.prototype.toString`方法返回值如下。

- 数值：返回`[object Number]`。
- 字符串：返回`[object String]`。
- 布尔值：返回`[object Boolean]`。
- undefined：返回`[object Undefined]`。
- null：返回`[object Null]`。
- 数组：返回`[object Array]`。
- arguments 对象：返回`[object Arguments]`。
- 函数：返回`[object Function]`。
- Error 对象：返回`[object Error]`。
- Date 对象：返回`[object Date]`。
- RegExp 对象：返回`[object RegExp]`。
- 其他对象：返回`[object Object]`。

这就是说，`Object.prototype.toString`可以看出一个值到底是什么类型。

```javascript
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
```

利用这个特性，可以写出一个比`typeof`运算符更准确的类型判断函数。

```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```