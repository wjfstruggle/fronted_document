const { options } = require('less')
const path = require('path')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:'./src/index.js',
  output:{
    filename: 'main.js',
    // 必须是一个绝对路径
    path: path.resolve(__dirname, './dist'),
    // assetModuleFilename:"[name].[hash:8].[ext]",// `asset module type`方式
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // type: "asset/resource", // `asset module type`方式
        use:{
          loader: 'file-loader',
          // 配置文件名和输出文件夹
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "img"
          }
        }
      }
    ]
  },
  // 插件配置
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack学习',
      template:'./public/index.html'
    })
  ]
}