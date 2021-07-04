### `Vue`全家桶 & 原理

1. `vue-router `
2. `vuex`
3.  [vue-router源码](\1. vue-router 2. vuex 3. vue-router源码 4. vuex源码)
4. [vuex源码]([GitHub - vuejs/vuex: 🗃️ Centralized State Management for Vue.js.](https://github.com/vuejs/vuex))

#### `vue-router `

`Vue Router` 是 `Vue.js` 官⽅的路由管理器。它和 `Vue.js` 的核⼼深度集成，让构建单⻚⾯应⽤变得易如反掌。

核⼼步骤：

- 一：使⽤`vue-router`插件，`router.js`

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

- 二：创建`router`的实例，导出路由

```js
const router = new VueRouter({
  routes
})

export default router

```

- 三：在根组件上添加该实例，`main.js`

```js
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

- 四：添加路由视图，`App.vue`

```html
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>
```

- 五：路由跳转

```js
this.$router.push({
    path: "/", // 路径
    query: {}, // 参数
});
```

#### `vue-router`源码实现

单⻚⾯应⽤程序中，`url`发⽣变化时候，不能刷新，显示对应视图内容。

##### 需求分析

- `spa` ⻚⾯不能刷新
  - `hash #/about`
  - `History api /about`
- 根据`url`显示对应的内容
  - `router-view`
  - 数据响应式：`current`变量持有`url`地址，⼀旦变化，动态重新执⾏`render`

##### 任务 

- 实现⼀个插件 
  - 实现`VueRouter`类 
  - 处理路由选项 
  - 监控`url`变化，`hashchange `
  - 响应这个变化 
- 实现`install`⽅法 
  - `$router`注册 
  - 两个全局组件（`router-link`和`router-view`）

代码实现部分

##### 一：实现`install`⽅法 ，注册`$router`

```js
let Vue;
// vue插件形式：
// 实现一个install方法，该方法会在use的时候被调用
class JVueRouter {}
// 形参1是Vue构造函数
JVueRouter.install = function (_Vue) {
  // 传入构造函数，我们可以修改它的原型，起到扩展的作用
  Vue = _Vue;
  // install中this是JVueRouter

  // 1.注册$router
  // 延迟执行接下来代码，等到router实例创建之后
  // 全局混入：Vue.mixn
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
}
export default JVueRouter;
```

尝试引入`jrouter.js`看看发生什么

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

import router from './jrouter'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// jrouter/indx.js
import Vue from 'vue'
// import VueRouter from 'vue-router' // 不使用官方的'vue-router'
import VueRouter from './jvue-router' // 引入`jrouter.js`
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  routes
})
export default router
```

报错：`<router-link>`不能用

![image-20210703121000849](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210703121000849.png)

接下来实现两个全局组件

##### 二：两个全局组件（`router-link`和`router-view`）

```js
// 2.注册router-link和router-view全局组件
Vue.component('router-link', {
    render(h) {
        // h是createElement, 返回vnode
        return h('a', {}, 'htmlcss');
    },
})
Vue.component('router-view', {
    render(h) {
        return h('div', {}, 'router-view展示的内容');
    },
})
```

![image-20210703121515703](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210703121515703.png)

此时渲染的内容都是自定义的，接下来实现获取`router-link`组件的插槽等内容。

```js
// 2.注册router-link和router-view全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // h是createElement, 返回vnode
      // 获取插槽内容
      // <a href=""></a>
      // <router-link to="/about"></router-link>
      // this.$slots.default 获取默认插槽的内容
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default);
    },
  })
```

##### `router-view`关键实现原理

1. `router-view`不仅可以渲染标签的内容，还可以渲染`component`组件的内容（关键点）

```js
class JVueRouter {
  constructor(options) {
    this.$options = options;
    // 需要将current属性声明为响应式的
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );

    // set方法接收obj必须是响应式的
    // Vue.set(obj, key, val)

    // 2.监听hashchang事件，并且在变化的时候响应
    window.addEventListener("hashchange", () => {
      // hash: #/about
      console.log(this.current);
      this.current = window.location.hash.slice(1);
    });
  }
}
Vue.component('router-view', {
    render(h) {
      // 数据响应式：数据变化可侦听，使用这些数据组件就会和响应式数据产生依赖关系
      // 将来如果响应式数据发生变化，这些组件会重新渲染
      // 0.获取router实例
      // console.log(this.$router.$options, this.$router.current);
      let component = null;
       // 1.获取hash部分，获取path
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }
      // 2.根据path，从路由表中获取组件
      return h(component);
    },
  })
```

来回切换路由，**渲染对应的组件内容**

![image-20210703134444061](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210703134444061.png)

完整代码：

```js
let Vue;
// vue插件形式：
// 实现一个install方法，该方法会在use的时候被调用
class JVueRouter {
  constructor(options) {
    this.$options = options;
    // 需要将current属性声明为响应式的
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );

    // set方法接收obj必须是响应式的
    // Vue.set(obj, key, val)

    // 2.监听hashchang事件，并且在变化的时候响应
    window.addEventListener("hashchange", () => {
      // hash: #/about
      console.log(this.current);
      this.current = window.location.hash.slice(1);
    });
  }
}
// 形参1是Vue构造函数
JVueRouter.install = function (_Vue) {
  // 传入构造函数，我们可以修改它的原型，起到扩展的作用
  Vue = _Vue;
  // install中this是JVueRouter

  // 1.注册$router
  // 延迟执行接下来代码，等到router实例创建之后
  // 全局混入：Vue.mixn
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // 2.注册router-link和router-view全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // h是createElement, 返回vnode
      // 获取插槽内容
      // <a href=""></a>
      // <router-link to="/about"></router-link>
      // this.$slots.default 获取默认插槽的内容
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default);
    },
  })
  Vue.component('router-view', {
    render(h) {
      // 数据响应式：数据变化可侦听，使用这些数据组件就会和响应式数据产生依赖关系
      // 将来如果响应式数据发生变化，这些组件会重新渲染
      // 0.获取router实例
      // console.log(this.$router.$options, this.$router.current);
      let component = null;
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }
      // 1.获取hash部分，获取path
      // 2.根据path，从路由表中获取组件
      return h(component);
    },
  })
}
export default JVueRouter;
```

#### `vuex`

`Vuex` 是一个专为 `Vue.js` 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种**可预测**的方式发生变化。

