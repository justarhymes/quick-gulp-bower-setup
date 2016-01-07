var gulp = require('gulp'),
    bower = require('gulp-bower'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var paths = {
  javascript: [
    'bower_components/foundation/js/vendor/modernizr.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/imagesloaded/imagesloaded.pkgd.js',
    'bower_components/foundation/js/foundation.js',
    'bower_components/waypoints/lib/jquery.waypoints.js',
    'js/main.js'
  ],
  styles: [
    'scss/**/*.scss'
  ],
  base: [
    'index.php',
    'about.php',
    'projects.php',
    'contact.php',
    '.htaccess'
  ],
  includes: [
    'includes/header.php',
    'includes/footer.php',
  ]
};

gulp.task('copy-base', function () {
  gulp.src(paths.base)
  .pipe(gulp.dest('./dist'));
});

gulp.task('copy-includes', function () {
  gulp.src(paths.includes)
  .pipe(gulp.dest('./dist/includes'));
});


gulp.task('images', function () {
  gulp.src([
    './assets/**/*.jpg',
    './assets/**/*.png',
    './assets/**/*.svg'
  ])
  .pipe(gulp.dest('dist/assets'));
});

gulp.task('compass', function() {
  gulp.src('./scss/app.scss')
    .pipe(compass({
      css: './stylesheets',
      sass: './scss',
      image: './assets/images'
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(rename('app.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.javascript)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['compass']);
	gulp.watch(paths.javascript, ['scripts']);
  gulp.watch(paths.base, ['copy-base']);
  gulp.watch(paths.includes, ['copy-includes']);
});

gulp.task('default', ['copy-base', 'copy-includes', 'images', 'compass', 'scripts', 'watch'], function(){});
