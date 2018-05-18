const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  entry: './src/maybe.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  mode: 'none',
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/maybe.js.flow', to: './' }
    ])
  ]
}

const server = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'maybe.node.js',
    library: 'maybe',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}

const browser = {
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'maybe.js',
    library: 'maybe',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}

const serverConfig = Object.assign({}, config, server)
const browserConfig = Object.assign({}, config, browser)

module.exports = [
  serverConfig,
  browserConfig
]
