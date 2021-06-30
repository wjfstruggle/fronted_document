### Vue3知识点

#### 1、vue.config.js配置

##### **创建vue.config.js**

`vue.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。

这个文件应该导出一个包含了选项的对象：

```js
// vue.config.js
module.exports = {
  // 选项...
}
```

##### **配置选项**

###### publicPath

- Type: `string`
- Default: `'/'`

这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。

```js
// 这里的webpack配置会和公共的webpack.config.js进行合并
module.exports = {
  // 执行 npm run build 统一配置文件路径（本地访问dist/index.html需'./'）
  publicPath: './',
}
```

###### outputDir

- Type: `string`

- Default: `'dist'`

  当运行 `vue-cli-service build` 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 `--no-clean` 可关闭该行为)。

```js
outputDir:'dist', // 打包文件输出目录, 默认打包到dist文件下
```

###### assetsDir

- Type: `string`

- Default: `''`

  放置生成的静态资源 (js、css、img、fonts) 的 (相对于 `outputDir` 的) 目录。

```js
assetsDir:'static', // 放置静态资源
```

###### pages

- Type: `Object`

- Default: `undefined`

  在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：

  - 一个指定了 `entry`, `template`, `filename`, `title` 和 `chunks` 的对象 (除了 `entry` 之外都是可选的)；
  - 或一个指定其 `entry` 的字符串。

```js
module.exports = {
  pages:{
    index:{
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 修改模板引擎title
      title:"Vue3 学习",
      // 在 dist/index.html 的输出
      filename: 'index.html',
    }
  },
}
```

###### lintOnSave

- Type: `boolean` | `'warning'` | `'default'` | `'error'`
- Default: `'default'`

- 是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败。

```js
lintOnSave: false, // 设置是否在开发环境下每次保存代码时都启用 eslint验证
```

###### chainWebpack

- Type: `Function`

  是一个函数，会接收一个基于 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 `ChainableConfig` 实例。允许对内部的 webpack 配置进行更细粒度的修改。

  更多细节可查阅：[配合 webpack > 链式操作](https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级)

```js
chainWebpack:config => { // 允许对内部的 webpack 配置进行更细粒度的修改。
    config.module
    .rule('images')
      .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))
  },
```

######  devServer

- Type: `Object`

  [所有 `webpack-dev-server` 的选项](https://webpack.js.org/configuration/dev-server/)都支持。注意：

  - 有些值像 `host`、`port` 和 `https` 可能会被命令行参数覆写。
  - 有些值像 `publicPath` 和 `historyApiFallback` 不应该被修改，因为它们需要和开发服务器的 [publicPath](https://cli.vuejs.org/zh/config/#publicpath) 同步以保障正常的工作。

```js
devServer:{
    host: 'localhost',
    port: 8090, // 端口号
    hotOnly: false, // 热更新
    https: false,// https:{type:Boolean}配置前缀
    open: false,//配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'url',
        // 是否允许跨域
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, //如果要代理 websockets，配置这个参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
```

###### 完整配置

```js
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === 'production'? '': '/', // 通常用于确定在开发环境还是生产环境
  outputDir:'dist', // 打包文件输出目录, 默认打包到dist文件下
  assetsDir:'static', // 放置静态资源
  pages:{
    index:{
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 修改模板引擎title
      title:"Vue3 学习",
      // 在 dist/index.html 的输出
      filename: 'index.html',
    }
  },
  lintOnSave: false, // 设置是否在开发环境下每次保存代码时都启用 eslint验证
  runtimeCompiler:false, // 是否使用带有浏览器内编译器的完整构建版本
  configureWebpack: { // 别名配置
    resolve: {
      alias: {
        'src': '@', // 默认已配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
        'plugins': '@/plugins',
        'utils': '@/utils',
      }
    }
  },
  //打包的css路径及命名
  css: {
    modules: false,
    //vue 文件中修改css 不生效 注释掉  extract:true
    extract: {
      filename: "style/[name].[hash:8].css",
      chunkFilename: "style/[name].[hash:8].css"
    }
  },
  chainWebpack:config => { // 允许对内部的 webpack 配置进行更细粒度的修改。
    config.module
    .rule('images')
      .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))
  },
  devServer:{
    host: 'localhost',
    port: 8090, // 端口号
    hotOnly: false, // 热更新
    https: false,// https:{type:Boolean}配置前缀
    open: false,//配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'url',
        // 是否允许跨域
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, //如果要代理 websockets，配置这个参数
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

#### 2、Vue3核心语法

关于`Composition API`这里有大佬做的动画演示，极力推荐。

[那个忙了一夜的Vue3动画很好，就是太短了](https://juejin.cn/post/6891640356543627278)

**Option的缺陷--反复横跳**

```js
// options API
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { 
      type: String,
      required: true
    }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // 使用 `this.user` 获取用户仓库
    }, // 1
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}

```

这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地**“反复跳转”**相关代码的选项块。

需求复杂之后，就会多出watch，computed，inject，provide等配置，这个.vue文件也会逐渐增大。

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bd101840df446c78d52e9c14711aae7~tplv-k3u1fbpfcp-watermark.image)

##### Composition API

- composition就是为了解决这个问题存在的，通过组合的方式，把零散在各个data，methods的代码，重新组合，一个功能的代码都放在一起维护，并且这些代码可以单独拆分成函数

- `Vue3`兼容大部分`Vue2`语法，所以在`Vue3`中书写`Vue2`语法是没有问题的（废除的除外）

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d05799744a6341fd908ec03e5916d7b6~tplv-k3u1fbpfcp-watermark.image)

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4146605abc9c4b638863e9a3f2f1b001~tplv-k3u1fbpfcp-watermark.image)

###### setup

作为组合式 API 的入口。 `setup` 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

`setup`只在初始化时执行一次，类似`created()`一样。

```js
beforeCreate(){
  console.log('beforeCreate')
},
created() {
   console.log('created')
},
setup(props) {
   console.log('setup') 
}
// setup
// beforeCreate
// created
```

根据控制台打印循序可以看到`setup`是在`beforeCreate`生命周期之前执行的。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。由此可以推断出`setup`执行的时候,组件对象还没有创建,组件实例对象`this`还不可用,此时`this`是`undefined`, 不能通过`this`来访问`data/computed/methods/props`。

**setup的使用**

```js
// html
<button @click="handelClick">{{name}}</button>
// js
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
setup(props) {
    const state = reactive({
      name:'点击'
    })
     const handelClick =() => {
      console.log('handelClick')
    }
     // 这里返回的任何内容都可以用于组件的其余部分
    return {
        ...toRefs(state),
        handelClick
    }
  }
```

###### ref 响应式变量

在 Vue 3.0 中，我们可以通过一个新的 `ref` 函数使任何响应式变量在任何地方起作用，如下所示：

```js
import { ref } from 'vue'
const counter = ref(0)
```

![1624957698322.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/764a90724aef4f9d815d2c5e3a0418de~tplv-k3u1fbpfcp-watermark.image)

`ref` 接收参数并将其包裹在一个带有 `value` property 的对象中返回，然后可以使用该 property 访问或更改响应式变量的值：

```js
import { ref } from 'vue'
const count = ref(0)
const handelClick =() => {
    // 需要使用xxx.value的形式，而模板中不需要添加.value
	console.log(count.value)
}
```

举个栗子：点击事件触发count增加

```html
<template>
  <div>{{count}}</div>
  <button @click='handelClick'>点击</button>
</template>
```

在vue2中

```js
data() {
  return {
    conunt: 0,
  };
},
methods: {
  handelClick() {
    // 需要使用xxx.value的形式，而模板中不需要添加.value
    this.conunt++;
  },
},
```

在vue3中

```js
import { ref } from 'vue'
setup() {
    const count = ref(0)
    const handelClick =() => {
      count.value++
    }
    return {
        count,
        handelClick
    }
}
```

###### reactive

```js
const obj = reactive(obj)
```

响应式转换是“深层”的——它影响所有嵌套 property。在基于 [ES2015 Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的实现中，返回的 proxy 是**不**等于原始对象的。建议只使用响应式 proxy，避免依赖原始对象。**处理更复杂的数据，通常用于对象和数组**

模拟ajax请求返回一段数组

```js
// html
<banner :bannerList="bannerList"></banner>
// js
import { defineComponent, reactive, toRefs, ref } from 'vue'
import api from '@/api/api.js'
setup() {
    const state = reactive({
      bannerList: [], // 轮播图
    })
    const getBanners = async () => {
      const {code,data} = await api.queryBannersByPosition({position:1})
      if(code == 1) {
        state.bannerList = data;
      }
    }
    getBanners();
    return {
      ...toRefs(state),
    }
  }
```

###### toRefs

将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)`

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
  // 操作 state 的逻辑

  // 返回时转换为ref
  return {
      //通过toRefs返回的对象,解构出来的属性也是响应式的
      ...toRefs(state)
  }
}
export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

###### computed计算属性

与`Vue2`中的`computed`配置功能一致，返回的是一个`ref`类型的对象，计算属性的函数中如果只传入一个回调函数 表示的是`get`操作

```js
// html
<div>{{user}}</div>
// js
import { defineComponent, reactive,  computed } from 'vue'
// 计算属性computed
setup() {
    const objname = reactive({name:'我的对象'})
    const user = computed(() => {
        return objname.name + '是谁'
    })
    return {
        user
    }
}
```

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
const user2 = computed({
    get() {
        return objname2.name+ '_'+ objname2.age
    },
    set(val) {
        const age = val.split("_")
        objname2.name = objname2.name + age[1]
    }
})
```

###### watch侦听器

和vue2用法一致，默认情况下，它也是惰性的，即只有当被侦听的源发生变化时才执行回调。

- 参数1:要监听的数据源
- 参数2:回调函数
- 参数3:配置

**侦听单个数据源**

侦听器数据源可以是返回值的 getter 函数，也可以直接是 `ref`：

```js
// 侦听一个 getter
const state = reactive({
    bannerList: [], // 轮播图
    name:'点击2',
    count: 0
})
const handelClick2 =() => {
      state.count++
    }
watch(
  () => state.count,
  (count, prevCount) => {
   console.log('我被监听了',count, prevCount); //logs: 1, 0
  }
)
return {
    ...toRefs(state),
    handelClick2
}
// 直接侦听ref
const count = ref(0)
watch(count, (count, prevCount) => {
  console.log('我被监听了',count, prevCount); //logs: 1, 0
})
```

**侦听多个数据源**

`watch`监听多个数据,使用数组

```js
const firstName = ref('');
const lastName = ref('');

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues);
})

firstName.value = "John"; // logs: ["John",""] ["", ""]
lastName.value = "Smith"; // logs: ["John", "Smith"] ["John", ""]
```

**侦听响应式对象**

使用侦听器来比较一个数组或对象的值，这些值是响应式的，要求它有一个由值构成的副本。

```js
const numbers = reactive([1, 2, 3, 4])

watch(
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers);
  })

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]
```

###### watchEffect

为了根据响应式状态*自动应用*和*重新应用*副作用，我们可以使用 `watchEffect` 方法。它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

对比：

`watch`当值监听到变化的时候才执行，但可以通过配置`immediate`为`true`, 来指定初始时立即执行第一次。

`watchEffect`可以立即执行第一次。

```js
const count = ref(0)
watchEffect(() => {
	console.log('我被监听了',count.value); // logs: 我被监听了 0
})
```

**停止侦听**

当 `watchEffect` 在组件的 [setup()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 函数或[生命周期钩子](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

在一些情况下，也可以显式调用返回值以停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

###### 生命周期钩子

你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部调用生命周期钩子：

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |

TIP

因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

**新的生命周期**

```js
setup(props,context) {
    onBeforeMount(() => {
        console.log('onBeforeMount')
    })
    onMounted(() => {
        console.log('onMounted')
    })
    onBeforeUpdate(() => {
        console.log('onBeforeUpdate');
    })
    // 视图更新时渲染
    onUpdated(() => {
        console.log('onUpdated');
    })
    onUnmounted(() => {
        console.log('onUnmounted')
    })
    // 首次渲染执行
    onRenderTracked(() => {
        console.log('onRenderTracked')
    })
    // 页面重新渲染
    onRenderTriggered(() => {
        console.log('onRenderTriggered')
    })
    const name = ref('张三')
    const handelClick = () => {
        name.value = 'wujf'
    }
    return {
        name,
        handelClick
    }
```

###### provide 与 inject

我们也可以在组合式 API 中使用 [provide/inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html)。两者都只能在当前活动实例的 [`setup()`](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 期间调用。

作用：实现跨层级组件间通信

`provide` 函数允许你通过两个参数定义 property：

1. name (`<String>` 类型)
2. value

```js
provide(name,value)
```

```js
// 父组件
<template>
  <div>
    <My-Map></My-Map>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, computed, watch,watchEffect, provide } from 'vue'
import MyMap from '@/components/my-map/my-map.vue'
export default defineComponent({
  components:{
    MyMap
  },
  // provide 与 inject的用法
  setup() {
    const msg = ref('子组件传递信息')
    const state = reactive({
      obj:{
        name: '网校账',
        age: 19
      }
    })
    provide('msg',msg)
    provide('obj',state.obj)
  }
})
</script>
```

`inject` 函数有两个参数：

1. 要 inject 的 property 的 name
2. 默认值 (**可选**)

```js
inject(name)
```

```js
<template>
<!-- 子组件 my-map.vue -->
  <div>
    {{msgF}}
    <div>
      名字：{{obj.name}} / 年龄：{{obj.age}}
    </div>
  </div>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  // inject的用法
  setup() {
    const msgF = inject('msg')
    const obj = inject('obj')
    return {
      msgF,
      obj
    }
  }
})
</script>
```

传给子孙组件

```js
// 父组件
provide('my-map-son',state.obj)
<template>
<!-- 子孙组件 my-map-son.vue -->
  <div>
    <div>
      名字：{{obj.name}} / 年龄：{{obj.age}}
    </div>
  </div>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  // provide 与 inject的用法
  setup() {
    const obj = inject('my-map-son')
    return {
      obj
    }
  }
})
</script>
```

###### setup参数的使用

使用 `setup` 函数时，它将接收两个参数：

1. `props`
2. `context`

**props**: 是一个对象,里面有父级组件向子级组件传递的数据,并且是在子级组件中使用`props`接收到的所有的属性

```js
<!-- 父组件 -->
<template>
  <div>
    <My-Map :list="list"></My-Map>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import MyMap from '@/components/my-map/my-map.vue'
export default defineComponent({
  components:{
    MyMap
  },
  // provide 与 inject的用法
  setup() {
    const list = [1,2,3,4]
    return {
      list
    }
  }
})
</script>
// 子组件
<template>
<!-- 子组件 my-map.vue -->
  <div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props:{
    list:{
      type: Array,
      default: () => []
    }
  },
  components:{
    MyMapSon
  },
  setup(props) {
    console.log(props.list) // [1, 2, 3, 4]
  }
})
</script>
```

**注意的一点**：因为 `props` 是响应式的，你**不能使用 ES6 解构**，它会消除 prop 的响应性。

如果需要解构 prop，可以在 `setup` 函数中使用 [`toRefs`](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#响应式状态解构) 函数来完成此操作：

```js
import { toRefs } from 'vue'
setup(props) {
  const { title } = toRefs(props)
  console.log(title.value)
}
```

**Context**：传递给 `setup` 函数的第二个参数是 `context`。`context` 是一个普通的 `JavaScript` 对象，它暴露组件的三个 `property`：

```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象),获取当前组件标签上所有没有通过props接收的属性的对象, 相当于 this.$attrs
    console.log(context.attrs)

    // 插槽 (非响应式对象),包含所有传入的插槽内容的对象, 相当于 this.$slots
    console.log(context.slots)

    // 触发事件 (方法),用来分发自定义事件的函数, 相当于 this.$emit
    console.log(context.emit)
  }
}
```

`context` 是一个普通的 `JavaScript` 对象，也就是说，它不是响应式的，这意味着你可以安全地对 `context` 使用 ES6 解构。

```js
// MyBook.vue
export default {
  setup(props, { attrs, slots, emit }) {
    ...
  }
}
```

`attrs`使用：获取子组件自定义的数据

```js
// 父组件
<template>
  <div>
      <my-son msg="打得你叫爸爸"></my-son>
  </div>
</template>
// 子组件
<template>
  <div>
    子组件
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props,{attrs, slots, emit}) {
    console.log(attrs.msg) // 打得你叫爸爸
  },
})
</script>
```

`slots`使用

```js
// 父组件
<template>
  <div>
      <my-son msg="打得你叫爸爸">
          获取插槽的内容
	  </my-son>
  </div>
</template>
// 子组件
<template>
  <div>
    子组件
  </div>
</template>
<script>
import { defineComponent,h } from 'vue'

export default defineComponent({
  setup(props,{attrs, slots, emit}) {
    console.log(attrs.msg) // 打得你叫爸爸
    console.log(slots.default()) // 
    return ()=> h('div',{},slots.default()) // 输出自定义组件插槽的内容
  },
})
</script>

```

输出自定义组件插槽内容：

![1625043016074.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a851d3d590ef4167ac02442494bd21d3~tplv-k3u1fbpfcp-watermark.image)

`emit`使用：向父组件派发事件

```js
// 父组件
<my-son  @change="handelChange">
</my-son>
setup() {
    const handelChange =() => {
      console.log('23456')
    }
    return {
      handelChange,
    }
  },
// 子组件
<template>
  <div>
    <button @click="handelClick"> 子组件</button>
  </div>
</template>
<script>
import { defineComponent,h } from 'vue'

export default defineComponent({
  setup(props,{attrs, slots, emit}) {
    const handelClick =() => {
      emit('change')
    }
    return {
      handelClick
    }
  },
})
</script>

```

![1625043416118.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e2245a2647b4e92a3b1978d216bf18f~tplv-k3u1fbpfcp-watermark.image)

###### Teleport传送门

可以选择挂载到指定的dom节点

语法：

```html
// to 指定的节点位置 如：.box  , #warp 对的
<teleport to="body">
    // html
</teleport>
```

举个栗子：把一个阴影层覆盖整个`body`

```js
<template>
  <div>
    <div class="box">
      <button  @click='clickBtn'>点击</button>
      // to 指定挂在的元素位置
      <teleport to="body">
        <div v-show="show" class="mask">
        
        </div>
      </teleport>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const clickBtn =() => {
      show.value = !show.value
    }
    return {
      clickBtn,
      show
    }
  },
})
</script>

<style>
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background-color: aqua;
      z-index: 10;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
      opacity: .5;
    }
  </style>
```

效果：

初始位置：

```html
<div v-show="show" class="mask">

</div>
```

![1625037369006.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbbf432b12bc4589bd0075ece72e2d44~tplv-k3u1fbpfcp-watermark.image)

使用`teleport`后，mask阴影层已挂在body下面了。

```html
<teleport to="body">
<div v-show="show" class="mask">

</div>
</teleport>
```

![1625037369006.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f54ac670cf9a4375b108057c5b8cbfc3~tplv-k3u1fbpfcp-watermark.image)







![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ee577207b4a488d953c985dba7bc9a2~tplv-k3u1fbpfcp-watermark.image)