'use strict'

const path = require('path')
const config = require('../config')
const packageConfig = require('../package.json')

const getAppEnv = () => {
  return process.env.APP_ENV || 'prod'
}

const getNodeEnv = () => {
  const appEnv = getAppEnv()

  switch (appEnv) {
    case 'dev':
      return 'development'
    case 'prod':
      return 'production'
  }

  return 'production'
}

const isDebugModeActive = () => {
  const appEnv = getAppEnv()

  switch (appEnv) {
    case 'dev':
      return true
    case 'prod':
      return false
  }

  return false
}

const getPublicPath = () => {
  const appEnv = getAppEnv()

  switch (appEnv) {
    case 'dev':
      return config.build.assetsPublicPath
    case 'prod':
      return config.dev.assetsPublicPath
  }

  return '/'
}

exports.appEnv = getAppEnv()

exports.nodeEnv = getNodeEnv()

exports.debugMode = isDebugModeActive()

exports.publicPath = getPublicPath()

exports.assetsPath = (_path) => {
  const isProduction = (getAppEnv() === 'prod')

  const assetsSubDirectory = isProduction ?
    config.build.assetsSubDirectory : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
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
