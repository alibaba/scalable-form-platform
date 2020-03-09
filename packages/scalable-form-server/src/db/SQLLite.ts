const sqlite3 = require('sqlite3').verbose();

import ISQL from "./ISQL";

interface Props {
  onSuccess: (db: any) => void,
  onError: (error: any) => void
}

export default class SQLLite implements ISQL {
  private readonly db;

  constructor(props: Props) {
    this.db = new sqlite3.Database(':memory:');
    this.db.all('SELECT 1 + 1 AS solution', (error: any, results: any) => {
      if (error) {
        props.onError(error);
      } else {
        const result = results[0].solution;
        if (result === 2) {
          props.onSuccess(this.db);
        } else {
          props.onError(new Error('check query error'));
        }
      }
    });
  }

  public getDB = (): any => {
    return this.db
  };
}
