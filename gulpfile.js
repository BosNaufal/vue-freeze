var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var stylus = require('gulp-stylus');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('build-css',function () {
	return gulp.src('./assets/stylus/main.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus({
				compress: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css/'));
});

gulp.task('dev', function () {
	gulp.watch('./assets/stylus/**/*.styl',['build-css']);
});

gulp.task('default', ['dev']);
