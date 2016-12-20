//@flow
'use strict';

const gulp = require('gulp');
const {log} = require('gulp-util');

const sass = require('gulp-sass');
const styleLint = require('gulp-stylelint');
const cleanCss = require('gulp-clean-css');

gulp.task('build:css', () => {
  return gulp.src('/**/*.scss')
    .pipe(styleLint(({
      reporters: [
        {formatter: 'string', console: true}
      ]
    })))
    .pipe(sass())
    .pipe(cleanCss())
    .on('error', log)
    .pipe(gulp.dest('public'));
});