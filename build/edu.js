'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'edu'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.edu.conf')
const exec = require('child_process').exec

const spinner = ora('building for edu...')
spinner.start()

rm(path.join(config.edu.assetsRoot, config.edu.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err  
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    const currentPathName = path.join(__dirname, '..')

    exec(`sh ${currentPathName}/mac-serviceWorker.sh`,(err,stdout,stderr) => {

      if (err) {
        console.log(err);

        throw new Error(err);
      }

      console.log(stdout)
    })

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
