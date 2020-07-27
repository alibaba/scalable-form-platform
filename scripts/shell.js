// TODO 使用ts来执行吧
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

module.exports = runExec;
