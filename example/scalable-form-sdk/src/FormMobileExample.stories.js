import {storiesOf} from "@storybook/react";
import * as React from 'react';
import ScalableFormAntdMobile from 'scalable-form-antd-mobile';
import './index.less';

const storiesWithMobile = storiesOf('AntDesignMobile', module);
export default class FormMobileExample extends React.PureComponent {
  constructor(args) {
    super(args);
    this.form = null;
    this.state = {
      formData: {}
    };
    this.jsonSchema = {
      title: 'Scalable Form render sdk with Ant Design components',
      description: '',
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
      <div className="scalable-form-demo-element mobile">
        <ScalableFormAntdMobile
          ref={(form) => {
            this.form = form;
          }}
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


storiesWithMobile.add(
  'schema',
  () => {
    return (
      <FormMobileExample/>
    );
  }
);