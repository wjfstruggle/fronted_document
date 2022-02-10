# JS高级

### 一、浏览器工作原理

大家有没有深入思考过：JavaScript代码，在浏览器中是如何被执行的？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4425ce21459b4cbd86aef8a3e49230c3~tplv-k3u1fbpfcp-watermark.image?)

#### 认识浏览器的内核

不同的浏览器有不同的内核组成

- Gecko：早期被Netscape和Mozilla Firefox浏览器浏览器使用；
- Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink；
- Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用；
- Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等；
- 等等...

事实上，我们经常说的浏览器内核指的是浏览器的排版引擎：  

- 排版引擎（layout engine），也称为浏览器引擎（browser engine）、页面渲染引擎（rendering engine）或样版引擎。  

#### 浏览器渲染过程  

但是在这个执行过程中，HTML解析的时候遇到了JavaScript标签，应该怎么办呢？  

- 会停止解析HTML，而去加载和执行JavaScript代码；  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92dd0f39a0ff493cbacee5837c814d32~tplv-k3u1fbpfcp-watermark.image?)

1. 浏览器接受url开启一个网络请求线程

2. 浏览器发出一个完整的http请求

3. 服务器接收请求到后台接收请求

4. 使用http请求请求页面

5. 把请求回来的html代码解析成DOM树

6. CSS的可视化格式模型解析

7. 根据CSS属性对元素进行渲染，得到内存中的位图

8. 对位图的合成

9. 绘制页面

那么，JavaScript代码由谁来执行呢？  

- JavaScript引擎

#### 认识JavaScript引擎  

为什么需要JavaScript引擎呢？  

- 高级的编程语言都是需要转成最终的机器指令来执行的；  
- 事实上我们编写的JavaScript无论你交给浏览器或者Node执行，最后都是需要被CPU执行的；  
- 但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU所执行；  
- 所以我们需要JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行  

比较常见的JavaScript引擎有哪些呢？  

- SpiderMonkey：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）；  
- Chakra：微软开发，用于IT浏览器；  
- JavaScriptCore：WebKit中的JavaScript引擎，Apple公司开发；  
- V8：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出；  

#### 浏览器内核和JS引擎的关系  

这里我们先以WebKit为例，WebKit事实上由两部分组成的：  

- WebCore：负责HTML解析、布局、渲染等等相关的工作；  
- JavaScriptCore：解析、执行JavaScript代码；  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/961d606c9f974eef93c9fc92ef43f99b~tplv-k3u1fbpfcp-watermark.image?)

#### V8引擎的原理  

- V8是用C ++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。  
- 它实现ECMAScript和WebAssembly，并在Windows 7或更高版本，macOS 10.12+和使用x64，IA-32，
  ARM或MIPS处理器的Linux系统上运行。  
- V8可以独立运行，也可以嵌入到任何C ++应用程序中 。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/267c4fa8b67d4ab49df2de546f0f8e05~tplv-k3u1fbpfcp-watermark.image?)

#### V8引擎的架构  

- V8引擎本身的源码非常复杂，大概有超过100w行C++代码，通过了解它的架构，我们可以知道它是如何对JavaScript执行的：  
- Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；  
- Ignition是一个解释器，会将AST转换成ByteCode（字节码）  
- TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；  

**V8引擎的解析图（官方）**  

![V8](https://v8.dev/_img/scanner/overview.svg)

#### JavaScript的执行过程  

- 假如我们有下面一段代码，它在JavaScript中是如何被执行的呢？  

```js
var names = "wjf";

function foo() {
  var names = "good"
  console.log(names);
}

var num1 = 1;
var num2 = 2;
var result = num1 + num2

console.log(result);

foo();
```

**1、初始化全局对象**  

- js引擎会在执行代码之前，会在堆内存中创建一个全局对象：Global Object（简称GO）  
  - 该对象 所有的作用域（scope）都可以访问；  
  - 里面会包含Date、Array、String、Number、setTimeout、setInterval等等；  
  - 其中还有一个window属性指向自己；  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c1580ddd51e462f9edf15cd22a4414a~tplv-k3u1fbpfcp-watermark.image?)

**2、执行上下文栈（调用栈）**  

- js引擎内部有一个执行上下文栈（Execution Context Stack，简称ECS），它是用于执行代码的调用栈。  
- 那么现在它要执行谁呢？执行的是全局的代码块：  
  - 全局的代码块为了执行会构建一个 Global Execution Context（GEC）；  
  - GEC会 被放入到ECS中 执行；  
- GEC被放入到ECS中里面包含两部分内容：  
  - 第一部分：在代码执行前，在parser转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是并不会赋值；这个过程也称之为变量的作用域提升（hoisting） 
  - 第二部分：在代码执行中，对变量赋值，或者执行其他的函数；  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/316920268ca44e3695a3f4736466a894~tplv-k3u1fbpfcp-watermark.image?)

**GEC开始执行代码**  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc45eaa4b64e46038c37b69e30be9507~tplv-k3u1fbpfcp-watermark.image?)

#### 遇到函数如何执行？  

- 在执行的过程中执行到一个函数时，就会根据函数体创建一个函数执行上下文（Functional Execution Context，简称FEC），并且压入到EC Stack中。  

- FEC中包含三部分内容：  
  - 第一部分：在解析函数成为AST树结构时，会创建一个Activation Object（AO）：  AO中包含形参、arguments、函数定义和指向函数对象、定义的变量；  
  - 第二部分：作用域链：由VO（在函数中就是AO对象）和父级VO组成，查找时会一层层查找；  
  - 第三部分：this绑定的值

**FEC被放入到ECS中**  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f53074e3c309404faff76ecb7d857a4d~tplv-k3u1fbpfcp-watermark.image?)



**FEC开始执行代码**  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3cb2fa0e516415e984bc8d606500525~tplv-k3u1fbpfcp-watermark.image?)



#### 作用域提升面试题  

```js
var n = 200
function bar() {
  n = 100
}
bar();
console.log(n); // 100
```

```js
function test() {
  console.log(n1); // undefined
  var n1 = 100;
  console.log(n1); // 100
}
var n1 = 200;
test();
```

```js

var a = 100

function foo() {
  console.log(a) // undefined
  return
  var a = 200
}

foo()
```

```js
function foo() {
  var a = b = 10
  // => 转成下面的两行代码
  // var a = 10
  // b = 10
}

foo()

console.log(a) // a is not defined
console.log(b) // 10
```



### 二、JS内存管理和闭包

#### 认识内存管理  

- 不管什么样的编程语言，在代码的执行过程中都是需要给它分配内存的，不同的是某些编程语言需要我们自己手动的管理内存，某些编程语言会可以自动帮助我们管理内存  
- 不管以什么样的方式来管理内存，内存的管理都会有如下的生命周期：  
  - 第一步：分配申请你需要的内存（申请） ；
  - 第二步：使用分配的内存（存放一些东西，比如对象等）；  
  - 第三步：不需要使用时，对其进行释放；  
- 不同的编程语言对于第一步和第三步会有不同的实现：  
  - 手动管理内存：比如C、C++，包括早期的OC，都是需要手动来管理内存的申请和释放的（malloc和free函数）；  
  - 自动管理内存：比如Java、JavaScript、Python、Swift、Dart等，它们有自动帮助我们管理内存；  
- 我们可以知道JavaScript通常情况下是不需要手动来管理的 。

#### JS的内存管理  

- JS对于基本数据类型内存的分配会在执行时，直接在栈空间进行分配；  

- JS对于复杂数据类型内存的分配会在堆内存中开辟一块空间，并且将这块空间的指针返回值变量引用；  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c0b946d0b4e4dd3b84bddd814daf029~tplv-k3u1fbpfcp-watermark.image?)

#### JS的垃圾回收  

- 因为内存的大小是有限的，所以当内存不再需要的时候，我们需要对其进行释放，以便腾出更多的内存空间。  
- 在手动管理内存的语言中，我们需要通过一些方式自己来释放不再需要的内存，比如free函数：  
  - 但是这种管理的方式其实非常的低效，影响我们编写逻辑的代码的效率；  
  - 并且这种方式对开发者的要求也很高，并且一不小心就会产生内存泄露；  
- 所以大部分现代的编程语言都是有自己的垃圾回收机制：  
  - 垃圾回收的英文是Garbage Collection，简称GC；  
  - 对于那些不再使用的对象，我们都称之为是垃圾，它需要被回收，以释放更多的内存空间；  
  - 而我们的语言运行环境，比如Java的运行环境JVM，JavaScript的运行环境js引擎都会内存 垃圾回收器；  
  - 垃圾回收器我们也会简称为GC，所以在很多地方你看到GC其实指的是垃圾回收器；  
- 但是这里又出现了另外一个很关键的问题：GC怎么知道哪些对象是不再使用的呢？  

常见的GC算法 – 引用计数  

- 当一个对象有一个引用指向它时，那么这个对象的引用就+1，当一个对象的引用为0时，这个对象就可以被销毁掉；  
- 这个算法有一个很大的弊端就是会产生循环引用；  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5027109224e4472a6b1a9e4cdf5d919~tplv-k3u1fbpfcp-watermark.image?)

```js
// 引用计数存在一个很大的弊端: 循环引用
var obj1 = {fn: obj2}
var obj2 = {fn: obj1}
```

常见的GC算法 – 标记清除  

- 这个算法是设置一个根对象（root object），垃圾回收器会定期从这个根开始，找所有从根开始有引用到的对象，对于哪些没有引用到的对象，就认为是不可用的对象；  
- 这个算法可以很好的解决循环引用的问题  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93c224eb9c334834ae0b3fe72b0900c5~tplv-k3u1fbpfcp-watermark.image?)

- JS引擎比较广泛的采用的就是标记清除算法，当然类似于V8引擎为了进行更好的优化，它在算法的实现细节上也会结合一些其他的算法。  

#### JS中闭包

**JS中闭包的定义  **

- 一个普通的函数function，如果它可以访问外层作用于的自由变量，那么这个函数就是一个闭包；  
- 从广义的角度来说：JavaScript中的函数都是闭包；  
- 从狭义的角度来说：JavaScript中一个函数，如果访问了外层作用于的变量，那么它是一个闭包；  

如果我们编写了如下的代码，它一定是形成了闭包的：  

```js
function makeAddr(count) {
  return function add2(num) {
    console.log(count + num);
  }
}
var add10 = makeAddr(2)
add10(10)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cef6a053b7df4f7eab9400bfafc24315~tplv-k3u1fbpfcp-watermark.image?)

#### 闭包的执行过程  

- 那么函数继续执行呢？  
  - 这个时候makeAdder函数执行完毕，正常情况下我们的AO对象会被释放；  
  - 但是因为在0xb00的函数中有作用域引用指向了这个AO对象，所以它不会被释放掉；  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92254248d8ae4f55805a86e4fe6f8863~tplv-k3u1fbpfcp-watermark.image?)

#### 闭包的内存泄露  

- 那么我们为什么经常会说闭包是有内存泄露的呢？  
  - 在上面的案例中，如果后续我们不再使用add10函数了，那么该函数对象应该要被销毁掉，并且其引用着的父作用域AO也应该被销毁掉；  
  - 但是目前因为在全局作用域下add10变量对0xb00的函数对象有引用，而0xb00的作用域中AO（0x200）有引用，所以最终会造成这些内存都是无法被释放的；  
  - 所以我们经常说的闭包会造成内存泄露，其实就是刚才的引用链中的所有对象都是无法释放的；  
- 那么，怎么解决这个问题呢？  
  - 因为当将add10设置为null时，就不再对函数对象0xb00有引用，那么对应的AO对象0x200也就不可达了；  
  - 在GC的下一次检测中，它们就会被销毁掉；  

```js
add10 = null;
```

### 三、JS函数的this指向  

#### 为什么需要this？  

在常见的编程语言中，几乎都有this这个关键字（Objective-C中使用的是self），但是JavaScript中的this和常见的面向对象语言中的this不太一样：  

- 常见面向对象的编程语言中，比如Java、C++、Swift、Dart等等一系列语言中，this通常只会出现在类的方法中。  
- 也就是你需要有一个类，类中的方法（特别是实例方法）中，this代表的是当前调用对象。
- 但是JavaScript中的this更加灵活，无论是它出现的位置还是它代表的含义。  

我们来看一下编写一个obj的对象，有this和没有this的区别  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53a952d85f354d069389ed527232923f~tplv-k3u1fbpfcp-watermark.image?)

从打印结果上来看，有this和没有this区别不大。

#### this到底指向什么呢？  

- 我们先说一个最简单的，`this`在全局作用于下指向什么？  
  - 这个问题非常容易回答，在浏览器中测试就是指向window  
  - `node`环境下，this指向一个空对象 `{}`

```js
console.log(this); // window
var name = "wujf"
console.log(this.name); // "wujf"
console.log(window.name);// "wujf"
console.log(this); // node环境下 {} 
```

- 但是，开发中很少直接在全局作用于下去使用`this`，通常都是在**函数中使用**。  
  - 所有的函数在被调用时，都会创建一个执行上下文：  
  - 这个上下文中记录着函数的调用栈、`AO`对象等；  
  - `this`也是其中的一条记录；  

- 我们先来看一个让人困惑的问题：  
  - 定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果  

```js
// 定义一个函数
function foo() {
  console.log(this);
}
// 1、直接调用
foo(); // window

// 2、foo函数放入obj里面调用
var obj = {
  names: "wujf",
  foo:foo
}

obj.foo(); // obj对象

// 3、通过call,bind,apply绑定调用
foo.call("abc") // String {'abc'}
foo.call(123) // Number {123}
```

- 这个的案例可以给我们什么样的启示呢？  
  1. 函数在调用时，JavaScript会默认给this绑定一个值；  
  2. this的绑定和定义的位置（编写的位置）没有关系；  
  3. this的绑定和调用方式以及调用的位置有关系；  
  4. this是在运行时被绑定的；  

<u>那么this到底是怎么样的绑定规则呢？一起来学习一下吧</u> 

1. 绑定一：默认绑定；  
2. 绑定二：隐式绑定；  
3. 绑定三：显示绑定；  
4. 绑定四：new绑定；  

#### 规则一：默认绑定  

什么情况下使用默认绑定呢？独立函数调用 。

- 独立的函数调用我们可以理解成函数没有被绑定到某个对象上进行调用；  
- 我们通过几个案例来看一下，常见的默认绑定  

```js
// 案例1
function foo() {
  console.log(this); // window
}
foo()
```

```js
// 案例2
function test1() {
  console.log(this);// window
  test2()
}
function test2() {
  console.log(this);// window
  test3()
}
function test3() {
  console.log(this);// window
}
```

```js
// 案例3
function bar(fn) {
  fn()
}

var obj = {
  name:"wujf",
  bar() {
    console.log(this);// window
  }
}

bar(obj.bar)
```

#### 规则二：隐式绑定  

- 另外一种比较常见的调用方式是通过某个对象进行调用的：  
  - 也就是它的调用位置中，是通过某个对象发起的函数调用。  
- 我们通过几个案例来看一下，常见的默认绑定  

```js
// 案例1
function foo() {
  console.log(this); // obj对象
}

var obj = {
  name:"wujf",
  foo:foo
}

obj.foo();
```

```js
//案例2
function foo() {
  console.log(this); // obj1对象
}

var obj1 = {
  name:"obj1",
  foo:foo
}
var obj2 = {
  name:"obj2",
  obj1:obj1
}

obj2.obj1.foo()
```

```js
// 案例3
function foo() {
  console.log(this); // Window对象
}

var obj = {
  name:"wujf",
  foo:foo
}
var bar = obj.foo;
bar()
```

#### 规则三：显示绑定

隐式绑定有一个前提条件：  

- 必须在调用的对象内部有一个对函数的引用（比如一个属性）；  
- 如果没有这样的引用，在进行调用时，会报找不到该函数的错误；  
- 正是通过这个引用，间接的将this绑定到了这个对象上；  

如果我们不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上进行强制调用，该怎么做呢？  

- JavaScript所有的函数都可以使用call和apply方法（这个和Prototype有关）。  
- 这两个函数的第一个参数都要求是一个对象，这个对象的作用是什么呢？就是给this准备的。  
- 在调用这个函数时，会将this绑定到这个传入的对象上。  

**因为上面的过程，我们明确的绑定了this指向的对象，所以称之为 显示绑定。**  

#### call、apply、bind  

- 通过call或者apply绑定this对象  
  - 显示绑定后，this就会明确的指向绑定的对象  

```js
function foo() {
  console.log(this);
}

var obj = {
  name:"wujf"
}

foo.call(obj) // obj对象
foo.call("123") // String对象 存放时字符串'123'
foo.call(window) // window
foo.call(undefined) // window
foo.call(null) // window
```

- 如果我们希望一个函数总是显示的绑定到一个对象上，可以怎么做呢？  

```js
function foo() {
  console.log(this);
}

var obj = {
  name:"wujf",
  foo:foo
}

var bar = obj.foo.bind(obj)
bar() // obj对象
```

#### 内置函数的绑定思考  

- 有些时候，我们会调用一些JavaScript的内置函数，或者一些第三方库中的内置函数。  
  - 这些内置函数会要求我们传入另外一个函数；  
  - 我们自己并不会显示的调用这些函数，而且JavaScript内部或者第三方库内部会帮助我们执行；  
  - 这些函数中的this又是如何绑定的呢？  
- setTimeout、数组的forEach、div的点击  

```js
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
```

#### 规则四：new绑定

- JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字。  
- 使用new关键字来调用函数是，会执行如下的操作：  
  1. 创建一个全新的对象；  
  2. 这个新对象会被执行prototype连接；  
  3. 这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；  
  4. 如果函数没有返回其他对象，表达式会返回这个新对象；  

```js
function Foo(name) {
  console.log(this); //Foo {}
  this.name = name
}

var foo = new Foo("wujf");
console.log(foo); // Foo {name: 'wujf'}
```

#### 规则优先级  

- 学习了四条规则，接下来开发中我们只需要去查找函数的调用应用了哪条规则即可，但是如果一个函数调用位置应用了多条规则，优先级谁更高呢？  

1. 默认规则的优先级最低  
   - 毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this  
2. 显示绑定优先级高于隐式绑定  

```js
var obj = {
  name: "obj",
  foo: function() {
    console.log(this)
  }
}

obj.foo() // obj

// 1.call/apply的显示绑定高于隐式绑定
obj.foo.apply('abc') // String {'abc'}
obj.foo.call('abc') // String {'abc'}

// 2.bind的优先级高于隐式绑定
var bar = obj.foo.bind("cba") // String {'cba'}
bar()
```

3. new绑定优先级高于隐式绑定  

```js
var obj = {
  name: "obj",
  foo: function() {
    console.log(this) // foo {}
  }
}

// new的优先级高于隐式绑定
var f = new obj.foo()
```

4. new绑定优先级高于bind  

```js
// new的优先级高于bind
function foo() {
  console.log(this)
}

var bar = foo.bind("aaa")

var obj = new bar()
```

- new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高 
- new绑定可以和bind一起使用，new绑定优先级更高  

<u>new绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)</u>

#### this规则之外 – 忽略显示绑定  

- 我们讲到的规则已经足以应付平时的开发，但是总有一些语法，超出了我们的规则之外。  

![](http://img.duoziwang.com/2021/04/07212212113246.jpg)

- 如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：  

```js
function foo() {
  console.log(this);
}

var obj = {
  name:"wujf"
}
foo.call(window) // window
foo.call(undefined) // window
foo.call(null) // window
var bar = foo.bind(null)
bar(); // window
```

#### this规则之外 - 间接函数引用  

- 另外一种情况，创建一个函数的 间接引用，这种情况使用默认绑定规则。  
  - 赋值(obj2.foo = obj1.foo)的结果是foo函数；  
  - foo函数被直接调用，那么是默认绑定；  

```js
function foo() {
  console.log(this);
}

var obj = {
  name:"wujf",
  fn:foo
}

var obj2 = {
  name:"wujf",
}
obj.fn(); // obj对象
(obj.foo = obj.fn)(); // window
```

#### 箭头函数   

- 箭头函数是ES6之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁：  
  - 箭头函数不会绑定this、arguments属性；  
  - 箭头函数不能作为构造函数来使用（不能和new一起来使用，会抛出错误）；  
- 箭头函数不使用this的四种标准规则（也就是不绑定this），而是根据外层作用域来决定this。  

- 我们来看一个模拟网络请求的案例：  
  - 这里我使用setTimeout来模拟网络请求，请求到数据后如何可以存放到data中呢？  
  - 我们需要拿到obj对象，设置data；  
  - 但是直接拿到的this是window，我们需要在外层定义：var _this = this  
  - 在setTimeout的回调函数中使用_this就代表了obj对象  

```js
var obj = {
  data:[],
  getDataList() {
    var _this = this;
    setTimeout(function() {
      _this.data.push(new Array(10).fill("数据"))
      console.log(obj.data);
    },1000)
  }
}
obj.getDataList()
```

#### ES6箭头函数this  

- 之前的代码在ES6之前是我们最常用的方式，从ES6开始，我们会使用箭头函数：  
  - 为什么在setTimeout的回调函数中可以直接使用this呢？  
  - 因为箭头函数并不绑定this对象，那么this引用就会从上层作用于中找到对应的this  

```js
var obj = {
  data:[],
  getDataList:()=> {
    setTimeout(()=> {
      console.log(this); // window
    },1000)
  }
}
obj.getDataList()
```

```js
var obj = {
  data:[],
  getDataList() {
    setTimeout(()=> {
      console.log(this); // obj
    },1000)
  }
}
obj.getDataList()
```

#### 实现apply、call、bind  

[看这篇文章](https://juejin.cn/post/6960599454986534926#heading-9)

#### 认识arguments  

- arguments 是一个 对应于 传递给函数的参数 的 类数组(array-like)对象。  

```js
function foo (x,y,z) {
  console.log(arguments); //Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}

foo(1,2,3) 
```

- array-like意味着它不是一个数组类型，而是一个对象类型：  
  - 但是它却拥有数组的一些特性，比如说length，比如可以通过index索引来访问；  
  - 但是它却没有数组的一些方法，比如forEach、map等 ;

```js
function foo (x,y,z) {
  console.log(arguments[0]); // 1
  console.log(arguments.length); // 3
}

foo(1,2,3) 
```

#### arguments转成array  

```js
function foo (x,y,z) {
  // console.log(arguments); //Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

  // auguments 转数组

    console.log(arguments.length);

    var arr = [];
    for (let i = 0; i < arguments.length; i++) {
      arr.push(arguments[i])
    }
    console.log(arr); //[ 1, 2, 3 ]

    var arr1 = Array.prototype.slice.call(arguments) //[ 1, 2, 3 ]
    var arr2 = [].slice.call(arguments) //[ 1, 2, 3 ]
    var arr3 = Array.from(arguments) //[ 1, 2, 3 ]
    var arr4 = [...arguments] //[ 1, 2, 3 ]
    console.log(arr4);
}

foo(1,2,3) 
```

#### 箭头函数不绑定arguments  

```js
var foo = (x,y,z)=> {
  console.log(arguments); // 上层作用域是window
}

foo(1,2,3)

function bar(x,y,z) {
  return (n,m) => {
    console.log(arguments); //上层作用域是bar [Arguments] { '0': 1, '1': 2, '2': 3 }
  }
}
var fn = bar(1,2,3)
fn(4,5)
```

#### JavaScript柯里化  

- 柯里化也是属于函数式编程里面一个非常重要的概念  

- 我们先来看一下维基百科的解释：  

  - 在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化；  
  - 是把接收多个参数的函数，变成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数，而且返回结果的新函数的技术；  
  - 柯里化声称 “如果你固定某些参数，你将得到接受余下参数的一个函数”；  

  **简单总结**：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数，这个过程就称之为柯里化；  

#### 柯里化的结构  

```js
function foo(x) {
  return function(y) {
    return function(z) {
      console.log(x+ y + z);
    }
  }
}

foo(1)(2)(3)

var bar = x => y => z => x + y + z
console.log(bar(1)(2)(3));
```

那么为什么需要有柯里化呢？  

- 在函数式编程中，我们其实往往希望一个函数处理的问题尽可能的单一，而不是将一大堆的处理过程交给一个函数来处理；  
- 那么我们是否就可以将每次传入的参数在单一的函数中进行处理，处理完后在下一个函数中再使用处理后的结果;
- 比如上面的案例我们进行一个修改：传入的函数需要分别被进行如下处理  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa99160862d94c16870d4a7b92eb6cbe~tplv-k3u1fbpfcp-watermark.image?)

逻辑复用

```js
function log(date, type, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]: [${message}]`)
}

// log(new Date(), "DEBUG", "查找到轮播图的bug")
// log(new Date(), "DEBUG", "查询菜单的bug")
// log(new Date(), "DEBUG", "查询数据的bug")

// 柯里化的优化
var log = date => type => message => {
  console.log(`[${date.getHours()}:${date.getMinutes()}][${type}]: [${message}]`)
}

// 如果我现在打印的都是当前时间
var nowLog = log(new Date())
nowLog("DEBUG")("查找到轮播图的bug")
nowLog("FETURE")("新增了添加用户的功能")

var nowAndDebugLog = log(new Date())("DEBUG")
nowAndDebugLog("查找到轮播图的bug")
nowAndDebugLog("查找到轮播图的bug")
nowAndDebugLog("查找到轮播图的bug")
nowAndDebugLog("查找到轮播图的bug")


var nowAndFetureLog = log(new Date())("FETURE")
nowAndFetureLog("添加新功能~")
```

#### 柯里化函数的实现

```js
function hyCurrying(fn) {
  function curried(...args) {
    // 判断当前已经接收的参数的个数, 可以参数本身需要接受的参数是否已经一致了
    // 1.当已经传入的参数 大于等于 需要的参数时, 就执行函数
    if (args.length >= fn.length) {
      // fn(...args)
      // fn.call(this, ...args)
      return fn.apply(this, args)
    } else {
      // 没有达到个数时, 需要返回一个新的函数, 继续来接收的参数
      function curried2(...args2) {
        // 接收到参数后, 需要递归调用curried来检查函数的个数是否达到
        return curried.apply(this, [...args2,...args2])
      }
      return curried2
    }
  }
  return curried
}
```



#### this指向面试题

```js
var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;
  sss(); // window
  person.sayName(); //  person
  (person.sayName)();  //  person
  (b = person.sayName)(); // window
}

sayName();
```

```js
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }
person1.foo1(); // person1(隐式绑定)
person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)

person1.foo2(); // window(不绑定作用域,上层作用域是全局)
person1.foo2.call(person2); // window

person1.foo3()(); // window(独立函数调用)
person1.foo3.call(person2)(); // window(独立函数调用)
person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1) {}不是作用域，fn才有
person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
person1.foo4().call(person2); // person1(上层找到person1)
```

```js
var name = 'window'

function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1() // person1
person1.foo1.call(person2) // person2(显示高于隐式绑定)

person1.foo2() // person1 (上层作用域中的this是person1)
person1.foo2.call(person2) // person1 (上层作用域中的this是person1)

person1.foo3()() // window(独立函数调用)
person1.foo3.call(person2)() // window
person1.foo3().call(person2) // person2

person1.foo4()() // person1
person1.foo4.call(person2)() // person2
person1.foo4().call(person2) // person1
```

```js
var name = 'window'

function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // window
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // obj
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj
```

### 四、JS面向对象

- 对象是JavaScript中一个非常重要的概念，这是因为对象可以将多个相关联的数据封装到一起，更好的描述一个事物：  

  1. 比如我们可以描述一辆车：Car，具有颜色（color）、速度（speed）、品牌（brand）、价格（price），行驶（travel）等等；  

  2. 比如我们可以描述一个人：Person，具有姓名（name）、年龄（age）、身高（height），吃东西（eat）、跑步（run）等等；  

- 用对象来描述事物，更有利于我们将现实的事物，抽离成代码中某个数据结构：  

  1. 所以有一些编程语言就是纯面向对象的编程语言，比Java；  
  2. 你在实现任何现实抽象时都需要先创建一个类，根据类再去创建对象；  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c0c49d3c14949508eaf8ddf471d82c2~tplv-k3u1fbpfcp-watermark.image?)

#### JavaScript的面向对象  

- JavaScript其实支持多种编程范式的，包括函数式编程和面向对象编程：  
  - JavaScript中的对象被设计成一组属性的无序集合，像是一个哈希表，有key和value组成；  
  - key是一个标识符名称，value可以是任意类型，也可以是其他对象或者函数类型；  
  - 如果值是一个函数，那么我们可以称之为是对象的方法；  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7564c2f831049e281311f278788e91a~tplv-k3u1fbpfcp-watermark.image?)

#### 对属性操作的控制  

##### 1、Object.defineProperty()

[语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#语法)

```
Object.defineProperty(obj, prop, descriptor)
```

[参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#参数)

- `obj`

  要定义属性的对象。

- `prop`

  要定义或修改的属性的名称或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 。

- `descriptor`

  要定义或修改的属性描述符。

[返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#返回值)

被传递给函数的对象。

- `configurable`

  当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 **默认为** **`false`**。

- `enumerable`

  当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。 **默认为 `false`**。

数据描述符还具有以下可选键值：

- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

- `writable`

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators)改变。 **默认为 `false`。**

存取描述符还具有以下可选键值：

- `get`

  属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

- `set`

  属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

描述符默认值汇总

- 拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
- 属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。

描述符可拥有的键值

- `configurable` `enumerable` `value` `writable` `get` `set`数据描述符可以可以可以可以不可以不可以存取描述符可以可以不可以不可以可以可以

如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常。

##### 2、Object.getOwnPropertyDescriptors()

[语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#语法)

```
Object.getOwnPropertyDescriptors(obj)
```

[参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#参数)

- `obj`

  任意对象

[返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#返回值)

所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12042edfac874e94b28eb6a782ea8ca8~tplv-k3u1fbpfcp-watermark.image?)

#### 工厂模式  

- 工厂模式其实是一种常见的设计模式；  
- 通常我们会有一个工厂方法，通过该工厂方法我们可以产生想要的对象；  

```js
function createPerson(name,age,job) {
  var o = new Object();
  o.name = name
  o.age = age
  o.job = job
  o.eating = function() {
    console.log(`${this.name}再吃东西`);
  }

  o.running = function() {
    console.log(`${this.name}再跑步`);
  }
  return o;
}
var p1 = createPerson("张三","20","工人")
var p2 = createPerson("李四","22","工人")
var p3 = createPerson("王五","23","工人")

p1.eating()
```

#### 构造函数  

- 工厂方法创建对象有一个比较大的问题：我们在打印对象时，对象的类型都是Object类型  

```js
var p1 = createPerson("张三","20","工人")
var p2 = createPerson("李四","22","工人")
var p3 = createPerson("王五","23","工人")

console.log(p1); 
// {
//   name: '张三',
//   age: '20',
//   job: '工人',
//   eating: [Function (anonymous)],
// }
```

但是从某些角度来说，这些对象应该有一个他们共同的类型；  

- 我们先理解什么是构造函数？  
  - 构造函数也称之为构造器（constructor），通常是我们在创建对象时会调用的函数；  
  - 在其他面向的编程语言里面，构造函数是存在于类中的一个方法，称之为构造方法；  
  - 但是JavaScript中的构造函数有点不太一样；  

- JavaScript中的构造函数是怎么样的？  
  - 构造函数也是一个普通的函数，从表现形式来说，和千千万万个普通的函数没有任何区别；  
  - 那么如果这么一个普通的函数被使用new操作符来调用了，那么这个函数就称之为是一个构造函数；  
- 那么被new调用有什么特殊的呢？  

#### new操作符调用的作用  

- 如果一个函数被使用new操作符调用了，那么它会执行如下操作：  
  1. 在内存中创建一个新的对象（空对象）；  
  2. 这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；  
  3. 构造函数内部的this，会指向创建出来的新对象；  
  4. 执行函数的内部代码（函数体代码）；  
  5. 如果构造函数没有返回非空对象，则返回创建出来的新对象；  

```js
function Person() {}
var p = new Person();
console.log(p); // Person {}
```

- 我们来通过构造函数实现一下：  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a93de99772545949e8ea7d1a0435d45~tplv-k3u1fbpfcp-watermark.image?)

- 这个构造函数可以确保我们的对象是有Person的类型的（实际是`constructor`的属性，这个我们后续再探讨）；  

```js
let p = new Person("wujf", 20, 1.88)
console.log(p);
// Person {
//   name: 'wujf',
//   age: 20,
//   height: 1.88,
//   eating: [Function (anonymous)],
//   running: [Function (anonymous)]
// }
p.eating();
p.running();
```

- 但是构造函数就没有缺点了吗？  
  - 构造函数也是有缺点的，它在于我们需要为每个对象的函数去创建一个函数对象实例；  

#### 认识对象的原型  

- `JavaScript`当中每个对象都有一个特殊的内置属性 `[[prototype]]`，这个特殊的对象可以指向另外一个对象。  
- 那么这个对象有什么用呢？  
  - 当我们通过引用对象的属性key来获取一个`value`时，它会触发` [[Get]]`的操作；  
  - 这个操作会首先检查该属性是否有对应的属性，如果有的话就使用它；  
  - 如果对象中没有改属性，那么会访问对象`[[prototype]]`内置属性指向的对象上的属性；  
- 那么如果通过字面量直接创建一个对象，这个对象也会有这样的属性吗？如果有，应该如何获取这个属性呢？  
  - 答案是有的，只要是对象都会有这样的一个内置属性  
- 获取的方式有两种：  
  - 方式一：通过对象的 `__proto__ `属性可以获取到（但是这个是早期浏览器自己添加的，存在一定的兼容性问题）；  
  - 方式二：通过 `Object.getPrototypeOf` 方法可以获取到；  

```js
// 我们每个对象中都有一个 [[prototype]], 这个属性可以称之为对象的原型(隐式原型)

var obj = { name: "why" } // [[prototype]]
var info = {} // [[prototype]]

// 1.解释原型的概念和看一下原型
// 早期的ECMA是没有规范如何去查看 [[prototype]]

// 给对象中提供了一个属性, 可以让我们查看一下这个原型对象(浏览器提供)
// __proto__
console.log(obj.__proto__) // {}
console.log(info.__proto__) // {}

var obj = {name: "why", __proto__: {} }

// ES5之后提供的Object.getPrototypeOf
console.log(Object.getPrototypeOf(obj))


// 2.原型有什么用呢?
// 当我们从一个对象中获取某一个属性时, 它会触发 [[get]] 操作
// 1. 在当前对象中去查找对应的属性, 如果找到就直接使用
// 2. 如果没有找到, 那么会沿着它的原型去查找 [[prototype]]
// obj.age = 18
obj.__proto__.age = 18

console.log(obj.age) // 18
```

#### 函数的原型 prototype  

- 那么我们知道上面的东西对于我们的构造函数创建对象来说有什么用呢？  
  - 它的意义是非常重大的，接下来我们继续来探讨；  
- 这里我们又要引入一个新的概念：所有的函数都有一个`prototype`的属性:

```js
function Person() {}
// 所有函数都有一个属性，名字是prototype
console.log(Person.prototype); // {constructor: ƒ}
```

- 我们前面讲过`new`关键字的步骤如下：  
  - 在内存中创建一个新的对象（空对象）；  
  - 这个对象内部的`[[prototype]]`属性会被赋值为该构造函数的`prototype`属性；  
- 那么也就意味着我们通过`Person`构造函数创建出来的所有对象的`[[prototype]]`属性都指向`Person.prototype`：  

```js
function Person() {}
var person = new Person();

// 上面操作相当于会进行下面操作
var p = {}
console.log(p.__proto__);
```

```js
function Person() {}
var person1 = new Person();
var person2 = new Person();
console.log(person1.__proto__=== Person.prototype); // true
console.log(person2.__proto__=== Person.prototype); // true
console.log(person2.__proto__=== person1.__proto__); // true
```

- 创建对象的内存表现 

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5ca9d3d85c049018a4dc92b4d59d199~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3efec52af394fde831ae1fd5302699f~tplv-k3u1fbpfcp-watermark.image?)

- 赋值为新的对象

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b7d68b6ff0f4a11a533bf02f8448a92~tplv-k3u1fbpfcp-watermark.image?)

- prototype添加属性  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42bae8bab18d491b914beb0117bc4b85~tplv-k3u1fbpfcp-watermark.image?)

#### constructor属性

- 事实上原型对象上面是有一个属性的：`constructor  `
- 默认情况下原型上都会添加一个属性叫做`constructor`，这个`constructor`指向当前的函数对象；  

```js
function Person() {}
var person1 = new Person();
var person2 = new Person();
console.log(Person.prototype.constructor); // [Function: Person]
console.log(person2.__proto__.constructor); // [Function: Person]
console.log(person2.__proto__.constructor.name); // Person
console.log(Person.prototype.constructor === Person); // true
```

- 重写原型对象  

如果我们需要在原型上添加过多的属性，通常我们会重新整个原型对象：  

```js
function Person() {}
var person1 = new Person();
var person2 = new Person();
Person.prototype.name = "wujf"
Person.prototype.age = 20
Person.prototype.eating = function() {
  console.log(`${this.name}`);
}
person1.eating()
```

前面我们说过, 每创建一个函数, 就会同时创建它的prototype对象, 这个对象也会自动获取constructor属性；  而我们这里相当于给prototype重新赋值了一个对象, 那么这个新对象的constructor属性, 会指向Object构造函数, 而不是Person构造函数了  

- 创建对象 – 构造函数和原型组合  
  - 我们在上一个构造函数的方式创建对象时，有一个弊端：会创建出重复的函数，比如running、eating这些函数。
  - 那么有没有办法让所有的对象去共享这些函数呢?  
  - 可以，将这些函数放到Person.prototype的对象上即可；  

```js
function Person(name, age, height, address) {
  this.name = name
  this.age = age
  this.height = height
  this.address = address
}

Person.prototype.eating = function() {
  console.log(this.name + "在吃东西~")
}

Person.prototype.running = function() {
  console.log(this.name + "在跑步~")
}

var p1 = new Person("wujf", 18, 1.88, "广州市")
var p2 = new Person("张三", 20, 1.98, "芜湖市")

p1.eating()
p2.eating()
```

#### JavaScript中的继承  

- 面向对象有三大特性：封装、继承、多态  
  - 封装：我们前面将属性和方法封装到一个类中，可以称之为封装的过程；  
  - 继承：继承是面向对象中非常重要的，不仅仅可以减少重复代码的数量，也是多态前提（纯面向对象中）；  
  - 多态：不同的对象在执行时表现出不同的形态；  

- 那么继承是做什么呢？  
  - 继承可以帮助我们将重复的代码和逻辑抽取到父类中，子类只需要直接继承过来使用即可。  

**JavaScript原型链机制实现继承**

- 在真正实现继承之前，我们先来理解一个非常重要的概念：<u>原型链</u> 。
- 我们知道，从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上面获取：  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45f13f77367840b6a0aad7945c5538ba~tplv-k3u1fbpfcp-watermark.image?)

**Object的原型**  

- 那么什么地方是原型链的尽头呢？比如第三个对象是否也是有原型__proto__属性呢？  

```js
console.log(obj.__proto__.__proto__.__proto__.__proto__); // [Object: null prototype] {}
```

- 我们会发现它打印的是 [Object: null prototype] {}  
  - 事实上这个原型就是我们最顶层的原型了  
  - 从Object直接创建出来的对象的原型都是 [Object: null prototype] {}。  
- [Object: null prototype] {} 原型有什么特殊吗？  
  - 特殊一：该对象有原型属性，但是它的原型属性已经指向的是null，也就是已经是顶层原型了；  
  - 特殊二：该对象上有很多默认的属性和方法；  

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e16653b8b88b47aabeb1a6846ddbb5af~tplv-k3u1fbpfcp-watermark.image?)

**原型链关系的内存图**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e9c3528741143f48981504b648deeac~tplv-k3u1fbpfcp-watermark.image?)

**Object是所有类的父类**

- 从我们上面的Object原型我们可以得出一个结论：原型链最顶层的原型对象就是Object的原型对象

```js
function Person(name,age) {
  this.name = name;
  this.age = age;
}

Person.prototype.running = function() {
  console.log(`${this.name}: 在running`);
}

var p = new Person("why",18)
p.running()
console.log(p);
console.log(p.toString());
console.log(p.valueOf());
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bd718c25bd54d08b5c37a05d71aebf7~tplv-k3u1fbpfcp-watermark.image?)



### 五、ES6~ES12常用知识点

### 六、模块化

### 七、DOM，BOM操作

### 八、防抖节流-深拷贝-事件总线

