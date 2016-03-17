var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var vueify = require('vueify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

function scripts() {

	var b = browserify({
		entries: ['./assets/js/main.js'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true,
		transform: [babelify,vueify],
		plugin: [watchify]
	});

	function bundling() {
		b.bundle()
			.pipe(source('build.js'))
			.pipe(gulp.dest('./assets/js/'));
	};

	b.on('update', function () {
		gutil.log('bundling~');
		bundling();
	});

	b.on('time', function (time) {
		if(time >= 1000){
			time = time/1000+' ms';
		}else{
			time = time+' μs';
		}
		gutil.log('bundled! in '+time);
	});
	bundling();

	// b.add('./assets/js/main.js');

}


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
	// return scripts();
});

gulp.task('default', ['dev']);
