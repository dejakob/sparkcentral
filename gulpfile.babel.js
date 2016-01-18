import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

gulp.task('default', defaultTask);

/**
 * Default gulp task
 */
function defaultTask ()
{
    gulp.src([
            './src/description.js',
            './src/**/*.js'
        ])
        .pipe(babel())
        .pipe(concat('./dist/sparkcentral.js'))
        .pipe(gulp.dest('.'))
}