#!/usr/bin/env node

const commander = require('commander');
const exec = require('child_process').exec;
const path = require('path');
const chalk = require('chalk');
const pkg = require('../package.json');
const program = new commander.Command();

const version = pkg.version;
program.version(version);

program.option('-d, --demo', '使用最小配置demo运行');
program.option('-c, --config <type>', '使用配置文件启动xform服务');
program.option('-s, --show', '显示配置模板');
program.option('-k, --kill', '停止xform服务');

program.parse(process.argv);

if (program.config) {
  const config = program.config;
  const configFilePath = path.resolve(process.cwd(), config);
  const configJSON = require(configFilePath);
  console.log(chalk.green(`get config file from ${configFilePath}`));
  console.log(chalk.green('starting xform standalone server...'));
  const standaloneConfigFile = path.resolve(__dirname, './ecosystem.config.js');
  const crossENV = path.resolve(__dirname, '../node_modules/.bin/cross-env');
  const script = `${crossENV} CONFIG_PATH=${configFilePath} pm2-runtime start ${standaloneConfigFile} --env production`;
  console.log(chalk.white(`${script}`));
  exec(script,
    function (err, stdout, stderr) {
      if (err) {
        console.error(err);
      } else {
        console.log(stdout);
        console.log('success: started xform standalone server');
        console.log(chalk.green(`you can visit http://localhost:${configJSON.port || 3000}${getServerPath(configJSON.path)}/admin and explore xform now!`));
      }
    });
} else if (program.demo) {
  const standaloneConfigFile = path.resolve(__dirname, './ecosystem.config.js');
  const script = `pm2-runtime start ${standaloneConfigFile} --env production`;
  console.log(chalk.white(`${script}`));
  exec(script,
    function (err, stdout, stderr) {
      if (err) {
        console.error(err);
      } else {
        console.log(stdout);
        console.log('success: started xform standalone server');
        console.log(chalk.green(`you can visit http://localhost:3000/xform/admin and explore xform now!`));
      }
    });
}

function getServerPath(path = '') {
  path = path.trim().toLowerCase().replace(/\*$/, '').replace(/\/$/, '');
  return path;
}
