import * as Config from '../config';
import {setInitStatusCode} from "../context";
import DataDAO from "../dao/DataDAO";
import SchemaDAO from "../dao/SchemaDAO";

interface Props {
  dataDAO: DataDAO;
  schemaDAO: SchemaDAO;
}

export default class SystemService {
  private dataDAO: DataDAO;
  private schemaDAO: SchemaDAO;

  constructor(props: Props) {
    this.schemaDAO = props.schemaDAO;
    this.dataDAO = props.dataDAO;
  }

  public async initDB(): Promise<boolean> {
    try {
      await this.schemaDAO.initTable();
      await this.dataDAO.initTable();
      setInitStatusCode(Config.INIT_STATUS_SUCCESS);
    } catch (e) {
      throw e;
    }
    return true;
  }
}
