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

**通过原型链实现继承**  

- 如果我们现在需要实现继承，那么就可以利用原型链来实现了：  
  - 目前stu的原型是p对象，而p对象的原型是Person默认的原型，里面包含running等函数；  

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e43f349fb514f51b0ac5d2ef6722078~tplv-k3u1fbpfcp-watermark.image?)

- 但是目前有一个很大的弊端：某些属性其实是保存在p对象上的；  
  - 第一，我们通过直接打印对象是看不到这个属性的；  
  - 第二，这个属性会被多个对象共享，如果这个对象是一个引用类型，那么就会造成问题  
  - 第三，不能给Person传递参数，因为这个对象是一次性创建的（没办法定制化）；  

```js
function Person(name, age, friends) {
  // this = stu
  this.name = name
  this.age = age
  this.friends = friends
}
Person.prototype.eating = function() {
  console.log(this.name + " eating~")
}
// 子类: 特有属性和方法
function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends)
  // this.name = name
  // this.age = age
  // this.friends = friends
  this.sno = 111
}
var p = new Person()
Student.prototype = p
Student.prototype.studying = function() {
  console.log(this.name + " studying~")
}
// name/sno
var stu = new Student("why", 18, ["kobe"], 111)
// console.log(stu.name)
// stu.eating()
// stu.studying()


// 原型链实现继承已经解决的弊端
// 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
console.log(stu)

// 2.第二个弊端: 创建出来两个stu的对象
var stu1 = new Student("why", 18, ["lilei"], 111)
var stu2 = new Student("kobe", 30, ["james"], 112)

// // 直接修改对象上的属性, 是给本对象添加了一个新属性
// stu1.name = "kobe"
// console.log(stu2.name)

// // 获取引用, 修改引用中的值, 会相互影响
stu1.friends.push("lucy")

console.log(stu1.friends)
console.log(stu2.friends)

// // 3.第三个弊端: 在前面实现类的过程中都没有传递参数
// var stu3 = new Student("lilei", 112)



// 强调: 借用构造函数也是有弊端:
// 1.第一个弊端: Person函数至少被调用了两次
// 2.第二个弊端: stu的原型对象上会多出一些属性, 但是这些属性是没有存在的必要
```

**借用构造函数继承**  

- 为了解决原型链继承中存在的问题，开发人员提供了一种新的技术: constructor stealing(有很多名称: 借用构造函数或者称之为经典继承或者称之为伪造对象)：  
- 借用继承的做法非常简单：在子类型构造函数的内部调用父类型构造函数  
  - 因为函数可以在任意的时刻被调用；  
  - 因此通过apply()和call()方法也可以在新创建的对象上执行构造函数；  

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/611e04815faf4f8f95cacac7b5c58f8e~tplv-k3u1fbpfcp-watermark.image?)

[ES6 class语法](https://es6.ruanyifeng.com/#docs/class)

### 五、ES6~ES12常用知识点

#### 1、let 和 const命令

> 基本用法

- 在ES5中我们声明变量都是使用的`var`关键字，从ES6开始新增了两个关键字可以声明变量：`let、const  `
- let关键字：let和var是没有太大的区别的，都是用于声明一个变量  
- const关键字：const关键字是constant的单词的缩写，表示常量、衡量的意思；  它表示保存的数据一旦被赋值，就不能被修改；  

与var的区别：

- var有变量提升，有初始化提升，值可变
- let有变量提升，没有初始化提升，值可变
- const有变量提升，没有初始化提升，值不可变，但如果是定义对象，则属性可变

`暂时性死区`问题说明：其实`let和const`是有变量提升的，但是没有初始化提升：

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

- 块级作用域的应用  
  - 我来看一个实际的案例：获取多个按钮监听点击  

  ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e9c8accf510469c9315d99172a022bc~tplv-k3u1fbpfcp-watermark.image?)

  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07bac2b83ddc43f891d402f8f42d50ca~tplv-k3u1fbpfcp-watermark.image?)

#### 2、变量的解构赋值

> 基本用法

- 数组的解构

```javascript
let [a, b, c] = [1, 2, 3];
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

如果解构不成功，变量的值就等于`undefined`。

```javascript
let [foo] = [];
let [bar, foo] = [1];
```

- 对象的解构

```js
let {obj1, obj2} = {obj1:"obj1对象",obj2:"obj2对象"}
```

- 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

### 2、默认参数

开发中你曾遇到过这样的问题，如果参数不传进来，你就设置默认参数

```js
function fn (name, age) {
  var name = name || '林三心'
  var age = age || 18
  console.log(name, age)
}
fn() // 林三心 18
```

但是这么写确实不优雅，可以使用ES6的默认参数

```js
function fn (name = '林三心', age = 18) {
  console.log(name, age)
}
fn() // 林三心 18
fn('sunshine', 22) // sunshine 22
```

### 3、扩展运算符

曾经的我，想要拼接多个数组，我只能这么做

```js
const arr1 = [1, 2, 4]
const arr2 = [4, 5, 7]
const arr3 = [7, 8, 9]

const arr = arr1.concat(arr2).concat(arr3)
[
  1, 2, 4, 4, 5,
  7, 7, 8, 9
]
```

现在的我，可以更优雅地进行拼接

```js
const arr1 = [1, 2, 4]
const arr2 = [4, 5, 7]
const arr3 = [7, 8, 9]

const arr = [...arr1, ...arr2, ...arr3]
[
  1, 2, 4, 4, 5,
  7, 7, 8, 9
]
```

### 4、剩余参数

大家可能遇到过这种问题，一个函数，传入参数的个数是不确定的，这就可以用ES6的剩余参数

```js
function fn (name, ...params) {
  console.log(name)
  console.log(params)
}
fn ('林三心', 1, 2) // 林三心 [ 1, 2 ]
fn ('林三心', 1, 2, 3, 4, 5) // 林三心 [ 1, 2, 3, 4, 5 ]
```

### 5、模板字符串

以前的我，拼接字符串只能这么做

```js
const name = '林三心'
const age = '22'

console.log(name + '今年' + age + '岁啦') // 林三心今年22岁啦
```

现在我可以这么做，会更优雅

```js
const name = '林三心'
const age = '22'

console.log(`${name}今年${age}岁啦`) // 林三心今年22岁啦
```

### 6、Object.keys

可以用来获取对象的key的集合，进而可以获得对应key的value

```js
const obj = {
  name: '林三心',
  age: 22,
  gender: '男'
}

const keys = Object.keys(obj)
console.log(keys) // [ 'name', 'age', 'gender' ]
```

### 7、箭头函数

以前我们使用普通函数

```js
function fn () {}

const fn = function () {}
```

ES6新加了`箭头函数`

```js
const fn = () => {}

// 如果只有一个参数，可以省略括号
const fn = name => {}

// 如果函数体里只有一句return
const fn = name => {
    return 2 * name
}
// 可简写为
const fn = name => 2 * name
// 如果返回的是对象
const fn = name => ({ name: name })
```

普通函数和箭头函数的区别：

- 1、箭头函数不可作为构造函数，不能使用new
- 2、箭头函数没有自己的this
- 3、箭头函数没有arguments对象
- 4、箭头函数没有原型对象

### 8、Array.prototype.forEach

ES6新加的数组遍历方法

```js
const eachArr = [1, 2, 3, 4, 5]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
eachArr.forEach((item, index, arr) => {
  console.log(item, index, arr)
})
1 0 [ 1, 2, 3, 4, 5 ]
2 1 [ 1, 2, 3, 4, 5 ]
3 2 [ 1, 2, 3, 4, 5 ]
4 3 [ 1, 2, 3, 4, 5 ]
5 4 [ 1, 2, 3, 4, 5 ]
```

### 9、Array.prototype.map

常用于返回一个处理过后的新数组

```js
const mapArr = [1, 2, 3, 4, 5]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，对每一个元素进行翻倍
const mapArr2 = mapArr.map((num, index, arr) => 2 * num)
console.log(mapArr2)
[ 2, 4, 6, 8, 10 ]
```

### 10、Array.prototype.filter

顾名思义，用来过滤的方法

```js
const filterArr = [1, 2, 3, 4, 5]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，返回大于3的集合
const filterArr2 = filterArr.filter((num, index, arr) => num > 3)
console.log(filterArr2)
[ 4, 5 ]
```

### 11、Array.prototype.some

some，意思就是只要有一个是真，那就返回真

```js
const someArr = [false, true, false, true, false]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，只要有一个为true，就返回true，一个都true都没有，就返回false
const someArr2 = someArr.some((bol, index, arr) => bol)
console.log(someArr2)
true
```

### 12、Array.prototype.every

every跟some是相反的，some是只要有一个就行，every是要所有为真才返回真

```js
const everyArr = [false, true, false, true, false]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数，需要所有为true，才返回true，否则返回false
const everyArr2 = everyArr.every((bol, index, arr) => bol)
console.log(everyArr2)
```

### 13、Array.prototype.reduce

- 第一个参数callback函数： pre为上次return的值，next为数组的本次遍历的项
- 第二个参数为初始值，也是第一个pre

举两个例子：

```js
// 计算 1 + 2 + 3 + 4 + 5
const reduceArr = [1, 2, 3, 4, 5]
const sum = reduceArr.reduce((pre, next) => {
  return pre + next
}, 0)
console.log(sum) // 15

// 统计元素出现个数
const nameArr = ['林三心', 'sunshine_lin', '林三心', '林三心', '科比']
const totalObj = nameArr.reduce((pre, next) => {
  if (pre[next]) {
    pre[next]++
  } else {
    pre[next] = 1
  }
  return pre
}, {})
console.log(totalObj) // { '林三心': 3, sunshine_lin: 1, '科比': 1 }

```

### 14、对象属性同名简写

以前同名属性需要这么写

```js
const name = '林三心'
const age = '22'

const obj = {
  name: name,
  age: age
}

console.log(obj) // { name: '林三心', age: '22' }
```

ES6新增语法，只需这么写

```js
const name = '林三心'
const age = '22'

// 属性同名可简写
const obj = {
  name,
  age
}

console.log(obj) // { name: '林三心', age: '22' }
```

### 15、Promise

`Promise`，中文名为`承诺`，承诺在哪呢？承诺在，一旦他的状态改变，就不会再改。这里就介绍基本使用，如果想要深入理解如何使用，请看我的另一篇文章[看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)

看看基本使用

- 成功状态

```js
function requestData () {
  // 模拟请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('林三心')
    }, 1000)
  })
}

requestData().then(res => {
  console.log(res) // 一秒钟后输出 '林三心'
}, err => {
  console.log(err)
})
```

- 失败状态

```js
function requestData () {
  // 模拟请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('错误啦')
    }, 1000)
  })
}

requestData().then(res => {
  console.log(res)
}, err => {
  console.log(err) // 一秒钟后输出 '错误啦'
})
```

- ```
  all
  ```

  方法

  - 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  - 如果所有Promise都成功，则返回成功结果数组
  - 如果有一个Promise失败，则返回这个失败结果

```js
// 如果全都为成功
function fn(time) {
  return new Promise((resolve, reject) => {
    console.log(88)
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}

Promise.all([fn(2000), fn(3000), fn(1000)]).then(res => {
  // 3秒后输出 [ '2000毫秒后我成功啦！！！', '3000毫秒后我成功啦！！！', '1000毫秒后我成功啦！！！' ]
  console.log(res) 
}, err => {
  console.log(err)
})



// 如果有一个失败
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.all([fn(2000, true), fn(3000), fn(1000, true)]).then(res => {
  console.log(res)
}, err => {
  console.log(err) // 3秒后输出 '3000毫秒后我失败啦！！！'
})
```

- ```
  race
  ```

  方法

  - 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
  - 哪个Promise最快得到结果，就返回那个结果，无论成功失败

```js
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.race([fn(2000, true), fn(3000), fn(1000)]).then(res => {
  console.log(res)
}, err => {
  console.log(err) // 1秒后输出
})
```

### 16、class

以前咱们使用构造函数生成对象，这么做

```js
function Person(name) {
  this.name = name
}

Person.prototype.sayName = function () {
  console.log(this.name)
}

const kobe = new Person('科比')
kobe.sayName() // 科比
```

而有了ES6的`class`可以这么做

```js
class Person {
  constructor(name) {
    // 构造器
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }
}

const kobe = new Person('科比')
kobe.sayName() // 科比
```

值得一提的是，`class`本质也是`function`，`class`是`function`的`语法糖`

```js
class Person {}

console.log(typeof Person) // function
```

除了以上，还需要知道class的以下知识点

静态属性和静态方法，使用`static`定义的属性和方法只能class自己用，实例用不了

```js
class Person {
  constructor(name) {
    this.name = name
  }

  static age = 22

  static fn() {
    console.log('哈哈')
  }
}
console.log(Person.age) // 22
Person.fn() // 哈哈

const sunshine_lin = new Person('林三心')
console.log(sunshine_lin.age) // undefined
sunshine_lin.fn() // fn is not a function
```

`extend`继承

```js
class Animal {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

class Cat extends Animal {
  say() {
    console.log(this.name, this.age)
  }
}

const cat = new Cat('ketty', 5) // 继承了Animal的构造器
cat.say() // ketty 5

```

### 17、解构赋值

以前想提取对象里的属性需要这么做

```js
const obj = {
  name: '林三心',
  age: 22,
  gender: '男'
}

const name = obj.name
const age = obj.age
const gender = obj.gender
console.log(name, age, gender) // 林三心 22 男
```

ES6新增了解构赋值的语法

```js
const obj = {
  name: '林三心',
  age: 22,
  gender: '男',
  doing: {
    morning: '摸鱼',
    afternoon: '摸鱼',
    evening: 'sleep'
  }
}

const { name, age, gender } = obj
console.log(name, age, gender) // 林三心 22 男

// 解构重名
const { name: myname } = obj
console.log(myname) // 林三心

// 嵌套解构
const { doing: { evening } } = obj
console.log(evening) // sleep
```

也可以进行数组的解构

```js
const arr = [1, 2, 3]

const [a, b, c] = arr
console.log(a, b, c) // 1 2 3

// 默认赋值
const [a, b, c, d = 5] = arr
console.log(a, b, c, d) // 1 2 3 5

// 乱序解构
const { 1: a, 0: b, 2: c } = arr
console.log(a, b, c) // 2 1 3
```

### 18、find 和 findIndex

- find：找到返回被找元素，找不到返回undefined
- findIndex：找到返回被找元素索引，找不到返回-1

```
const findArr = [
  { name: '科比', no: '24' },
  { name: '罗斯', no: '1' },
  { name: '利拉德', no: '0' }
]

const kobe = findArr.find(({ name }) => name === '科比')
const kobeIndex = findArr.findIndex(({ name }) => name === '科比')
console.log(kobe) // { name: '科比', no: '24' }
console.log(kobeIndex) // 0
```

### 19、for of 和 for in

- for in ：遍历方法，可遍历对象和数组
- for of ：遍历方法，只能遍历数组，不能遍历非iterable对象

先看for in：

```js
const obj = { name: '林三心', age: 22, gender: '男' }
const arr = [1, 2, 3, 4, 5]

for(let key in obj) {
  console.log(key)
}
name
age
gender

for(let index in arr) {
  console.log(index)
}
0 1 2 3 4
```

再看 for of：

```js
for(let item of arr) {
  console.log(item)
}
1 2 3 4 5
```

### 20、Set 和 Map

- Set

先说说`Set`的基本用法

```js
// 可不传数组
const set1 = new Set()
set1.add(1)
set1.add(2)
console.log(set1) // Set(2) { 1, 2 }

// 也可传数组
const set2 = new Set([1, 2, 3])
// 增加元素 使用 add
set2.add(4)
set2.add('林三心')
console.log(set2) // Set(5) { 1, 2, 3, 4, '林三心' }
// 是否含有某个元素 使用 has
console.log(set2.has(2)) // true
// 查看长度 使用 size
console.log(set2.size) // 5
// 删除元素 使用 delete
set2.delete(2)
console.log(set2) // Set(4) { 1, 3, 4, '林三心' }
```

再说说`Set`的不重复性

```js
// 增加一个已有元素，则增加无效，会被自动去重
const set1 = new Set([1])
set1.add(1)
console.log(set1) // Set(1) { 1 }

// 传入的数组中有重复项，会自动去重
const set2 = new Set([1, 2, '林三心', 3, 3, '林三心'])
console.log(set2) // Set(4) { 1, 2, '林三心', 3 }
Set`的不重复性中，要注意`引用数据类型和NaN
// 两个对象都是不同的指针，所以没法去重
const set1 = new Set([1, {name: '林三心'}, 2, {name: '林三心'}])
console.log(set1) // Set(4) { 1, { name: '林三心' }, 2, { name: '林三心' } }


// 如果是两个对象是同一指针，则能去重
const obj = {name: '林三心'}
const set2 = new Set([1, obj, 2, obj])
console.log(set2) // Set(3) { 1, { name: '林三心' }, 2 }

咱们都知道 NaN !== NaN，NaN是自身不等于自身的，但是在Set中他还是会被去重
const set = new Set([1, NaN, 1, NaN])
console.log(set) // Set(2) { 1, NaN }
```

利用Set的不重复性，可以实现数组去重

```js
const arr = [1, 2, 3, 4, 4, 5, 5, 66, 9, 1]

// Set可利用扩展运算符转为数组哦
const quchongArr = [...new Set(arr)]
console.log(quchongArr) // [1,  2, 3, 4, 5, 66, 9]
```

- Map

```
Map`对比`object`最大的好处就是，key不受`类型限制
// 定义map
const map1 = new Map()
// 新增键值对 使用 set(key, value)
map1.set(true, 1)
map1.set(1, 2)
map1.set('哈哈', '嘻嘻嘻')
console.log(map1) // Map(3) { true => 1, 1 => 2, '哈哈' => '嘻嘻嘻' }
// 判断map是否含有某个key 使用 has(key)
console.log(map1.has('哈哈')) // true
// 获取map中某个key对应的value 使用 get(key)
console.log(map1.get(true)) // 2
// 删除map中某个键值对 使用 delete(key)
map1.delete('哈哈')
console.log(map1) // Map(2) { true => 1, 1 => 2 }

// 定义map，也可传入键值对数组集合
const map2 = new Map([[true, 1], [1, 2], ['哈哈', '嘻嘻嘻']])
console.log(map2) // Map(3) { true => 1, 1 => 2, '哈哈' => '嘻嘻嘻' }
```

## ES7

### 21、includes

传入元素，如果数组中能找到此元素，则返回true，否则返回false

```js
const includeArr = [1, 2 , 3, '林三心', '科比']

const isKobe = includeArr.includes('科比')
console.log(isKobe) // true
```

跟indexOf很像，但还是有区别的

```js
const arr = [1, 2, NaN]

console.log(arr.indexOf(NaN)) // -1  indexOf找不到NaN
console.log(arr.includes(NaN)) // true includes能找到NaN
```

### 22、求幂运算符

以前求幂，我们需要这么写

```js
const num = Math.pow(3, 2) // 9
```

ES7提供了求幂运算符：`**`

```js
const num = 3 ** 2 // 9
```

## ES8

### 23、Object.values

可以用来获取对象的value的集合

```js
const obj = {
  name: '林三心',
  age: 22,
  gender: '男'
}

const values = Object.values(obj)
console.log(values) // [ '林三心', 22, '男' ]
```

### 24、Object.entries

可以用来获取对象的键值对集合

```js
const obj = {
  name: '林三心',
  age: 22,
  gender: '男'
}

const entries = Object.entries(obj)
console.log(entries) 
// [ [ 'name', '林三心' ], [ 'age', 22 ], [ 'gender', '男' ] ]
```

### 25、async/await

这个是很常用的语法了，我的理解就是：**以同步方式执行异步操作**

我们平时可能会遇到这种场景，接口一，请求到数据一，而数据一被当做请求二的参数去请求数据二，我们会用Promise这么做

```js
function fn() {
  // 模拟第一次请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  }).then(res => {
    // 模拟第二次请求
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // 拿第一次请求的数据去乘10，当做第二次请求的数据
        resolve(res * 10)
      }, 2000)
    }).then(sres => {
      console.log(sres)
    })

  })
}
fn() // 1 + 2 = 3 3秒后输出 50
```

这样的嵌套是不美观的，如果有很多个接口，那就会嵌套很多层，此时我们可以使用async/await来以同步方式执行异步，注意以下几点：

- await只能在async函数里使用
- await后面最好接Promise，如果后面接的是普通函数则会直接执行
- async函数返回的是一个Promise

```js
function fn1 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  })
}

function fn2 (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data * 10)
    }, 2000)
  })
}

async function req () {
  // 同步方式执行异步，像排队一样
  const data1 = await fn1() // 等待1秒后返回数据再往下执行
  const data2 = await fn2(data1) // 拿data1去请求2秒后，往下走
  console.log(data2) // 总共3秒后 输出 50
}
req()
```

## ES9

### 26、for await of

我们来看以下场景哈

```js
function fn (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}

fn(3000).then(res => console.log(res))
fn(1000).then(res => console.log(res))
fn(2000).then(res => console.log(res))

结果是

1000毫秒后我成功啦！！！
2000毫秒后我成功啦！！！
3000毫秒后我成功啦！！！
```

但是我想要这个结果

```js
3000毫秒后我成功啦！！！
1000毫秒后我成功啦！！！
2000毫秒后我成功啦！！！
```

第一时间我们肯定想到的是`async/await`

```js
function fn (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}

async function asyncFn () {
  // 排队
  const data1 = await fn(3000)
  console.log(data1) // 3秒后 3000毫秒后我成功啦！！！
  const data2 = await fn(1000)
  console.log(data2) // 再过1秒 1000毫秒后我成功啦！！！
  const data3 = await fn(2000)
  console.log(data3) // 再过2秒 2000毫秒后我成功啦！！！
}
```

但是上面代码也是有缺点的，如果有几十个，那不是得写几十个await，有没有一种方法可以通过循环来输出呢？

```js
function fn (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}

async function asyncFn () {
  const arr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)]
  for await (let x of arr) {
    console.log(x)
  }
}

asyncFn()
3000毫秒后我成功啦！！！
1000毫秒后我成功啦！！！
1000毫秒后我成功啦！！！
2000毫秒后我成功啦！！！
500毫秒后我成功啦！！！
```

### 27、Promise.finally

新增的Promise方法，无论失败或者成功状态，都会执行这个函数

```js
// cheng
new Promise((resolve, reject) => {
  resolve('成功喽')
}).then(
  res => { console.log(res) },
  err => { console.log(err) }
).finally(() => { console.log('我是finally') })

new Promise((resolve, reject) => {
  reject('失败喽')
}).then(
  res => { console.log(res) },
  err => { console.log(err) }
).finally(() => { console.log('我是finally') })
```

## ES10

### 28、Array.flat

有一个二维数组，我想让他变成一维数组：

```js
const arr = [1, 2, 3, [4, 5, 6]]

console.log(arr.flat()) // [ 1, 2, 3, 4, 5, 6 ]
```

还可以传参数，参数为降维的次数

```js
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]]

console.log(arr.flat(2))
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
```

如果传的是一个无限大的数字，那么就实现了多维数组(无论几维)降为一维数组

```js
const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]]

console.log(arr.flat(Infinity))
[
   1,  2, 3, 4,  5,
   6,  7, 8, 9, 10,
   11, 12
]
```

### 29、Array.flatMap

现在给你一个需求

```js
let arr = ["科比 詹姆斯 安东尼", "利拉德 罗斯 麦科勒姆"];
```

将上面数组转为

```js
[ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]
```

第一时间想到`map + flat`

```js
console.log(arr.map(x => x.split(" ")).flat());
// [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]
```

`flatMap`就是`flat + map`，一个方法顶两个

```js
console.log(arr.flatMap(x => x.split(" ")));
// [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]
```

### 30、BigInt

`BigInt`是ES10新加的一种JavaScript数据类型，用来表示表示大于 `2^53 - 1` 的整数，`2^53 - 1`是ES10之前，JavaScript所能表示最大的数字

```js
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// 9007199254740991n

const hugeString = BigInt("9007199254740991");
// 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");
// 9007199254740991n

const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");
// 9007199254740991n
```

哦对了，既然是JavaScript新的数据类型，那他的`typeof`是啥？

```js
const bigNum = BigInt(1728371927189372189739217)
console.log(typeof bigNum) // bigint
```

所以以后面试官问你JavaScript有多少种数据类型，别傻傻答6种了，要答8种，把ES6的`Symbol`和ES10的`BigInt`也加上去

### 31、Object.fromEntries

前面ES8的`Object.entries`是把`对象转成键值对数组`，而`Object.fromEntries`则相反，是把`键值对数组转为对象`

```js
const arr = [
  ['name', '林三心'],
  ['age', 22],
  ['gender', '男']
]

console.log(Object.fromEntries(arr)) // { name: '林三心', age: 22, gender: '男' }
```

他还有一个用处，就是把`Map转为对象`

```js
const map = new Map()
map.set('name', '林三心')
map.set('age', 22)
map.set('gender', '男')

console.log(map) // Map(3) { 'name' => '林三心', 'age' => 22, 'gender' => '男' }

const obj = Object.fromEntries(map)
console.log(obj) // { name: '林三心', age: 22, gender: '男' }
```

### 32、String.trimStart && String.trimEnd

咱们都知道JavaScript有个trim方法，可以清除字符串首尾的空格

```js
const str = '    林三心    '
console.log(str.trim()) // '林三心'
```

trimStart和trimEnd用来单独去除字符串的首和尾的空格

```js
const str = '    林三心    '

// 去除首部空格
console.log(str.trimStart()) // '林三心   '
// 去除尾部空格
console.log(str.trimEnd()) // '   林三心'
```

## ES11

### 33、Promise.allSettled

ES11新增的Promise的方法

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 把每一个Promise的结果，集合成数组，返回

```js
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.allSettled([fn(2000, true), fn(3000), fn(1000)]).then(res => {
  console.log(res)
  // 3秒后输出 
  [
  { status: 'fulfilled', value: '2000毫秒后我成功啦！！！' },
  { status: 'rejected', reason: '3000毫秒后我失败啦！！！' },
  { status: 'rejected', reason: '1000毫秒后我失败啦！！！' }
]
})

```

### 34、?. 和 ??

- 先说说`?.`，中文名为`可选链`

比如我们需要一个变量，是数组且有长度，才做某些操作

```js
const list = null
// do something
if (list && list.length) {
  // do something
}

// 使用可选链
const list = null
// do something
if (list?.length) {
  // do something
}
```

比如有一个对象，我要取一个可能不存在的值，甚至我们都不确定obj是否存在

```js
const obj = {
  cat: {
    name: '哈哈'
  }
}
const dog = obj && obj.dog && obj.dog.name // undefined

// 可选链
const obj = {
  cat: {
    name: '哈哈'
  }
}
const dog = obj?.dog?.name // undefined
```

比如有一个数组，我不确定它存不存在，存在的话就取索引为1的值

```js
const arr = null
// do something
const item = arr && arr[1]

// 可选链
const arr = null
// do something
const item = arr?.[1]
```

比如有一个函数，我们不确定它存不存在，存在的话就执行它

```js
const fn = null
// do something
const res = fn && fn()

// 可选链
const fn = null
// do something
const res = fn?.()
```

- 再说说`??`，中文名为`空位合并运算符`

请看以下代码，咱们使用`||`运算符，只要左边是`假值`，就会返回右边的数据

```js
const a = 0 || '林三心' // 林三心
const b = '' || '林三心' // 林三心
const c = false || '林三心' // 林三心
const d = undefined || '林三心' // 林三心
const e = null || '林三心' // 林三心
```

而`??`和`||`最大的区别是，在`??`这，只有`undefined和null`才算假值

```js
const a = 0 ?? '林三心' // 0
const b = '' ?? '林三心' // ''
const c = false ?? '林三心' // false
const d = undefined ?? '林三心' // 林三心
const e = null ?? '林三心' // 林三心
```

## ES12

### 35、Promise.any

E12新增的Promise的方法

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 如果有一个Promise成功，则返回这个成功结果
- 如果所有Promise都失败，则报错

```js
// 当有成功的时候，返回最快那个成功
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.any([fn(2000, true), fn(3000), fn(1000, true)]).then(res => {
  console.log(res) // 1秒后 输出  1000毫秒后我成功啦
}, err => {
  console.log(err)
})

// 当全都失败时
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.any([fn(2000), fn(3000), fn(1000)]).then(res => {
  console.log(res)
}, err => {
  console.log(err) // 3秒后 报错 all Error
})
```

### 36、数字分隔符

数字分隔符可以让你在定义长数字时，更加地一目了然

```js
const num = 1000000000

// 使用数字分隔符
const num = 1_000_000_000
```

### 37、||= 和 &&=

```js
或等于(||=)   a ||= b 等同于 a || (a = b);

且等于(&&=)   a &&= b 等同于 a && (a = b);
```

## 不知道是ES几

### 38、对象计算属性

我们经常碰到这样的问题，无论是在微信小程序还是React中，我们需要根据某个条件去修改某个数据

```js
if (type === 'boy') {
  this.setData({
    boyName: name
  })
} else if (type === 'girl') {
  this.setData({
    girlName: name
  })
}
```

我也不知道这个新特性叫啥，我就自己取名叫`属性动态属性`哈哈哈

```js
this.setData({
  [`${type}Name`]: name
})
```

## 补充

### 39、Symbol

#### 应用场景1：使用Symbol来作为对象属性名

平常我们对象的属性都是字符串

```js
const obj = {
  name: 'Sunshine_Lin',
  age: 23
}
console.log(obj['name']) // 'Sunshine_Lin'
console.log(obj['age']) // 23
```

其实也可以用Symbol来当做属性名

```js
const gender = Symbol('gender')
const obj = {
  name: 'Sunshine_Lin',
  age: 23,
  [gender]: '男'
}
console.log(obj['name']) // 'Sunshine_Lin'
console.log(obj['age']) // 23
console.log(obj[gender]) // 男
```

但是Symbol作为属性的属性不会被枚举出来，这也是`JSON.stringfy(obj)`时，Symbol属性会被排除在外的原因

```js
console.log(Object.keys(obj)) // [ 'name', 'age' ]
for(const key in obj) {
  console.log(key) // name age
}
console.log(JSON.stringify(obj)) // {"name":"Sunshine_Lin","age":23}
```

其实想获取Symbol属性也不是没办法。

```js
// 方法一
console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol(gender) ]
// 方法二
console.log(Reflect.ownKeys(obj)) // [ 'name', 'age', Symbol(gender) ]
```

#### 应用场景2：使用Symbol来替代常量

有以下场景

```js
// 赋值
const one = 'oneXin'
const two = 'twoXin'

function fun(key) {
  switch (key) {
    case one:
        return 'one'
      break;
    case two:
        return 'two'
      break;
  }
}
```

如果变量少的话还好，但是变量多的时候，赋值命名很烦，可以利用Symbol的唯一性

```js
const one = Symbol()
const two = Symbol()
```

#### 应用场景3：使用Symbol定义类的私有属性

以下例子，PASSWORD属性无法在实例里获取到

```js
class Login {
  constructor(username, password) {
    const PASSWORD = Symbol()
    this.username = username
    this[PASSWORD] = password
  }
  checkPassword(pwd) { return this[PASSWORD] === pwd }
}

const login = new Login('123456', 'hahah')

console.log(login.PASSWORD) // 报错
console.log(login[PASSWORD]) // 报错
console.log(login[PASSWORD]) // 报错
```



