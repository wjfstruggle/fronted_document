### `Vue`面试

#### 1、`v-if`和`v-for`哪个优先级更高?如果两个同时出现，应该怎么优化得到更好的性能?

源码中找答案：`src\compiler\codegen\index.js`

![image-20210724111433396.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2db66a4f722436cae6ab8d7653be84c~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210724113206358.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89ee5121fcc64452af3ac381e3abd707~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210724125725726.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f123204e5fed454092182152c0d75125~tplv-k3u1fbpfcp-watermark.image)

不使用key:

![image-20210724125818691.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e8241790e7d4e8cb7a265958b73abea~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210724150615838.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25fa126cee4b4a128001c9efc162fe60~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210724154636544.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bcfcddee13745ffa93bd9c08774d22d~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210724165748797.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e6c11b482cd4f6f86d17f237b5aa36b~tplv-k3u1fbpfcp-watermark.image)

这种架构的好处是简单快捷，但是，缺点也非常明显：JSP代码难以维护。

为了让开发更加便捷，代码更易维护，前后端职责更清晰。便衍生出MVC开发模式和框架，前端展示以 模板的形式出现。典型的框架就是Spring、Structs、Hibernate。整体框架如图所示：

![image-20210724165821409.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c95c9e679dd44dca823978f00ff6e5bd~tplv-k3u1fbpfcp-watermark.image)

使用这种分层架构，职责清晰，代码易维护。但这里的MVC仅限于后端，前后端形成了一定的分离，前 端只完成了后端开发中的view层。 但是，同样的这种模式存在着一些： 

1. 前端页面开发效率不高 
2. 前后端职责不清 

##### **web 2.0**时代

自从Gmail的出现，ajax技术开始风靡全球。有了ajax之后，前后端的职责就更加清晰了。因为前端可 以通过Ajax与后端进行数据交互，因此，整体的架构图也变化成了下面这幅图：

![image-20210724165943850.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dadfb7e7a6a5407ba2113132c2b3bf66~tplv-k3u1fbpfcp-watermark.image)

通过ajax与后台服务器进行数据交换，前端开发人员，只需要开发页面这部分内容，数据可由后台进行 提供。而且ajax可以使得页面实现部分刷新，减少了服务端负载和流量消耗，用户体验也更佳。这时， 才开始有专职的前端工程师。同时前端的类库也慢慢的开始发展，最著名的就是jQuery了。 

当然，此架构也存在问题：缺乏可行的开发模式承载更复杂的业务需求，页面内容都杂糅在一起，一旦 应用规模增大，就会导致难以维护了。因此，前端的MVC也随之而来。

前后端分离后的架构演变**——MVC**、**MVP**和**MVVM**

##### **MVC**

前端的MVC与后端类似，具备着View、Controller和Model。 
 Model：负责保存应用数据，与后端数据进行同步 
 Controller：负责业务逻辑，根据用户行为对Model数据进行修改 View：负责视图展示，将model中的数据可视化出来。

三者形成了一个如图所示的模型：

![image-20210724170350275.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb2df26260864d47bba42d094993721b~tplv-k3u1fbpfcp-watermark.image)

这样的模型，在理论上是可行的。但往往在实际开发中，并不会这样操作。因为开发过程并不灵活。例 如，一个小小的事件操作，都必须经过这样的一个流程，那么开发就不再便捷了。 

在实际场景中，我们往往会看到另一种模式，如图：

![image-20210724170445794.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72e4656b762143d2a888d0db7dbcb8c1~tplv-k3u1fbpfcp-watermark.image)

这种模式在开发中更加的灵活，backbone.js框架就是这种的模式。但是，这种灵活可能导致严重的问题：

1. 数据流混乱。如下图：

![image-20210724170516266.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0ee863d24894f038bea1ad7e6c12cbe~tplv-k3u1fbpfcp-watermark.image)

2. View比较庞大，而Controller比较单薄：由于很多的开发者都会在view中写一些逻辑代码，逐渐的 
    就导致view中的内容越来越庞大，而controller变得越来越单薄。

既然有缺陷，就会有变革。前端的变化中，似乎少了MVP的这种模式，是因为`AngularJS`早早地将 
 MVVM框架模式带入了前端。MVP模式虽然前端开发并不常见，但是在安卓等原生开发中，开发者还是 会考虑到它。

##### **MVP** 

 MVP与`MVC`很接近，P指的是Presenter，presenter可以理解为一个中间人，它负责着View和Model之 间的数据流动，防止View和Model之间直接交流。我们可以看一下图示： 

![image-20210724170748121.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/986a412fa3864f0f9f197d699ba7a34c~tplv-k3u1fbpfcp-watermark.image)

 我们可以通过看到，presenter负责和Model进行双向交互，还和View进行双向交互。这种交互方式， 相对于`MVC`来说少了一些灵活，`VIew`变成了被动视图，并且本身变得很小。虽然它分离了View和 
 Model。但是应用逐渐变大之后，导致presenter的体积增大，难以维护。要解决这个问题，或许可以 从MVVM的思想中找到答案。

##### **MVVM**

首先，何为`MVVM`呢？`MVVM`可以分解成(`Model-View-VIewModel)。ViewModel`可以理解为在 presenter基础上的进阶版。如图所示： 

![image-20210724170805413.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94a779aefdc340d1b2b432a57cbc3ac1~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210725165143845.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55a799d53dde4178bda1a060bbebd679~tplv-k3u1fbpfcp-watermark.image)

优化**slots**生成

vue3中可以单独重新渲染父级和子级

- 确保实例正确的跟踪依赖关系 
- 避免不必要的父子组件重新渲染

![image-20210725170147473.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00cfdcab3f6d48439e21a9de61c4126d~tplv-k3u1fbpfcp-watermark.image)

静态树提升**(Static Tree Hoisting)**

使用静态树提升，这意味着 Vue 3 的编译器将能够检测到什么是静态的，然后将其提升，从而降低了渲 染成本。

- 跳过修补整棵树，从而降低渲染成本
- 即使多次出现也能正常工作

![image-20210725170231689.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08d6c8961c044931b3980aa49525271d~tplv-k3u1fbpfcp-watermark.image)

静态属性提升

使用静态属性提升，Vue 3打补丁时将跳过这些属性不会改变的节点。

![image-20210725170257384.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e436dbfe12bb443f9022c5e100609086~tplv-k3u1fbpfcp-watermark.image)

基于 **Proxy** 的数据响应式

`Vue 2`的响应式系统使用 `Object.defineProperty` 的getter 和 setter。`Vue 3` 将使用 `ES2015 Proxy` 作为 其观察机制，这将会带来如下变化：

- 组件实例初始化的速度提高100％
- 使用Proxy节省以前一半的内存开销，加快速度，但是存在低浏览器版本的不兼容
- 为了继续支持` IE11`，`Vue 3 `将发布一个支持旧观察者机制和新 Proxy 版本的构建

![image-20210725170343676.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2858281d3f64e3192d61c31fc23487f~tplv-k3u1fbpfcp-watermark.image)

高可维护性

`Vue 3` 将带来更可维护的源代码。它不仅会使用 `TypeScript`，而且许多包被解耦，更加模块化。

![image-20210725170407311.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf9715258ade4e88a86ebd9c564114cd~tplv-k3u1fbpfcp-watermark.image)

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

![image-20210725181834720.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/709aa65a898241028407b7c5aba18870~tplv-k3u1fbpfcp-watermark.image)

回答策略：

1. 首先给`vuex`下一个定义
2. `vuex`解决了哪些问题，解读理念
3. 什么时候我们需要`vuex`
4. 你的具体用法
5. 简述原理，提升层级

回答示范：

1. `vuex`是`vue`专用的状态管理库。它以全局方式集中管理应用的状态，并且可以保证状态变更的可预测性。
2. `vuex`主要解决的问题是多组件之间状态共享的问题，利用各种组件通信方式，我们虽然能够做到状态共享，但是往往需要在多个组件之间保持状态的一致性，这种模式很容易出现问题，也会使程序逻辑变得复杂。`Vuex`通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护。
3. `Vuex`并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。如果我们不打算开发大型单页应用或者我们的应用并没有大量全局的状态需要维护，完全没有使用`vuex`的必要。一个简单的store模式就足够了。反之，`Vuex`将会成为自然而然的选择。引用`Redux`的作者`Dan Abramov`的话说就是︰Flux架构就像眼镜︰您自会知道什么时候需要它。
4. 我在使用`vuex`过程中有如下理解︰首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态;然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation;如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置`namespace`，那么在提交mutation和派发action时还需要额外的命名空间前缀。`vuex`在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了`vue`的数据响应化特性实现的，它会利用`Vue`将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。
5. `Vuex`在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了`vue`的数据响应化特性实现的，它会利用`Vue`将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

#### 12、`vue-router`中如何保护指定路由的安全?

1. 全局守卫
2. 组件
3. 路由配置

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

#####  全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**。这里有一个在用户未能验证身份时重定向到 `/login` 的示例：

```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

##### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

##### 路由配置

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter(to, form, next) {
        let login = true;
        login ? next({ path: '/home' }) : next();
    }
}
```

##### 组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

###### [#](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#完整的导航解析流程)完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

回答模板

1. `vue-router`中保护路由安全通常使用导航守卫来做，通过设置路由导航钩子函数的方式添加守卫函数，在里面判断用户的登录状态和权限，从而达到保护指定路由的目的。
2. 具体实现有几个层级∶全局前置守卫`beforeEach`、路由独享守卫`beforeEnter`或组件内守卫`beforeRouteEnlter`。以全局守卫为例来说y 可以使用`Fouter.beforeEach( (to,from,next)=>f})`方式设置守卫，每次路由导航时，都会执行该守卫，从而检查当前用户是否可以继续导航，通过给next函传递更多种参数达到不同的目的，比如如果禁止用户继续导航可以传递next(false)，正常放行可以不传递参数，传递path字符串可以重定向到一个新的地址等等。
3. 这些钩子函数之所以能够生效，也和`Vue-routerLTF`力式月人口标P中to当前路由from，以及后续处理函数生变化, router准备导航之前会批量执行这些hooks，并且把目标路由to，当前路由from，以及后续处理函数next传递给我们设置的hook。

#### 13、你知道`nextTick`吗，它是干什么的，实现原理是什么?

源码中找答案：`\src\core\util\next-tick.js`

`[Vue.nextTick( [callback, context\] )`]

- **参数**：

  - `{Function} [callback]`
  - `{Object} [context]`

- **用法**：

  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

  ```js
  // 修改数据
  vm.msg = 'Hello'
  // DOM 还没有更新
  Vue.nextTick(function () {
    // DOM 更新了
  })
  
  // 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
  Vue.nextTick()
    .then(function () {
      // DOM 更新了
    })
  ```

尽管`MVVM`框架并丕推荐诚问.DOM...有财候确实会真这样的震求.尤其是和第三方插佚进行配合的时候，避免不了进行DOM操作。而`nextTick`就是提供了这样一个桥梁，确保我们操作的是更新后的DOM

回答思路

1. `nextTick`是啥?下一个定义
2. 为什么需要它呢?用异步更新队列实现原理解释
3. 我再什么地方用它呢?抓抓头，想想你在平时开发中使用它的地方
4. 下面介绍一下如何使用`nextTick`
5. 最后能说出源码实现就会显得你格外优秀

回答模板

1. `nextTick`是`Vue`提供的一个全局`API`，由于`vue`的异步更新策略导致我们对数据的修改不会立刻体现在`dom`变化上，此时如果想要立即获取更新后的`dom`状态，就需要使用这个方法
2. `Vue`在更新DOM时是异步执行的。只要侦听到数据变化,`Vue`将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。`nextTick`方法会在队列中加入一个回调函数，确保该函数在前面的`dom`操作完成后才调用。
3. 所以当我们想在修改数据后立即看到`dom`执行结果就需要用到`nextTick`方法。
4. 比如，我在干什么的时候就会使用`nextTick`，传一个回调函数进去，在里面执行`dom`操作即可
5. 我也有简单了解`nextTick`实现，它会在callbacks里面加入我们传入的函数，然后用`timerFunc`异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在`nextTick`中看到`dom`操作结果。

#### 14、`Vue`响应式的理解

答题思路

1. 啥是响应式?
2. 为什么`vue`需要响应式?
3. 它能给我们带来什么好处?
4. `vue`的响应式是怎么实现的?有哪些优缺点?
5. `vue3`中的响应式的新变化

回答模板

1. 所谓数据响应式就是能够使数据变化可以被检测并对这种变化做出响应的机制。
2. mvvm框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。
3. 以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度。
4. vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖该数组原型的方法，扩展它的7个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新产生的Map、Set这些数据结构不支持等问题。
5. 为了解决这些问题，vue3重新编写了这一部分的实现：利用ES6的Proxy机制代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，我们甚至不需要引入vue都可以体验。

[vue响应式](https://www.processon.com/view/5d1eae32e4b05dcb439787d5)

