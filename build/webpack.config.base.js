'use strict'

const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const config = require('../config')

const joinPath = (dir) => {
  return path.join(__dirname, '..', dir)
}

const resolvePath = (dir) => {
  return path.resolve(__dirname, dir)
}

let aliasesPaths = {
  // replaces the "react-dom" package of the same version,
  // but with additional patches to support hot reloading.
  'react-dom': '@hot-loader/react-dom'
}
Object.assign(aliasesPaths, config.general.customPaths)

module.exports = {

  mode: utils.nodeEnv,

  context: resolvePath('../'),

  entry: './src/main.js',

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: aliasesPaths
  },

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: utils.publicPath
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${utils.nodeEnv}"`,
        APP_ENV: `"${utils.appEnv}"`
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          joinPath('src'),
          joinPath('test'),
          joinPath('node_modules/webpack-dev-server/client')
        ],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
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
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }

}
