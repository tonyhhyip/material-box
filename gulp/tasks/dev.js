//@flow
'use strict';

const gulp = require('gulp');

gulp.task('dev', ['dev:js:init', 'dev:html', 'build', 'watch', 'dev:js:server']);