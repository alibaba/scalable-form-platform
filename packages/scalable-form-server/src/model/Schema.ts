import {generateIdByPrefix} from "../utils/ID";
import FormSchema from "./FormSchema";

export default class Schema {
  public id: number;
  public uuid: string;
  public title: string;
  public visitCount: number;
  public dataCount: number;
  public createTime: Date;
  public lastModified: Date;
  public formSchema: FormSchema;
  public creatorId: string;
  public creatorName: string;
  public creatorType: string;
  public isDeleted: boolean;

  constructor() {
    this.id = 0;
    this.uuid = generateIdByPrefix('schema');
    this.formSchema = new FormSchema();
    this.visitCount = 0;
    this.dataCount = 0;
    this.createTime = new Date();
    this.lastModified = new Date();
    this.creatorId = '';
    this.creatorType = '';
    this.creatorName = '';
    this.isDeleted = false;
  }
}
