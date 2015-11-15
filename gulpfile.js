var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    jsmin = require('gulp-jsmin');

//css

gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(concatCss('css.css'))
        .pipe(autoprefixer('last 5 version','>1%', 'ie 8'))
        .pipe(minifyCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('production/css'))
        .pipe(notify('Done!'));
})

gulp.task('cssmin', function() {
    return gulp.src('css/*.css')
        .pipe(concatCss('main.css'))
        .pipe(autoprefixer('last 2 version','>1%', 'ie 9'))
        .pipe(gulp.dest('production/css'))
        .pipe(notify('Done!'));
})

//js

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('production/js'))
})

gulp.task('watch',function() {
    gulp.watch('css/*.css',['default']);
})

gulp.task('default',['css','cssmin','js']);