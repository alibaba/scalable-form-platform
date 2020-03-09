import {getContext, getInitStatusCode} from "../context";
import APIResponse, {getErrorResponse, getSuccessResponse} from "../model/APIResponse";
import PageResponse, {getHTMLResponse} from '../model/PageResponse';
import Schema from "../model/Schema";
import SchemaService from "../service/SchemaService";
import SystemService from "../service/SystemService";
import {adminTemplate, mobileTemplate, pcTemplate, setupTemplate} from '../views';

const ejs: any = require('ejs');

interface Props {
  isDemo: boolean;
  serverPath: string;
  schemaService: SchemaService;
  systemService: SystemService;
}

export default class HomeController {

  private readonly serverPath: string;
  private readonly isDemo: boolean;
  private schemaService: SchemaService;
  private systemService: SystemService;

  constructor(props: Props) {
    this.isDemo = props.isDemo;
    this.serverPath = props.serverPath;
    this.schemaService = props.schemaService;
    this.systemService = props.systemService;
  };

  public initDB = async (): Promise<APIResponse> => {
    try {
      await this.systemService.initDB();
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    return getSuccessResponse(true);
  };

  public getAdminPage = async (): Promise<PageResponse | APIResponse> => {
    let content: string = null;
    try {
      content = ejs.render(adminTemplate, {
        admin: process.env.ADMIN_PATH,
        serverPath: this.serverPath,
        isDemo: this.isDemo
      });
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    return getHTMLResponse(content);
  };

  public getPortalPage = async (uuid: string): Promise<PageResponse | APIResponse> => {
    let content: string = null;
    let schema: Schema = null;
    try {
      schema = await this.schemaService.getSchemaByUUID(uuid);
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    if (!schema) {
      return getErrorResponse(null, 'schema is empty');
    }
    try {
      content = ejs.render(pcTemplate, {
        serverPath: this.serverPath,
        title: schema.title,
        portal: process.env.PORTAL_PATH,
        schema: JSON.stringify({
          ...schema.formSchema,
          schemaCode: uuid,
          title: schema.title
        }),
        isDemo: this.isDemo
      });
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    return getHTMLResponse(content);
  };

  public getMobilePage = async (uuid: string): Promise<PageResponse | APIResponse> => {
    let content: string = null;
    let schema: Schema = null;
    try {
      schema = await this.schemaService.getSchemaByUUID(uuid);
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    if (!schema) {
      return getErrorResponse(null, 'schema is empty');
    }
    try {
      content = ejs.render(mobileTemplate, {
        serverPath: this.serverPath,
        title: schema.title,
        mobile: process.env.PORTAL_MOBILE_PATH,
        schema: JSON.stringify({
          ...schema.formSchema,
          schemaCode: uuid,
          title: schema.title
        }),
        isDemo: this.isDemo
      });
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    return getHTMLResponse(content);
  };

  public getSetupPage = async (): Promise<PageResponse | APIResponse> => {
    let content: string = null;
    const serverConfig = getContext().serverConfig.mysql;
    const db = `${serverConfig.database}@${serverConfig.host}:${serverConfig.port}`;
    try {
      content = ejs.render(setupTemplate, {
        isDemo: this.isDemo,
        setup: process.env.SET_PATH,
        db,
        serverPath: this.serverPath,
        initStatusCode: getInitStatusCode(),
        tableStatus: JSON.stringify(getContext().tableStatus),
        schemaTableSQL: getContext().schemaDAO.getInitTableSQL(),
        dataTableSQL: getContext().dataDAO.getInitTableSQL()
      });
    } catch (e) {
      return getErrorResponse(null, e.message);
    }
    return getHTMLResponse(content);
  };
}
