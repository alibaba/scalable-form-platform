import * as Koa from 'koa';
import {createXFormKoaMiddleware} from 'scalable-form-server';
const app = new Koa();

/**
 * 提供middleware的构造函数，createXFormKoaMiddleware
 * path为接管路由，这里，所有/xform/**的路由都将被中间件接管
 */
app.use(createXFormKoaMiddleware({
  path: '/xform/*',
  sqlLite: true,
  mysql: {
    host: 'localhost',
    tablePrefix: 'xform_',
    port: 3306,
    user: 'root',
    database: 'xform_test101',
  }
}));

app.listen(3000);
console.log('start server sdk with koa2 and running on port 3000');
