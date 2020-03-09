import DataDAO from "../dao/DataDAO";
import SchemaDAO from "../dao/SchemaDAO";
import Data from "../model/Data";
import List from "../model/List";
import Schema from "../model/Schema";

interface Props {
  dataDAO: DataDAO;
  schemaDAO: SchemaDAO;
}

export default class DataService {
  private dataDAO: DataDAO;
  private schemaDAO: SchemaDAO;

  constructor(props: Props) {
    this.schemaDAO = props.schemaDAO;
    this.dataDAO = props.dataDAO;
  }

  public async insertData(schemaUUID: string, formData: { [key: string]: any }, os: string, browser: string): Promise<number> {
    let schema: Schema = null;
    try {
      schema = await this.schemaDAO.getByUUID(schemaUUID);
    } catch (e) {
      throw e;
    }
    if (!schema) {
      throw new Error('schema is null');
    }
    const data = new Data(schema.uuid, formData);
    data.os = os;
    data.browser = browser;
    let result = 0;
    try {
      result = await this.dataDAO.insert(data);
    } catch (e) {
      throw e;
    }
    if (result) {
      schema.dataCount += 1;
      await this.schemaDAO.updateByUUID(schema);
    }
    return result;
  }

  public async deleteData(id: number): Promise<boolean> {
    let originData = null;
    try {
      originData = await this.dataDAO.getById(id);
    } catch (e) {
      throw e;
    }
    if (!originData) {
      throw new Error('originData is null');
    }
    let result: boolean = true;
    try {
      result = await this.dataDAO.delete(id);
    } catch (e) {
      throw e;
    }
    try {
      const dataCount = await this.dataDAO.queryCount(originData.schemaId);
      const schema = await this.schemaDAO.getById(originData.schemaId);
      if (schema) {
        schema.dataCount = dataCount;
        await this.schemaDAO.updateByUUID(schema);
      }
    } catch (e) {
      throw e;
    }
    return result;
  }

  public async getDataList(uuid: string, page: number, pageSize: number): Promise<List<Data>> {
    let schema: Schema = null;
    try {
      schema = await this.schemaDAO.getByUUID(uuid);
    } catch (e) {
      throw e;
    }
    if (!schema) {
      throw new Error('cannot find schema');
    }
    let list = [];
    let total = 0;
    try {
      list = await this.dataDAO.queryList(schema.uuid, page, pageSize);
    } catch (e) {
      throw e;
    }
    try {
      total = await this.dataDAO.queryCount(schema.uuid);
    } catch (e) {
      throw e;
    }
    return new List<Data>(page, pageSize, total, list);
  }
}
