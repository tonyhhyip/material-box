//@flow
'use strict';

const gulp = require('gulp');

gulp.task('watch:html', () => {
  return gulp.watch([
    'pages/**/*.jinja',
    'layouts/**/*.jinja'
  ], ['html']);
});