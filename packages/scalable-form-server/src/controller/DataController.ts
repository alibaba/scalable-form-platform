import APIResponse, {getErrorResponse, getSuccessResponse} from "../model/APIResponse";
import DataService from "../service/DataService";

interface Props {
  dataService: DataService
}

export default class DataController {

  private dataService: DataService;

  constructor(props: Props) {
    this.dataService = props.dataService;
  };

  public getDataList = async (data: any = {}): Promise<APIResponse> => {
    let page = 0;
    let pageSize = 10;
    let uuid = '';
    try {
      page = parseInt(data.page || '0', 10);
      pageSize = parseInt(data.pageSize || '10', 10);
      uuid = data.uuid;
    } catch (e) {
      throw e;
    }
    if (!uuid) {
      return getErrorResponse(null, 'uuid不能为空');
    }
    let result = null;
    try {
      result = await this.dataService.getDataList(uuid, page, pageSize);
    } catch (e) {
      throw e;
    }
    return getSuccessResponse(result);
  };

  public insertData = async (data: {
    schemaCode: string,
    formData: {
      [key: string]: any
    },
    os: string,
    browser: string,
  }): Promise<APIResponse> => {
    const schemaCode = data.schemaCode;
    const formData = data.formData;
    if (!schemaCode) {
      throw new Error('schemaCode不能为空');
    }
    if (!formData) {
      throw new Error('表单内容不能为空');
    }
    let result: any = null;
    try {
      result = await this.dataService.insertData(schemaCode, formData, data.os || '', data.browser || '');
    } catch (e) {
      throw e;
    }
    return getSuccessResponse(result);
  };

  public deleteData = async (data: any = {}): Promise<APIResponse> => {
    let id = 0;
    try {
      id = parseInt(data.id, 10);
    } catch (e) {
      throw e;
    }
    if (!id) {
      throw new Error('id 不能为空');
    }
    let result: any = null;
    try {
      result = await this.dataService.deleteData(id);
    } catch (e) {
      throw e;
    }
    return getSuccessResponse(result);
  };

}
