const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  // 将编译后的代码映射回原始源代码。如果一个错误来自于 .js文件或其他，source map 就会明确的告诉你。
  devtool: 'inline-source-map',
  devServer:{
    static:false,
    port:8090,
    compress: true,
    hot:true
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    
    }
},
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  // loader配置规则
  module: {
    rules: [
      // 处理scss，style
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // 加载图片
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            // 图片压缩
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
      // 加载字体
    ]
  },
  // 插件plugin
  plugins:[
    new HtmlWebpackPlugin({title:"webpack demo"}),
    // 清理 /dist 文件夹
    new CleanWebpackPlugin(),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ]
}