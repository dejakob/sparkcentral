'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import watch from 'gulp-watch';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import paths from './config/paths.config.es5.js';
import childProcess from 'child_process';

gulp.task('default', defaultTask);
gulp.task('watch', watchTask);
gulp.task('test', testTask);
gulp.task('karma', [ 'test' ]);

/**
 * Default gulp task
 */
function defaultTask ()
{
    const allFiles = paths.src;
    paths.exec.forEach(runPath => allFiles.push(runPath));

    return gulp.src(allFiles)
        .pipe(concat('./dist/sparkcentral.js'))
        .pipe(babel())
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
}

function watchTask ()
{
    return watch('./src/**/*.js', defaultTask);
}

function testTask (done)
{
    const shell = false;
    const exec = childProcess.exec;

    return exec(
        `node ${__dirname}/node_modules/karma/bin/karma start ${__dirname}/config/karma.config.es5.js`,
        { shell },
        printKarmaResult
    );

    function printKarmaResult (error, stdout, stderr)
    {
        if (error) {
            console.log(`error: ${error}`);
        }

        console.log(stdout);
        done();
    }
}