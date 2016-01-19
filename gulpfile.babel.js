import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import watch from 'gulp-watch';

gulp.task('default', defaultTask);
gulp.task('watch', watchTask);

/**
 * Default gulp task
 */
function defaultTask ()
{
    return gulp.src([
            './src/description.js',
            './src/animation/animation.js',
            './src/animation/color-animation.js',
            './src/rgbcolor.js',
            './src/timeline.js',
            './src/sparkcentral.js'
        ])
        .pipe(babel())
        .pipe(concat('./dist/sparkcentral.js'))
        .pipe(gulp.dest('.'))
}

function watchTask ()
{
    return watch('./src/**/*.js', defaultTask);
}