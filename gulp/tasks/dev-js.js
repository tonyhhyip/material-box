//@flow
'use strict';

const {writeFile} = require('fs');
const gulp = require('gulp');
const {log} = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../webpack.config').development;

gulp.task('dev:js:init', () => {
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

gulp.task('dev:js:server', () => {
  const compiler = webpack(config);
  compiler.plugin('done', (stats) => {
    writeFile('./webpack.json', JSON.stringify(stats.toJson('verbose')));
  });

  const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: './public'
  });

  server.listen(8080);
});

gulp.task('dev:js', ['dev:js:init', 'dev:js:server']);