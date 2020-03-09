import * as mysql from 'mysql';
import {MySQLConfig} from "../XFormServerConfig";
import ISQL from "./ISQL";

interface Props extends MySQLConfig {
  onSuccess: (pool: mysql.Pool) => void,
  onError: (error: any) => void
}

export default class MySQL implements ISQL {
  private readonly pool: mysql.Pool;

  constructor(props: Props) {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: props.host,
      user: props.user,
      password: props.password,
      database: props.database
    });
    this.pool.query('SELECT 1 + 1 AS solution', (error: any, results: any) => {
      if (error) {
        props.onError(error);
      } else {
        const result = results[0].solution;
        if (result === 2) {
          props.onSuccess(this.pool);
        } else {
          props.onError(new Error('check query error'));
        }
      }
    });
  }

  public getDB = (): any => {
    return this.pool;
  };
}
