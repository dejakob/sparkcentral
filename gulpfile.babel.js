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
            './src/sequence.config.js',
            './src/animation/animation.js',
            './src/animation/*.js',
            './src/hunt/game-profile.js',
            './src/hunt/*.js',
            './src/rgbcolor.js',
            './src/timeline.js',
            './src/dom-helper.js',
            './src/sparkcentral.js'
        ])
        .pipe(concat('./dist/sparkcentral.js'))
        .pipe(babel())
        .pipe(gulp.dest('.'))
}

function watchTask ()
{
    return watch('./src/**/*.js', defaultTask);
}