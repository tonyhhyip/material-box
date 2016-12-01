'use strict';

module.exports = {
  devtool: 'source-map',
  entry: {
    vue: [
      'webpack-dev-server/client?http://localhost:8080/',
      'vue.js'
    ],
    react: [
      'webpack-dev-server/client?http://localhost:8080/',
      'react.js'
    ]
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extension: ['', '.vue', '.js'],
    fallback: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: ['react-hot', 'babel'],
        include: `${__dirname}/react`
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  }
};