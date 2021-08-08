const path = require("path");

module.exports = {
  pages:{
    index:{
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 修改模板引擎title
      title:"微前端模板",
      // 在 dist/index.html 的输出
      filename: 'index.html',
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  devServer: {
    port: 9999,
    open: true,
    disableHostCheck: true,
  },
};
