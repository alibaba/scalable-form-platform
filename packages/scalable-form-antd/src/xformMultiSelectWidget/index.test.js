/**
 * xform MultiSelect（多选下拉框选择器） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform multiselect widget test', () => {
    let xform, form;

    const INIT_FORM_DATA = {
        togoCities: [],
        arrivedCities: ['hangzhou', 'beijing']
    };
    const BIZ_DATA = {
        togoCities: {
            fieldType: 'system',
            canSearch: true
        },
        arrivedCities: {
            fieldType: 'system',
            canSearch: true
        }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
            type: 'object',
            required: ['name', 'bizName'],
            properties: {
                togoCities: {
                    type: 'array',
                    title: '要去的城市',
                    items: {
                        type: 'string',
                        enum: ['shenzhen', 'chongqin', 'nanjing'],
                        enumNames: ['深圳', '重庆', '南京']
                    },
                    data: [{
                        "label": "深圳",
                        "value": "shenzhen"
                    }, {
                        "label": "重庆",
                        "value": "chongqin"
                    }],
                    uniqueItems: true
                },
                arrivedCities: {
                    type: 'array',
                    title: '去过的城市',
                    items: {
                        type: 'string',
                        enum: ['beijing', 'qingdao', 'hangzhou', 'panjin'],
                        enumNames: ['北京', '青岛', '杭州', '盘锦']
                    },
                    uniqueItems: true
                }
            }
        },
        uiSchema: {
            togoCities: {
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
            }
        },
        formData: INIT_FORM_DATA,
        bizData: BIZ_DATA
    };
    
    beforeEach(()=> {
       xform = mount(<XForm
          jsonSchema={formSchema.jsonSchema}
          uiSchema={formSchema.uiSchema}
          formData={formSchema.formData}
          bizData={formSchema.bizData}
        />)
        
        form = xform.find('form').first();
        form.simulate('submit');
    })

    it('xform renders form label', () => {
        expect(form).toBeDefined();
    });
    it('xform renders item length to be 2', ()=> {
        expect(xform.find('.xform-item').length).toBe(2);
    })
    it('xform renders input[type=text]', () => {
        const input = xform.find('input[type="text"]');
        expect(input).toBeDefined();
    })
    it('xform multiselect validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('该项为必选项');
    })
    it('xform multiselect noValue onChange', () => {
        const item = xform.find('.xform-item').at(0);
        const Select = item.find('Select').first();
        const change = Select.props().onChange();
        expect(Select).toBeDefined();
    });
    it('xform multiselect hasValue onChange', ()=> {
        const item = xform.find('.xform-item').at(1);
        const Select = item.find('Select').first();
        const change = Select.props().onChange();
        expect(Select).toBeDefined();
    });
});

