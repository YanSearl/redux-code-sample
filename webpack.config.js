const webpack = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('PRODUCTION', PRODUCTION)

module.exports = {
  entry: {
    'babel-polyfill': 'babel-polyfill',
    'data-class': './client/data-class',
    'redux': './client/redux',
    'redux-thunk': './client/redux-thunk',
    'redux-saga': './client/redux-saga',
    'redux-service': './client/redux-service'
  },
  output: {
    path: './static/generated/',
    filename: '[name].js'
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    } ]
  },
  plugins: PRODUCTION
    ? [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin()
  ]
    : []
}
