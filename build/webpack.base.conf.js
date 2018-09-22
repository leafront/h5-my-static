'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')



function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const configEnv = process.env.NODE_ENV || "develop"

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      './src/widget/store.js',
      './src/widget/ajax.js',
      './src/widget/request.js',
      './src/widget/utils.js',
      './src/widget/app.js'
    ]
  },
  output: {
    path: config[configEnv].assetsRoot,
    filename: '[name].js',
    publicPath: config[configEnv].assetsPublicPath
  },
  resolve: {
    extensions: ['.vue','.js','.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'path': resolve('http://static.lyf.edu.laiyifen.com')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]'),
          publicPath: config[configEnv].assetsPublicPath
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
