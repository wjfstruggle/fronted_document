### `Vue`全家桶 & 原理

1. `vue-router `
2. `vuex`
3. [vue-router 源码](https://github.com/vuejs/vue-router)
4. [vuex 源码](https://github.com/vuejs/vuex)

#### `vue-router `

`Vue Router` 是 `Vue.js` 官⽅的路由管理器。它和 `Vue.js` 的核⼼深度集成，让构建单⻚⾯应⽤变得易如反掌。

核⼼步骤：

- 一：使⽤`vue-router`插件，`router.js`

```js
// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
```

- 二：创建`router`的实例，导出路由

```js
const router = new VueRouter({
  routes,
});

export default router;
```

- 三：在根组件上添加该实例，`main.js`

```js
import Vue from "vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
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
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
};
export default JVueRouter;
```

尝试引入`jrouter.js`看看发生什么

```js
// main.js
import Vue from "vue";
import App from "./App.vue";

import router from "./jrouter";

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

// jrouter/indx.js
import Vue from "vue";
// import VueRouter from 'vue-router' // 不使用官方的'vue-router'
import VueRouter from "./jvue-router"; // 引入`jrouter.js`
import Home from "../views/Home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
const router = new VueRouter({
  routes,
});
export default router;
```

报错：`<router-link>`不能用

![image-20210703121000849.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc6962d11e574362b3e2abb1cedbd744~tplv-k3u1fbpfcp-watermark.image)

接下来实现两个全局组件

##### 二：两个全局组件（`router-link`和`router-view`）

```js
// 2.注册router-link和router-view全局组件
Vue.component("router-link", {
  render(h) {
    // h是createElement, 返回vnode
    return h("a", {}, "htmlcss");
  },
});
Vue.component("router-view", {
  render(h) {
    return h("div", {}, "router-view展示的内容");
  },
});
```

![image-20210703121515703.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee070932d1994819babd631655b748f5~tplv-k3u1fbpfcp-watermark.image)

此时渲染的内容都是自定义的，接下来实现获取`router-link`组件的插槽等内容。

```js
// 2.注册router-link和router-view全局组件
Vue.component("router-link", {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  render(h) {
    // h是createElement, 返回vnode
    // 获取插槽内容
    // <a href=""></a>
    // <router-link to="/about"></router-link>
    // this.$slots.default 获取默认插槽的内容
    return h(
      "a",
      {
        attrs: {
          href: "#" + this.to,
        },
      },
      this.$slots.default
    );
  },
});
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
Vue.component("router-view", {
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
});
```

来回切换路由，**渲染对应的组件内容**

![image-20210703134444061.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c5bd9f1454f4e2d96613700fd37d5b5~tplv-k3u1fbpfcp-watermark.image)

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
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  // 2.注册router-link和router-view全局组件
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // h是createElement, 返回vnode
      // 获取插槽内容
      // <a href=""></a>
      // <router-link to="/about"></router-link>
      // this.$slots.default 获取默认插槽的内容
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
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
  });
};
export default JVueRouter;
```

#### `vuex`

`Vuex` 是一个专为 `Vue.js` 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种**可预测**的方式发生变化。

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：

![img](https://vuex.vuejs.org/flow.png)

![vuex](https://vuex.vuejs.org/vuex.png)

##### 核⼼概念

- state 状态、数据
- mutations 更改状态的函数
- actions 异步操作
- store 包含以上概念的容器

##### 状态`state`

state 保存应⽤状态

```js
export default new Vuex.Store({
  state: {
    counter: 1,
  },
});
```

##### 状态变更 - `mutations`

`mutations`⽤于修改状态，`store.js`

```js
export default new Vuex.Store({
  mutations: {
    add(state) {
      state.counter++;
    },
  },
});
```

##### 动作 - `actions`

添加业务逻辑，类似于`controller`

```js
export default new Vuex.Store({
  actions: {
    add(ctx) {
      setTimeout(() => {
        ctx.commit("add");
      }, 1000);
    },
  },
});
```

测试代码

```html
<p @click="$store.commit('add')">{{$store.state.counter}}</p>
<p @click="$store.dispatch('add')">async: {{$store.state.counter}}</p>
```

#### vuex 源码实现

##### 任务分析

- 实现插件
  - 实现 Store 类
    - 维持⼀个响应式状态 state
    - 实现 commit()
    - 实现 dispatch()

**初始化：`Store`声明、`install`实现，`jvuex.js`：**

```js
let Vue;

class Store {
  constructor(options = {}) {
    // 1.对state做响应式处理
    // Vue.util.defineReactive(this, 'state', {})
    // this._vm.foo = 'fooooooo'
    this._vm = new Vue({
      data() {
        return {
          // 不做代理
          $$state: options.state,
        };
      },
    });
  }
  get state() {
    return this._vm._data.$$state;
  }
  set state(val) {
    console.error("please use replaceState to reset state");
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 注册$store
  Vue.mixin({
    beforeCreate() {
      // 此处this指的是组件实例
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 导出对象是Vuex
export default {
  Store,
  install,
};
```

##### 实现`commit`：

根据⽤户传⼊`type`获取并执⾏对应`mutation`

```js
constructor(options = {}) {
    // 保存⽤户配置的mutations选项
    this._mutations = options.mutations || {};
}
// commit('add', 2)
commit(type, payload) {
    // 根据type从用户配置的mutations中获取那个函数
    const entry = this._mutations[type]
    if (!entry) {
        console.error('unknown mutation！');
        return
    }
    entry(this.state, payload)
}
```

##### 实现`actions`：

根据⽤户传⼊ type 获取并执⾏对应`action`

```js
constructor(options = {}) {
    // 保存⽤户配置的actions选项
    this._actions = options.actions || {};
    // 绑定this
    // 绑定commit上下⽂否则action中调⽤commit时可能出问题!!
    // 同时也把action绑了，因为action可以互调
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
}
dispatch(type, payload) {
    const enter = this._actions[type]
    if (!enter) {
        console.error('unknown action！');
        return
    }
    // 异步结果处理常常需要返回Promise
    enter(this, payload)
}
```

#### 高级部分

1. `vue-router `前面写的路由，其实是没有做子路由的
2. `vuex`实现`getters`

#### `vue-router `实现路由嵌套

问题回顾：about 页面先嵌套一个子路由。

```js
// jrouter.js
const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: '/about/info',
      component: {
        render(h) {
          return h('div', '这是about页面的详细信息')
        }
      }
    }]
  }
]
// about.vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-view></router-view>
  </div>
</template>
```

运行结果

![image-20210704160532789.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60ccf3d54e3243bd9663f5d179a4ef09~tplv-k3u1fbpfcp-watermark.image)

代码实现：

1. `router-view`深度标记
2. 路由匹配时获取代表深度层级的`matched`数组

先做一个`router-view`的文件抽离

```js
// jrouter-view.js
export default {
  render(h) {
    //获取path对应的component
    const {
      routeMap,
      current
    } = this.$router;
    console.log(routeMap, current);

    const component = routeMap[current].component || null;
    return h(component)
  }
}
// jvue-router.js
import View from './jrouter-view'
constructor(options) {
    this.$options = options;
    // 需要将current属性声明为响应式的
    Vue.util.defineReactive(this, "current", "/");

    // set方法接收obj必须是响应式的
    // Vue.set(obj, key, val)

    // 2.监听hashchang事件，并且在变化的时候响应
    window.addEventListener("hashChange", this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this))
    // 创建一个路由映射表
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }
  onHashChange() {
    console.log(window.location.hash);

    this.current = window.location.hash.slice(1)
  }
Vue.component('router-view', View)
```

`router-view`深度标记

```js
export default {
  render(h) {
    // 标记当前router-view的深度
    this.$vnode.data.routerView = true;
    let depth = 0;
    let parent = this.$parent;
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++;
        }
      }
      parent = parent.$parent;
    }
    let component = null;
    let route = this.$router.matched[depth];
    if (route) {
      component = route.component;
    }
    return h(component);
  },
};
```

路由匹配时获取代表深度层级的`matched`数组

```js
// jvue-router.js
constructor(options) {
    this.$options = options;
    // 需要将current属性声明为响应式的
    this.current = window.location.hash.slice(1) || '/'
    // Vue.util.defineReactive(this, "current", "/");
    Vue.util.defineReactive(this, "matched", []);
    this.match();

    // set方法接收obj必须是响应式的
    // Vue.set(obj, key, val)

    // 2.监听hashchang事件，并且在变化的时候响应
    window.addEventListener("hashChange", this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this))
    // 创建一个路由映射表
    // this.routeMap = {}
    // options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })
  }
onHashChange() {
    console.log(window.location.hash);

    this.current = window.location.hash.slice(1)
    // 重新清空数组
    this.matched = [];
    this.match()
  }
  match(routes) {
    routes = routes || this.$options.routes
    // 遍历递归
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
      }
      // /about/info
      if (route.path === '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children);
        }
        return
      }
    }
  }
```

#### `vuex`实现`getters`

```js
jstore / jvuex.js;
// 保存⽤户配置的getters选项
this._wrappedGetters = options.getters || {};
// 定义computed选项
const computed = {};
this.getters = {};
const store = this;
Object.keys(this._wrappedGetters).forEach((key) => {
  // 获取用户定义的getter
  const fn = store._wrappedGetters[key];
  // 转换为computed可以使用无参数形式
  computed[key] = function () {
    return fn(store.state);
  };
  // 为getter定义只读属性
  Object.defineProperty(store.getters, key, {
    get: () => store._vm[key],
  });
});
// 1.对state做响应式处理
// Vue.util.defineReactive(this, 'state', {})
// this._vm.foo = 'fooooooo'
this._vm = new Vue({
  data() {
    return {
      // 不做代理
      $$state: options.state,
    };
  },
  computed,
});
```

测试：

```html
<p>{{$store.getters.doubleCounter}}</p>
```

```js
jstore/index.js
getters: {
    doubleCounter: state => {
    	return state.counter * 2;
    }
},
```

**源码地址**

vue3/vue 源码学习

[vue3/vue 源码学习](https://github.com/wjfstruggle/web_study_p)
