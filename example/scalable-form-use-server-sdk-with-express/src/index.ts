import {createXFormExpressMiddleware} from 'scalable-form-server';

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/xform/*', createXFormExpressMiddleware({
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

app.listen(3000, () => {
  console.log('start server sdk with express and running on port 3000');
});

