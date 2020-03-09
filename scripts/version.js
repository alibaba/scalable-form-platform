const branch = require('git-branch');
const path = require('path');
const runExec = require('./shell');

function getDailyBranchCode() {
  return new Promise((resolve, reject) => {
    getCurrentBranch()
      .then((branchName) => {
        if (/daily\/(\w)+/.test(branchName)) {
          resolve(branchName.replace('daily/', ''));
        } else {
          reject(new Error('not match'));
        }
      }).catch(reject);
  })
}

function getCurrentBranch() {
  return new Promise((resolve, reject) => {
    const currentPath = path.resolve(__dirname, './');
    branch(currentPath)
      .then(resolve) //=> 'Branch: master'
      .catch(reject);
  })
}

getDailyBranchCode()
  .then((versionCode) => {
    console.log(versionCode);
    runExec("lerna version " + versionCode + " --amend --yes --no-git-tag-version --no-push");
  });
