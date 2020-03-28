import * as React from 'react';
import ScalableFormCore from 'scalable-form-core';
import {storiesOf} from '@storybook/react';
import './index.less';
const storiesWithHTML = storiesOf('HTML原生UI', module);

class ScalableFormCoreExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        arriveDate: '',
        note: '真好啊',
        isFavouriteCity: true,
        city: 'hangzhou'
      }
    };
    this.jsonSchema = {
      title: 'Scalable Form render sdk with pure HTML components',
      description: 'ScalableFormCore是ScalableForm对JSONSchema协议的实现与扩展，并提供包括数据源、校验器、级联等动态表单特性等功能。该组件只是对上述表单逻辑的抽象层，没有对相关UI的封装。通过ScalableFormCore核心组件，你可以自己实现一个自定义UI的ScalableForm渲染组件。',
      type: 'object',
      required: ['name', 'note', 'city'],
      properties: {
        name: {
          type: 'string',
          title: '名称',
          default: '',
          maxLength: 15
        },
        arriveDate: {
          type: 'string',
          title: '到达时间',
          default: '',
          format: 'date-time'
        },
        note: {
          type: 'string',
          title: '备注',
          default: '',
          maxLength: 150
        },
        isFavouriteCity: {
          type: 'boolean',
          title: '请问这是你喜欢的城市吗？',
          default: false
        },
        city: {
          type: 'string',
          title: '请选择城市',
          default: '',
          enum: ['beijing', 'shanghai', 'hangzhou'],
          enumNames: ['北京', '上海', '杭州']
        }
      }
    };
    this.uiSchema = {
      name: {
        'ui:help': '关于"名称"字段的帮助说明',
        'ui:options': {
          placeholder: '请输入名称'
        }
      },
      arriveDate: {
        'ui:widget': 'datetime',
        'ui:options': {
          placeholder: '请选择到达时间',
          format: 'YYYY-MM-DD HH:mm:ss'
        }
      },
      note: {
        'ui:widget': 'textarea',
        'ui:options': {
          validate: [{
            type: 'empty',
            message: '备注不能为空'
          }]
        }
      },
      city: {
        'ui:widget': 'radio',
        'ui:options': {
          vertical: false,
          validate: [{
            type: 'empty',
            message: '请选择'
          }]
        }
      }
    };
  }

  handleChanged = (formData, bizData) => {
    console.log('ScalableForm Changed!', formData);
    console.log('ScalableForm Changed!', bizData);
    this.setState({
      formData: {...formData}
    });
  };

  handleSubmit = (formData, bizData) => {
    console.log('ScalableForm Submitted!', formData);
    console.log('ScalableForm Submitted!', bizData);
  };

  render() {
    return (
      <div className="scalable-form-demo-element">
        <ScalableFormCore
          jsonSchema={this.jsonSchema}
          uiSchema={this.uiSchema}
          formData={this.state.formData}
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

storiesWithHTML.add(
  '使用schema',
  () => {
    return (
      <ScalableFormCoreExample/>
    );
  }
);