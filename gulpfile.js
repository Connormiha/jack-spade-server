'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const execSync = require('child_process').execSync;

const PRE_COMMIT = process.env.NODE_ENV === 'pre_commit';

let changedFiles;
let changedFilesJavascript;

if (PRE_COMMIT) {
    changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM src __tests__', {encoding: 'utf8'});
    changedFiles = changedFiles.split('\n');
    changedFilesJavascript = changedFiles.filter((item) => /\.js$/.test(item));
}

/**
 *
 * @desc Check JavaScript validation
 */
gulp.task('eslint', () =>
    gulp.src(PRE_COMMIT ? changedFilesJavascript : ['{src,__tests__}/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

/**
* validation Stylus and TypeScript
*/
gulp.task('lint', ['eslint']);