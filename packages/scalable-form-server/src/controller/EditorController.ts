interface Props {

}

export default class EditorController {

  constructor(props: Props) {

  };

  public getData = async (): Promise<any> => {
    return {
      "code": null, "data": {
        "help": null,
        "data": [],
        "defaultValue": null
      }, "success": true, "message": null
    };
  };

  public getInitConfig = async (): Promise<any> => {
    return {
      "success": true,
      "data": {
        "attributeTemplate": {"fields": []},
        "optionTemplate": {"fields": []},
        "commonTemplate": {"fields": []},
        "systemTemplate": {"fields": []},
        "formTitle": "",
        "formDescription": "",
        "langs": [],
        "defaultLang": null
      },
      "message": null
    };
  };

  public getAllValidators = async (): Promise<any> => {
    return {
      "code": null,
      "data": {
        "data": []
      }, "success": true, "message": null
    };
  };

  public queryDataSourceList= async (): Promise<any> => {
    return {
      "code": null,
      "data": {
        "totalResults": 0,
        "previousPage": 1,
        "data": [],
        "nextPage": 1,
        "totalPage": 1,
        "firstResult": 0,
        "onePageSize": 2000,
        "attribute": null,
        "currentPage": 1,
        "empty": true
      },
      "success": true,
      "message": null
    };
  };
}
