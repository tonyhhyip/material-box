// @flow
'use strict';

const UglifyPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const merge = require('webpack-merge');

const base = {
  plugins: [
    new OccurenceOrderPlugin(),
    new DedupePlugin(),
    new AggressiveMergingPlugin(),
    new StyleLintPlugin()
  ],
  devtool: 'source-map',
  entry: {
    vue: ['./src/core/vue.core.js'],
    react: ['./src/core/react.core.js']
  },
  output: {
    path: `${__dirname}/public`,
    filename: '[name].js',
    library: 'MaterialBox'
  },
  resolve: {
    extension: ['', '.jsx', '.vue', '.js'],
    fallback: ['node_modules']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.jsx$/,
        loader: ['babel']
      },
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ['style', 'css', 'sass']
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel',
      scss: 'style!css!sass'
    }
  },
  eslint: {
    configFile: './.eslintrc.yml'
  }
};

const development = merge.smart({
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  entry: {
    react: ['webpack-dev-server/client?http://localhost:8080/'],
    vue: ['webpack-dev-server/client?http://localhost:8080/']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: ['react-hot']
      }
    ]

  }
}, base);

const production = merge.smart({
  plugins: [
    new UglifyPlugin({minimize: true})
  ]
}, base);

module.exports = {
  base, development, production
};