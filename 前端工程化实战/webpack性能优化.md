## webpack性能优化

> 我花了 一下午的时间，把公司一个项目做了优化

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9194c600d524507afef14cd39f86aab~tplv-k3u1fbpfcp-watermark.image?)

今天主要讲解 `Webpack` 的配置，但是随着项目越来越大，构建速度可能会越来越慢，构建出来的`js`的体积也越来越大，此时就需要对 `Webpack` 的配置进行优化。

本文罗列出了几种优化方式，大家可以结合自己的项目，选择适当的方式进行优化。这些 `Webpack` 插件的源码我大多也没有看过，主要是结合 `Webpack` 官方文档以及项目实践，并且花了大量的时间验证后输出了本文，如果文中有错误的地方，欢迎在评论区指正。

[源码参考地址](https://github.com/wjfstruggle/web_study_p)

在这之前，我们先安装一个插件，这个插件可以检测到`webpack`各个插件和`loader`所花费的时间。

```bash
npm install speed-measure-webpack-plugin -d
```

- 安装完毕之后，使用如下

```js
// webpack.base.conf.js文件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const webpackConfig = {}
module.exports = smp.wrap(webpackConfig)
```

执行 `npm run build`，你会发现插件和`loader`的构建时间，接下来我们一一优化。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4e6999081354aa08d77f8394af430f0~tplv-k3u1fbpfcp-watermark.image?)

### 1.`exclude/include`

我们可以通过 `exclude`、`include` 配置来确保转译尽可能少的文件。顾名思义，`exclude` 指定要排除的文件，`include` 指定要包含的文件。

`exclude` 的优先级高于 `include`，在 `include` 和 `exclude` 中使用绝对路径数组，尽量避免 `exclude`，更倾向于使用 `include`。

```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  // use:["cache-loader","babel-loader"],
   include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
},
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
   include: [resolve('src/icons')],
   options: {
   symbolId: 'icon-[name]'
   }
}, 
```

下图是我未配置 `include` 和配置了 `include` 的构建结果对比：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce57550d946e477fb52d96080d2fce99~tplv-k3u1fbpfcp-watermark.image?)

### 2.`HardSourceWebpackPlugin`

`HardSourceWebpackPlugin`用于为模块提供中间缓存步骤。为了看到结果，你需要使用这个插件运行 `webpack` 两次：第一次构建需要正常的时间。第二次构建将明显更快。

使用`npm install --save-dev hard-source-webpack-plugin`。并将插件包含在 `webpack `的插件配置中。

```js
// webpack.config.js
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
 
module.exports = {
  context: // ...
  entry: // ...
  output: // ...
  plugins: [
    new HardSourceWebpackPlugin()
  ]
}
```

构建后的时间 38.21 secs -> 29.21 secs

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2ea0b79d7264f8493d8eb0896221afa~tplv-k3u1fbpfcp-watermark.image?)

> 如果用于大项目中，构建速度会很可观。

当然，`HardSourceWebpackPlugin` 会存在一些问题，可以根据官方文档进行查看 [HardSourceWebpackPlugin ](https://www.npmjs.com/package/hard-source-webpack-plugin)

### 3.抽离公共代码

抽离公共代码是对于多页应用来说的，如果多个页面引入了一些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要下载一次就缓存起来了，避免了重复下载。

抽离公共代码对于单页应用和多页应该在配置上没有什么区别，都是配置在 `optimization.splitChunks` 中。

```js
module.exports =  {
    optimization: {
      splitChunks: {//分割代码块
        cacheGroups: {
          vendor: {
            //第三方依赖
            priority: 1, //设置优先级，首先抽离第三方模块
            name: 'vendor',
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0,
            minChunks: 1 //最少引入了1次
          },
          //缓存组
          common: {
            //公共模块
            chunks: 'initial',
            name: 'common',
            minSize: 100, //大小超过100个字节
            minChunks: 3 //最少引入了3次
          }
        }
      }
    }
}
```

即使是单页应用，同样可以使用这个配置，例如，打包出来的 bundle.js 体积过大，我们可以将一些依赖打包成动态链接库，然后将剩下的第三方依赖拆出来。这样可以有效减小 bundle.js 的体积大小。当然，你还可以继续提取业务代码的公共模块。

### 4.babel 配置的优化

如果你对 `babel` 还不太熟悉的话，那么可以阅读这篇文章：[不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152)。

在不配置 `@babel/plugin-transform-runtime` 时，`babel` 会使用很小的辅助函数来实现类似 `_createClass` 等公共方法。默认情况下，它将被注入(`inject`)到需要它的每个文件中。但是这样的结果就是导致构建出来的JS体积变大。

我们也并不需要在每个 `js` 中注入辅助函数，因此我们可以使用 `@babel/plugin-transform-runtime`，`@babel/plugin-transform-runtime` 是一个可以重复使用 `Babel` 注入的帮助程序，以节省代码大小的插件。

因此我们可以在 `.babelrc` 中增加 `@babel/plugin-transform-runtime` 的配置。

```js
{
    "presets": [],
    "plugins": [
        [
            "@babel/plugin-transform-runtime"
        ]
    ]
}
```

### 5.提高效率的 plugin

(这些公司项目之前就已经加上去了)

- `webpack-dashboard`：可以更友好的展示相关打包信息。
- `webpack-merge`：提取公共配置，减少重复配置代码
- `speed-measure-webpack-plugin`：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
- `size-plugin`：监控资源体积变化，尽早发现问题
- `HotModuleReplacementPlugin`：模块热替换

### 6.MiniCssExtractPlugin 

迷你 CSS 提取插件

该插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它支持 CSS 和 SourceMaps 的按需加载。

它建立在新的 webpack v5 功能之上，需要 webpack 5 才能工作。

与 extract-text-webpack-plugin 相比：

- 异步加载
- 无重复编译（性能）
- 更容易使用
- 特定于 CSS

首先，需要安装`mini-css-extract-plugin`：

```bash
npm install --save-dev mini-css-extract-plugin
```

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

### 7.optimize-css-assets-webpack-plugin

优化 CSS 资产 Webpack 插件

一个用于优化\最小化 CSS 资产的 Webpack 插件。

> ⚠️对于 webpack v5 或更高版本，请改用[css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)。

它将在 Webpack 构建期间搜索 CSS 资源，并将优化\最小化 CSS（默认情况下它使用[cssnano](http://github.com/ben-eb/cssnano)，但可以指定自定义 CSS 处理器）。

解决[extract-text-webpack-plugin](http://github.com/webpack/extract-text-webpack-plugin) CSS 重复问题：

由于[extract-text-webpack-plugin](http://github.com/webpack/extract-text-webpack-plugin)仅捆绑（合并）文本块，如果它用于捆绑 CSS，则捆绑可能有重复的条目（块可以自由复制，但合并时可以创建重复的 CSS）。

安装：

```bash
npm install --save-dev optimize-css-assets-webpack-plugin
```

> ⚠️对于 webpack v3 或更低版本，请使用`optimize-css-assets-webpack-plugin@3.2.0`. 该`optimize-css-assets-webpack-plugin@4.0.0`版本及以上支持 webpack v4。

**webpack.config.js**

```js
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
};
```

该插件可以接收以下选项（都是可选的）：

- `assetNameRegExp`：一个正则表达式，指示应该优化\最小化的资产的名称。提供的正则表达式针对`ExtractTextPlugin`配置中实例导出的文件的文件名运行，而不是源 CSS 文件的文件名。默认为`/\.css$/g`
- `cssProcessor`：用于优化\最小化 CSS 的 CSS 处理器，默认为[`cssnano`](http://github.com/ben-eb/cssnano). 这应该是一个遵循`cssnano.process`接口的函数（接收 CSS 和选项参数并返回一个 Promise）。
- `cssProcessorOptions`: 传递给 的选项`cssProcessor`，默认为`{}`
- `cssProcessorPluginOptions`: 传递给 的插件选项`cssProcessor`，默认为`{}`
- `canPrint`：一个布尔值，指示插件是否可以将消息打印到控制台，默认为`true`

### 8.tree Shaking

webpack2.x开始⽀持tree shaking概念，顾名思义，"摇树"，就是清除无用css,js(Dead Code)

Dead Code⼀般具有以下⼏个特征：

- 代码不会被执⾏，不可到达
- 代码执⾏的结果不会被⽤到
- 代码只会影响死变量（只写不读）
- Js tree shaking只⽀持ES module的引⼊⽅式！！！！

#### Css tree shaking

```js
npm i glob-all purify-css purifycss-webpack --save-dev
复制代码
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
plugins:[
 new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Sharking 的路径文件
        path.resolve(__dirname, "./src/*.html"),// 同样需要对html文件进行tree shaking
        path.resolve(__dirname, "./src/*.js")
      ])
    }),
]
复制代码
```

#### JS tree shaking

只⽀持import⽅式引⼊，不⽀持commonjs的⽅式引⼊

案例：增加expo.js文件

```js
//expo.js
export const add = (a, b) => {
 return a + b;
};
export const minus = (a, b) => {
 return a - b;
};
复制代码
//index.js
import { add } from "./expo";
add(1, 2);
复制代码
//webpack.config.js
optimization: {
 usedExports: true // 哪些导出的模块被使⽤了，再做打包
}
复制代码
```

只要mode是production就会⽣效，mode是develpoment的tree shaking是不⽣效的，因为webpack为了⽅便你的调试。

可以查看打包后的代码注释以辨别是否⽣效。

⽣产模式不需要配置，默认开启。

参考文档：[webpack性能优化1](https://juejin.cn/post/6951297954770583565)

[带你深度解锁Webpack系列(优化篇)](https://juejin.cn/post/6844904093463347208)