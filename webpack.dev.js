const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build'
  },
  watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev_build')
  }
})
