'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  develop: {

    // Paths
    assetsSubDirectory: 'my-static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      },
      '/osc-api': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      },
      '/ouser-web': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      },
      '/opay-web': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      },
      '/customer': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      }
    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8091, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  edu: {
    // Template for index.html
    index: path.resolve(__dirname, '../target/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../target'),
    assetsSubDirectory: 'my-static',
    assetsPublicPath: 'http://static.lyf.edu.laiyifen.com/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  test: {
    // Template for index.html
    index: path.resolve(__dirname, '../target/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../target'),
    assetsSubDirectory: 'my-static',
    assetsPublicPath: 'http://m.static.test.laiyifen.com/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  release: {
    // Template for index.html
    index: path.resolve(__dirname, '../target/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../target'),
    assetsSubDirectory: 'my-static',
    assetsPublicPath: 'http://m.static.stg.laiyifen.com/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  production: {
    // Template for index.html
    index: path.resolve(__dirname, '../target/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../target'),
    assetsSubDirectory: 'my-static',
    assetsPublicPath: 'https://mstatic.laiyifen.com/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
