var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

function scripts() {

	var b = browserify({
		entries: ['./src/vue-freeze.js'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true,
		transform: [babelify],
		plugin: [watchify]
	});

	function bundling() {
		b.bundle()
			.pipe(source('vue-freeze.js'))
			.pipe(gulp.dest('./build/'));
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

}

gulp.task('dev', function () {
	return scripts();
});


gulp.task('default', ['dev']);
