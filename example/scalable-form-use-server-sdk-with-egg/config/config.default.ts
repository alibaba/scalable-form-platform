import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  config.keys = appInfo.name + '_1573544310940_1364';
  config.middleware = [
    'xform'
  ];
  config.xform = {
    path: '/xform/*',
    sqlLite: true,
    mysql: {
      host: 'localhost',
      tablePrefix: 'xform_',
      port: 3306,
      user: 'root',
      database: 'xform_test101',
    }
  };
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  return {
    ...config,
    ...bizConfig,
  };
};
