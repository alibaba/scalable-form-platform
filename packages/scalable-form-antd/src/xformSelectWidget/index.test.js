/**
 * xform Select widget（选择器） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform Select widget test', () => {
    let xform, form;
    const INIT_FORM_DATA = {
       company: '',
       district: 'chaoyang',
       city: 'hangzhou'
    };
    const BIZ_DATA = {
        company: {
            fieldType: 'system',
            canSearch: true
        },
        district: {
            fieldType: 'system',
            canSearch: false
        },
        city: {
            fieldType: 'system',
            canSearch: false
        }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
                type: 'object',
                required: ['company'],
                properties: {
                    company: {
                        type: "string",
                        title: "请选择公司",
                        data: [{
                            "label": "阿里",
                            "value": "alibaba"
                        }, {
                            "label": "腾讯",
                            "value": "tencent"
                        }],
                        enum: ['alibaba', 'tencent'],
                        enumNames: ["阿里", "腾讯"]
                    },
                    district: {
                        type: 'string',
                        title: '请选择城市的地区',
                        enum: ['haidian', 'chaoyang', 'chongwen'],
                        enumNames: ['海淀', '朝阳', '崇文']
                    },
                    city: {
                        type: 'string',
                        title: '请选择城市',
                        enum: ['beijing', 'shanghai', 'hangzhou'],
                        enumNames: ['北京', '上海', '杭州']
                    }
                }
        },
        uiSchema: {
            company: {
                "ui:widget": "select",
                "ui:options": {
                    validate: [{
                        type: 'empty',
                        message: '请至少选择一项'
                    }]
                }
            },
            company: {
                "ui:widget": "select",
                "ui:options": {
                    validate: [{
                        type: 'empty',
                        message: '请至少选择一项'
                    }]
                }
            },
            company: {
                "ui:widget": "select",
                "ui:options": {
                    validate: [{
                        type: 'empty',
                        message: '请至少选择一项'
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
        const form = xform.find('form').first();
        expect(form).toBeDefined();
    });
    it('xform renders item length to be 3', ()=> {
        expect(xform.find('.xform-item').length).toBe(3);
    });
    it('xform select validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('请至少选择一项');
    });
    it('xform select noValue onChange', () => {
        const item = xform.find('.xform-item').at(0);
        const Select = item.find('Select').first();
        const change = Select.props().onChange();
        expect(Select).toBeDefined();
    });
    it('xform select hasValue onChange', ()=> {
        const item = xform.find('.xform-item').at(1);
        const Select = item.find('Select').first();
        const change = Select.props().onChange();
        expect(Select).toBeDefined();
    });
});
