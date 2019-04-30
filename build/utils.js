'use strict'

const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const isProduction = (process.env.NODE_ENV === 'prod' || process.env.APP_ENV === 'prod')

  const assetsSubDirectory = isProduction ?
    config.build.assetsSubDirectory : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaderConfig = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: options.extract
    }
  }
  const availableLoaders = ['css', 'postcss', 'sass', 'less']

  for (const extension in availableLoaders) {
    if (!options.usePostCSS && extension === 'postcss') {
      continue
    }

    const loader = [
      loaderConfig,
      extension + '-loader'
    ]

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
