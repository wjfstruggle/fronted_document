#### 1.webpack简单说明

##### 1.1webpack是什么

- webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序； 
- 我们来对上面的解释进行拆解： p打包bundler：webpack可以将帮助我们进行打包，所以它是一个打包工具 p静态的static：
- 这样表述的原因是我们最终可以将代码打包成最终的静态资源（部署到静态服务器）； 
- 模块化module：webpack默认支持各种模块化开发，ES Module、CommonJS、AMD等；
- 现代的modern：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了webpack的出现和发展。

- vue-cli-serve运行过程

![img](https://img-blog.csdnimg.cn/2021060608442696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dlYl9TdHJ1Z2dsZQ==,size_16,color_FFFFFF,t_70)

##### 1.2安装

首先我们创建一个目录，初始化 npm，然后 [在本地安装 webpack](https://www.webpackjs.com/guides/installation#local-installation)，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```shell
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

- `webpack`的安装目前分为两个：`webpack、webpack-cli` 

   那么它们是什么关系呢？ 

-  执行`webpack`命令，会执行`node_modules`下的`.bin`目录下的`webpack`； 

- `webpack`在执行时是依赖`webpack-cli`的，如果没有安装就会报错； 

-  而`webpack-cli`中代码执行时，才是真正利用webpack进行编译和打包的过程； 

-  所以在安装`webpack`时，我们需要同时安装`webpack-cli`（第三方的脚手架事实上是没有使用`webpack-cli`的，而是类似于 自己的`vue-service-cli`的东西）

##### 1.3webpack官网文档

- webpack的官方文档是https://webpack.js.org/ 

- webpack的中文官方文档是https://webpack.docschina.org/ 
-  DOCUMENTATION：文档详情，也是我们最关注的  点击DOCUMENTATION来到文档页： 
-  API：API，提供相关的接口，可以自定义编译的过程（比如自定义loader和Plugin可以参考该位置的API） 
-  BLOG：博客，等同于上一个tab的BLOG，里面有一些博客文章； 
-  CONCEPTS：概念，主要是介绍一些webpack的核心概念，比如入口、出口、`Loaders`、`Plugins`等等，但是这里并没有一些对它 们解析的详细API； 
-  CONFIGURATION：配置，webpack详细的配置选项，都可以在这里查询到，更多的时候是作为查询手册； 
- GUIDES：指南，更像是`webpack`提供给我们的教程，我们可以按照这个教程一步步去学习webpack的使用过程； 
-  LOADERS：`loaders`，`webpack`的核心之一，常见的loader都可以在这里查询到用法，比如`css-loader`、`babel-loader`、lessloader等等； 
-  PLUGINS：`plugins`，`webpack`的核心之一，常见的`plugin`都可以在这里查询到用法，比如`BannerPlugin`、 `CleanWebpackPlugin`、`MiniCssExtractPlugin`等等；

##### 1.4传统开发存在的问题

- 我们的代码存在什么问题呢？某些语法浏览器是不认识的（尤其在低版本浏览器上） 
- 1.使用了ES6的语法，比如const、箭头函数等语法； 
- 2.使用了ES6中的模块化语法； 
- 3.使用CommonJS的模块化语法；

```js
// add.js
export const add = (x,y) => {
  return x + y
}
// index.js
import { add } from './js/add.js'
console.log(add(1,2))

// html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
</body>
<script src="./src/index.js"></script> // Uncaught SyntaxError: Cannot use import statement outside a module
</html>
```

- 显然，上面存在的问题，让我们在发布静态资源时，是不能直接发布的，因为运行在用户浏览器必然会存在各种各 样的兼容性问题。    
- 我们需要通过某个工具对其进行打包，让其转换成浏览器可以直接识别的语法；

##### 1.5webpack默认打包

- 我们可以通过webpack进行打包，之后运行打包之后的代码 
- 在目录下直接执行 webpack 命令 ， 生成一个dist文件夹，里面存放一个main.js的文件，就是我们打包之后的文件
- 我们发现是可以正常进行打包的，但是有一个问题，webpack是如何确定我们的入口的呢？ 
- 事实上，当我们运行webpack时，webpack会查找当前目录下的 src/index.js作为入口； 
- 所以，如果当前项目中没有存在src/index.js文件，那么会报错；

##### 1.6Webpack配置文件

- 可以在根目录下创建一个webpack.config.js文件，来作为webpack的配置文件

```js
const path = require('path')
module.exports = {
  entry:'./src/index.js', // 入口文件
  output:{
    filename: 'main.js', // 打包后的文件名
    // 必须是一个绝对路径
    path: path.resolve(__dirname, './dist') // dist文件夹下
  }
}
```



#### 2.webpack的核⼼配置选项和`css-loader` `file-loader`

​	**webpack默认打包JS文件的**

- 但是遇到css文件，img文件等直接打包就会出错

```js
// document.js
export const documentHtml =() =>{
  let div = document.createElement('div')
  div.innerHTML = "hello world"
  div.className = 'box'
  document.body.appendChild(div);
  return div;
}
// index.js
import { add } from './js/add.js'
import { documentHtml } from './js/document.js'
import './css/index.css' // 引入css文件
console.log(add(1,2))
documentHtml();
```

- 继续编译命令`npm run build`

![img](https://img-blog.csdnimg.cn/20210606102254780.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dlYl9TdHJ1Z2dsZQ==,size_16,color_FFFFFF,t_70)

##### 2.1css-loader的使用

- `loader`是什么呢？ 

  - `loader `可以用于对模块的源代码进行转换； 

  - 我们可以将`css`文件也看成是一个模块，我们是通过import来加载这个模块的； 

  - 在加载这个模块时，`webpack`其实并不知道如何对其进行加载，我们必须制定对应的`loader`来完成这个功能；

- `css-loader`的安装：

```shell
npm install css-loader -D
npm install style-loader -D // 页面生成style标签的关键loader
```

##### 2.2loader配置方式

- 配置方式表示的意思是在我们的webpack.config.js文件中写明配置信息： 
  - module.rules中允许我们配置多个loader（因为我们也会继续使用其他的loader，来完成其他文件的加载）； 
  -  这种方式可以更好的表示loader的配置，也方便后期的维护，同时也让你对各个Loader有一个全局的概览。

- `module.rules`的配置如下： 
-  rules属性对应的值是一个数组：[Rule] 
-  数组中存放的是一个个的Rule，Rule是一个对象，对象中可以设置多个属性： 
  - test属性：用于对 resource（资源）进行匹配的，通常会设置成正则表达式； 
  -  use属性：对应的值时一个数组：[UseEntry]  UseEntry是一个对象，可以通过对象的属性来设置一些其他属性  loader：必须有一个 loader属性，对应的值是一个字符串；  options：可选的属性，值是一个字符串或者对象，值会被传入到loader中；query：目前已经使用options来替代；  传递字符串（如：use: [ 'style-loader' ]）是 loader 属性的简写方式（如：use: [ { loader: 'style-loader'} ]）； 
  -  loader属性： Rule.use: [ { loader } ] 的简写

```js
const path = require('path')
module.exports = {
  entry:'./src/index.js',
  output:{
    filename: 'main.js',
    // 必须是一个绝对路径
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },{
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ]
      }
    ]
  }
}
```

##### 2.3其他css处理器loader的使用

```shell
// sass语法
npm install sass-loader -D
npm install node-sass -D
// less语法
npm install less-loader -D
// 配置几乎和`css-loader`配置一样的
```

#### 3.加载和处理其他资源

##### 3.1 file-loader的使用

- 要处理jpg、png等格式的图片，我们也需要有对应的`loader`：`file-loader` `pfile-loader`的作用就是帮助我们处理`import/require()`方式引入的一个文件资源，并且会将它放到我们输出的 文件夹中； 
- 当然我们待会儿可以学习如何修改它的名字和所在文件夹；

```js
import zznhImg from '../img/zznh.png' // 引入img图片
export const documentHtml =() =>{
  // 图片加载
  let img = new Image();
  img.src = zznhImg;
  document.body.appendChild(img);
  return div;
}
```

- 安装file-loader：

```shell
npm install file-loader -D
```

- 配置处理图片的Rule：

```js
{
    test: /\.(png|jpe?g|gif|svg)$/i,
    use:{
    loader: 'file-loader',
    // 配置文件名和输出文件夹
    options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "img"
   	 }
  }
}
```

##### 3.2`asset module type`的介绍

- 当前使用的webpack版本是webpack5 
  - 在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader； 
  - 在webpack5之后，我们可以直接使用资源模块类型（asset module type），来替代上面的这些loader；  
- 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader： 
  - asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现； 
  - asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现； 
  - asset/source 导出资源的源代码。之前通过使用 raw-loader 实现； 
  - asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源 体积限制实现；

**比如加载图片**

- 使用以下方式

```js
{
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset/resource",
}

// 修改output，添加assetModuleFilename属性
output:{
    filename: 'main.js',
    // 必须是一个绝对路径
     path: path.resolve(__dirname, './dist'),
     assetModuleFilename:"[name].[hash:8].[ext]",// `asset module type`方式
},
```

##### 3.3认识Plugin

- Loader是用于特定的模块类型进行转换
- Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等

![img](https://img-blog.csdnimg.cn/20210606151419505.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dlYl9TdHJ1Z2dsZQ==,size_16,color_FFFFFF,t_70)

###### CleanWebpackPlugin

- 前面我们演示的过程中，每次修改了一些配置，重新打包时，都需要手动删除dist文件夹：
- 我们可以借助于一个插件来帮助我们完成，这个插件就是CleanWebpackPlugin；

```shell
npm install clean-webpack-plugin -D
```

```js
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
module:{},
// 插件配置
plugins:[
 new CleanWebpackPlugin()
]
```

###### HtmlWebpackPlugin

- 我们的HTML文件是编写在根目录下的，而最终打包的dist文件夹中是没有index.html文件的。 
- 在进行项目部署的时，必然也是需要有对应的入口文件index.html； 
- 所以我们也需要对index.html进行打包处理； 
-  对HTML进行打包处理我们可以使用另外一个插件：HtmlWebpackPlugin；

```shell
npm install html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module:{},
// 插件配置
plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title:'webpack学习'
    })
]
```

###### 生成的index.html分析

- 如果我们想在自己的模块中加入一些比较特别的内容
  - 比如添加一个noscript标签，在用户的JavaScript被关闭时，给予响应的提示；
  - 比如在开发vue或者react项目时，我们需要一个可以挂载后续组件的根标签 

- 这个我们需要一个属于自己的index.html模块 

```html
// Vue中的模板
<!DOCTYPE html>
<html lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
      Please enable it to continue.</strong>
  </noscript>
  <div id="app"></div>
  <!-- built files will be auto injected -->
</body>
</html>
```

###### 自定义模板数据填充

- 上面的代码中，会有一些类似这样的语法<% 变量 %>，这个是EJS模块填充数据的方式
- 配置如下

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 插件配置
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack学习',
      template:'./public/index.html'
    })
  ]
```

#### 4.深⼊解析Babel和webpack中配置

##### 4.1为什么需要babel？

- 事实上，在开发中我们很少直接去接触babel，但是babel对于前端开发来说，目前是不可缺少的一部分： 
  - 开发中，我们想要使用ES6+的语法，想要使用TypeScript，开发React项目，它们都是离不开Babel的； 
  - 所以，学习Babel对于我们理解代码从编写到线上的转变过程直观重要； 
  - 了解真相，你才能获得真知的自由！ 

- 那么，Babel到底是什么呢？ pBabel是一个工具链，主要用于旧浏览器或者缓解中将ECMAScript 2015+代码转换为向后兼容版本的 JavaScript； 
- 包括：语法转换、源代码转换、Polyfill实现目标缓解缺少的功能等

##### 4-2插件的使用

- babel本身可以作为一个独立的工具（和postcss一样），不和webpack等构建工具配置来单独使用
- babel本身可以作为一个独立的工具（和postcss一样），不和webpack等构建工具配置来单独使用
  - @babel/core：babel的核心代码，必须安装
  - @babel/cli：可以让我们在命令行使用babel

```shell
npm install @babel/cli @babel/core
```

- 使用babel来处理我们的源代码
  - src：是源文件的目录；
  - --out-dir：指定要输出的文件夹dist

```shell
npx babel src --out-dir dist
```

- 比如我们需要转换箭头函数，var 命令，严格函数等等

**我们可以使用预设（preset）**

- 安装@babel/preset-env预设：

```shell
npm install @babel/preset-env -D
```

```shell
执行以下命令： npx babel src --out-dir dist --presets=@babel/preset-env
```

```js
src/index.js
const info = "hello world"
const add = (info) => {
  console.log(info)
}
add();


dist/index.js
"use strict";
var info = "hello world";
var add = function add(info) {
  console.log(info);
};
add();
```

##### 4-3Babel的底层原理

- babel是如何做到将我们的一段代码（ES6、TypeScript、React）转成另外一段代码（ES5）的呢
  - 从一种源代码（原生语言）转换成另一种源代码（目标语言），这是什么的工作呢
  - 就是编译器，事实上我们可以将babel看成就是一个编译器
  - Babel编译器的作用就是将我们的源代码，转换成浏览器可以直接识别的另外一段源代码；
- Babel也拥有编译器的工作流程
  - 解析阶段（Parsing）
  - 转换阶段（Transformation）
  - 生成阶段（Code Generation）

![img](https://img-blog.csdnimg.cn/20210609222429925.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dlYl9TdHJ1Z2dsZQ==,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20210609222528914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dlYl9TdHJ1Z2dsZQ==,size_16,color_FFFFFF,t_70)

**babel-loader**

- 在实际开发中，我们通常会在构建工具中通过配置babel来对其进行使用的，比如在webpack中
- 我们可以设置一个规则，在加载js文件时，使用我们的babel

```js
{
    test:/\.js$/,
    use:{
        loader:'babel-loader',
    }
}
```

**babel-preset**

- 如果我们一个个去安装使用插件，那么需要手动来管理大量的babel插件，我们可以直接给webpack提供一个 preset，webpack会根据我们的预设来加载对应的插件列表，并且将其传递给babel
- 比如常见的预设有三个
  - env
  - react
  - TypeScript

```js
// 安装preset-env
npm install @babel/preset-env
```

##### 4.4Babel的配置文件

- 像之前一样，我们可以将babel的配置信息放到一个独立的文件中，babel给我们提供了两种配置文件的编写：
  - babel.config.json（或者.js，.cjs，.mjs）文件；
  - babel.config.json（或者.js，.cjs，.mjs）文件；
- .babelrc.json：早期使用较多的配置方式，但是对于配置Monorepos项目是比较麻烦的；
- babel.config.json（babel7）：可以直接作用于Monorepos项目的子包，更加推荐

```js
{
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              ["@babel/preset-env"]
            ]
            // plugins:[
            //   "@babel/plugin-transform-block-scoping",
            //   "@babel/plugin-transform-arrow-functions"
            // ]
          }
        }
      }
```

**配置babel.config.js**

```js
// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env"]
  ]
}
// webpack.config.js
把babel配置的预设封装到babel.config.js里面。
// npm run build 即可把es6代码打包成es5的代码
```

#### 5.DevServer和HMR

##### 5.1为什么要搭建本地服务器？

- 目前我们开发的代码，为了运行需要有两个操作
  - 操作一：npm run build，编译相关的代码；
  - 操作二：通过live server或者直接通过浏览器，打开index.html代码，查看效果；
- 这个过程经常操作会影响我们的开发效率，我们希望可以做到，当文件发生变化时，可以自动的完成 编译 和 展示
- 为了完成自动编译，webpack提供了几种可选的方式：
  - webpack watch mode：
  - webpack-dev-server；
  - webpack-dev-middlewar

##### 5.2Webpack watch

- webpack给我们提供了watch模式
  - 在该模式下，`webpack`依赖图中的所有文件，只要有一个发生了更新，那么代码将被重新编译
  - 我们不需要手动去运行 npm run build指令了
- 如何开启watch呢？两种方式
  - 方式一：在导出的配置中，添加 watch: true；
  - 方式二：在启动`webpack`的命令中，添加 --watch的标识
- 这里我们选择方式二，在`package.json的 scripts `中添加一个 watch 的脚本：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch",
  },
```

```shell
执行  npm run watch // 修改代码，即可自动编译代码，刷新浏览器就可以了。
```

##### 5.3webpack-dev-server

- 上面的方式可以监听到文件的变化，但是事实上它本身是没有自动刷新浏览器的功能的：
  - 当然，目前我们可以在VSCode中使用live-server来完成这样的功能；
  - 但是，我们希望在不适用`live-server`的情况下，可以具备`live reloading`（实时重新加载）的功能；
- 安装webpack-dev-server

```shell
npm install --save-dev webpack-dev-server
```

- 添加一个新的scripts脚本

```json
"serve": "webpack serve"
```

```js
启动浏览器：输入http://localhost:8080/  默认8080端口
执行  npm run serve // 修改代码，即可自动编译代码，浏览器就可以自动刷新。
```

##### 5.4webpack-dev-middleware

- 默认情况下，`webpack-dev-server`已经帮助我们做好了一切
  - 比如通过`express`启动一个服务，比如HMR（热模块替换）
  - 如果我们想要有更好的自由度，可以使用`webpack-dev-middleware`；
- 什么是`webpack-dev-middleware`？
  - `webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 `server`；
  - `webpack-dev-server` 在内部使用了它，然而它也可以作为一个单独的 `package` 来使用，以便根据需求进行 更多自定义设置； 

**webpack-dev-middleware的使用**

安装 `express` 和 `webpack-dev-middleware`：

```bash
npm install --save-dev express webpack-dev-middleware
```

接下来我们需要对 webpack 的配置文件做一些调整，以确保中间件(middleware)功能能够正确启用：

**webpack.config.js**

```js
const { options } = require('less')
const path = require('path')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:"development",
  devtool:"source-map",
  entry:'./src/index.js',
  output:{
    filename: 'main.js',
    // 必须是一个绝对路径
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
    // assetModuleFilename:"[name].[hash:8].[ext]",// `asset module type`方式
  },
  devServer:{
    hot:true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader'
        }
      }
    ]
  },
  // 插件配置
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack学习'
    })
  ]
}
```

`publicPath` 也会在服务器脚本用到，以确保文件资源能够在 `http://localhost:8080 下正确访问，我们稍后再设置端口号。下一步就是设置我们自定义的 `express` 服务：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
  |- /node_modules
```

**server.js**

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 8080.
app.listen(8080, function () {
  console.log('webpack 热更新');
});
```

现在，添加一个 npm script，以使我们更方便地运行服务：

**package.json**

```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch",
    "serve": "webpack serve",
    "start": "webpack-dev-server --open",
    "server": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.14.3",
    "@babel/core": "^7.14.3",
    "@babel/preset-env": "^7.14.4",
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "css-loader": "^5.2.6",
    "express": "^4.17.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.1",
    "less": "^4.1.1",
    "less-loader": "^9.0.0",
    "node-sass": "^6.0.0",
    "sass-loader": "^12.0.0",
    "style-loader": "^2.0.0",
    "webpack": "^5.37.1",
    "webpack-cli": "^4.7.0",
    "webpack-dev-middleware": "^5.0.0",
    "webpack-dev-server": "^3.11.2"
  }
}

```

现在，在你的终端执行 `npm run server`，将会有类似如下信息输出：

```bash
Example app listening on port 8080!
<i> [webpack-dev-middleware] wait until bundle finished: /sockjs-node/info?t=1623594425941
asset main.js 1.4 KiB [emitted] (name: main) 1 related asset
asset index.html 234 bytes [emitted]
./src/index.js 1.21 KiB [built] [code generated]
webpack 5.38.1 compiled successfully in 1191 ms
```

现在，打开浏览器，跳转到 `http://localhost:8080`，你应该看到你的webpack 应用程序已经运行！

##### 5.5认识模块热替换（HMR）

**什么是HMR呢？** 

- `HMR`的全称是`Hot Module Replacement`，翻译为模块热替换； 

- 模块热替换是指在 应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个页面； 

-  `HMR`通过如下几种方式，来提高开发的速度： 

- 不重新加载整个页面，这样可以保留某些应用程序的状态不丢失； 

- 只更新需要变化的内容，节省开发的时间； p修改了css、js源代码，会立即在浏览器更新，相当于直接在浏览器的devtools中直接修改样式； 

-  如何使用HMR呢？ 

  - 默认情况下，`webpack-dev-server`s已经支持HMR，我们只需要开启即可； 

  - 在不开启HMR的情况下，当我们修改了源代码之后，整个页面会自动刷新，使用的是live reloading；

- 开启HMR，修改webpack的配置；

```js
devServer:{
    hot:true
  },
```

**框架的HMR**

- 有一个问题：在开发其他项目时，我们是否需要经常手动去写入 `module.hot.accpet`相关的API呢？ 
  - 比如开发Vue、React项目，我们修改了组件，希望进行热更新，这个时候应该如何去操作呢？ 
  - 事实上社区已经针对这些有很成熟的解决方案了： 
  - 比如vue开发中，我们使用vue-loader，此loader支持vue组件的HMR，提供开箱即用的体验； 
  - 比如react开发中，有React Hot Loader，实时调整react组件（目前React官方已经弃用了，改成使用react-refresh）； 

**React的HMR**

- 在之前，React是借助于`React Hot Loader`来实现的HMR，目前已经改成使用`react-refresh`来实现了
- 安装实现HMR相关的依赖

```shell
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

- 修改`webpack.config.js`和`babel.config.js`文件：

```js
//webpack.config.js
const ReactRefresgWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// 插件配置
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack学习'
    }),
    new ReactRefresgWebpackPlugin()
  ]
//babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env"]
  ],
  plugins:[
    ['react-refresh/babel']
  ]
}

```

**Vue的HMR**

- Vue的加载我们需要使用vue-loader，而vue-loader加载的组件默认会帮助我们进行HMR的处理
- 安装加载vue所需要的依赖

```shell
npm install vue-loader vue-template-compiler -D
```

- 修改`webpack.config.js`

```js
const { options } = require('less')
const path = require('path')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const loader = require('sass-loader')
module.exports = {
  mode:"development",
  devtool:"source-map",
  entry:'./src/index.js',
  output:{
    filename: 'main.js',
    // 必须是一个绝对路径
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
    // assetModuleFilename:"[name].[hash:8].[ext]",// `asset module type`方式
  },
  devServer:{
    hot:true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader'
        }
      },
      {
        test:/\.vue$/,
        use:{
          loader: 'vue-loader'
        }
      }
    ]
  },
  // 插件配置
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack学习'
    }),
    new VueLoaderPlugin()
  ]
}
```



#### 6.环境分离和代码分离

#### 7.DLL_Tree Shaking

#### 8.Tree Shaking以及其他优化

#### 9.打包分析和webpack源码

#### 10.自定义Loader

#### 11.自定义Plugin

#### 12.⾃动化构建⼯具gulp

#### 13.模块化打包构建⼯具rollup

#### 14.开发模式构建工具vite