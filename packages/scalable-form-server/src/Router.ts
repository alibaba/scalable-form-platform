import * as Config from "./config";
import {getInitStatusCode} from './context';
import DataController from './controller/DataController';
import EditorController from "./controller/EditorController";
import HomeController from './controller/HomeController';
import SchemaController from "./controller/SchemaController";
import APIResponse from "./model/APIResponse";
import PageResponse from "./model/PageResponse";
import {isMobile} from './utils/BrowserDetect';
import {getServerPath, getUUIDFromPath, parseFormDataToObj} from "./utils/Tools";

interface Props {
  dataController: DataController;
  homeController: HomeController;
  schemaController: SchemaController;
  editorController: EditorController;
}

export default class Router {
  private dataController: DataController;
  private homeController: HomeController;
  private schemaController: SchemaController;
  private editorController: EditorController;

  constructor(props: Props) {
    this.dataController = props.dataController;
    this.homeController = props.homeController;
    this.schemaController = props.schemaController;
    this.editorController = props.editorController;
  }

  public getResponse = async (method: string, path: string, query: any, body: any = {}, headers: any): Promise<any | APIResponse | PageResponse> => {
    query = parseFormDataToObj(query);
    method = (method || 'get').toLowerCase().trim();
    const data = parseData(method, query, body);
    const serverPath = getServerPath();

    if (method === 'get') {
      if (getInitStatusCode() === Config.INIT_STATUS_TABLE_ERROR && new RegExp(`${serverPath}/initDB`).test(path)) {
        return this.homeController.initDB();
      } else if (getInitStatusCode() === Config.INIT_STATUS_TABLE_ERROR) {
        return this.homeController.getSetupPage();
      } else if (new RegExp(`${serverPath}/portal/(w)*`).test(path) && isMobile(headers)) {
        const uuid: string = getUUIDFromPath(path);
        return this.homeController.getMobilePage(uuid);
      } else if (new RegExp(`${serverPath}/portal/(w)*`).test(path)) {
        const uuid: string = getUUIDFromPath(path);
        return this.homeController.getPortalPage(uuid);
      } else if (new RegExp(`${serverPath}/setup`).test(path)) {
        return this.homeController.getSetupPage();
      } else if (new RegExp(`${serverPath}/admin`).test(path)) {
        return this.homeController.getAdminPage();
      } else if (new RegExp(`${serverPath}$`).test(path)) {
        return this.homeController.getAdminPage();
      } else if (new RegExp(`${serverPath}/queryFormList`).test(path)) {
        return this.schemaController.queryFormList(query);
      } else if (new RegExp(`${serverPath}/getDataList`).test(path)) {
        return this.dataController.getDataList(data);
      } else if (new RegExp(`${serverPath}/deleteData`).test(path)) {
        return this.dataController.deleteData(data);
      } else if (new RegExp(`${serverPath}/deleteSchema`).test(path)) {
        return this.schemaController.deleteSchema(query);
      } else if (new RegExp(`${serverPath}/getInitConfig`).test(path)) {
        return this.editorController.getInitConfig();
      } else if (new RegExp(`${serverPath}/getAllValidators`).test(path)) {
        return this.editorController.getAllValidators();
      }
    } else if (method === 'post') {
      if (new RegExp(`${serverPath}/saveForm`).test(path)) {
        return this.schemaController.saveSchema(data);
      } else if (new RegExp(`${serverPath}/saveData`).test(path)) {
        return this.dataController.insertData(data);
      } else if (new RegExp(`${serverPath}/getData`).test(path)) {
        return this.editorController.getData();
      } else if (new RegExp(`${serverPath}/queryDataSourceList`).test(path)) {
        return this.editorController.queryDataSourceList();
      }
    }
    return null;
  }
}

function parseData(method: string, query: any, body: any) {
  let data = null;
  if (method === 'get') {
    if (query.data) {
      data = query.data;
    }
  } else if (method === 'post') {
    try {
      data = JSON.parse(body.data || '{}');
    } catch (e) {
      data = null;
    }
  }
  return data;
}
