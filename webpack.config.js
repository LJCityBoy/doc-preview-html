const path = require('path');

module.exports = {
  entry: './preview.js', // 入口文件路径
  output: {
    path: path.resolve(__dirname, './'), // 输出目录路径
    libraryExport: 'default',
    filename: 'index.js' // 输出文件名
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/, // 使用正则表达式匹配所有以 .js 结尾的文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: 'babel-loader', // 使用 babel-loader 处理 JavaScript 文件
          options: {
            presets: ['@babel/preset-env'] // 使用 @babel/preset-env 进行转译
          }
        }
      },
      // 可以在这里添加其他规则，处理不同类型的文件
    ]
  },
  resolve: {
    extensions: ['.js'], // 可以省略导入文件时的后缀名为 .js
    fallback: {
        path: require.resolve('path-browserify')
      }
  },
};
