
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {

  entry: './src/index.js',

  output: {
    path: './build',
    filename: 'vue-freeze.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.sass$/,
        loaders: ['style','css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]

};
