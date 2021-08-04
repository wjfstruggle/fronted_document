const path = require('path');
//这个 name 默认从 package.json 获取，可以自定义，只要和父项目注册时的 name 保持一致即可。
const { name } = require('./package');
const {
    assetsDir,
    outputDir,
    devPort } = require("./src/config/settings")

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    outputDir: outputDir,
    assetsDir: assetsDir,
    filenameHashing: true,
    devServer: {
        // host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        port: devPort,
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
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/icons'))
            .end()
            .use('file-loader')
            .loader('file-loader')
    }
};
