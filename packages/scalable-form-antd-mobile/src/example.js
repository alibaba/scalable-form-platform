import React, {PureComponent} from 'react';
import {WhiteSpace, WingBlank, Button, Toast} from 'antd-mobile';

import XFormMobile from '../src/index';

const INIT_FORMDATA = {
    arriveDate: '',
    arriveDateTime: '',
    arriveDateRange: ['2019-11-01', '2019-11-15'],
    arrivedCities: ['hangzhou', 'beijing'],
    bizName: '初始值',
    note: '真好啊',
    number: 6,
    disabledNumber: 6,
    label: '这里是分割线(标题可以为空)',
    bizType: '',
    isFavouriteCity: true,
    city: 'hangzhou',
    district: [],
    road: '',
    blame: 'y',
    travel: '',
    group: '',
    author: 'mohen',
    uploader: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
        uid: -2,
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }],
    open: true,
    slderNumber: 6,
    sliderNumberRange: [],
    cascader: []
};

export default class Example extends PureComponent {
    constructor(args) {
        super(args);
        this.handleXformChange = this.handleXformChange.bind(this);
        this.handleXformSubmit = this.handleXformSubmit.bind(this);
        this.handleSetFormDisabled = this.handleSetFormDisabled.bind(this);
        this.handleSetFormReadonly = this.handleSetFormReadonly.bind(this);
        this.handleResetTrigger = this.handleResetTrigger.bind(this);
        this.simpleForm = null;
        this.form = null;
        this.state = {
            isAllFieldsDisabled: false,
            isAllFieldsReadonly: false,
            formData: INIT_FORMDATA
        };
    }

    handleXformChange(formData, bizData) {
        console.log('XForm Changed!', formData);
        console.log('XForm Changed!', bizData);
    }

    handleXformSubmit(formData, bizData) {
        console.log('XForm Submitted!', formData);
        console.log('XForm Submitted!', bizData);
    }

    //toggle设置表单的全部项目为禁用
    handleSetFormDisabled() {
        let isDisabled = this.state.isAllFieldsDisabled;
        this.setState({
            isAllFieldsDisabled: !isDisabled
        });
    }

    //toggle设置表单全部项目为只读
    handleSetFormReadonly() {
        let isReadonly = this.state.isAllFieldsReadonly;
        this.setState({
            isAllFieldsReadonly: !isReadonly
        });
    }

    //重置
    handleResetTrigger() {
        this.form.XFormReset();
    }

    render() {
        let formSchema = {
            jsonSchema: {
                title: '这是表单的标题',
                description: '这是表单的描述，无线端放在footer的位置',
                type: 'object',
                required: ['bizName', 'number', 'city', 'district', 'road', 'uploader'],
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
                    bizName: {
                        type: 'string',
                        title: '业务视图名称再长点',
                        maxLength: 15,
                        default: ''
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
                    bizType: {
                        type: 'string',
                        title: '业务类型',
                        default: '',
                        data: [{
                            "value": "22392",
                            "label": "五道口RF枪",
                            "children": []
                        },
                            {
                                "value": "12403",
                                "label": "评价外呼",
                                "children": []
                            },
                            {
                                "value": "9318",
                                "label": "线下拉铃类目",
                                "children": [{
                                    "parent": "9318",
                                    "value": "17411",
                                    "label": "我要吐槽",
                                    "children": [{
                                        "parent": "17411",
                                        "value": "17412",
                                        "label": "其他",
                                        "children": []
                                    }]
                                },
                                    {
                                        "parent": "9318",
                                        "value": "9319",
                                        "label": "系统问题咨询",
                                        "children": [{
                                            "parent": "9319",
                                            "value": "9325",
                                            "label": "设备问题",
                                            "children": []
                                        }]
                                    }]
                            },
                            {
                                "value": "5892",
                                "label": "盒马业务",
                                "children": [{
                                    "parent": "5892",
                                    "value": "9676",
                                    "label": "盒马逆向交易",
                                    "children": []
                                },
                                    {
                                        "parent": "5892",
                                        "value": "23624",
                                        "label": "315媒体来电",
                                        "children": []
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "11535",
                                        "label": "盒马缺货出发放优惠券",
                                        "children": []
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "18265",
                                        "label": "门店投诉",
                                        "children": [{
                                            "parent": "18265",
                                            "value": "18273",
                                            "label": "优惠券补偿未到账",
                                            "children": []
                                        }]
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "6975",
                                        "label": "盒马外呼调研专用",
                                        "children": []
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "18288",
                                        "label": "投诉表扬建议",
                                        "children": [{
                                            "parent": "18288",
                                            "value": "18294",
                                            "label": "投诉表扬",
                                            "children": [{
                                                "parent": "18294",
                                                "value": "18303",
                                                "label": "表扬",
                                                "children": []
                                            },
                                                {
                                                    "parent": "18294",
                                                    "value": "18302",
                                                    "label": "人员投诉",
                                                    "children": []
                                                }
                                            ]
                                        }]
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "18268",
                                        "label": "账户/bug类问题",
                                        "children": []
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "5893",
                                        "label": "生鲜",
                                        "children": [{
                                            "parent": "5893",
                                            "value": "6237",
                                            "label": "售中咨询",
                                            "children": []
                                        },
                                            {
                                                "parent": "5893",
                                                "value": "6239",
                                                "label": "售后咨询",
                                                "children": [{
                                                    "parent": "6239",
                                                    "value": "18230",
                                                    "label": "发票问题",
                                                    "children": []
                                                }]
                                            },
                                            {
                                                "parent": "5893",
                                                "value": "6238",
                                                "label": "商品投诉",
                                                "children": [{
                                                    "parent": "6238",
                                                    "value": "6266",
                                                    "label": "临近保质期",
                                                    "children": []
                                                },
                                                    {
                                                        "parent": "6238",
                                                        "value": "6247",
                                                        "label": "食品安全",
                                                        "children": []
                                                    }
                                                ]
                                            },
                                            {
                                                "parent": "5893",
                                                "value": "5894",
                                                "label": "物流投诉",
                                                "children": []
                                            }]
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "12873",
                                        "label": "评价外呼专用",
                                        "children": []
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "16847",
                                        "label": "业务投诉升级工单",
                                        "children": []
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "7155",
                                        "label": "B2C业务",
                                        "children": [{
                                            "parent": "7155",
                                            "value": "7157",
                                            "label": "商品投诉",
                                            "children": [{
                                                "parent": "7157",
                                                "value": "7161",
                                                "label": "临近保质期",
                                                "children": []
                                            }]
                                        },
                                            {
                                                "parent": "7155",
                                                "value": "7164",
                                                "label": "物流投诉",
                                                "children": [{
                                                    "parent": "7164",
                                                    "value": "7171",
                                                    "label": "物流损",
                                                    "children": []
                                                },
                                                    {
                                                        "parent": "7164",
                                                        "value": "7165",
                                                        "label": "虚假签收",
                                                        "children": []
                                                    },
                                                    {
                                                        "parent": "7164",
                                                        "value": "18264",
                                                        "label": "超出配送范围",
                                                        "children": []
                                                    }
                                                ]
                                            }]
                                    },
                                    {
                                        "parent": "5892",
                                        "value": "22074",
                                        "label": "盒马评价运营",
                                        "children": []
                                    }
                                ]},
                            {
                                "value": "23607",
                                "label": "古河edge测试类目，别用",
                                "children": []
                            },
                            {
                                "value": "9067",
                                "label": "门店客服技能组使用",
                                "children": [{
                                    "parent": "9067",
                                    "value": "9106",
                                    "label": "舆情",
                                    "children": [{
                                        "parent": "9106",
                                        "value": "9107",
                                        "label": "上海金桥店",
                                        "children": []
                                    }]
                                }]
                            }
                        ]},
                    isFavouriteCity: {
                        type: 'boolean',
                        title: '这是你喜欢的城市吗？',
                        default: false
                    },
                    city: {
                        type: 'string',
                        title: '请选择城市',
                        enum: ['beijing', 'shanghai', 'hangzhou'],
                        enumNames: ['北京', '上海', '杭州'],
                        default: ''
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
                    group: {
                        type: 'string',
                        title: '',
                        default: ''
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
                    open: {
                        type: 'boolean',
                        title: '是否开启'
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
                bizName: {
                    'ui:help': '注释注释',
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
                bizType: {
                    'ui:widget': 'treeSelect',
                    'ui:options': {
                        placeholder: '请选择'
                    }
                },
                city: {
                    'ui:widget': 'radio',
                    'ui:options': {
                        validate: [{
                            type: 'empty',
                            message: '请选择'
                        }]
                    }
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
                group: {
                    'ui:widget': 'group',
                    'ui:options': {
                        'groupName': '分组标题'
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
                open: {
                    'ui:widget': 'switch'
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
                bizName: {
                    fieldType: 'universal',
                    canSearch: true,
                    type: 'input'
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
                bizType: {
                    fieldType: 'universal',
                    canSearch: true,
                    type: 'treeSelect'
                },
                isFavouriteCity: {
                    fieldType: 'system',
                    canSearch: false,
                    type: 'booleanCheckbox'
                },
                city: {
                    fieldType: 'system',
                    canSearch: false,
                    type: 'radio'
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
                group: {
                    fieldType: 'custom',
                    canSearch: false,
                    type: 'group'
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
                open: {
                    fieldType: 'custom',
                    canSearch: false,
                    type: 'switch'
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
        let disableBtnLabel = this.state.isAllFieldsDisabled ? '取消表单禁用' : '设置表单为禁用';
        let readonlyBtnLabel = this.state.isAllFieldsReadonly ? '取消表单只读' : '设置表单为只读';
        return (
          <div>
              <h2 className="block-title">使用自定义按钮的方式提交xform表单</h2>
              <XFormMobile
                ref={(form) => {this.simpleForm = form}}
                customUploadRequest={(files, options, successCallback) => {
                    // 这里处理图片上传
                    console.log('uploaded files:', files);
                    console.log('uploader field options:', options);
                    successCallback(['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']);
                }}
                disabled={this.state.isAllFieldsDisabled}
                readonly={this.state.isAllFieldsReadonly}
                jsonSchema={formSchema.jsonSchema}
                uiSchema={formSchema.uiSchema}
                formData={formSchema.formData}
                bizData={formSchema.bizData}
                onChange={this.handleXformChange}
                onSubmit={this.handleXformSubmit}
              >
                  <WingBlank>
                      <WhiteSpace />
                      <Button
                        type="primary"
                        onClick={() => {
                            this.simpleForm.XFormSubmit();
                        }}
                      >提交</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={this.handleSetFormDisabled}
                      >{disableBtnLabel}</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={this.handleSetFormReadonly}
                      >{readonlyBtnLabel}</Button>
                      <WhiteSpace />
                  </WingBlank>
              </XFormMobile>
              <h2 className="block-title">使用Ref方式进行提交和获取XForm的formData和bizData</h2>
              <div>
                  <XFormMobile
                    ref={(form) => {this.form = form;}}
                    disabled={this.state.isAllFieldsDisabled}
                    readonly={this.state.isAllFieldsReadonly}
                    beforeDataSourceFetch={(code) => {
                        if (code === 'sourceList') {
                            return {
                                from: 'third'
                            };
                        }
                    }}
                    beforeServerCheck={(code) => {
                        return {
                            from: 'third'
                        };
                    }}
                    customUploadRequest={(files, options, successCallback) => {
                        // 这里处理图片上传
                        console.log('uploaded files:', files);
                        console.log('uploader field options:', options);
                        successCallback(['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']);
                    }}
                    jsonSchema={formSchema.jsonSchema}
                    uiSchema={formSchema.uiSchema}
                    formData={formSchema.formData}
                    bizData={formSchema.bizData}
                    onChange={this.handleXformChange}
                    onSubmit={this.handleXformSubmit}
                    logEvent={(...args) => {
                        console.log(...args);
                    }}
                  />
                  <WingBlank>
                      <WhiteSpace />
                      <Button
                        type="primary"
                        onClick={() => {
                            //允许自定义trigger表单提交
                            this.form.XFormSubmit();
                        }}
                      >提交</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={() => {
                            this.form.XFormValidate(() => {
                                //校验成功后回调
                                Toast.success('校验成功！');
                            });
                        }}
                      >全部校验</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={() => {
                            if (this.form.XFormValidateSync()) {
                                //校验成功后回调
                                Toast.success('校验成功！');
                            }
                        }}
                      >同步校验</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={this.handleResetTrigger}
                      >重置</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={() => {
                            this.form.XFormSetFormData(INIT_FORMDATA);
                        }}
                      >设置自定义formData</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={this.handleSetFormDisabled}
                      >{disableBtnLabel}</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={this.handleSetFormReadonly}
                      >{readonlyBtnLabel}</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={() => {
                            this.form.XFormFetchAllFromDataSource();
                        }}
                      >更新全部数据源</Button>
                      <WhiteSpace />
                      <Button
                        type="default"
                        onClick={() => {
                            this.form.XFormFetchFromDataSource('sourceList');
                        }}
                      >更新业务选择器字段数据源</Button>
                      <WhiteSpace />
                  </WingBlank>
              </div>
          </div>
        );
    }
}

