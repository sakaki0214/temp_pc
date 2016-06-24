'use strict';

var gulp        = require('gulp');
var compass     = require('gulp-compass');
var livereload  = require('gulp-livereload');
var jade        = require('gulp-pug');

var SCSS_FILE   = './scss/**/*.scss';
var PUG_FILE    = './pug/**/*.pug';

var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      port: 8888,
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

/*
 * pug
 */
gulp.task('pug', () => {
  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
  .pipe(jade({
     pretty: true
  }))
  .pipe(gulp.dest('./html/'));
});

/*
 * Compass
 */
gulp.task('compass',function(){
  gulp.src([SCSS_FILE])
    .pipe(compass({
        config_file : 'config.rb',
        comments : false,
        css : 'css/',
        sass: 'scss/'
    }))
    .pipe(livereload());
});


/*
 * Watch
 */
gulp.task('watch',function(){
  gulp.watch(SCSS_FILE, ['compass']);
  gulp.watch(PUG_FILE, ['pug']);
  // gulp.watch([
  //   SCSS_FILE,
  //   PUG_FILE
  // ], function(event){
  //   gulp.run('compass'),
  //   gulp.run('pug');
  // });

  // gulp.watch(SCSS_FILE, function(event){
  //     gulp.run('compass');
  // });
  // gulp.watch(PUG_FILE, function(event){
  //     gulp.run('pug');
  // });
});

gulp.task('default', ['watch','webserver']);
