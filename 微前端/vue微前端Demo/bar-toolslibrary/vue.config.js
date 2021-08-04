const path = require('path');
//这个 name 默认从 package.json 获取，可以自定义，只要和父项目注册时的 name 保持一致即可。
const { name } = require('./package');
const {
    assetsDir,
    outputDir,
    devPort } = require("./src/config/setting")

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    outputDir,
    assetsDir,
    filenameHashing: true,
    devServer: {
        // host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        port: 20002,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    // 自定义webpack配置
    configureWebpack: {
        devtool: 'source-map',
        resolve: {
            alias: {
                '@': resolve('src'),
            },
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        },
    },
    chainWebpack(config) {
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
    }
}
