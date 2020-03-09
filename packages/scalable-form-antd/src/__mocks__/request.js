// 模拟request模块

let formCodeData = {
    getSchemaByCode: {
        mohen_test_form_code: {
            "jsonSchema": {
                "type": "object",
                "title": "",
                "properties": {
                    "questionInfo": {
                        "title": "问题描述",
                        "type": "string"
                    },
                    "answer": {
                        "title": "我的答案",
                        "type": "string"
                    },
                    "SaCxWnn6Yz": {
                        "title": "复选",
                        "items": {
                            "enum": [
                                "male",
                                "female"
                            ],
                            "type": "string",
                            "enumNames": [
                                "男人",
                                "女人"
                            ]
                        },
                        "type": "array",
                        "uniqueItems": true
                    }
                }
            },
            "uiSchema": {
                "questionInfo": {
                    "ui:options": {
                        "placeholder": "请输入"
                    }
                },
                "answer": {
                    "ui:widget": "textarea",
                    "ui:options": {
                        "placeholder": "请输入"
                    }
                },
                "SaCxWnn6Yz": {
                    "ui:widget": "checkboxes",
                    "ui:options": {
                        "vertical": false
                    }
                }
            },
            "formData": {
                "questionInfo": "",
                "answer": "",
                "SaCxWnn6Yz": []
            },
            "bizData": {
                "questionInfo": {
                    "canSearch": false,
                    "fieldType": "system",
                    "type": "input"
                },
                "answer": {
                    "canSearch": false,
                    "fieldType": "system",
                    "type": "input"
                },
                "SaCxWnn6Yz": {
                    "fieldType": "system",
                    "type": "checkbox"
                }
            },
            "sequence": ["SaCxWnn6Yz", "answer", "questionInfo"],
            "extension": {
                "bizCode": "case"
            }
        },
        nuoke_test_form_code: {
            "jsonSchema": {
                "type": "object",
                "title": "",
                "properties": {
                    "questionInfo": {
                        "title": "问题描述",
                        "type": "string"
                    },
                    "answer": {
                        "title": "我的答案",
                        "type": "string"
                    },
                    "SaCxWnn6Yz": {
                        "title": "复选",
                        "items": {
                            "enum": [
                                "male",
                                "female"
                            ],
                            "type": "string",
                            "enumNames": [
                                "男人",
                                "女人"
                            ]
                        },
                        "type": "array",
                        "uniqueItems": true
                    }
                }
            },
            "uiSchema": {
                "questionInfo": {
                    "ui:options": {
                        "placeholder": "请输入"
                    }
                },
                "answer": {
                    "ui:widget": "textarea",
                    "ui:options": {
                        "placeholder": "请输入"
                    }
                },
                "SaCxWnn6Yz": {
                    "ui:widget": "checkboxes",
                    "ui:options": {
                        "vertical": false
                    }
                }
            },
            "formData": {
                "questionInfo": "",
                "answer": "",
                "SaCxWnn6Yz": []
            },
            "bizData": {
                "questionInfo": {
                    "canSearch": false,
                    "fieldType": "system",
                    "type": "input"
                },
                "answer": {
                    "canSearch": false,
                    "fieldType": "system",
                    "type": "input"
                },
                "SaCxWnn6Yz": {
                    "fieldType": "system",
                    "type": "checkbox"
                }
            },
            "sequence": ["questionInfo", "SaCxWnn6Yz", "answer"],
            "extension": {
                "bizCode": "case"
            }
        }
    },
    dataSourceServerUrl: {
        dataSourceList: {
            "defaultValue": "dataSourceList",
            "help": "请选择对应的数据源，看看能不能更新上去",
            "data": [{
                "label": "请选择数据源",
                "value": ""
            }, {
                "label": "业务类型选择器",
                "value": "bizType"
            }, {
                "label": "数据源列表",
                "value": "dataSourceList"
            }, {
                "label": "人员列表",
                "value": "memberList"
            }]
        },
        hzDistrictList: {
            "defaultValue": "haidian",
            "help": "请选择对应的数据源，看看能不能更新上去",
            "data": [{
                "label": "海淀",
                "value": "haidian"
            }, {
                "label": "朝阳",
                "value": "chaoyang"
            }, {
                "label": "上城",
                "value": "shangcheng"
            }]
        },
        hzRoadList: {
            "defaultValue": "wenyixilu",
            "help": "请选择对应的数据源，看看能不能更新上去",
            "data": [{
                "label": "文一西路",
                "value": "wenyixilu"
            }, {
                "label": "文二西路",
                "value": "wenerxilu"
            }]
        }
    },
    serverCheck: {
        duplicateCheck: {
            "success": false,
            "message": "您输入的电话号码不存在，请重试"
        },
        duplicateCheckSuccess: {
            "success": true,
            "message": "您输入的电话号码不存在，请重试"
        }
    }
};

const commonAjax = (ajaxUrl, ajaxParams = {})=> {
  return new Promise((resolve, reject) => {
      if (ajaxParams.formCode) {
          resolve(formCodeData[ajaxUrl][ajaxParams.formCode]);
      } else if (ajaxParams.sourceCode) {
          resolve(formCodeData[ajaxUrl][ajaxParams.sourceCode]);
      } else if (ajaxParams.validateCode) {
          resolve(formCodeData[ajaxUrl][ajaxParams.validateCode]);
      }
  })
};

const request = {
    getInterface: (name) => {
      return name;
    },
    fetch: (fetchApi, fetchParams, fetchGateway, fetchOptions = {})=> {
      return commonAjax(fetchApi, fetchParams, fetchOptions)
    }
};

export {request};



