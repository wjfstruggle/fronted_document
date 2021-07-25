### `Vue`面试

#### 1、`v-if`和`v-for`哪个优先级更高?如果两个同时出现，应该怎么优化得到更好的性能?

源码中找答案：`src\compiler\codegen\index.js`

![image-20210724111433396](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724111433396.png)

测试：

```html
<div id="app">
    <ul>
        1、`v-for`和`v-if`在同一层级
      <li v-for="item in list" v-if="item.flag" :key="item.name">{{item.name}}</li>
        2、`v-for`和`v-if`不在同一层级
        <template v-if="list.length>0">
        	<li v-for="item in list" :key="item.name">{{item.name}}</li>
        </template>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data() {
        return {
          list: [{ flag: true,  name: '战三' }, { flag: false,  name: '李四' } ]
        }
      }
    })
    console.log(app.$options.render)
  </script>
</body>
```

**两者同层级时，渲染函数如下**

```js
with(this){return _c('div',{attrs:{"id":"app"}},[_c('ul',_l((list),function(item){return (item.flag)?_c('li',{key:item.name},[_v(_s(item.name))]):_e()}),0)])}
}
```

**两者不同层级时，渲染函数如下**

```js
with(this){return _c('div',{attrs:{"id":"app"}},[_c('ul',[(list.length>0)?_l((list),function(item){return _c('li',{key:item.name},[_v(_s(item.name))])}):_e()],2)])}
}
```

结论：

1. `v-for比v-if`优先被解析
2. 如果同时出现，每次渲染都会先执行循环在判断条件，无论如何循环都避免不了，浪费性能
3. 要避免这种情况，在外层嵌套一层`template`。在这一层做`v-if`判断，然后再内部执行 for循环

#### 2、`Vue`组件`data`为什么必须是个函数而`Vue`的根实例则没有此限制?

源码中找答案：`src\core\instance\state.js initState()`

![image-20210724113206358](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724113206358.png)

测试：

```js
<body>
  <div id="app">
    <p>{{count}}</p>
    <child></child>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    Vue.component('child', {
      template: `<div>{{count2}}</div>`,
      data: {
        count2: 22 
	// 报错：[Vue warn]: The "data" option should be a function that returns a per-instance value in component definitions.
      }
    })
    const app = new Vue({
      el: "#app",
      data: {
        count: 1
      }
    })
  </script>
</body>
```

结论：

`Vue`组件可能存在多个实例，如果使用对象形式定义data，则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的;采用函数形式定义，在`initData`时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题。而在`Vue`根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。

#### 3、你知道vue中key的作用和工作原理吗?说说你对它的理解。

源码中找答案：`\src\core\vdom\patch.js updateChildren()`

测试：

```html
<body>
  <div id="app">
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data() {
        return {
          list: ['a', 'b', 'c', 'd', 'e']
        }
      },
      created() {
        setTimeout(() => {
          this.list.splice(2, 0, 'f')
        }, 2000)
      }
    })
  </script>
</body>
```

视图：

![image-20210724125725726](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724125725726.png)

不使用key:

![image-20210724125818691](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724125818691.png)

使用key

```js
//首次循环Patch A
A B C D E
A B F C D E
//第二次循环Patch
B B C D E
B F C D E
//第三次循环Patch
E C D E
F C D E
//第四次循环Patch
D C D
F C D
//第五次循环Patch
C C
F C
// oldCh全部处理结束，newCh中剩下的F，创建F并插入到C前面
```

结论：

1. `key`的作用主要是为了高效的更新虚拟`DOM`，其原理是`vue`在 `patch`过程中通过` key`可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少 `DOM`操
2. 另外，若不设置 `key`还可能在列表更新时引发一些隐蔽的`bug `
3. `vue`中在使用相同标签名元素的过渡切换时，也会使用到 key属性，其目的也是为了让`vue`可以区分它们，否则`vue,`只会替换其内部属性而不会触发过渡效果。

#### 4、理解`vue`中`diff`算法

源码中找答案： 

1. 必要性`\src\core\instance\lifecycle.js mountComponent()`

   组件中可能存在很多个data中的key使用

2. 执行方式，`patch.js` - `patchVnode()`

   `patchVnode`是`diff`发生的地方，整体策略：深度优先，同层比

3. 高效性，`patch.js - updateChildren() `

![image-20210724150615838](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724150615838.png)

结论：

1. `diff`算法是虚拟DOM技术的必然产物:通过新旧虚拟DOM作对比(即`diff`)，将变化的地方更新在真实DOM上;另外，也需要`diff`高效的执行对比过程，从而降低时间复杂度为O(n)。
2. `vue 2.x`中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入`diff`才能精确找到发生变化的地方。
3. `vue`中`diff`执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果`oldVnode`和新的渲染结果`newVnode`，此过程称为patch。
4. `diff`过程整体遵循深度优先、同层比较的策略;两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作;比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点;借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

#### 5、组件化的理解

回答总体思路：

组件化的定义、优点、使用场景和注意事项等方面展开描述，同时强调`vue`组件化的一些特点。

源码中找答案：`\src\core\global-api\assets.js`

组件的定义：

```js
 Vue.component('child', {
 template: '<p>{{foo}}</p>',
 data() {
     return {
     foo: '佛哦哦哦哦哦'
     }
 	}
 })
```

组件化优点：

`lifecycle.js - mountComponent() `

**组件、Watcher、渲染函数和更新函数之间的关系**

组件化实现 
构造函数，`src\core\global-api\extend.js `
实例化及挂载，`src\core\vdom\patch.js - createElm()`

结论:

1. 组件是独立和可复用的代码组织单元。组件系统是 `Vue`核心特性之一，它使开发者使用小型、独 
    立和通常可复用的组件构建大型应用； 

2. 组件化开发能大幅提高应用开发效率、测试性、复用性等； 

3. . 组件使用按分类有：页面组件、业务组件、通用组件； 

4. `vue`的组件是基于配置的，我们通常编写的组件是组件配置而非组件，框架后续会生成其构造函 

   数，它们基于`VueComponent`，扩展于`Vue`； 

5. `vue`中常见组件化技术有：属性prop，自定义事件，插槽等，它们主要用于组件通信、扩展等； 

6. 合理的划分组件，有助于提升应用性能； 
7. 组件应该是高内聚、低耦合的； 

8. 遵循单向数据流的原则。 

#### 6、`vue`的设计理念

官方解释：

1. 渐进式JavaScript框架
2. 易用、灵活和高效

`Vue`是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，`Vue` 被设计为可以自底向上逐层应用。`Vue `的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，`Vue` 也完全能够为复杂的单页应用提供驱动。

![image-20210724154636544](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724154636544.png)

易用性 

` vue`提供数据响应式、声明式模板语法和基于配置的组件系统等核心特性。这些使我们只需要关注应用 的核心业务即可，只要会写`js``html`和`css`就能轻松编写`vue`应用。

灵活性 

渐进式框架的最大优点就是灵活性，如果应用足够小，我们可能仅需要`vue`核心特性即可完成功能；随 着应用规模不断扩大，我们才可能逐渐引入路由、状态管理、`vue-cli`等库和工具，不管是应用体积还是 学习难度都是一个逐渐增加的平和曲线。

高效性

超快的虚拟 DOM 和 `diff` 算法使我们的应用拥有最佳的性能表现。 追求高效的过程还在继续，`vue3`中引入`Proxy`对数据响应式改进以及编译器中对于静态内容编译的改进 都会让`vue`更加高效。

#### 7、谈谈你对**MVC**、**MVP**和**MVVM**的理解？

答题思路：此题涉及知识点很多，很难说清、说透，因为mvc、mvp这些我们前端程序员自己甚至都没用过。但是恰恰反映了前端这些年从无到有，从有到优的变迁过程，因此沿此思路回答将十分清楚。

##### **Web1.0**时代 

在web1.0时代，并没有前端的概念。开发一个web应用多数采用[ASP.NET/Java/PHP编写，项目通常由](http://ASP.NET/Java/PHP编写，项目通常由多个aspx/jsp/php文件构成，每个文件中同时包含了HTML、CSS、JavaScript、C#/Java/PHP代码，系统整体架构可能是这样子的：) [多个aspx/jsp/php文件构成，每个文件中同时包含了HTML、CSS、JavaScript、C#/Java/PHP代码，系](http://ASP.NET/Java/PHP编写，项目通常由多个aspx/jsp/php文件构成，每个文件中同时包含了HTML、CSS、JavaScript、C#/Java/PHP代码，系统整体架构可能是这样子的：) [统整体架构可能是这样子的：]ASP.NET/Java/PHP编写，项目通常由多个aspx/jsp/php文件构成，每个文件中同时包含了HTML、CSS、JavaScript、C#/Java/PHP代码，系统整体架构可能是这样子的：

![image-20210724165748797](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724165748797.png)

这种架构的好处是简单快捷，但是，缺点也非常明显：JSP代码难以维护。

为了让开发更加便捷，代码更易维护，前后端职责更清晰。便衍生出MVC开发模式和框架，前端展示以 模板的形式出现。典型的框架就是Spring、Structs、Hibernate。整体框架如图所示：

![image-20210724165821409](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724165821409.png)

使用这种分层架构，职责清晰，代码易维护。但这里的MVC仅限于后端，前后端形成了一定的分离，前 端只完成了后端开发中的view层。 但是，同样的这种模式存在着一些： 

1. 前端页面开发效率不高 
2. 前后端职责不清 

##### **web 2.0**时代

自从Gmail的出现，ajax技术开始风靡全球。有了ajax之后，前后端的职责就更加清晰了。因为前端可 以通过Ajax与后端进行数据交互，因此，整体的架构图也变化成了下面这幅图：

![image-20210724165943850](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724165943850.png)

通过ajax与后台服务器进行数据交换，前端开发人员，只需要开发页面这部分内容，数据可由后台进行 提供。而且ajax可以使得页面实现部分刷新，减少了服务端负载和流量消耗，用户体验也更佳。这时， 才开始有专职的前端工程师。同时前端的类库也慢慢的开始发展，最著名的就是jQuery了。 

当然，此架构也存在问题：缺乏可行的开发模式承载更复杂的业务需求，页面内容都杂糅在一起，一旦 应用规模增大，就会导致难以维护了。因此，前端的MVC也随之而来。

前后端分离后的架构演变**——MVC**、**MVP**和**MVVM**

##### **MVC**

前端的MVC与后端类似，具备着View、Controller和Model。 
 Model：负责保存应用数据，与后端数据进行同步 
 Controller：负责业务逻辑，根据用户行为对Model数据进行修改 View：负责视图展示，将model中的数据可视化出来。

三者形成了一个如图所示的模型：

![image-20210724170350275](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724170350275.png)

这样的模型，在理论上是可行的。但往往在实际开发中，并不会这样操作。因为开发过程并不灵活。例 如，一个小小的事件操作，都必须经过这样的一个流程，那么开发就不再便捷了。 

在实际场景中，我们往往会看到另一种模式，如图：

![image-20210724170445794](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724170445794.png)

这种模式在开发中更加的灵活，backbone.js框架就是这种的模式。但是，这种灵活可能导致严重的问题：

1. 数据流混乱。如下图：

![image-20210724170516266](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724170516266.png)

2. View比较庞大，而Controller比较单薄：由于很多的开发者都会在view中写一些逻辑代码，逐渐的 
    就导致view中的内容越来越庞大，而controller变得越来越单薄。

既然有缺陷，就会有变革。前端的变化中，似乎少了MVP的这种模式，是因为`AngularJS`早早地将 
 MVVM框架模式带入了前端。MVP模式虽然前端开发并不常见，但是在安卓等原生开发中，开发者还是 会考虑到它。

##### **MVP** 

 MVP与`MVC`很接近，P指的是Presenter，presenter可以理解为一个中间人，它负责着View和Model之 间的数据流动，防止View和Model之间直接交流。我们可以看一下图示： 

![image-20210724170748121](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724170748121.png)

 我们可以通过看到，presenter负责和Model进行双向交互，还和View进行双向交互。这种交互方式， 相对于`MVC`来说少了一些灵活，`VIew`变成了被动视图，并且本身变得很小。虽然它分离了View和 
 Model。但是应用逐渐变大之后，导致presenter的体积增大，难以维护。要解决这个问题，或许可以 从MVVM的思想中找到答案。

##### **MVVM**

首先，何为`MVVM`呢？`MVVM`可以分解成(`Model-View-VIewModel)。ViewModel`可以理解为在 presenter基础上的进阶版。如图所示： 

![image-20210724170805413](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724170805413.png)

`ViewModel`通过实现一套数据响应式机制自动响应Model中数据变化； 
 同时`Viewmodel`会实现一套更新策略自动将数据变化转换为视图更新； 
 通过事件监听响应View中用户交互修改Model中数据。 

这样在`ViewModel`中就减少了大量DOM操作代码。 
`MVVM`在保持View和Model松耦合的同时，还减少了维护它们关系的代码，使用户专注于业务逻辑，兼 顾开发效率和可维护性。

总结:

1. 这三者都是框架模式，它们设计的目标都是为了解决Model和View的耦合问题。 
2.  `MVC`模式出现较早主要应用在后端，如`Spring MVC、ASP.NET MVC`等，在前端领域的早期也有应 用，如`Backbone.js`。它的优点是分层清晰，缺点是数据流混乱，灵活性带来的维护性问题。 
3.  MVP模式在是`MVC`的进化形式，Presenter作为中间层负责`MV`通信，解决了两者耦合问题，但P层 过于臃肿会导致维护问题。
4.  `MVVM`模式在前端领域有广泛应用，它不仅解决`MV`耦合问题，还同时解决了维护两者映射关系的 大量繁杂代码和DOM操作代码，在提高开发效率、可读性同时还保持了优越的性能表现。

#### 8、`vue`的性能优化

答题思路：根据题目描述，这里主要探讨`Vue`代码层面的优化。

##### 1、路由懒加载

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```

##### 2、keep-alive页面缓存

```html
<template> 
  <div id="app"> 
    <keep-alive> 
      <router-view/>     
    </keep-alive> 
  </div> 
</template>
```

##### 3、使用v-show复用DOM

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

```html
<div>
    <div><button @click="handelShow">切换</button></div>
    <img v-show="show" src="https://cn.vuejs.org/images/lifecycle.png" alt="">
    <img v-show="!show"
         src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce1121cb8ac84ddfa5dd63760d255664~tplv-k3u1fbpfcp-watermark.image"
         alt="">
</div>
```

##### 4、v-for 遍历避免同时使用 v-if

```js
<ul>
    <li v-for="(item,index) in user" :key="index">{{item.name + '：'+ item.age+'：'+ '性别：'+ item.sex}}</li>
</ul>
<script>
    const app = new Vue({
      el: "#app",
      data: {
        foo: 'foo',
        show: true,
        list: [
          { name: '张三', 'age': 19, 'sex': 0 },
          { name: '李四', 'age': 20, 'sex': 1 },
          { name: '王五', 'age': 21, 'sex': 1 },
          { name: '刘六', 'age': 22, 'sex': 0 }]
      },
      computed: {
        // 使用计算属性，过滤其他不需要展示的内容
        user() {
          return this.list.filter(item => item.sex == 0)
        }
      }
    })
  </script>
```

##### 5、图片懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域 内的图片先不做加载， 等到滚动到可视区域后再去加载。

```html
<img v-lazy="/static/img/1.png">
```

##### 6、事件的销毁

`Vue` 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

```js
created() { 
  this.timer = setInterval(this.refresh, 2000) }, 
beforeDestroy() { 
  clearInterval(this.timer) 
} 
```

##### 7、长列表性能优化

如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化。

```js
created() {
   const userList = [
       { name: '张三', 'age': 19, 'sex': 0},
       { name: '李四', 'age': 20, 'sex': 1},
       { name: '王五', 'age': 21, 'sex': 1},
       { name: '刘六', 'age': 22, 'sex': 0}]
   this.userList = Object.freeze(userList)
    setTimeout(() => {
        this.userList[0].name = '极客'
    }, 3000)
},
```

**`Object.freeze()`** 方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()` 返回和传入的参数相同的对象。

##### 9、第三方插件按需引入

像`element-ui`这样的第三方组件库可以按需引入避免体积太大。

```js
import Vue from 'vue'; 
import { Button, Select } from 'element-ui'; 
Vue.use(Button)  
Vue.use(Select)

```

#### 9、你对`Vue3.0`的新特性有没有了解？

根据尤大的`PPT`总结，`Vue3.0`改进主要在以下几点：

- 更快
  - 虚拟DOM的重写
  - 优化slots的生成
  - 静态树的提升
  - 静态属性的提升
  - 基于Proxy的响应式系统
- 更小：通过摇树优化核心库的体积
- 更容易维护：TS + 模块化
- 更加友好
  - 夸平台：编译器核心和运行时核心与平台无关，使得Vue更加容易与任何平台（Web、 
     Android、iOS）一起使用。
- 更容易使用
  - 改进的TS的支持，编译器能提供强有力的类型检测和错误警告
  - 更友好的调试支持
  - 独立的响应式系统
  - Componsition API

虚拟DOM的重写

期待更多的编译时提示来减少运行时开销，使用更有效的代码来创建虚拟节点。 组件快速路径+单个调用+子节点类型检测 

- 跳过不必要的条件分支
- JS引擎更容易优化

![image-20210725165143845](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725165143845.png)

优化**slots**生成

vue3中可以单独重新渲染父级和子级

- 确保实例正确的跟踪依赖关系 
- 避免不必要的父子组件重新渲染

![image-20210725170147473](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725170147473.png)

静态树提升**(Static Tree Hoisting)**

使用静态树提升，这意味着 Vue 3 的编译器将能够检测到什么是静态的，然后将其提升，从而降低了渲 染成本。

- 跳过修补整棵树，从而降低渲染成本
- 即使多次出现也能正常工作

![image-20210725170231689](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725170231689.png)

静态属性提升

使用静态属性提升，Vue 3打补丁时将跳过这些属性不会改变的节点。

![image-20210725170257384](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725170257384.png)

基于 **Proxy** 的数据响应式

`Vue 2`的响应式系统使用 `Object.defineProperty` 的getter 和 setter。`Vue 3` 将使用 `ES2015 Proxy` 作为 其观察机制，这将会带来如下变化：

- 组件实例初始化的速度提高100％
- 使用Proxy节省以前一半的内存开销，加快速度，但是存在低浏览器版本的不兼容
- 为了继续支持` IE11`，`Vue 3 `将发布一个支持旧观察者机制和新 Proxy 版本的构建

![image-20210725170343676](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725170343676.png)

高可维护性

`Vue 3` 将带来更可维护的源代码。它不仅会使用 `TypeScript`，而且许多包被解耦，更加模块化。

![image-20210725170407311](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725170407311.png)

#### 10、**vue**中组件之间的通信方式？

- Props
- `$emit() $on()`
- `eventBus`
- `$parent $children`
- ref

`ref` 这个 attribute 为子组件赋予一个 ID 引用。例如：

```js
<base-input ref="usernameInput"></base-input>
```

现在在你已经定义了这个 `ref` 的组件里，你可以使用：

```js
this.$refs.usernameInput
```

来访问这个 `<base-input>` 实例，以便不时之需。比如程序化地从一个父级组件聚焦这个输入框。在刚才那个例子中，该 `<base-input>` 组件也可以使用一个类似的 `ref` 提供对内部这个指定元素的访问，例如：

```js
<input ref="input">
```

甚至可以通过其父级组件定义方法：

```js
methods: {
  // 用来从父级组件聚焦输入框
  focus: function () {
    this.$refs.input.focus()
  }
}
```

这样就允许父级组件通过下面的代码聚焦 `<base-input>` 里的输入框：

```js
this.$refs.usernameInput.focus()
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

`$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

- `$attrs $listeners`
- `$root`

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问。例如，在这个根实例中：

根实例中：

```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。

```js
// 获取根组件的数据
this.$root.foo
// 写入根组件的数据
this.$root.foo = 2
// 访问根组件的计算属性
this.$root.bar
// 调用根组件的方法
this.$root.baz()
```

- provide / inject
- `Vuex`

#### 11、`Vuex`的使用及理解

![image-20210725181834720](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210725181834720.png)

回答策略：

1. 首先给vuex下一个定义
2. vuex解决了哪些问题，解读理念
3. 什么时候我们需要vuex
4. 你的具体用法
5. 简述原理，提升层级

回答示范：

1. vuex是vue专用的状态管理库。它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。
2. vuex主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享，但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，也会使程序逻辑变得复杂。Vuex通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。
3. Vuex并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。如果我们不打算开发大型单页应用或者我们的应用并没有大量全局的状态需要维护，完全没有使用vuex的必要。一个简单的store模式就足够了。反之，Vuex将会成为自然而然的选择。引用Redux的作者Dan Abramov的话说就是︰Flux架构就像眼镜︰您自会知道什么时候需要它。
4. 我在使用vuex过程中有如下理解︰首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态;然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation;如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace，那么在提交mutation和派发action时还需要额外的命名空间前缀。vuex在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。
5. Vuex在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。