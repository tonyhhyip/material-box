'use strict';

const {writeFile} = require('fs');
const gulp = require('gulp');
const {log} = require('gulp-util');
const {Environment, FileSystemLoader} = require('nunjucks');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

gulp.task('css', () => {
  return gulp.src('scss/**/*.scss')
    .pipe(require('gulp-sass')())
    .on('error', log)
    .pipe(gulp.dest('public'));
});

gulp.task('html', () => {
  const env = new Environment([
    new FileSystemLoader('pages', {watch: true}),
    new FileSystemLoader('layouts', {watch: true})
  ]);

  return gulp.src('pages/**/*.jinja')
    .pipe(require('gulp-nunjucks').compile({}, {env}))
    .on('error', log)
    .pipe(require('gulp-rename')({
      extname: '.html'
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('js:init', () => {
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
      writeFile('./webpack.json', JSON.stringify(stats.toJSON('verbose')));
    }
  });
});

gulp.task('js', () => {
  const compiler = webpack(config);
  compiler.plugin('done', (stats) => {
    log('[webpack]', stats.toString({
      version: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true
    }));
    writeFile('./webpack.json', JSON.stringify(stats.toJson('verbose')));
  });

  const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: './public'
  });

  server.listen(8080);
});

gulp.task('watch:css', () => {
  return gulp.watch([
    'scss/**/*.scss'
  ], ['css']);
});

gulp.task('watch:html', () => {
  return gulp.watch([
    'pages/**/*.jinja',
    'layouts/**/*.jinja'
  ], ['html']);
});