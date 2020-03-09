export default class Data {
  public id: number;
  public schemaUUID: string;
  public formData: {
    [key: string]: any
  };
  public createTime: Date;
  public lastModified: Date;
  public userId: string;
  public userName: string;
  public userType: string;

  public costTime: number;
  public browser: string;
  public os: string;
  public isDeleted: boolean;

  constructor(schemaUUID: string, formData: {
    [key: string]: any
  }) {
    this.id = 0;
    this.schemaUUID = schemaUUID;
    this.formData = formData;
    this.createTime = new Date();
    this.lastModified = new Date();
    this.userType = '';
    this.userId = '';
    this.userName = '';
    this.costTime = 0;
    this.browser = '';
    this.os = '';
    this.isDeleted = false;
  }
}
