# this 关键字

## 涵义

`this`可以用在构造函数之中，表示实例对象。除此之外，`this`还可以用在别的场合。但不管是什么场合，`this`都有一个共同点：它总是返回一个对象。

简单说，`this`就是属性或方法“当前”所在的对象。

```javascript
this.property
```

上面代码中，`this`就代表`property`属性当前所在的对象。

下面是一个实际的例子。

```javascript
var person = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

person.describe()
// "姓名：张三"
```

上面代码中，`this.name`表示`name`属性所在的那个对象。由于`this.name`是在`describe`方法中调用，而`describe`方法所在的当前对象是`person`，因此`this`指向`person`，`this.name`就是`person.name`。

由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即`this`的指向是可变的。

只要函数被赋给另一个变量，`this`的指向就会变。

```javascript
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var name = '李四';
var f = A.describe;
f() // "姓名：李四"
```

上面代码中，`A.describe`被赋值给变量`f`，内部的`this`就会指向`f`运行时所在的对象（本例是顶层对象）。