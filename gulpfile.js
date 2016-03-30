var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);

var paths = {
  sass: ['./www/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

/**
 * Take all JS files and write the scripts in index.html
 */
gulp.task('inject:js', function () {
  var target = gulp.src('./www/index.html');
  var sources = gulp.src(['./www/app/**/*.js'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./www'));
});

/**
 * Takes SVG files and transforms it to font
 */
gulp.task('iconfont', function(){
  gulp.src(['./www/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'wheater-font',
      path: './www/assets/icons/templates/_icons.scss',
      targetPath: './scss/_icons.scss',
      fontPath: '../../assets/fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: 'wheater-font',
      prependUnicode: true,
      normalize: true,
      heigh: 1001,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      timestamp: runTimestamp
     }))
    .pipe(gulp.dest('./www/assets/fonts/icons/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
