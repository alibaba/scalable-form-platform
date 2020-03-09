export default class FormSchema {
  public jsonSchema: {
    [key: string]: any
  };
  public uiSchema: {
    [key: string]: any
  };
  public bizData: {
    [key: string]: any
  };
  public sequence: string[];
  public extension: {
    [key: string]: any
  };

  constructor() {
    this.jsonSchema = {};
    this.uiSchema = {};
    this.bizData = {};
    this.sequence = [];
    this.extension = {};
  }
}
