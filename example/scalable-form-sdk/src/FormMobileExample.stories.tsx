import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ScalableFormAntdMobile from 'scalable-form-antd-mobile';
import './index.less';
import { JSONSchema, UiSchema } from 'scalable-form-core';

const storiesWithMobile = storiesOf('AntDesignMobile', module);

function FormMobile() {
  const jsonSchema: JSONSchema = {
    "title": "",
    "description": "",
    "type": "object",
    "required": [
      "HhSA8pcMDW"
    ],
    "properties": {
      "CAJ8j6TbFx": {
        "type": "array",
        "title": "图片",
        "default": [],
        "maxFileSize": 10,
        "maxFileNum": 10,
        "items": {
          "type": "string",
          "format": "data-url"
        },
        "uniqueItems": true
      },
      "Bwnn4wjRhW": {
        "default": "",
        "enumNames": [
          "选项一",
          "选项二",
          "选项三"
        ],
        "type": "string",
        "title": "单选1",
        "enum": [
          "xMFWZAKfA",
          "kBbHQ6zH7",
          "rdReEPzwY"
        ]
      },
      "HhSA8pcMDW": {
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
            "SJazMETrC",
            "rAwhx3pje",
            "rsJWNKN2C"
          ]
        }
      },
      "e6FNSYhcMk": {
        "default": false,
        "type": "boolean",
        "title": "单项复选"
      },
      "SCG7CY4KSi": {
        "default": false,
        "type": "boolean",
        "title": "开关"
      },
      "PSAydHwRmy": {
        "default": "",
        "format": "date",
        "type": "string",
        "title": "日期选择器"
      },
      "dBm3msMMkA": {
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
      "MPk6cxkWpp": {
        "default": "",
        "format": "date-time",
        "type": "string",
        "title": "时间选择器"
      },
      "zRFQR6aYD2": {
        "default": "",
        "type": "string",
        "title": "段落"
      },
      "TiH5ZebKJf": {
        "default": "",
        "type": "string",
        "title": ""
      },
      "YP7AGKZ6YZ": {
        "default": "",
        "type": "string",
        "title": "单行文本框",
        "maxLength": 100000
      },
      "ZtW8dstTiA": {
        "default": "",
        "type": "string",
        "title": "多行文本框",
        "maxLength": 100000
      },
      "wDwTkmAynx": {
        "default": "",
        "type": "number",
        "title": "数字选择器"
      },
      "XiBFGBhD2p": {
        "default": "",
        "enumNames": [
          "选项一",
          "选项二",
          "选项三"
        ],
        "type": "string",
        "title": "下拉框",
        "enum": [
          "Pk3enr5b7",
          "BCk5N6Rnh",
          "ZTeMQirjf"
        ]
      },
      "ZmJG7Z3CF4": {
        "default": [],
        "enumNames": [
          "选项一",
          "选项二",
          "选项三"
        ],
        "type": "string",
        "title": "多选下拉框",
        "enum": [
          "kkcG8mG3t",
          "cKbmx77cE",
          "hZXFbcEdc"
        ]
      },
      "Dh4Yw3JQzM": {
        "default": "",
        "type": "number",
        "title": "滑动输入条"
      },
      "MPtWABrrWS": {
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
      }
    }
  };
  const uiSchema: UiSchema =  {
    "CAJ8j6TbFx": {
      "ui:widget": "PictureWidget",
      "ui:options": {
        "exampleImageUrl": "",
        "label": "图片上传",
        "listType": "picture",
        "uploadType": "picture",
        "vertical": true,
        "accept": "image/*"
      }
    },
    "Bwnn4wjRhW": {
      "ui:options": {
        "vertical": false,
        "originWidget": 'ds'
      },
      "ui:widget": "RadioWidget"
    },
    "HhSA8pcMDW": {
      "ui:options": {
        "vertical": false,
        "validate": [
          {
            "type": "empty",
            "message": "该项目为必填项"
          }
        ]
      },
      "ui:widget": "CheckboxWidget",
      "ui:disabled": false,
      "ui:help": ""
    },
    "e6FNSYhcMk": {
      "ui:widget": "BooleanCheckboxWidget"
    },
    "SCG7CY4KSi": {
      "ui:widget": "BooleanSwitchWidget"
    },
    "PSAydHwRmy": {
      "ui:options": {
        "format": "YYYY-MM-DD"
      },
      "ui:widget": "DatePickerWidget",
      "ui:placeholder": "请选择"
    },
    "dBm3msMMkA": {
      "ui:options": {
        "initRange": "beforemonth",
        "placeholder": [
          "开始日期",
          "结束日期"
        ]
      },
      "ui:widget": "DateRangePickerWidget",
      "ui:disabled": false,
      "ui:help": ""
    },
    "MPk6cxkWpp": {
      "ui:options": {
        "format": "YYYY-MM-DD HH:mm:ss"
      },
      "ui:widget": "DateTimePickerWidget",
      "ui:placeholder": "请选择"
    },
    "zRFQR6aYD2": {
      "ui:widget": "LabelWidget"
    },
    "TiH5ZebKJf": {
      "ui:options": {
        "groupName": "分组标题"
      },
      "ui:widget": "GroupWidget"
    },
    "YP7AGKZ6YZ": {
      "ui:widget": "TextWidget",
      "ui:placeholder": "请输入"
    },
    "ZtW8dstTiA": {
      "ui:widget": "TextareaWidget",
      "ui:placeholder": "请输入"
    },
    "wDwTkmAynx": {
      "ui:widget": "NumberWidget"
    },
    "XiBFGBhD2p": {
      "ui:widget": "SelectWidget",
      "ui:placeholder": "请选择"
    },
    "ZmJG7Z3CF4": {
      "ui:widget": "CheckboxWidget",
      "ui:placeholder": "请选择"
    },
    "Dh4Yw3JQzM": {
      "ui:widget": "SliderWidget"
    },
    "MPtWABrrWS": {
      "ui:widget": "SliderRangeWidget"
    }
  };

  const handleChanged = (e: any) => {
    console.log('ScalableForm Changed!', e.formData);
  };

  const handleSubmit = (e: any) => {
    console.log('ScalableForm Submitted!', e.formData);
  };

  return (
    <div className="scalable-form-demo-element mobile">
      <ScalableFormAntdMobile
        schema={jsonSchema}
        uiSchema={uiSchema}
        onChange={handleChanged}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

storiesWithMobile.add(
  'schema',
  () => {
    return (
      <FormMobile/>
    );
  },
);
