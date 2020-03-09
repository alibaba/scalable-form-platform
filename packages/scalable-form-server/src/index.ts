import * as Config from "./config";
import {getContext, getInitStatusCode, getInitStatusErrorMessage, init} from "./context";
import {getErrorResponse} from "./model/APIResponse";
import {isInPath, parseFormDataToObj} from "./utils/Tools";
import {XFormServerConfig} from "./XFormServerConfig";

const parse: any = require('co-body');

export function createXFormExpressMiddleware(config: XFormServerConfig) {
  init(config)
    .catch((e) => {
      console.error(`error in init xform server, ${e.message}`);
    });
  return async function (req: any, res: any, next: any) {
    const body = req.body;
    const path = req.originalUrl;
    const method = (req.method || 'get').toLowerCase().trim();
    const query: any = parseFormDataToObj(req.query);
    let response: any = null;
    let error: any = null;
    if (isInPath(config, path)) {
      if (getInitStatusCode() === Config.INIT_STATUS_SUCCESS || getInitStatusCode() === Config.INIT_STATUS_TABLE_ERROR) {
        try {
          response = await getContext().router.getResponse(method, path, query, body, {});
        } catch (e) {
          error = e;
        }
      } else {
        error = new Error(`初始化xform服务失败: ${getInitStatusErrorMessage()}`);
      }
      handleExpressResponse(error, response, res, query.callback);
    } else {
      next();
    }
  }
}

function handleExpressResponse(error: any, response: any, res: any, jsonpCallback: any) {
  if (error) {
    res.status(Config.STATUS_CODE_ERROR).send(getErrorResponse(null, error.message));
  } else if (response) {
    if (response.type === 'HTML') {
      res.set('Content-Type', 'text/html');
      res.status(response.statusCode).send(response.content);
    } else {
      if (jsonpCallback) {
        res.status(response.success ? Config.STATUS_CODE_SUCCESS : Config.STATUS_CODE_ERROR).send(`;${jsonpCallback}(${JSON.stringify(response)})`);
      } else {
        res.status(response.success ? Config.STATUS_CODE_SUCCESS : Config.STATUS_CODE_ERROR).send(response);
      }
    }
  } else {
    res.status(Config.STATUS_CODE_NOT_FOUND).send(JSON.stringify(getErrorResponse('API_NOT_FOUND', '页面或地址未找到')));
  }
}

export function createXFormKoaMiddleware(config: XFormServerConfig) {
  init(config)
    .catch((e) => {
      console.error(`error in init xform server, ${e.message}`);
    });
  return async function (ctx: any, next: any) {
    const path = ctx.path;
    const request = ctx.request;
    const url = request.url;
    const method = (request.method || 'get').toLowerCase().trim();
    const query: any = parseFormDataToObj(request.query);
    let body = null;
    if (method === 'post') {
      body = await parse.form(ctx.req);
    }
    let response: any = null;
    let error: any = null;
    if (isInPath(config, path)) {
      if (getInitStatusCode() === Config.INIT_STATUS_SUCCESS || getInitStatusCode() === Config.INIT_STATUS_TABLE_ERROR) {
        try {
          response = await getContext().router.getResponse(method, url, query, body, request.headers);
        } catch (e) {
          error = e;
        }
      } else {
        error = new Error(`初始化xform服务失败: ${getInitStatusErrorMessage()}`);
      }
      handleKoaResponse(error, response, ctx, query.callback);
    } else {
      next();
    }
  }
}

function handleKoaResponse(error: any, response: any, ctx: any, jsonpCallback: any) {
  if (error) {
    ctx.status = Config.STATUS_CODE_ERROR;
    ctx.body = getErrorResponse(null, error.message);
  } else if (response) {
    if (response.type === 'HTML') {
      ctx.status = response.statusCode;
      ctx.body = response.content;
    } else {
      ctx.status = response.success ? Config.STATUS_CODE_SUCCESS : Config.STATUS_CODE_ERROR;
      if (jsonpCallback) {
        ctx.body = `;${jsonpCallback}(${JSON.stringify(response)})`;
      } else {
        ctx.body = response;
      }
    }
  } else {
    ctx.status = Config.STATUS_CODE_NOT_FOUND;
    ctx.body = JSON.stringify(getErrorResponse('API_NOT_FOUND', '页面或地址未找到'));
  }
}
