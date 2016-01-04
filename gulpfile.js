// Specify required Gulp plugins
var gulp = require('gulp'),
	uglify = require('gulp-uglify')
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	prefix = require('gulp-autoprefixer');

// Specify directory/path variables
var jsSrcDir = 'js/*.js';
var jsDestDir = 'build/js';
var scssSrcDir = 'scss/**/*.scss';
var cssDestDir = 'build/css';
var imgSrcDir = 'img/*';
var imgDestDir = 'build/img';

// Scripts function : minifies javascript files
gulp.task('scripts', function() {
	gulp.src(jsSrcDir)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest(jsDestDir))
		.pipe(livereload());
});

// Styles function : compiles any Sass files, then applies automatic prefixing to ensure stylesheet compatability with supported browsers
gulp.task('styles', function() {
		sass(scssSrcDir, {
			style: 'compressed'
			})
		.pipe(plumber())
		.pipe(prefix('last 2 versions'))
		.pipe(gulp.dest(cssDestDir))
		.pipe(livereload());
});
// also use css-combine gulp plugin and a similar js combine plugin to merge all files into one in order to reduce the number of
// required HTTP requests 

// Images function : compress any image files
gulp.task('images', function() {
	gulp.src(imgSrcDir)
		.pipe(imagemin())
		.pipe(gulp.dest(imgDestDir))
		.pipe(livereload());
});

// Watch function : initialises event listeners to automatically react to changes to scripts, stylesheets or images
// including recompilations, minification/compression, and live reloading
gulp.task('watch', function() {
	var server = livereload();
	gulp.watch(jsSrcDir,'scripts');
	gulp.watch(scssSrcDir,'styles');
	gulp.watch(imgSrcDir,'images');
});

// Default task
gulp.task('default', ['scripts','styles','images','watch']);
