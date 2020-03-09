import * as React from 'react';
import ScalableFormCore from '../packages/scalable-form-core/src';

export default class ScalableFormCoreExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        bizName: '必填名称初始值',
        inputWithDataSource: '',
        dataSourceList: '',
        arriveDate: '',
        note: '真好啊',
        number: 10,
        isFavouriteCity: true,
        city: 'hangzhou',
        district: [],
        road: '',
        author: 'mohen'
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
    const jsonSchema = {
      title: '这是一个完全使用HTML原生UI的表单',
      description: 'ScalableFormCore是整个ScalableForm对JSONSchema协议的实现与扩展，它主要是在社区组件react-jsonschema-form进行功能的扩展，包括（数据源、校验器、级联等动态表单特性）。该组件只是对上述表单逻辑的抽象层，没有对相关UI的封装。通过ScalableFormCore核心组件，你可以自己实现一个自定义UI的ScalableForm渲染组件。',
      type: 'object',
      required: ['bizName', 'note', 'number', 'city', 'district', 'road'],
      properties: {
        name: {
          type: 'string',
          title: '名称',
          default: '',
          maxLength: 15
        },
        bizName: {
          type: 'string',
          title: '必填名称',
          default: ''
        },
        inputWithDataSource: {
          type: 'string',
          title: '多行文本框',
          default: ''
        },
        dataSourceList: {
          type: 'string',
          title: '数据源下拉框',
          dataSource: 'dataSourceList',
          enum: [],
          enumNames: []
        },
        arriveDate: {
          type: 'string',
          title: '到达时间',
          default: '',
          format: 'date-time'
        },
        note: {
          type: 'string',
          title: '备注（只读）',
          default: '',
          maxLength: 150
        },
        number: {
          type: 'number',
          title: '个数（禁用）',
          default: ''
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
        },
        district: {
          type: 'array',
          title: '请选择城市的地区',
          items: {
            type: 'string',
            default: '',
            enum: ['haidian', 'chaoyang', 'chongwen'],
            enumNames: ['海淀', '朝阳', '崇文']
          },
          uniqueItems: true
        },
        road: {
          type: 'string',
          title: '请选择城市的街道',
          default: '',
          enum: ['wenyixiroad', 'jingchangroad'],
          enumNames: ['文一西路', '荆长路']
        },
        author: {
          type: 'string',
          title: '作者',
          default: ''
        }
      }
    };
    const uiSchema = {
      name: {
        'ui:help': '关于"名称"字段的帮助说明',
        'ui:options': {
          placeholder: '请输入名称'
        }
      },
      bizName: {
        'ui:options': {
          placeholder: '请输入',
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
          }, {
            type: 'server',
            checkUrl: '',
            message: "您输入的名称存在重复，请重新输入"
          }]
        }
      },

      inputWithDataSource: {
        'ui:widget': 'textarea',
        'ui:options': {
          placeholder: '请选择'
        }
      },
      dataSourceList: {
        'ui:widget': 'select',
        'ui:options': {
          placeholder: '请选择'
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
        'ui:readonly': true,
        'ui:options': {
          validate: [{
            type: 'empty',
            message: '备注不能为空'
          }]
        }
      },
      number: {
        'ui:widget': 'updown',
        'ui:disabled': true,
        'ui:options': {
          validate: [{
            type: 'empty',
            message: '该字段不能为空'
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
      },
      district: {
        'ui:widget': 'checkboxes',
        'ui:options': {
          vertical: false,
          validate: [{
            type: 'empty',
            message: '请至少选择一项'
          }],
          show: [{
            field: 'city',
            values: ['beijing', 'shanghai']
          }]
        }
      },
      road: {
        'ui:widget': 'select',
        'ui:placeholder': '请选择道路',
        'ui:options': {
          validate: [{
            type: 'empty',
            message: '请选择'
          }],
          show: [{
            field: 'city',
            values: ['hangzhou']
          }]
        }
      },
      author: {
        'ui:widget': 'hidden'
      }
    };

    const formData = this.state.formData;
    const bizData = {
      name: {
        fieldType: 'universal',
        canSearch: true
      },
      bizName: {
        fieldType: 'universal',
        canSearch: true
      },
      inputWithDataSource: {
        fieldType: 'universal',
        canSearch: false
      },
      dataSourceList: {
        fieldType: 'universal',
        canSearch: false
      },
      arriveDate: {
        fieldType: 'system',
        canSearch: true
      },
      note: {
        fieldType: 'system',
        canSearch: false
      },
      number: {
        fieldType: 'universal',
        canSearch: false
      },
      isFavouriteCity: {
        fieldType: 'system',
        canSearch: false
      },
      city: {
        fieldType: 'system',
        canSearch: false
      },
      district: {
        fieldType: 'universal',
        canSearch: true
      },
      road: {
        fieldType: 'custom',
        canSearch: false
      },
      author: {
        fieldType: 'system',
        canSearch: false
      }
    };

    return (
      <div className="scalable-form-demo-element">
        <ScalableFormCore
          jsonSchema={jsonSchema}
          uiSchema={uiSchema}
          formData={formData}
          bizData={bizData}
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
