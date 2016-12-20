//@flow
'use strict';

const gulp = require('gulp');

gulp.task('watch:css', () => {
  return gulp.watch([
    'scss/**/*.scss'
  ], ['css']);
});