# scalable-form-server
提供服务端sdk，构建Scalable Form可用的web站点

Scalable Form server sdk, providing koa/express middleware to apply Scalable Form web site

![GitHub](https://img.shields.io/github/license/alibaba/scalable-form-platform?style=flat)
![npm](https://img.shields.io/npm/v/scalable-form-antd?color=blue&style=flat)
![Travis (.org)](https://api.travis-ci.com/alibaba/scalable-form-platform.svg?branch=daily%2F0.0.2)
![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/scalable-form-platform?style=flat)
![GitHub issues](https://img.shields.io/github/issues/alibaba/scalable-form-platform)

查看文档 [https://scalable-form-platform.github.io/#/](https://scalable-form-platform.github.io/#/)

<p align="center">
  <a href="https://scalable-form-platform.github.io/" target="_blank">
    <img max-width="1440" src="https://img.alicdn.com/tfs/TB1MnB9z7Y2gK0jSZFgXXc5OFXa-1440-900.png" />
  </a>
</p>

## 引入
scalable-form-server提供了koa和express可用的中间件middleware，你可以在path中指定路由，scalable-form-server将接管对应的路由地址，并提供可用的站点
```bash
npm i scalable-form-server -S
```

## 在koa中使用
```javascript
import * as Koa from 'koa';
import {createXFormKoaMiddleware} from '@ali/xform-open-server';
const app = new Koa();

/**
 * 提供middleware的构造函数，createXFormKoaMiddleware
 * path为接管路由，这里，所有/xform/**的路由都将被中间件接管
 */
app.use(createXFormKoaMiddleware({
  path: '/xform/*',
  sqlLite: false,
  mysql: {
    host: 'localhost',
    tablePrefix: 'xform_',
    port: 3306,
    password: 'my-secret-pw',
    user: 'root',
    database: 'xform_test101',
  }
}));

app.listen(3000);
console.log('start server sdk with koa2 and running on port 3000');
```

## 在express中使用
```javascript
import {createXFormExpressMiddleware} from 'scalable-form-server';

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
/**
 * 提供middleware的构造函数，createXFormExpressMiddleware
 * path为接管路由，这里，所有/xform/**的路由都将被中间件接管
 */
app.use('/xform/*', createXFormExpressMiddleware({
  path: '/xform/*',
  mysql: {
    host: 'localhost',
    tablePrefix: 'xform_',
    port: 3306,
    password: 'my-secret-pw',
    user: 'root',
    database: 'xform_test101',
  }
}));

app.listen(3000, () => {
  console.log('start server sdk with express and running on port 3000');
});

```

## 参数说明
```json
{
    path: '/xform/*', // path为接管路由，这里，所有/xform/**的路由都将被中间件接管
    mysql: { // 服务端的数据库配置，如果没有配置，将使用默认demo模式，使用sqlite
        "host": "localhost", // mysql地址
        "port": 3306, // 端口
        "database": "xform_test101", // db名称
        "user": "root", // 账号
        "password": "my-secret-pw", // 密码
        "tablePrefix": "xform_" // table前缀，避免与其他table名称冲突
    }
}
```
