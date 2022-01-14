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



### 三、JS函数的this指向  

### 四、JS面向对象

### 五、ES6~ES12常用知识点

### 六、模块化

### 七、DOM，BOM操作

### 八、防抖节流-深拷贝-事件总线

