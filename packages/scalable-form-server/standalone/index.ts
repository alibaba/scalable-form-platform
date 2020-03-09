import * as Koa from 'koa';
import fs from 'fs';
import {getDefaultConfig} from './config';
import {createXFormKoaMiddleware} from '../src/index';

const chalk = require('chalk');
const app = new Koa();
const config: any = loadConfig();

if (config) {
  const mysql = config.mysql || {};
  const serverConfig = {
    path: config.path || '/xform/*',
    sqlLite: config.sqlLite || false,
    mysql: {
      host: mysql.host || 'localhost',
      tablePrefix: mysql.tablePrefix || 'xform_',
      port: mysql.port || 3306,
      password: mysql.password,
      user: mysql.user || 'root',
      database: mysql.database || 'xform_test101',
    }
  };
  console.log(chalk.white(`server config is ${JSON.stringify(serverConfig)}`));
  app.use(createXFormKoaMiddleware(serverConfig));

  app.listen(config.port || 3000);
  console.log(chalk.green(`start server running on port ${config.port || 3000}`));
}


function loadConfig() {
  let config: any = getDefaultConfig();

  const configPath = process.env.CONFIG_PATH;
  console.log(chalk.green(`current configPath is ${configPath}`));

  if (configPath) {
    try {
      const configFile = fs.readFileSync(configPath);
      config = JSON.parse(configFile as any);
    } catch (e) {
      console.log(chalk.red(`error in load config, path is ${configPath}`));
      config = null;
    }
    if (config) {
      console.log(chalk.green(`success in load config: ${JSON.stringify(config, null, 2)}`));
    }
  }
  return config;
}
