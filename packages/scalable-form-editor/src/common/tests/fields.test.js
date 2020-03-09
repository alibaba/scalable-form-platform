import {getFieldsBySchema, isSchemaLegal} from '../fields';

const originJsonForm = {
    "jsonSchema": {
        "title": "",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            "buId": {
                "title": "租户编码",
                "type": "string"
            },
            "bizType": {
                "title": "业务类型",
                "type": "string"
            },
            "touchId": {
                "title": "接触时间ID",
                "type": "string"
            },
            "caseStatus": {
                "title": "工单状态",
                "type": "string"
            },
            "departmentId": {
                "title": "客服部门",
                "type": "string"
            },
            "memberName": {
                "title": "会员名称",
                "type": "string"
            },
            "channelType": {
                "title": "渠道类型",
                "type": "string"
            },
            "id": {
                "title": "工单编码",
                "type": "string"
            },
            "memberType": {
                "title": "会员类型",
                "type": "string"
            },
            "channelId": {
                "title": "渠道编码",
                "type": "string"
            },
            "memberId": {
                "title": "会员ID",
                "type": "string"
            },
            "srType": {
                "title": "工单模板ID",
                "type": "string"
            },
            "sopCateId": {
                "title": "业务类目",
                "type": "string"
            },
            "fromInfo": {
                "type": "string",
                "title": "来源"
            },
            "planFinishTime": {
                "title": "期望完成时间",
                "type": "string"
            },
            "questionId": {
                "title": "问题ID",
                "type": "string"
            },
            "ownerName": {
                "title": "创建人",
                "type": "string"
            },
            "refCaseId": {
                "title": "关联工单",
                "type": "string"
            },
            "dataType": {
                "enumNames": [
                    "交易订单号ID",
                    "商品ID",
                    "申诉中心ID",
                    "会员名称",
                    "商品搜索码",
                    "商家子活动ID",
                    "违规编号",
                    "问题类型的问题Id",
                    "知识类型的知识Id",
                    "引导型sopId",
                    "迁移数据标识",
                    "卖家ID",
                    "买家ID",
                    "退款ID",
                    "未知"
                ],
                "title": "单据类型",
                "type": "string",
                "enum": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "20",
                    "21",
                    "22",
                    "0"
                ]
            },
            "bizId": {
                "title": "单据编号",
                "type": "string"
            },
            "questionInfo": {
                "type": "string",
                "title": "问题"
            },
            "iPiCMSEdFF": {
                "default": "",
                "type": "string",
                "title": "段落"
            },
            "Na2rFxhraP": {
                "default": "",
                "type": "string",
                "title": "单行文本框"
            },
            "HEafxt2p6p": {
                "default": "",
                "type": "string",
                "title": "多行文本框"
            },
            "E7NAfemFpW": {
                "default": "",
                "type": "string",
                "title": "富文本框"
            },
            "zrc4nM3SGm": {
                "default": "",
                "type": "number",
                "title": "数字选择器"
            },
            "xaktfGDb62": {
                "default": [],
                "uniqueItems": true,
                "type": "array",
                "title": "滑动区域输入条",
                "items": {
                    "default": 0,
                    "enumNames": [],
                    "type": "number",
                    "enum": []
                }
            },
            "scPxrX3Ynr": {
                "default": "",
                "enumNames": [
                    "选项一",
                    "选项二",
                    "选项三"
                ],
                "type": "string",
                "title": "单选",
                "enum": [
                    "if8QrGir7",
                    "KTnAdDDTz",
                    "MtpiyCTS4"
                ]
            },
            "PxSHBtRjNJ": {
                "default": [],
                "uniqueItems": true,
                "type": "array",
                "title": "复选",
                "items": {
                    "enumNames": [
                        "选项一",
                        "选项二",
                        "选项三"
                    ],
                    "type": "string",
                    "enum": [
                        "e4faCWs28",
                        "bzCAGCaW4",
                        "rRPTD5t2Q"
                    ]
                }
            },
            "tYdZERt5Af": {
                "default": false,
                "type": "boolean",
                "title": "单项复选"
            },
            "ANSF7aC87E": {
                "default": false,
                "type": "boolean",
                "title": "开关"
            },
            "bpFKS3Yaxy": {
                "maxFileNum": 10,
                "uniqueItems": true,
                "maxFileSize": 10,
                "type": "array",
                "title": "文件",
                "items": {
                    "default": "",
                    "format": "data-url",
                    "type": "string"
                }
            },
            "DWdFzYtK3E": {
                "default": [],
                "maxFileNum": 10,
                "uniqueItems": true,
                "maxFileSize": 10,
                "type": "array",
                "title": "图片",
                "items": {
                    "format": "data-url",
                    "type": "string"
                }
            },
            "r8eG4zjrZ4": {
                "default": "",
                "enumNames": [
                    "选项一",
                    "选项二",
                    "选项三"
                ],
                "type": "string",
                "title": "下拉框",
                "enum": [
                    "XtSzKA8SX",
                    "QyrtFbFKH",
                    "ffxyaBjJB"
                ]
            },
            "M7ttsKkbPM": {
                "default": "",
                "enumNames": [
                    "选项一",
                    "选项二",
                    "选项三"
                ],
                "type": "string",
                "title": "suggest下拉框",
                "enum": [
                    "WMer2cft7",
                    "BsAyADiew",
                    "appH5Gh5A"
                ]
            },
            "rAM6XDWiSD": {
                "default": [],
                "enumNames": [
                    "选项一",
                    "选项二",
                    "选项三"
                ],
                "type": "string",
                "title": "多选下拉框",
                "enum": [
                    "DY4xKrfdn",
                    "FpnHfQSPC",
                    "XJRwHpJ7f"
                ]
            },
            "JTjrTxG3Ew": {
                "default": "",
                "type": "string",
                "title": "树型下拉框"
            },
            "TipiWdkZwb": {
                "default": [],
                "enumNames": [
                    "选项一",
                    "选项二",
                    "选项三"
                ],
                "type": "string",
                "title": "级联下拉框",
                "enum": [
                    "AsmQEhSin",
                    "tmBsmyMxf",
                    "tzNyAcYSZ"
                ]
            },
            "BMsGhWMe2Z": {
                "default": "",
                "format": "date",
                "type": "string",
                "title": "日期选择器"
            },
            "G6smPAtzEs": {
                "default": [],
                "uniqueItems": true,
                "type": "array",
                "title": "日期范围选择器",
                "items": {
                    "enumNames": [],
                    "type": "string",
                    "enum": []
                }
            },
            "rjxcsBPiDM": {
                "default": "",
                "format": "date-time",
                "type": "string",
                "title": "时间选择器"
            },
            "NmWSzjZTdt": {
                "default": "",
                "enumNames": [
                    "等级一",
                    "等级二",
                    "等级三",
                    "等级四",
                    "等级五"
                ],
                "type": "string",
                "title": "评分",
                "enum": [
                    "bhC87h4Wa",
                    "x2AJeAEJs",
                    "hZT4Ac5Q4",
                    "dXZbRj5an",
                    "NXwxC6GBA"
                ]
            },
            "NHQmmGRRWS": {
                "type": "string",
                "title": "业务选择器"
            },
            "hsKpcKRHtp": {
                "uniqueItems": true,
                "type": "array",
                "title": "图片选择器",
                "items": {
                    "enumNames": [],
                    "type": "string",
                    "enum": []
                }
            },
            "Ch7czSeRnS": {
                "type": "string",
                "title": "地址选择器"
            }
        }
    },
    "uiSchema": {
        "buId": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "bizType": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "touchId": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "caseStatus": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "departmentId": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "memberName": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "channelType": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "id": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "memberType": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "channelId": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "memberId": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "srType": {
            "ui:options": {
                "placeholder": "请输入",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "sopCateId": {
            "ui:options": {
                "showSearch": true,
                "placeholder": "请选择业务类型",
                "validate": []
            },
            "ui:widget": "hidden",
            "classNames": "",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "fromInfo": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "ui:widget": "hidden",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "planFinishTime": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "classNames": ""
        },
        "questionId": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "classNames": ""
        },
        "ownerName": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "classNames": "",
            "ui:disabled": false,
            "ui:placeholder": "",
            "ui:help": ""
        },
        "refCaseId": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "classNames": ""
        },
        "dataType": {
            "ui:options": {
                "placeholder": "请选择"
            },
            "ui:widget": "select",
            "classNames": "",
            "ui:help": "",
            "ui:placeholder": "请输入"
        },
        "bizId": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "classNames": ""
        },
        "questionInfo": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "ui:widget": "textarea",
            "ui:placeholder": "",
            "ui:help": ""
        },
        "iPiCMSEdFF": {
            "ui:widget": "label"
        },
        "Na2rFxhraP": {
            "ui:placeholder": "请输入"
        },
        "HEafxt2p6p": {
            "ui:widget": "textarea",
            "ui:placeholder": "请输入"
        },
        "E7NAfemFpW": {
            "ui:options": {
                "placeholder": "请输入"
            },
            "ui:widget": "richtext"
        },
        "zrc4nM3SGm": {
            "ui:widget": "updown"
        },
        "xaktfGDb62": {
            "ui:widget": "sliderRange"
        },
        "scPxrX3Ynr": {
            "ui:options": {
                "vertical": false
            },
            "ui:widget": "radio"
        },
        "PxSHBtRjNJ": {
            "ui:options": {
                "vertical": false
            },
            "ui:widget": "checkboxes"
        },
        "tYdZERt5Af": {},
        "ANSF7aC87E": {
            "ui:widget": "switch"
        },
        "bpFKS3Yaxy": {
            "ui:options": {
                "templateFileUrl": "",
                "label": "文件上传",
                "accept": "*/*"
            }
        },
        "DWdFzYtK3E": {
            "ui:options": {
                "exampleImageUrl": "",
                "vertical": true,
                "label": "图片上传",
                "listType": "picture",
                "accept": "image/*"
            }
        },
        "r8eG4zjrZ4": {
            "ui:widget": "select",
            "ui:placeholder": "请选择"
        },
        "M7ttsKkbPM": {
            "ui:widget": "suggestSelect",
            "ui:placeholder": "请选择"
        },
        "rAM6XDWiSD": {
            "ui:widget": "multiSelect",
            "ui:placeholder": "请选择"
        },
        "JTjrTxG3Ew": {
            "ui:widget": "treeSelect",
            "ui:placeholder": "请选择"
        },
        "TipiWdkZwb": {
            "ui:widget": "cascader",
            "ui:placeholder": "请选择"
        },
        "BMsGhWMe2Z": {
            "ui:options": {
                "format": "YYYY-MM-DD"
            },
            "ui:widget": "date",
            "ui:placeholder": "请选择"
        },
        "G6smPAtzEs": {
            "ui:options": {
                "placeholder": [
                    "开始日期",
                    "结束日期"
                ]
            },
            "ui:widget": "dateRange"
        },
        "rjxcsBPiDM": {
            "ui:options": {
                "format": "YYYY-MM-DD HH:mm:ss"
            },
            "ui:widget": "datetime",
            "ui:placeholder": "请选择"
        },
        "NmWSzjZTdt": {
            "ui:widget": "rate"
        },
        "NHQmmGRRWS": {
            "ui:widget": "categorySelector"
        },
        "hsKpcKRHtp": {
            "ui:options": {
                "imagePickerMultiple": true,
                "imagePickerShowType": false
            },
            "ui:widget": "imagePicker"
        },
        "Ch7czSeRnS": {
            "ui:widget": "addressPicker"
        }
    },
    "formData": {
        "buId": "",
        "bizType": "",
        "touchId": "",
        "caseStatus": "",
        "departmentId": "",
        "memberName": "",
        "channelType": "",
        "id": "",
        "memberType": "",
        "channelId": "",
        "memberId": "",
        "srType": "",
        "sopCateId": "",
        "fromInfo": "",
        "planFinishTime": "",
        "questionId": "",
        "ownerName": "",
        "refCaseId": "",
        "dataType": "",
        "bizId": "",
        "questionInfo": "",
        "iPiCMSEdFF": "普通文本默认值",
        "Na2rFxhraP": "",
        "HEafxt2p6p": "",
        "E7NAfemFpW": "",
        "zrc4nM3SGm": "",
        "xaktfGDb62": [],
        "scPxrX3Ynr": "",
        "PxSHBtRjNJ": [],
        "tYdZERt5Af": false,
        "ANSF7aC87E": false,
        "bpFKS3Yaxy": [],
        "DWdFzYtK3E": [],
        "r8eG4zjrZ4": "",
        "M7ttsKkbPM": "",
        "rAM6XDWiSD": [],
        "JTjrTxG3Ew": "",
        "TipiWdkZwb": [],
        "BMsGhWMe2Z": "",
        "G6smPAtzEs": [],
        "rjxcsBPiDM": "",
        "NmWSzjZTdt": "",
        "NHQmmGRRWS": "",
        "hsKpcKRHtp": [],
        "Ch7czSeRnS": ""
    },
    "bizData": {
        "buId": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "bizType": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "touchId": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "caseStatus": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "departmentId": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "memberName": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "channelType": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "id": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "memberType": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "channelId": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "memberId": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "srType": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isDisplay": false
        },
        "sopCateId": {
            "isSearch": false,
            "isTaskFilter": false,
            "type": "bizSelector",
            "fieldType": "system"
        },
        "fromInfo": {
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "system",
            "isViewField": false
        },
        "planFinishTime": {
            "readonly": false,
            "isSearch": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "input",
            "fieldType": "common",
            "isDisplay": false
        },
        "questionId": {
            "readonly": false,
            "isSearch": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "input",
            "fieldType": "common",
            "isDisplay": false
        },
        "ownerName": {
            "readonly": false,
            "isSearch": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "input",
            "fieldType": "common",
            "isDisplay": false
        },
        "refCaseId": {
            "readonly": false,
            "isSearch": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "input",
            "fieldType": "common",
            "isDisplay": false
        },
        "dataType": {
            "readonly": false,
            "isSearch": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "select",
            "fieldType": "common",
            "isViewField": false
        },
        "bizId": {
            "readonly": false,
            "isSearch": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "input",
            "fieldType": "common",
            "isDisplay": false
        },
        "questionInfo": {
            "showRoleList": [],
            "readonly": false,
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "disabled": false,
            "type": "textarea",
            "fieldType": "common",
            "isViewField": false,
            "dataLevel": "0"
        },
        "iPiCMSEdFF": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "label",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "Na2rFxhraP": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "input",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "HEafxt2p6p": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "textarea",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "E7NAfemFpW": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "richtext",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "zrc4nM3SGm": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "number",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "xaktfGDb62": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "sliderRange",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "scPxrX3Ynr": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "options": {
                "if8QrGir7": {
                    "code": "if8QrGir7",
                    "name": "选项一"
                },
                "KTnAdDDTz": {
                    "code": "KTnAdDDTz",
                    "name": "选项二"
                },
                "MtpiyCTS4": {
                    "code": "MtpiyCTS4",
                    "name": "选项三"
                }
            },
            "type": "radio",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "PxSHBtRjNJ": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "checkbox",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "tYdZERt5Af": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "booleanCheckbox",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "ANSF7aC87E": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "booleanSwitch",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "bpFKS3Yaxy": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "file",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "DWdFzYtK3E": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "upload",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "r8eG4zjrZ4": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "options": {
                "XtSzKA8SX": {
                    "code": "XtSzKA8SX",
                    "name": "选项一"
                },
                "QyrtFbFKH": {
                    "code": "QyrtFbFKH",
                    "name": "选项二"
                },
                "ffxyaBjJB": {
                    "code": "ffxyaBjJB",
                    "name": "选项三"
                }
            },
            "type": "select",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "M7ttsKkbPM": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "options": {
                "BsAyADiew": {
                    "code": "BsAyADiew",
                    "name": "选项二"
                },
                "WMer2cft7": {
                    "code": "WMer2cft7",
                    "name": "选项一"
                },
                "appH5Gh5A": {
                    "code": "appH5Gh5A",
                    "name": "选项三"
                }
            },
            "type": "suggestSelect",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "rAM6XDWiSD": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "options": {
                "FpnHfQSPC": {
                    "code": "FpnHfQSPC",
                    "name": "选项二"
                },
                "DY4xKrfdn": {
                    "code": "DY4xKrfdn",
                    "name": "选项一"
                },
                "XJRwHpJ7f": {
                    "code": "XJRwHpJ7f",
                    "name": "选项三"
                }
            },
            "type": "multiSelect",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "JTjrTxG3Ew": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "treeSelect",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "TipiWdkZwb": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "options": {
                "tmBsmyMxf": {
                    "code": "tmBsmyMxf",
                    "name": "选项二"
                },
                "tzNyAcYSZ": {
                    "code": "tzNyAcYSZ",
                    "name": "选项三"
                },
                "AsmQEhSin": {
                    "code": "AsmQEhSin",
                    "name": "选项一"
                }
            },
            "type": "cascaderSelect",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "BMsGhWMe2Z": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "date",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "G6smPAtzEs": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "dateRange",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "rjxcsBPiDM": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "datetime",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "NmWSzjZTdt": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "options": {
                "hZT4Ac5Q4": {
                    "code": "hZT4Ac5Q4",
                    "name": "等级三"
                },
                "bhC87h4Wa": {
                    "code": "bhC87h4Wa",
                    "name": "等级一"
                },
                "x2AJeAEJs": {
                    "code": "x2AJeAEJs",
                    "name": "等级二"
                },
                "dXZbRj5an": {
                    "code": "dXZbRj5an",
                    "name": "等级四"
                },
                "NXwxC6GBA": {
                    "code": "NXwxC6GBA",
                    "name": "等级五"
                }
            },
            "type": "rate",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "NHQmmGRRWS": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "bizSelector",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "hsKpcKRHtp": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "imageSelector",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        },
        "Ch7czSeRnS": {
            "showRoleList": [],
            "isSearch": false,
            "isSensitive": false,
            "isTaskFilter": false,
            "type": "addressPicker",
            "fieldType": "custom",
            "isViewField": true,
            "dataLevel": "0"
        }
    },
    "sequence": [
        "buId",
        "bizType",
        "touchId",
        "caseStatus",
        "departmentId",
        "memberName",
        "channelType",
        "id",
        "memberType",
        "channelId",
        "memberId",
        "srType",
        "sopCateId",
        "fromInfo",
        "planFinishTime",
        "questionId",
        "ownerName",
        "refCaseId",
        "dataType",
        "bizId",
        "questionInfo",
        "iPiCMSEdFF",
        "Na2rFxhraP",
        "HEafxt2p6p",
        "E7NAfemFpW",
        "zrc4nM3SGm",
        "xaktfGDb62",
        "scPxrX3Ynr",
        "PxSHBtRjNJ",
        "tYdZERt5Af",
        "ANSF7aC87E",
        "bpFKS3Yaxy",
        "DWdFzYtK3E",
        "r8eG4zjrZ4",
        "M7ttsKkbPM",
        "rAM6XDWiSD",
        "JTjrTxG3Ew",
        "TipiWdkZwb",
        "BMsGhWMe2Z",
        "G6smPAtzEs",
        "rjxcsBPiDM",
        "NmWSzjZTdt",
        "NHQmmGRRWS",
        "hsKpcKRHtp",
        "Ch7czSeRnS"
    ],
    "extension": {
        "bizCode": "case"
    }
};
const fields = {
    "fields": [{
        "code": "buId",
        "jsonSchema": {"buId": {"title": "租户编码", "type": "string"}},
        "uiSchema": {
            "buId": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"buId": ""},
        "bizData": {
            "buId": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "租户编码",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "bizType",
        "jsonSchema": {"bizType": {"title": "业务类型", "type": "string"}},
        "uiSchema": {
            "bizType": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"bizType": ""},
        "bizData": {
            "bizType": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "业务类型",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "touchId",
        "jsonSchema": {"touchId": {"title": "接触时间ID", "type": "string"}},
        "uiSchema": {
            "touchId": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"touchId": ""},
        "bizData": {
            "touchId": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "接触时间ID",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "caseStatus",
        "jsonSchema": {"caseStatus": {"title": "工单状态", "type": "string"}},
        "uiSchema": {
            "caseStatus": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"caseStatus": ""},
        "bizData": {
            "caseStatus": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "工单状态",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "departmentId",
        "jsonSchema": {"departmentId": {"title": "客服部门", "type": "string"}},
        "uiSchema": {
            "departmentId": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"departmentId": ""},
        "bizData": {
            "departmentId": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "客服部门",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "memberName",
        "jsonSchema": {"memberName": {"title": "会员名称", "type": "string"}},
        "uiSchema": {
            "memberName": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"memberName": ""},
        "bizData": {
            "memberName": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "会员名称",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "channelType",
        "jsonSchema": {"channelType": {"title": "渠道类型", "type": "string"}},
        "uiSchema": {
            "channelType": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"channelType": ""},
        "bizData": {
            "channelType": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "渠道类型",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "id",
        "jsonSchema": {"id": {"title": "工单编码", "type": "string"}},
        "uiSchema": {
            "id": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"id": ""},
        "bizData": {
            "id": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "工单编码",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "memberType",
        "jsonSchema": {"memberType": {"title": "会员类型", "type": "string"}},
        "uiSchema": {
            "memberType": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"memberType": ""},
        "bizData": {
            "memberType": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "会员类型",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "channelId",
        "jsonSchema": {"channelId": {"title": "渠道编码", "type": "string"}},
        "uiSchema": {
            "channelId": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"channelId": ""},
        "bizData": {
            "channelId": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "渠道编码",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "memberId",
        "jsonSchema": {"memberId": {"title": "会员ID", "type": "string"}},
        "uiSchema": {
            "memberId": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"memberId": ""},
        "bizData": {
            "memberId": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "会员ID",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "srType",
        "jsonSchema": {"srType": {"title": "工单模板ID", "type": "string"}},
        "uiSchema": {
            "srType": {
                "ui:options": {"placeholder": "请输入", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"srType": ""},
        "bizData": {
            "srType": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isDisplay": false
            }
        },
        "label": "工单模板ID",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "sopCateId",
        "jsonSchema": {"sopCateId": {"title": "业务类目", "type": "string"}},
        "uiSchema": {
            "sopCateId": {
                "ui:options": {"showSearch": true, "placeholder": "请选择业务类型", "validate": []},
                "ui:widget": "hidden",
                "classNames": "",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"sopCateId": ""},
        "bizData": {
            "sopCateId": {
                "isSearch": false,
                "isTaskFilter": false,
                "type": "bizSelector",
                "fieldType": "system"
            }
        },
        "label": "业务类目",
        "type": "bizSelector",
        "fieldType": "system",
        "required": false
    }, {
        "code": "fromInfo",
        "jsonSchema": {"fromInfo": {"type": "string", "title": "来源"}},
        "uiSchema": {
            "fromInfo": {
                "ui:options": {"placeholder": "请输入"},
                "ui:widget": "hidden",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"fromInfo": ""},
        "bizData": {
            "fromInfo": {
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "system",
                "isViewField": false
            }
        },
        "label": "来源",
        "type": "input",
        "fieldType": "system",
        "required": false
    }, {
        "code": "planFinishTime",
        "jsonSchema": {"planFinishTime": {"title": "期望完成时间", "type": "string"}},
        "uiSchema": {"planFinishTime": {"ui:options": {"placeholder": "请输入"}, "classNames": ""}},
        "formData": {"planFinishTime": ""},
        "bizData": {
            "planFinishTime": {
                "readonly": false,
                "isSearch": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "input",
                "fieldType": "common",
                "isDisplay": false
            }
        },
        "label": "期望完成时间",
        "type": "input",
        "fieldType": "common",
        "required": false
    }, {
        "code": "questionId",
        "jsonSchema": {"questionId": {"title": "问题ID", "type": "string"}},
        "uiSchema": {"questionId": {"ui:options": {"placeholder": "请输入"}, "classNames": ""}},
        "formData": {"questionId": ""},
        "bizData": {
            "questionId": {
                "readonly": false,
                "isSearch": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "input",
                "fieldType": "common",
                "isDisplay": false
            }
        },
        "label": "问题ID",
        "type": "input",
        "fieldType": "common",
        "required": false
    }, {
        "code": "ownerName",
        "jsonSchema": {"ownerName": {"title": "创建人", "type": "string"}},
        "uiSchema": {
            "ownerName": {
                "ui:options": {"placeholder": "请输入"},
                "classNames": "",
                "ui:disabled": false,
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"ownerName": ""},
        "bizData": {
            "ownerName": {
                "readonly": false,
                "isSearch": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "input",
                "fieldType": "common",
                "isDisplay": false
            }
        },
        "label": "创建人",
        "type": "input",
        "fieldType": "common",
        "required": false
    }, {
        "code": "refCaseId",
        "jsonSchema": {"refCaseId": {"title": "关联工单", "type": "string"}},
        "uiSchema": {"refCaseId": {"ui:options": {"placeholder": "请输入"}, "classNames": ""}},
        "formData": {"refCaseId": ""},
        "bizData": {
            "refCaseId": {
                "readonly": false,
                "isSearch": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "input",
                "fieldType": "common",
                "isDisplay": false
            }
        },
        "label": "关联工单",
        "type": "input",
        "fieldType": "common",
        "required": false
    }, {
        "code": "dataType",
        "jsonSchema": {
            "dataType": {
                "enumNames": ["交易订单号ID", "商品ID", "申诉中心ID", "会员名称", "商品搜索码", "商家子活动ID", "违规编号", "问题类型的问题Id", "知识类型的知识Id", "引导型sopId", "迁移数据标识", "卖家ID", "买家ID", "退款ID", "未知"],
                "title": "单据类型",
                "type": "string",
                "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "20", "21", "22", "0"]
            }
        },
        "uiSchema": {
            "dataType": {
                "ui:options": {"placeholder": "请选择"},
                "ui:widget": "select",
                "classNames": "",
                "ui:help": "",
                "ui:placeholder": "请输入"
            }
        },
        "formData": {"dataType": ""},
        "bizData": {
            "dataType": {
                "readonly": false,
                "isSearch": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "select",
                "fieldType": "common",
                "isViewField": false
            }
        },
        "label": "单据类型",
        "type": "select",
        "fieldType": "common",
        "required": false
    }, {
        "code": "bizId",
        "jsonSchema": {"bizId": {"title": "单据编号", "type": "string"}},
        "uiSchema": {"bizId": {"ui:options": {"placeholder": "请输入"}, "classNames": ""}},
        "formData": {"bizId": ""},
        "bizData": {
            "bizId": {
                "readonly": false,
                "isSearch": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "input",
                "fieldType": "common",
                "isDisplay": false
            }
        },
        "label": "单据编号",
        "type": "input",
        "fieldType": "common",
        "required": false
    }, {
        "code": "questionInfo",
        "jsonSchema": {"questionInfo": {"type": "string", "title": "问题"}},
        "uiSchema": {
            "questionInfo": {
                "ui:options": {"placeholder": "请输入"},
                "ui:widget": "textarea",
                "ui:placeholder": "",
                "ui:help": ""
            }
        },
        "formData": {"questionInfo": ""},
        "bizData": {
            "questionInfo": {
                "showRoleList": [],
                "readonly": false,
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "disabled": false,
                "type": "textarea",
                "fieldType": "common",
                "isViewField": false,
                "dataLevel": "0"
            }
        },
        "label": "问题",
        "type": "textarea",
        "fieldType": "common",
        "required": false
    }, {
        "code": "iPiCMSEdFF",
        "jsonSchema": {"iPiCMSEdFF": {"default": "", "type": "string", "title": "段落"}},
        "uiSchema": {"iPiCMSEdFF": {"ui:widget": "label"}},
        "formData": {"iPiCMSEdFF": "普通文本默认值"},
        "bizData": {
            "iPiCMSEdFF": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "label",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "段落",
        "type": "label",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "Na2rFxhraP",
        "jsonSchema": {"Na2rFxhraP": {"default": "", "type": "string", "title": "单行文本框"}},
        "uiSchema": {"Na2rFxhraP": {"ui:placeholder": "请输入"}},
        "formData": {"Na2rFxhraP": ""},
        "bizData": {
            "Na2rFxhraP": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "input",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "单行文本框",
        "type": "input",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "HEafxt2p6p",
        "jsonSchema": {"HEafxt2p6p": {"default": "", "type": "string", "title": "多行文本框"}},
        "uiSchema": {"HEafxt2p6p": {"ui:widget": "textarea", "ui:placeholder": "请输入"}},
        "formData": {"HEafxt2p6p": ""},
        "bizData": {
            "HEafxt2p6p": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "textarea",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "多行文本框",
        "type": "textarea",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "E7NAfemFpW",
        "jsonSchema": {"E7NAfemFpW": {"default": "", "type": "string", "title": "富文本框"}},
        "uiSchema": {"E7NAfemFpW": {"ui:options": {"placeholder": "请输入"}, "ui:widget": "richtext"}},
        "formData": {"E7NAfemFpW": ""},
        "bizData": {
            "E7NAfemFpW": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "richtext",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "富文本框",
        "type": "richtext",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "zrc4nM3SGm",
        "jsonSchema": {"zrc4nM3SGm": {"default": "", "type": "number", "title": "数字选择器"}},
        "uiSchema": {"zrc4nM3SGm": {"ui:widget": "updown"}},
        "formData": {"zrc4nM3SGm": ""},
        "bizData": {
            "zrc4nM3SGm": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "number",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "数字选择器",
        "type": "number",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "xaktfGDb62",
        "jsonSchema": {
            "xaktfGDb62": {
                "default": [],
                "uniqueItems": true,
                "type": "array",
                "title": "滑动区域输入条",
                "items": {"default": 0, "enumNames": [], "type": "number", "enum": []}
            }
        },
        "uiSchema": {"xaktfGDb62": {"ui:widget": "sliderRange"}},
        "formData": {"xaktfGDb62": []},
        "bizData": {
            "xaktfGDb62": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "sliderRange",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "滑动区域输入条",
        "type": "sliderRange",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "scPxrX3Ynr",
        "jsonSchema": {
            "scPxrX3Ynr": {
                "default": "",
                "enumNames": ["选项一", "选项二", "选项三"],
                "type": "string",
                "title": "单选",
                "enum": ["if8QrGir7", "KTnAdDDTz", "MtpiyCTS4"]
            }
        },
        "uiSchema": {"scPxrX3Ynr": {"ui:options": {"vertical": false}, "ui:widget": "radio"}},
        "formData": {"scPxrX3Ynr": ""},
        "bizData": {
            "scPxrX3Ynr": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "options": {
                    "if8QrGir7": {"code": "if8QrGir7", "name": "选项一"},
                    "KTnAdDDTz": {"code": "KTnAdDDTz", "name": "选项二"},
                    "MtpiyCTS4": {"code": "MtpiyCTS4", "name": "选项三"}
                },
                "type": "radio",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "单选",
        "type": "radio",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "PxSHBtRjNJ",
        "jsonSchema": {
            "PxSHBtRjNJ": {
                "default": [],
                "uniqueItems": true,
                "type": "array",
                "title": "复选",
                "items": {
                    "enumNames": ["选项一", "选项二", "选项三"],
                    "type": "string",
                    "enum": ["e4faCWs28", "bzCAGCaW4", "rRPTD5t2Q"]
                }
            }
        },
        "uiSchema": {"PxSHBtRjNJ": {"ui:options": {"vertical": false}, "ui:widget": "checkboxes"}},
        "formData": {"PxSHBtRjNJ": []},
        "bizData": {
            "PxSHBtRjNJ": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "checkbox",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "复选",
        "type": "checkbox",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "tYdZERt5Af",
        "jsonSchema": {"tYdZERt5Af": {"default": false, "type": "boolean", "title": "单项复选"}},
        "uiSchema": {"tYdZERt5Af": {}},
        "formData": {"tYdZERt5Af": false},
        "bizData": {
            "tYdZERt5Af": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "booleanCheckbox",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "单项复选",
        "type": "booleanCheckbox",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "ANSF7aC87E",
        "jsonSchema": {"ANSF7aC87E": {"default": false, "type": "boolean", "title": "开关"}},
        "uiSchema": {"ANSF7aC87E": {"ui:widget": "switch"}},
        "formData": {"ANSF7aC87E": false},
        "bizData": {
            "ANSF7aC87E": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "booleanSwitch",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "开关",
        "type": "booleanSwitch",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "bpFKS3Yaxy",
        "jsonSchema": {
            "bpFKS3Yaxy": {
                "maxFileNum": 10,
                "uniqueItems": true,
                "maxFileSize": 10,
                "type": "array",
                "title": "文件",
                "items": {"default": "", "format": "data-url", "type": "string"}
            }
        },
        "uiSchema": {"bpFKS3Yaxy": {"ui:options": {"templateFileUrl": "", "label": "文件上传", "accept": "*/*"}}},
        "formData": {"bpFKS3Yaxy": []},
        "bizData": {
            "bpFKS3Yaxy": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "file",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "文件",
        "type": "file",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "DWdFzYtK3E",
        "jsonSchema": {
            "DWdFzYtK3E": {
                "default": [],
                "maxFileNum": 10,
                "uniqueItems": true,
                "maxFileSize": 10,
                "type": "array",
                "title": "图片",
                "items": {"format": "data-url", "type": "string"}
            }
        },
        "uiSchema": {
            "DWdFzYtK3E": {
                "ui:options": {
                    "exampleImageUrl": "",
                    "vertical": true,
                    "label": "图片上传",
                    "listType": "picture",
                    "accept": "image/*"
                }
            }
        },
        "formData": {"DWdFzYtK3E": []},
        "bizData": {
            "DWdFzYtK3E": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "upload",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "图片",
        "type": "upload",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "r8eG4zjrZ4",
        "jsonSchema": {
            "r8eG4zjrZ4": {
                "default": "",
                "enumNames": ["选项一", "选项二", "选项三"],
                "type": "string",
                "title": "下拉框",
                "enum": ["XtSzKA8SX", "QyrtFbFKH", "ffxyaBjJB"]
            }
        },
        "uiSchema": {"r8eG4zjrZ4": {"ui:widget": "select", "ui:placeholder": "请选择"}},
        "formData": {"r8eG4zjrZ4": ""},
        "bizData": {
            "r8eG4zjrZ4": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "options": {
                    "XtSzKA8SX": {"code": "XtSzKA8SX", "name": "选项一"},
                    "QyrtFbFKH": {"code": "QyrtFbFKH", "name": "选项二"},
                    "ffxyaBjJB": {"code": "ffxyaBjJB", "name": "选项三"}
                },
                "type": "select",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "下拉框",
        "type": "select",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "M7ttsKkbPM",
        "jsonSchema": {
            "M7ttsKkbPM": {
                "default": "",
                "enumNames": ["选项一", "选项二", "选项三"],
                "type": "string",
                "title": "suggest下拉框",
                "enum": ["WMer2cft7", "BsAyADiew", "appH5Gh5A"]
            }
        },
        "uiSchema": {"M7ttsKkbPM": {"ui:widget": "suggestSelect", "ui:placeholder": "请选择"}},
        "formData": {"M7ttsKkbPM": ""},
        "bizData": {
            "M7ttsKkbPM": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "options": {
                    "BsAyADiew": {"code": "BsAyADiew", "name": "选项二"},
                    "WMer2cft7": {"code": "WMer2cft7", "name": "选项一"},
                    "appH5Gh5A": {"code": "appH5Gh5A", "name": "选项三"}
                },
                "type": "suggestSelect",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "suggest下拉框",
        "type": "suggestSelect",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "rAM6XDWiSD",
        "jsonSchema": {
            "rAM6XDWiSD": {
                "default": [],
                "enumNames": ["选项一", "选项二", "选项三"],
                "type": "string",
                "title": "多选下拉框",
                "enum": ["DY4xKrfdn", "FpnHfQSPC", "XJRwHpJ7f"]
            }
        },
        "uiSchema": {"rAM6XDWiSD": {"ui:widget": "multiSelect", "ui:placeholder": "请选择"}},
        "formData": {"rAM6XDWiSD": []},
        "bizData": {
            "rAM6XDWiSD": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "options": {
                    "FpnHfQSPC": {"code": "FpnHfQSPC", "name": "选项二"},
                    "DY4xKrfdn": {"code": "DY4xKrfdn", "name": "选项一"},
                    "XJRwHpJ7f": {"code": "XJRwHpJ7f", "name": "选项三"}
                },
                "type": "multiSelect",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "多选下拉框",
        "type": "multiSelect",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "JTjrTxG3Ew",
        "jsonSchema": {"JTjrTxG3Ew": {"default": "", "type": "string", "title": "树型下拉框"}},
        "uiSchema": {"JTjrTxG3Ew": {"ui:widget": "treeSelect", "ui:placeholder": "请选择"}},
        "formData": {"JTjrTxG3Ew": ""},
        "bizData": {
            "JTjrTxG3Ew": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "treeSelect",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "树型下拉框",
        "type": "treeSelect",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "TipiWdkZwb",
        "jsonSchema": {
            "TipiWdkZwb": {
                "default": [],
                "enumNames": ["选项一", "选项二", "选项三"],
                "type": "string",
                "title": "级联下拉框",
                "enum": ["AsmQEhSin", "tmBsmyMxf", "tzNyAcYSZ"]
            }
        },
        "uiSchema": {"TipiWdkZwb": {"ui:widget": "cascader", "ui:placeholder": "请选择"}},
        "formData": {"TipiWdkZwb": []},
        "bizData": {
            "TipiWdkZwb": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "options": {
                    "tmBsmyMxf": {"code": "tmBsmyMxf", "name": "选项二"},
                    "tzNyAcYSZ": {"code": "tzNyAcYSZ", "name": "选项三"},
                    "AsmQEhSin": {"code": "AsmQEhSin", "name": "选项一"}
                },
                "type": "cascaderSelect",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "级联下拉框",
        "type": "cascaderSelect",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "BMsGhWMe2Z",
        "jsonSchema": {"BMsGhWMe2Z": {"default": "", "format": "date", "type": "string", "title": "日期选择器"}},
        "uiSchema": {
            "BMsGhWMe2Z": {
                "ui:options": {"format": "YYYY-MM-DD"},
                "ui:widget": "date",
                "ui:placeholder": "请选择"
            }
        },
        "formData": {"BMsGhWMe2Z": ""},
        "bizData": {
            "BMsGhWMe2Z": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "date",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "日期选择器",
        "type": "date",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "G6smPAtzEs",
        "jsonSchema": {
            "G6smPAtzEs": {
                "default": [],
                "uniqueItems": true,
                "type": "array",
                "title": "日期范围选择器",
                "items": {"enumNames": [], "type": "string", "enum": []}
            }
        },
        "uiSchema": {"G6smPAtzEs": {"ui:options": {"placeholder": ["开始日期", "结束日期"]}, "ui:widget": "dateRange"}},
        "formData": {"G6smPAtzEs": []},
        "bizData": {
            "G6smPAtzEs": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "dateRange",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "日期范围选择器",
        "type": "dateRange",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "rjxcsBPiDM",
        "jsonSchema": {"rjxcsBPiDM": {"default": "", "format": "date-time", "type": "string", "title": "时间选择器"}},
        "uiSchema": {
            "rjxcsBPiDM": {
                "ui:options": {"format": "YYYY-MM-DD HH:mm:ss"},
                "ui:widget": "datetime",
                "ui:placeholder": "请选择"
            }
        },
        "formData": {"rjxcsBPiDM": ""},
        "bizData": {
            "rjxcsBPiDM": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "datetime",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "时间选择器",
        "type": "datetime",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "NmWSzjZTdt",
        "jsonSchema": {
            "NmWSzjZTdt": {
                "default": "",
                "enumNames": ["等级一", "等级二", "等级三", "等级四", "等级五"],
                "type": "string",
                "title": "评分",
                "enum": ["bhC87h4Wa", "x2AJeAEJs", "hZT4Ac5Q4", "dXZbRj5an", "NXwxC6GBA"]
            }
        },
        "uiSchema": {"NmWSzjZTdt": {"ui:widget": "rate"}},
        "formData": {"NmWSzjZTdt": ""},
        "bizData": {
            "NmWSzjZTdt": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "options": {
                    "hZT4Ac5Q4": {"code": "hZT4Ac5Q4", "name": "等级三"},
                    "bhC87h4Wa": {"code": "bhC87h4Wa", "name": "等级一"},
                    "x2AJeAEJs": {"code": "x2AJeAEJs", "name": "等级二"},
                    "dXZbRj5an": {"code": "dXZbRj5an", "name": "等级四"},
                    "NXwxC6GBA": {"code": "NXwxC6GBA", "name": "等级五"}
                },
                "type": "rate",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "评分",
        "type": "rate",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "NHQmmGRRWS",
        "jsonSchema": {"NHQmmGRRWS": {"type": "string", "title": "业务选择器"}},
        "uiSchema": {"NHQmmGRRWS": {"ui:widget": "categorySelector"}},
        "formData": {"NHQmmGRRWS": ""},
        "bizData": {
            "NHQmmGRRWS": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "bizSelector",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "业务选择器",
        "type": "bizSelector",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "hsKpcKRHtp",
        "jsonSchema": {
            "hsKpcKRHtp": {
                "uniqueItems": true,
                "type": "array",
                "title": "图片选择器",
                "items": {"enumNames": [], "type": "string", "enum": []}
            }
        },
        "uiSchema": {
            "hsKpcKRHtp": {
                "ui:options": {"imagePickerMultiple": true, "imagePickerShowType": false},
                "ui:widget": "imagePicker"
            }
        },
        "formData": {"hsKpcKRHtp": []},
        "bizData": {
            "hsKpcKRHtp": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "imageSelector",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "图片选择器",
        "type": "imageSelector",
        "fieldType": "custom",
        "required": false
    }, {
        "code": "Ch7czSeRnS",
        "jsonSchema": {"Ch7czSeRnS": {"type": "string", "title": "地址选择器"}},
        "uiSchema": {"Ch7czSeRnS": {"ui:widget": "addressPicker"}},
        "formData": {"Ch7czSeRnS": ""},
        "bizData": {
            "Ch7czSeRnS": {
                "showRoleList": [],
                "isSearch": false,
                "isSensitive": false,
                "isTaskFilter": false,
                "type": "addressPicker",
                "fieldType": "custom",
                "isViewField": true,
                "dataLevel": "0"
            }
        },
        "label": "地址选择器",
        "type": "addressPicker",
        "fieldType": "custom",
        "required": false
    }]
};
test('isSchemaLegal', () => {
    expect(isSchemaLegal(originJsonForm)).toBe(true);
});

test('getFieldsBySchema', () => {
    const resultFields = getFieldsBySchema(originJsonForm);
    expect(equals(fields, resultFields)).toBe(true);
});

/* eslint-disable */
function equals( x, y ) {
    if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

    if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for ( var p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;
        // other properties were tested using x.constructor === y.constructor

        if ( ! y.hasOwnProperty( p ) ) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if ( x[ p ] === y[ p ] ) continue;
        // if they have the same strict value or identity then they are equal

        if ( typeof( x[ p ] ) !== "object" ) return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if ( ! equals( x[ p ],  y[ p ] ) ) {
            console.log('diff', x[p], y[p], p)
            return false;
        }
        // Objects and Arrays must be tested recursively
    }

    for ( p in y ) {
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        // allows x[ p ] to be set to undefined
    }
    return true;
}
