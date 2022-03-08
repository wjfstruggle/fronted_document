module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === 'production'? '/production-sub-path/': '/', // 通常用于确定在开发环境还是生产环境
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
    hotOnly: true, // 热更新
    https: false,// https:{type:Boolean}配置前缀
    open: false,//配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // 是否允许跨域
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, //如果要代理 websockets，配置这个参数
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}