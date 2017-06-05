//incluge Gulp
var gulp = require('gulp');


//include Gulp plugins
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var minifyJS = require('gulp-jshint');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');


// minify new images
gulp.task('imagemin', function() {
  var imgSrc = 'src/images/**/*',
      imgDst = 'dist/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/**/*.html',
      htmlDst = './dist';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});


// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['src/js/lib.js','./src/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(gulp.dest('dist/js/'));
});


// Compile sass into CSS & auto-inject into browser
gulp.task('sass', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});


// CSS concatenate, auto-prefix, and minify
gulp.task('styles', function() {
  gulp.src(['src/css/main.css'])
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css/'));
});


// stream a web server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 3000
  });
});


// and run them all at once!
gulp.task('default', ['connect', 'imagemin', 'htmlpage', 'scripts', 'sass', 'styles'], function() {
  gulp.watch('src/images/**/*',['imagemin']);
  gulp.watch('src/**/*.html',['htmlpage']);
  gulp.watch('src/js/*.js',['scripts']);
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch('src/css/main.css',['styles']);
});