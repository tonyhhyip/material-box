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
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: '[name].js'
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
        test: /\.scss$/,
        loader: ['scss', 'css']
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
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