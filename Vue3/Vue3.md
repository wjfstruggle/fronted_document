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

###### `ref` 响应式变量

在 Vue 3.0 中，我们可以通过一个新的 `ref` 函数使任何响应式变量在任何地方起作用，如下所示：

```js
import { ref } from 'vue'
const counter = ref(0)
```

![1624957698322](C:\Users\伍剑锋\AppData\Roaming\Typora\typora-user-images\1624957698322.png)

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









![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ee577207b4a488d953c985dba7bc9a2~tplv-k3u1fbpfcp-watermark.image)