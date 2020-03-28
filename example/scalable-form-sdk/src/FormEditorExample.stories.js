import {storiesOf} from "@storybook/react";
import React, {Component} from 'react';
import SchemaEditor from 'scalable-form-editor';

const storiesWithEditor = storiesOf('Editor', module);

const originFormSchema = {
  "sequence": [
    "dataType",
    "questionId",
    "questionInfo"
  ],
  "jsonSchema": {
    "description": "",
    "title": "",
    "type": "object",
    "required": [],
    "properties": {
      "questionId": {
        "title": "问题ID",
        "type": "string"
      },
      "questionInfo": {
        "type": "string",
        "title": "问题描述"
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
        "title": "问题类型",
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
    }
  },
  "uiSchema": {
    "questionId": {
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
    "dataType": {
      "ui:options": {
        "placeholder": "请选择"
      },
      "ui:widget": "select",
      "classNames": "",
      "ui:help": "",
      "ui:placeholder": "请输入"
    },
  },
  "formData": {
    "questionId": "",
    "questionInfo": "",
    "dataType": "",
  },
  "bizData": {
    "questionId": {
      "showRoleList": [],
      "readonly": false,
      "isSearch": true,
      "isSensitive": false,
      "isTaskFilter": false,
      "disabled": false,
      "type": "input",
      "fieldType": "common",
      "isViewField": true,
      "dataLevel": "0",
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
      "isViewField": true,
      "dataLevel": "0"
    },
    "dataType": {
      "showRoleList": [],
      "readonly": false,
      "isSearch": false,
      "isSensitive": false,
      "isTaskFilter": false,
      "disabled": false,
      "type": "select",
      "fieldType": "common",
      "isViewField": true,
      "dataLevel": "0"
    }
  }
};

class FormEditorExample extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      formSchema: originFormSchema
    };
  }

  handleSubmit = (formCode, {jsonSchema,uiSchema, formData, bizData, sequence}) => {
    console.log('submit by editor', jsonSchema, uiSchema, formData, bizData, sequence);
  };

  render() {
    return (
      <SchemaEditor
        jsonSchema={this.state.formSchema.jsonSchema}
        uiSchema={this.state.formSchema.uiSchema}
        formData={this.state.formSchema.formData}
        bizData={this.state.formSchema.bizData}
        sequence={this.state.formSchema.sequence}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

storiesWithEditor.add(
  'schema',
  () => {
    return (
      <FormEditorExample/>
    );
  }
);