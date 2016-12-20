//@flow
'use strict';

const gulp = require('gulp');
const {log} = require('gulp-util');

const {Environment, FileSystemLoader} = require('nunjucks');
const nunjucks = require('gulp-nunjucks');
const rename = require('gulp-rename');

function createTask(env) {
  return gulp.src('pages/**/*.jinja')
    .pipe(nunjucks.compile({}, {env}))
    .on('error', log)
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('public'));
}

gulp.task('build:html', () => {
  const env = new Environment([
    new FileSystemLoader('pages', {watch: false}),
    new FileSystemLoader('layouts', {watch: false})
  ]);

  return createTask(env);
});

gulp.task('dev:html', () => {
  const env = new Environment([
    new FileSystemLoader('pages', {watch: true}),
    new FileSystemLoader('layouts', {watch: true})
  ]);

  return createTask(env);
});