/**
 * @description cli配置
 */
const path = require('path')
const { publicPath, assetsDir,
  outputDir,
  lintOnSave,
  devPort } = require("./src/config")

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devServer: {
    open: false,   /* 是否自动打开浏览器 */
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: devPort,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  transpileDependencies: ['single-spa', 'qiankun'],
  chainWebpack(config) {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))

    // 分包
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        elementUI: {
          name: "chunk-elementUI",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    config.optimization.runtimeChunk("single");

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        },
      },
    },
  },
};
