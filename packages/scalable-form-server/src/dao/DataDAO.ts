import Data from '../model/Data';
import ISQL from "../db/ISQL";
import {getDataInitSQL} from "../config";

export default class DataDAO {
  private readonly sql: ISQL;
  private readonly tableName: string;

  constructor(db: ISQL, tablePrefix: string) {
    this.sql = db;
    this.tableName = `${tablePrefix}data`;
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
        resolve(false);
      }
    })
  }

  public async initTable(): Promise<boolean> {
    const sqlLine: string = this.getInitTableSQL();
    console.log(sqlLine);
    (sqlLine.split(';') || []).map(async (sql: string) => {
      try {
        await this.querySingleLine(sql);
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
    return getDataInitSQL(this.tableName);
  }

  public async insert(data: Data): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().run;
      query.bind(this.sql.getDB())(`INSERT INTO ${this.tableName}(${['schema_uuid', 'form_data', 'create_time', 'last_modified', 'user_id', 'user_name', 'user_type', 'cost_time', 'browser', 'os', 'is_deleted'].join(',')}) values (?,?,?,?,?,?,?,?,?,?,?)`, [data.schemaUUID, JSON.stringify(data.formData) || '{}', new Date(), new Date(), data.userId || '', data.userName || '', data.userType || '', data.costTime || 0, data.browser || '', data.os || '', 0], function (error, results) {
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

  public async delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().run;
      query.bind(this.sql.getDB())(`UPDATE ${this.tableName} set is_deleted=1 where id=?`, [id], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      });
    })
  }

  public getById(id: number): Promise<Data | null> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.length > 0) {
          const result = formatData(results[0]);
          resolve(result);
        } else {
          resolve(null)
        }
      });
    })
  }

  public queryList(schemaUUID: string, page: number, pageSize: number): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      let offset = (page - 1) * pageSize;
      if (offset < 0) {
        offset = 0;
      }
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT * FROM ${this.tableName} where schema_uuid=? and is_deleted=0 order by create_time desc limit ?,?`, [schemaUUID, offset, pageSize], (error, results: Data[]) => {
        if (error) {
          reject(error);
        }
        if (results && results.length > 0) {
          resolve(formatDataList(results));
        } else {
          resolve([])
        }
      });
    })
  }

  public queryCount(schemaUUID: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = this.sql.getDB().query || this.sql.getDB().all;
      query.bind(this.sql.getDB())(`SELECT count(*) FROM ${this.tableName} where schema_uuid=? and is_deleted=0 `, [schemaUUID], (error, results: Data[]) => {
        if (error) {
          reject(error);
        }
        resolve(results[0]['count(*)']);
      });
    })
  }
}

function formatDataList(infoList: any[]): Data[] {
  return infoList.map(formatData);
}

function formatData(info: any): Data {
  const result = new Data(info.schema_id, info.form_data);
  result.id = info.id;
  try {
    result.formData = JSON.parse(info.form_data);
  } catch (e) {
    result.formData = {};
  }
  result.createTime = new Date(info.create_time);
  result.lastModified = new Date(info.last_modified);
  result.userId = info.user_id;
  result.userName = info.user_name;
  result.userType = info.user_type;
  result.costTime = info.cost_time || 0;
  result.browser = info.browser || '';
  result.os = info.os || '';
  result.isDeleted = (info.is_deleted === 1);
  return result;
}
