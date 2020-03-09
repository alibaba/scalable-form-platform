import SchemaDAO from "../dao/SchemaDAO";
import Redis from "../db/Redis";
import FormSchema from "../model/FormSchema";
import List from "../model/List";
import Schema from "../model/Schema";

interface Props {
  schemaDAO: SchemaDAO;
  redis?: Redis;
}

export default class SchemaService {
  private schemaDAO: SchemaDAO;
  private redis?: Redis;

  constructor(props: Props) {
    this.schemaDAO = props.schemaDAO;
    this.redis = props.redis;
  }

  public async querySchemaList(title: string, page: number, pageSize: number): Promise<List<Schema>> {
    let list = [];
    let total = 0;
    try {
      list = await this.schemaDAO.queryList(title, page, pageSize);
    } catch (e) {
      throw e;
    }
    try {
      total = await this.schemaDAO.queryCount(title);
    } catch (e) {
      throw e;
    }
    return new List<Schema>(page, pageSize, total, list);
  }

  public async getSchemaByUUID(uuid: string): Promise<Schema> {
    let result: Schema = null;
    try {
      result = await this.schemaDAO.getByUUID(uuid);
    } catch (e) {
      result = null;
      throw e;
    }
    if (result && result.id) {
      result.visitCount += 1;
      await this.schemaDAO.updateByUUID(result);
    }
    return result;
  }

  public async saveSchema(uuid: string, title: string, formSchema: FormSchema): Promise<Schema> {
    if (typeof formSchema === 'string') {
      try {
        formSchema = JSON.parse(formSchema);
      } catch (e) {
        formSchema = new FormSchema();
      }
    }
    if (uuid) {
      return this.updateSchema(uuid, title, formSchema);
    } else {
      return this.insertSchema(title, formSchema);
    }
  }

  public async deleteSchemaByUUID(uuid: string): Promise<boolean> {
    let schema: Schema = null;
    try {
      schema = await this.schemaDAO.getByUUID(uuid);
    } catch (e) {
      schema = null;
      throw e;
    }
    if (schema && schema.id) {
      await this.schemaDAO.deleteByUUID(uuid);
    }
    return true;
  }

  private async insertSchema(title: string, formSchema: FormSchema): Promise<Schema> {
    const form = new Schema();
    form.formSchema = formSchema;
    form.title = title;
    let id = 0;
    try {
      id = await this.schemaDAO.insert(form);
    } catch (e) {
      throw e;
    }
    if (id) {
      form.id = id;
      return form;
    } else {
      throw new Error('error in create schema');
    }
  }

  private async updateSchema(uuid: string, title: string, formSchema: FormSchema): Promise<Schema> {
    let originSchema = null;
    try {
      originSchema = await this.schemaDAO.getByUUID(uuid);
    } catch (e) {
      throw e;
    }
    if (!originSchema) {
      throw new Error('cannot find schema');
    }
    originSchema.formSchema = formSchema;
    originSchema.title = title;
    try {
      await this.schemaDAO.updateByUUID(originSchema);
    } catch (e) {
      throw e;
    }
    return originSchema;
  }
}
