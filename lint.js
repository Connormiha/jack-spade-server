'use strict';

const {execSync} = require('child_process');

const PRE_COMMIT = process.env.NODE_ENV === 'pre_commit';
const EXEC_OPTIONS = {stdio: [0, 1, 2]};

const runEslint = (files = 'src __tests__') =>
    execSync(`./node_modules/.bin/eslint ${files} && echo "eslint success"`, EXEC_OPTIONS);

if (PRE_COMMIT) {
    let changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM src __tests__', {encoding: 'utf8'});
    changedFiles = changedFiles.split('\n');
    const changedFilesJavascript = changedFiles.filter((item) => item.endsWith('.js'));

    if (changedFilesJavascript.length) {
        runEslint(changedFilesJavascript);
    }
} else {
    runEslint();
}
