import APIResponse, {getErrorResponse, getSuccessResponse} from "../model/APIResponse";
import SchemaService from "../service/SchemaService";

interface Props {
  schemaService: SchemaService
}

export default class SchemaController {

  private schemaService: SchemaService;

  constructor(props: Props) {
    this.schemaService = props.schemaService;
  };

  public queryFormList = async (data: any = {}): Promise<APIResponse> => {
    let page = 0;
    let pageSize = 10;
    let title = '';
    try {
      page = parseInt(data.page || '0', 10);
      pageSize = parseInt(data.pageSize || '10', 10);
      title = data.title || '';
    } catch (e) {
      throw e;
    }
    let result: any = null;
    try {
      result = await this.schemaService.querySchemaList(title, page, pageSize);
    } catch (e) {
      throw e;
    }
    return getSuccessResponse(result);
  };

  public saveSchema = async (data: {
    title: string,
    formSchema: any,
    uuid: string
  }): Promise<APIResponse> => {
    const title = data.title;
    const formSchema = data.formSchema;
    const uuid = data.uuid;
    if (!title) {
      throw new Error('标题不能为空');
    }
    if (!formSchema) {
      throw new Error('表单内容不能为空');
    }
    let result: any = null;
    try {
      result = await this.schemaService.saveSchema(uuid, title, formSchema);
    } catch (e) {
      throw e;
    }
    return getSuccessResponse(result);
  };

  public deleteSchema = async (data: any = {}): Promise<APIResponse> => {
    const uuid = data.uuid;
    if (!uuid) {
      return getErrorResponse(null, 'uuid不能为空');
    }
    let result: any = null;
    try {
      result = await this.schemaService.deleteSchemaByUUID(uuid);
    } catch (e) {
      throw e;
    }
    return getSuccessResponse(result);
  };
}
