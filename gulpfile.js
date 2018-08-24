var gulp = require('gulp');

//html整理
gulp.task('copy-html',function(){
	return gulp.src('redact/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
})

//整理images
gulp.task('images',function(){
	return gulp.src('redact/images/**/*')
	.pipe(gulp.dest('dist/images'))
	.pipe(connect.reload());
})

//整理json
gulp.task('data',function(){
	return gulp.src(['redact/data/*.json'])
	.pipe(gulp.dest('dist/data'))
	.pipe(connect.reload());
})

//整理css
var scss = require('gulp-sass-china');
var minifyCSS = require('gulp-minify-css');
gulp.task('scss', function(){
	return gulp.src('redact/scss/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
})

//整理
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('js', function(){
	return gulp.src(["redact/javascript/*.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//同时整理html images data
gulp.task('build',['copy-html','images','data', 'scss', 'js'],function(){
	console.log('成功');
})

//监听
gulp.task('watch', function(){
	gulp.watch('redact/index.html', ['copy-html']);
	gulp.watch('redact/images/**/*', ['images']);
	gulp.watch('redact/data/*.json', ['data']);
	gulp.watch("redact/scss/*.scss", ["scss"]);
	gulp.watch("redact/javascript/*.js", ["js"]);
})


//设置服务器
var connect = require('gulp-connect');

gulp.task('server', function(){
	connect.server({
		root: 'dist', //设置根目录
		port: 8888,
		livereload: true
	})
})

//设置默认
gulp.task('default', ["server", 'watch']);


