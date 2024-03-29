// 用于开发环境的js
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
  mode: "development",
  devServer: {
    host: "localhost",
    port: "3000",
    hot: true,
  },
})