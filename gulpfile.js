var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
 
gulp.task('sass', function () {
 	gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('autoprefixer', function () {
	gulp.src('css/style.css')
	.pipe(autoprefixer({
		browsers: ['last 16 versions', 'ie >= 8'],
		cascade: false
	}))
	.pipe(gulp.dest('css'));
});

gulp.task('compress', function () {
	gulp.src('img_src/*')
	.pipe(imagemin())
	.pipe(gulp.dest('img/'));
})
 
gulp.task('default', function () {
	gulp.start('sass', 'autoprefixer', 'compress');
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('css/style.css', ['autoprefixer']);
	gulp.watch('img_src/*', ['compress']);
});