import * as React from 'react';
import ScalableFormAntdMobile from '../packages/scalable-form-antd-mobile/src/index';
import {WhiteSpace, WingBlank, Button, Toast} from 'antd-mobile';

export default class ScalableFormMobileExample extends React.PureComponent {
  constructor(args) {
    super(args);
    this.form = null;
    this.state = {
      formData: {}
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
    let formSchema = {
      jsonSchema: {
        title: '移动端表单',
        description: 'ScalableForm提供移动端组件来渲染在编辑器器中创建的移动端表单。ScalableFormMobile组件基于ScalableFormCore，采用antd-mobile中组件实现渲染。',
        type: 'object',
        required: ['number', 'district', 'road', 'uploader'],
        properties: {
          arriveDate: {
            type: 'string',
            title: '到达日期',
            format: 'date',
            default: ''
          },
          arriveDateTime: {
            type: 'string',
            title: '到达时间',
            format: 'date-time',
            default: ''
          },
          arriveDateRange: {
            type: 'array',
            title: '到达的日期区间',
            items: {
              type: 'string',
              default: '',
              enum: [],
              enumNames: []
            },
            uniqueItems: true
          },
          arrivedCities: {
            type: 'array',
            title: '去过的城市',
            items: {
              type: 'string',
              default: '',
              enum: ['beijing', 'changchun', 'hangzhou', 'langfang'],
              enumNames: ['北京', '长春', '杭州', '廊坊']
            },
            uniqueItems: true
          },
          note: {
            type: 'string',
            title: '备注',
            maxLength: 150,
            default: ''
          },
          number: {
            type: 'number',
            title: '个数',
            default: ''
          },
          disabledNumber: {
            type: 'number',
            title: '禁用的数字输入',
            default: ''
          },
          label: {
            type: 'string',
            title: '文本标签',
            default: ''
          },
          isFavouriteCity: {
            type: 'boolean',
            title: '这是你喜欢的城市吗？',
            default: false
          },
          district: {
            type: 'array',
            title: '请选择城市的地区',
            items: {
              type: 'string',
              enum: ['haidian', 'chaoyang', 'chongwen'],
              enumNames: ['海淀', '朝阳', '崇文'],
              default: ''
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
          blame: {
            type: 'string',
            title: '是否该受到谴责',
            default: '',
            enum: ['y', 'n'],
            enumNames: ['是', '否']
          },
          travel: {
            type: 'string',
            title: '遇到的旅行中的问题',
            default: '',
            data: [{
              "label": "商旅订单问题",
              "value": "travel",
              "children": [{
                "label": "机票订单",
                "value": "travel-plane",
                "parent": "travel"
              }, {
                "label": "火车票订单",
                "value": "travel-train",
                "parent": "travel"
              }]
            }, {
              "label": "主动护航",
              "value": "safe",
              "children": [{
                "label": "飞机护航",
                "value": "safe-plane",
                "parent": "safe"
              }, {
                "label": "火车护航",
                "value": "safe-train",
                "parent": "safe"
              }]
            }]
          },
          author: {
            type: 'string',
            title: '作者',
            default: ''
          },
          uploader: {
            type: 'array',
            title: '图片上传',
            maxFileNum: 10,
            items: {
              type: 'string',
              format: 'data-url',
              default: ''
            }
          },
          slderNumber: {
            type: 'number',
            title: '亮度值'
          },
          sliderNumberRange: {
            type: 'array',
            title: '选择亮度值范围',
            items: {
              type: 'number',
              default: 0,
              enum: [],
              enumNames: []
            },
            uniqueItems: true
          },
          cascader: {
            type: 'array',
            title: '级联选择框',
            items: {
              type: 'string',
              default: '',
              enum: [],
              enumNames: []
            },
            uniqueItems: true,
            data: [{
              "children": [{
                "children": [],
                "label": "第1级第0个",
                "value": "100",
                "extAttributes": {}
              },
                {
                  "children": [{
                    "children": [],
                    "label": "第二级第0个",
                    "value": "200",
                    "extAttributes": {}
                  },
                    {
                      "children": [],
                      "label": "第二级第1个",
                      "value": "201",
                      "extAttributes": {}
                    }],
                  "label": "第一级第1个",
                  "value": "101",
                  "extAttributes": {}
                }],
              "label": "第0级第0个",
              "value": "10",
              "extAttributes": {}
            }]
          }
        }
      },
      uiSchema: {
        arriveDate: {
          'ui:widget': 'date',
          'ui:options': {
            placeholder: '请选择到达日期'
          }
        },
        arriveDateTime: {
          'ui:widget': 'datetime',
          'ui:options': {
            placeholder: '请选择到达时间'
          }
        },
        arriveDateRange: {
          'ui:widget': 'dateRange',
          'ui:options': {
            initRange: 'beforeweek',
            validate: [{
              type: 'empty',
              message: '该项为必填项'
            }]
          }
        },
        arrivedCities: {
          'ui:widget': 'multiSelect',
          'ui:options': {
            showSearch: true,
            placeholder: "请选择你去过的城市",
            validate: [{
              type: 'empty',
              message: '该项为必选项'
            }]
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
        number: {
          'ui:widget': 'updown',
          'ui:options': {
            validate: [{
              type: 'empty',
              message: '该字段不能为空'
            }]
          }
        },
        disabledNumber: {
          'ui:widget': 'updown',
          'ui:disabled': true
        },
        label: {
          'ui:widget': 'label'
        },
        district: {
          'ui:widget': 'checkboxes',
          'ui:options': {
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
          'ui:options': {
            placeholder: '请选择',
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
        blame: {
          'ui:widget': 'radio'
        },
        travel: {
          'ui:widget': 'treeSelect',
          'ui:options': {
            validate: [{
              type: 'empty',
              message: '该项为必选项'
            }]
          }
        },
        author: {
          'ui:widget': 'hidden'
        },
        uploader: {
          'ui:options': {
            maxFileNum: 10,
            maxFileSize: 10,
            exampleImageUrl: [{
              url: '//img.alicdn.com/bao/uploaded/TB1kyjtPVXXXXXRaXXXSutbFXXX.jpg_360x360xzq90.jpg_.webp'
            }],
            validate: [{
              type: 'empty',
              message: '请至少上传一张图片'
            }]
          }
        },
        slderNumber: {
          'ui:widget': 'slider'
        },
        sliderNumberRange: {
          'ui:widget': 'sliderRange'
        },
        cascader: {
          'ui:widget': 'cascader'
        }
      },
      formData: this.state.formData,
      bizData: {
        arriveDate: {
          fieldType: 'system',
          canSearch: true,
          type: 'date'
        },
        arriveDateTime: {
          fieldType: 'system',
          canSearch: false,
          type: 'datetime'
        },
        arriveDateRange: {
          fieldType: 'system',
          canSearch: true,
          type: 'dateRange'
        },
        arrivedCities: {
          fieldType: 'system',
          canSearch: true,
          type: 'multiSelect'
        },
        note: {
          fieldType: 'system',
          canSearch: false,
          type: 'textarea'
        },
        number: {
          fieldType: 'universal',
          canSearch: false,
          type: 'number'
        },
        disabledNumber: {
          fieldType: 'universal',
          canSearch: false,
          type: 'number'
        },
        label: {
          fieldType: 'universal',
          canSearch: false,
          type: 'label'
        },
        isFavouriteCity: {
          fieldType: 'system',
          canSearch: false,
          type: 'booleanCheckbox'
        },
        district: {
          fieldType: 'universal',
          canSearch: true,
          type: 'checkbox'
        },
        road: {
          fieldType: 'custom',
          canSearch: false,
          type: 'select'
        },
        blame: {
          fieldType: 'custom',
          canSearch: false,
          type: 'radio'
        },
        travel: {
          fieldType: 'custom',
          canSearch: false,
          type: 'treeSelect'
        },
        author: {
          fieldType: 'system',
          canSearch: false,
          type: 'input'
        },
        uploader: {
          fieldType: 'custom',
          canSearch: true,
          type: 'upload'
        },
        slderNumber: {
          fieldType: 'custom',
          canSearch: false,
          type: 'slider'
        },
        sliderNumberRange: {
          fieldType: 'custom',
          canSearch: false,
          type: 'sliderRange'
        },
        cascader: {
          fieldType: 'custom',
          canSearch: false,
          type: 'cascader'
        }
      }
    };
    return (
      <div className="scalable-form-demo-element mobile">
        <ScalableFormAntdMobile
          ref={(form) => {
            this.form = form;
          }}
          jsonSchema={formSchema.jsonSchema}
          uiSchema={formSchema.uiSchema}
          formData={formSchema.formData}
          bizData={formSchema.bizData}
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        />
        <WingBlank>
          <Button
            type="primary"
            onClick={() => {
              this.form.XFormSubmit();
            }}
          >
            提交
          </Button>
          <WhiteSpace />
          <Button
            type="default"
            onClick={() => {
              this.form.XFormValidate(() => {
                Toast.success('校验成功！');
              });
            }}
          >
            校验
          </Button>
          <WhiteSpace />
          <Button
            type="default"
            onClick={() => {
              this.form.XFormReset();
            }}
          >
            重置
          </Button>
          <WhiteSpace />
        </WingBlank>
      </div>
    );
  }
}
