const path = require('path');

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './client',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
      }
    ]
  },
};
