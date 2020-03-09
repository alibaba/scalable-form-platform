import FormSchema from '../model/FormSchema';
import Schema from '../model/Schema';
import ISQL from "../db/ISQL";
import {getSchemaInitSQL} from "../config";

export default class SchemaDAO {
  private readonly sql: ISQL;
  private readonly tableName: string;

  constructor(db: ISQL, tablePrefix: string) {
    this.sql = db;
    this.tableName = `${tablePrefix}schema`;
  }

  public async checkDB(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const query = this.sql.getDB().query || this.sql.getDB().all;
        query.bind(this.sql.getDB())(`SELECT * FROM ${this.tableName} limit 0,1`, [], (error, results) => {
          if (error) {
            resolve(false)
          } else {
            resolve(true)
          }
        });
      } catch (e) {
        resolve(false)
      }
    })
  }

  public async initTable(): Promise<boolean> {
    const sqlLine: string = this.getInitTableSQL();
    console.log(sqlLine);
    (sqlLine.split(';') || []).map(async (sql: string) => {
      try {
        const result = await this.querySingleLine(sql);
      } catch (e) {
        throw e;
      }
    });
    return true;
  };

  public async querySingleLine(sql: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().run;
      query.bind(this.sql.getDB())(sql, [], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(true)
        }
      });
    })
  };

  public getInitTableSQL(): string {
    return getSchemaInitSQL(this.tableName);
  }

  public async insert(schema: Schema): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().run;
      query.bind(this.sql.getDB())(`INSERT INTO ${this.tableName}(${['uuid', 'title', 'visit_count', 'data_count', 'create_time', 'last_modified', 'form_schema', 'creator_id', 'creator_name', 'creator_type', 'is_deleted'].join(',')}) values (?,?,?,?,?,?,?,?,?,?,?)`, [schema.uuid, schema.title, schema.visitCount || 0, schema.dataCount || 0, new Date(), new Date(), JSON.stringify(schema.formSchema) || '{}', schema.creatorId || '', schema.creatorName || '', schema.creatorType || '', 0], function (error, results) {
        if (error) {
          reject(error);
        }
        if (results && results.insertId) {
          resolve(results.insertId);
        } else if (this.lastID) {
          resolve(this.lastID);
        } else {
          reject(new Error(`error in insert into ${this.tableName}, insertId is 0`));
        }
      });
    });
  }

  public updateByUUID(schema: Schema): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().run;
      const sql = `UPDATE ${this.tableName} set title=? ,visit_count=?, data_count=?, last_modified=?, form_schema=?, creator_id=?, creator_name=?, creator_type=? where uuid=?`;
      query.bind(this.sql.getDB())(sql, [
        (schema.title || ''),
        schema.visitCount || 0,
        schema.dataCount || 0,
        new Date(),
        JSON.stringify(schema.formSchema) || '{}',
        schema.creatorId || '',
        schema.creatorName || '',
        schema.creatorType || '',
        schema.uuid
      ], (error) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      });
    });
  }

  public getById(id: number): Promise<Schema | null> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.length > 0) {
          const result = formatSchema(results[0]);
          resolve(result);
        } else {
          resolve(null)
        }
      });
    })
  }

  public getByUUID(uuid: string): Promise<Schema | null> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT * FROM ${this.tableName} WHERE uuid = ?`, [uuid], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.length > 0) {
          const result = formatSchema(results[0]);
          resolve(result);
        } else {
          resolve(null)
        }
      });
    })
  }

  public deleteByUUID(uuid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`UPDATE ${this.tableName} set is_deleted=1 where uuid=?`, [uuid], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      });
    })
  }

  public queryList(title: string, page: number, pageSize: number): Promise<Schema[]> {
    return new Promise((resolve, reject) => {
      let offset = (page - 1) * pageSize;
      if (offset < 0) {
        offset = 0;
      }
      let where = 'where is_deleted=0';
      if (title) {
        where += ` and title like "%${title}%"`
      }
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT * FROM ${this.tableName} ${where} order by create_time desc limit ?,?`, [offset, pageSize], (error, results: Schema[]) => {
        if (error) {
          reject(error);
        }
        if (results && results.length > 0) {
          resolve(formatSchemaList(results));
        } else {
          resolve([])
        }
      });
    })
  }

  public queryCount(title: string): Promise<number> {
    return new Promise((resolve, reject) => {
      let where = 'where is_deleted=0';
      if (title) {
        where += ` and title like "%${title}%"`
      }
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT count(*) FROM ${this.tableName} ${where}`, [], (error, results: Schema[]) => {
        if (error) {
          reject(error);
        }
        resolve(results[0]['count(*)']);
      });
    })
  }
}

function formatSchemaList(infoList: any[]): Schema[] {
  return infoList.map(formatSchema);
}

function formatSchema(info: any): Schema {
  const result = new Schema();
  result.id = info.id;
  result.uuid = info.uuid;
  result.title = info.title;
  result.visitCount = info.visit_count || 0;
  result.dataCount = info.data_count || 0;
  result.createTime = new Date(info.create_time);
  result.lastModified = new Date(info.last_modified);
  try {
    result.formSchema = JSON.parse(info.form_schema);
  } catch (e) {
    result.formSchema = new FormSchema();
  }
  result.creatorId = info.creator_id;
  result.creatorName = info.creator_name;
  result.creatorType = info.creator_type;
  result.isDeleted = (info.is_deleted === 1);
  return result;
}
