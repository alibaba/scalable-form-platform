const exec = require('child_process').exec;

function runExec(shell) {
  return new Promise((resolve, reject) => {
    exec(shell, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  })
}

runExec('sed \'s#\"main\": \"build/index.js\"#\"main\": \"index.js\"#\' ./package.json > ./build/package1.json')
  .then(() => {
    return runExec('sed \'s#\"prepublishOnly\"#\"prepublishOnly:not\"#\' ./build/package1.json > ./build/package2.json')
  })
  .then(() => {
    return runExec('sed \'s#\"publish\"#\"publish:not\"#\' ./build/package2.json > ./build/package.json')
  })
  .then(() => {
    return runExec('rm ./build/package1.json && rm ./build/package2.json')
  });

runExec('cp README.md build/');

