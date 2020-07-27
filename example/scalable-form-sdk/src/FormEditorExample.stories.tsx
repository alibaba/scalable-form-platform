import {storiesOf} from "@storybook/react";
import React, {Component} from 'react';
import SchemaEditor from 'scalable-form-editor';
import { JSONSchema, UiSchema } from 'scalable-form-core';

const storiesWithEditor = storiesOf('Editor', module);

function FormEditorExample() {
  const jsonSchema: JSONSchema = {
    title: 'Scalable Form render sdk with Ant Design components',
    description: '',
    type: 'object',
    required: ['name', 'city'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        default: '',
        maxLength: 15,
        minLength: 0,
      },
      arriveDate: {
        type: 'string',
        title: 'Arrive Date',
        default: '',
      },
      duration: {
        type: 'array',
        title: 'Duration',
        items: {
          type: 'string',
          enum: [''],
        },
        uniqueItems: true,
      },
      city: {
        type: 'string',
        title: 'Select City',
        default: '',
      },
      isFavoriteCity: {
        type: 'boolean',
        title: 'Do you like this city?',
        default: false,
      },
      favoriteFoods: {
        type: 'array',
        title: 'What is your favorite foods?',
        items: {
          type: 'string',
          enum: ['Apple', 'Pear', 'Orange'],
          enumNames: ['Apple', 'Pear', 'Orange'],
        },
        uniqueItems: true,
      },
      note: {
        type: 'string',
        title: 'Notes',
        default: '',
      },
      groupWidget: {
        type: 'string',
        title: ' ',
      },
      labelWidget: {
        type: 'string',
        title: 'LabelWidget',
      },
      selectWidget: {
        type: 'string',
        title: '请选择公司',
        enum: ['alibaba', 'tencent'],
        enumNames: ['阿里', '腾讯'],
      },
      multiSelectWidget: {
        type: 'array',
        title: '要去的城市',
        items: {
          type: 'string',
          enum: ['shenzhen', 'chongqin', 'nanjing'],
          enumNames: ['深圳', '重庆', '南京'],
        },
        uniqueItems: true,
      },
      treeSelectWidget: {
        type: 'string',
        title: '航程',
      },
      multiTreeSelectWidget: {
        type: 'array',
        title: '要去的城市',
        items: {
          type: 'string',
          enum: [''],
        },
        uniqueItems: true,
      },
      numberWidget: {
        type: 'number',
        title: '数目',
      },
      radioWidget: {
        type: 'string',
        title: '请选择公司',
        enum: ['alibaba', 'tencent'],
        enumNames: ['阿里', '腾讯'],
      },
      rateWidget: {
        type: 'string',
        title: '请选择分数',
        enum: ['a', 'b', 'c', 'd', 'e'],
        enumNames: ['1分', '2分', '3分', '4分', '5分'],
      },
      sliderWidget: {
        type: 'number',
        title: '滑动输入条',
      },
      sliderRangeWidget: {
        type: 'array',
        title: '滑动区域输入条',
        default: [],
        items: {
          type: 'number',
          default: 0,
          enum: [''],
        },
        uniqueItems: true,
      },
      suggestSelectWidget: {
        type: 'string',
        title: 'Suggest 下拉框',
        enum: ['mGmN2PPxs', 'z4MpX3fwR', 'yrP6wAbX4'],
        enumNames: ['选项一', '选项二', '选项三'],
        uniqueItems: true,
      },
      switchWidget: {
        type: 'boolean',
        title: '开关',
        default: false,
      },
      textareaWidget: {
        type: 'string',
        title: '多行文本框',
        default: '',
        maxLength: 15,
        minLength: 0,
      },
      tagWidget: {
        type: 'array',
        title: '标签',
        items: {
          type: 'string',
          enum: [''],
        },
        uniqueItems: true,
      },
      uploadWidget: {
        type: 'array',
        maxFileNum: 2,
        title: '上传',
        items: {
          type: 'string',
          format: 'data-url'
        },
      },
    },
  };
  const uiSchema: UiSchema = {
    name: {
      'ui:widget': 'TextWidget',
      'ui:help': 'help info for "name"',
      'ui:hidden': true,
      'ui:options': {
        placeholder: 'Please input name',
        allowClear: true,
      },
    },
    city: {
      'ui:widget': 'CascaderWidget',
      'ui:enumTreeData': [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
    isFavoriteCity: {
      'ui:widget': 'CheckboxWidget',
    },
    favoriteFoods: {
      'ui:widget': 'CheckboxesWidget',
    },
    arriveDate: {
      'ui:widget': 'DatePickerWidget',
      'ui:options': {
        placeholder: '请选择到达时间',
      },
    },
    duration: {
      'ui:widget': 'DateRangePickerWidget',
    },
    note: {
      'ui:widget': 'RichTextWidget',
    },
    groupWidget: {
      'ui:widget': 'GroupWidget',
      'ui:groupName': 'group name',
    },
    labelWidget: {
      'ui:widget': 'LabelWidget',
    },
    selectWidget: {
      'ui:widget': 'SelectWidget',
    },
    multiSelectWidget: {
      'ui:widget': 'MultiSelectWidget',
    },
    treeSelectWidget: {
      'ui:widget': 'TreeSelectWidget',
      'ui:enumTreeData': [
        {
          label: '商旅订单问题',
          value: 'travel',
          children: [
            {
              label: '机票',
              value: 'travel-plane',
            },
            {
              label: '火车票',
              value: 'travel-train',
            },
          ],
        },
        {
          label: '主动护航',
          value: 'safe',
          children: [
            {
              label: '机票',
              value: 'safe-plane',
            },
            {
              label: '火车票',
              value: 'safe-train',
            },
          ],
        },
      ],
    },
    multiTreeSelectWidget: {
      'ui:widget': 'MultiTreeSelectWidget',
      'ui:enumTreeData': [
        {
          label: '商旅订单问题',
          value: 'travel',
          children: [
            {
              label: '机票',
              value: 'travel-plane',
            },
            {
              label: '火车票',
              value: 'travel-train',
            },
          ],
        },
        {
          label: '主动护航',
          value: 'safe',
          children: [
            {
              label: '机票',
              value: 'safe-plane',
            },
            {
              label: '火车票',
              value: 'safe-train',
            },
          ],
        },
      ],
    },
    numberWidget: {
      'ui:widget': 'NumberWidget',
      'ui:allowClear': true,
    },
    radioWidget: {
      'ui:widget': 'RadioWidget',
    },
    rateWidget: {
      'ui:widget': 'RateWidget',
    },
    sliderWidget: {
      'ui:widget': 'SliderWidget',
    },
    sliderRangeWidget: {
      'ui:widget': 'SliderRangeWidget',
    },
    suggestSelectWidget: {
      'ui:widget': 'SuggestSelectWidget',
      'ui:placeholder': '请选择',
    },
    switchWidget: {
      'ui:widget': 'SwitchWidget',
    },
    textareaWidget: {
      'ui:widget': 'TextareaWidget',
    },
    tagWidget: {
      'ui:widget': 'TagWidget',
      'ui:addTag': true,
      'ui:enumData': [
        {
          label: '温州',
          value: 'aaa',
          removable: true,
        },
        {
          label: '樱木',
          value: 'bbb',
          removable: true,
        },
      ],
    },
    uploadWidget: {
      'ui:widget': 'UploadWidget',
      'ui:options': {
        label: '上传',
        listType: 'picture',
        vertical: true, // 是否按vertical方式排列上传后的文件列表，默认为true
      },
    },
  };
  return (
    <SchemaEditor
      initSchema={jsonSchema}
      initUiSchema={uiSchema}
    />
  );
}

storiesWithEditor.add(
  'schema',
  () => {
    return (
      <div>
        <FormEditorExample/>
      </div>
    );
  }
);
