'use strict';

var Promise = require('es6-promise').Promise,
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    flatten = require('gulp-flatten'),
    jshint = require('gulp-jshint');

gulp.task('move-components', function(){
    return gulp.src('./src/components/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dist/components/'));
});

gulp.task('move-templates', function(){
    return gulp.src('./src/templates/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dist/templates/'));
});

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('useref', function(){
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify({mangle: false})))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('lint', function() {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('fail'));
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        'sass',
        'useref',
        'move-components',
        'move-templates',
        callback
    );
});

gulp.task('webserver', function() {
    connect.server({
      root: './dist/',
        port: 8080
    });
    connect.server({
      root: './src/',
        port: 9090
    });
});

gulp.task('default', function (callback) {
    runSequence(['build', 'webserver', 'watch'],
        callback
    );
});
