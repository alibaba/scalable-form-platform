import * as Config from './config';
import DataController from "./controller/DataController";
import EditorController from "./controller/EditorController";
import HomeController from './controller/HomeController';
import SchemaController from "./controller/SchemaController";
import DataDAO from './dao/DataDAO';
import SchemaDAO from './dao/SchemaDAO';
import MySQL from './db/MySQL';
import Router from "./Router";
import DataService from "./service/DataService";
import SchemaService from "./service/SchemaService";
import SystemService from "./service/SystemService";
import {XFormServerConfig} from "./XFormServerConfig";
import SQLLite from "./db/SQLLite";

const chalk = require('chalk');

export interface IContext {
  serverConfig: XFormServerConfig,

  schemaDAO: SchemaDAO,
  schemaService: SchemaService,

  dataDAO: DataDAO,
  dataService: DataService,

  systemService: SystemService

  homeController: HomeController,
  schemaController: SchemaController,
  dataController: DataController,
  editorController: EditorController,

  router: Router,
  tableStatus: any
}

let context: IContext = null;
let initStatusCode: string = Config.INIT_STATUS_DEFAULT;
let initStatusErrorMessage: string = '';

export async function init(serverConfig: XFormServerConfig): Promise<IContext> {
  let tablePrefix = 'xform_';
  if (serverConfig && serverConfig.mysql && serverConfig.mysql.tablePrefix) {
    tablePrefix = serverConfig.mysql.tablePrefix;
  }
  const tableStatus: any = {
    tablePrefix
  };
  let mysql: MySQL = null;
  let sqlLite: SQLLite = null;
  if (serverConfig.sqlLite) {
    try {
      sqlLite = await initSQLLite();
    } catch (e) {
      initStatusErrorMessage = e.message;
      initStatusCode = Config.INIT_STATUS_DB_ERROR;
      throw e;
    }
  } else if (serverConfig.mysql) {
    try {
      mysql = await initMySQL(serverConfig);
    } catch (e) {
      initStatusErrorMessage = e.message;
      initStatusCode = Config.INIT_STATUS_DB_ERROR;
      throw e;
    }
  } else {
    initStatusErrorMessage = 'no db config';
    throw new Error('no db config!');
  }
  const schemaDAO: SchemaDAO = new SchemaDAO(sqlLite || mysql, tablePrefix);
  const dataDAO: DataDAO = new DataDAO(sqlLite || mysql, tablePrefix);

  tableStatus.schemaTableExisted = await schemaDAO.checkDB();
  tableStatus.dataTableExisted = await dataDAO.checkDB();
  const schemaService: SchemaService = new SchemaService({
    schemaDAO,
  });
  const dataService = new DataService({
    dataDAO,
    schemaDAO
  });
  const systemService = new SystemService({
    schemaDAO,
    dataDAO,
  });
  const homeController = new HomeController({
    isDemo: serverConfig.sqlLite,
    serverPath: serverConfig.path,
    schemaService,
    systemService
  });
  const schemaController = new SchemaController({
    schemaService
  });
  const dataController = new DataController({
    dataService
  });
  const editorController = new EditorController({});

  const router = new Router({
    homeController,
    schemaController,
    dataController,
    editorController
  });

  context = {
    schemaController,
    editorController,
    schemaService,
    systemService,
    serverConfig,
    router,
    schemaDAO,
    dataDAO,
    homeController,
    dataController,
    dataService,
    tableStatus
  };
  if (initStatusCode !== Config.INIT_STATUS_DB_ERROR) {
    if (tableStatus.dataTableExisted && tableStatus.schemaTableExisted) {
      initStatusCode = Config.INIT_STATUS_SUCCESS;
    } else {
      initStatusCode = Config.INIT_STATUS_TABLE_ERROR;
    }
  }
  return context;
}

export function getContext() {
  return context;
}

export function getInitStatusCode() {
  return initStatusCode;
}

export function setInitStatusCode(newInitStatusCode: string) {
  initStatusCode = newInitStatusCode;
}

export function getInitStatusErrorMessage() {
  return initStatusErrorMessage;
}

export function checkInitStatusSuccess() {
  return initStatusCode === Config.INIT_STATUS_SUCCESS;
}

async function initMySQL(serverConfig: XFormServerConfig): Promise<MySQL> {
  return new Promise((resolve, reject) => {
    const mysql = new MySQL({
      ...serverConfig.mysql,
      onSuccess: () => {
        console.log(chalk.green('success: init mysql'));
        resolve(mysql);
      },
      onError: (error) => {
        console.error(chalk.red(`error in init mysql ${error.message}`));
        reject(error);
      }
    })
  });
}

async function initSQLLite(): Promise<SQLLite> {
  return new Promise((resolve, reject) => {
    const sqlLite = new SQLLite({
      onSuccess: () => {
        console.log(chalk.green('success: init sqlLite'));
        resolve(sqlLite);
      },
      onError: (error) => {
        console.error(chalk.red(`error in init sqlLite ${error.message}`));
        reject(error);
      }
    })
  });
}
