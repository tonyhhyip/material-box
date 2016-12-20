//@flow
'use strict';

const {writeFile} = require('fs');
const gulp = require('gulp');
const {log} = require('gulp-util');
const webpack = require('webpack');
const config = require('../../webpack.config').production;

gulp.task('build:js', () => {
  webpack(config, (e, stats) => {
    if (e) {
      throw new webpack.PluginError('[webpack]', e);
    } else {
      log('[webpack]', stats.toString({
        version: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true
      }));
      writeFile('./webpack.json', JSON.stringify(stats.toJson('verbose')));
    }
  });
});