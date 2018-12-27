const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config =>  { 
    config
    .plugin('html')
    .tap(args => {
      args[0].staticPath = process.env.VUE_APP_STATIC_PATH
      return args
    })
    config.resolve.alias.set('@$', resolve('src'))
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  configureWebpack: config => {
    config.externals = {
      "vue": "Vue",
      "vuex": "Vuex",
      "vue-router": "VueRouter"
    }
    config.plugins.push(new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: path.resolve(__dirname, 'target/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }))
    if (process.env.NODE_ENV == 'production') {
      config.plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }))
    }
  },
  baseUrl: process.env.VUE_APP_STATIC_PATH,// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'target',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: './my-static',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  productionSourceMap: false,
  lintOnSave: true,
    // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: true
  },
  devServer: {// 环境配置
    host: '127.0.0.1',
    port: 8081,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
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
      '/ouser-center': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      },
      '/customer': {
        target: 'https://m.laiyifen.com',
        changeOrigin: true
      },
      '/webapp-static': {
        target: 'http://m.lyf.edu.laiyifen.com',
        changeOrigin: true
      }
    }
  }
}