const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  entry: './src/maybe.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'maybe.js',
    library: 'maybe',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
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

module.exports = config
