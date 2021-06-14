const { options } = require('less')
const path = require('path')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const loader = require('sass-loader')
// const ReactRefresgWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
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
    // new ReactRefresgWebpackPlugin()
    new VueLoaderPlugin()
  ]
}