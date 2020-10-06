'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.config.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {

  devtool: config.dev.devtool,

  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  },

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'public/index.html')
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },

  plugins: [

    new ReactRefreshPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'public/index.html',
      template: 'public/index.html',
      inject: true
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    })

  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running at: http://${devWebpackConfig.devServer.host}:${port} with environment: '${utils.appEnv}'`]
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
