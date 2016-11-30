'use strict';

const gulp = require('gulp');
const {log} = require('gulp-util');
const sass = require('gulp-sass');

gulp.task('css', () => {
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .on('error', log)
    .pipe(gulp.dest('public'));
});