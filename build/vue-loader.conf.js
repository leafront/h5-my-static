'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV
const configEnv = process.env.NODE_ENV || "develop"
const sourceMapEnabled = isProduction
  ? config.production.productionSourceMap
  : config.develop.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.develop.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
