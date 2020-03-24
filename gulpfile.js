const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('scss/style.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 version']
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('img', function () {
    return gulp.src('img')
        .pipe(gulp.dest('build/img'))
        .pipe(browserSync.reload({stream:true}))
});


gulp.task('serve', function () {
    browserSync.init({
        server: 'build'
    });
    gulp.watch('scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('*.html', gulp.parallel('html'));
    gulp.watch('img', gulp.parallel('img'));
});