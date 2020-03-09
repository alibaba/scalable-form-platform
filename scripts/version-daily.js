const runExec = require('./shell');
const pkg = require('../lerna.json');

function updateVersion() {
  const originVersion = pkg.version;
  if (originVersion.indexOf('beta') >= 0) {
    runExec("lerna version prerelease --amend --yes --no-git-tag-version --no-push --preid=beta");
  } else {
    runExec("lerna version " + originVersion + "-beta.0 --amend --yes --no-git-tag-version --no-push");
  }
}

updateVersion();
