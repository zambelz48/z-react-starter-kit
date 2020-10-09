'use strict'

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const utils = require('./utils')
const config = require('../config')

const joinPath = (dir) => {
  return path.join(__dirname, '..', dir)
}

const resolvePath = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = {

  mode: utils.nodeEnv,

  context: resolvePath('../'),

  entry: './src/main.tsx',

  devtool: 'inline-source-map',

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
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
        test: /\.tsx?$/,
        include: [ 
          joinPath('src'),
          joinPath('test'),
          joinPath('node_modules/webpack-dev-server/client')
        ],
        use: [
          utils.debugMode && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          'ts-loader',
        ].filter(Boolean),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: utils.debugMode,
              reloadAll: utils.debugMode
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
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
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
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
