/**
 * xform treeSelect widget（树形结构选择器） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform treeSelect widget test', () => {
    let xform, form;
    const INIT_FORM_DATA = {
       travel: '',
       subTravel: 'travel-train'
    };
    const BIZ_DATA = {
        travel: {
          fieldType: 'system',
          canSearch: true
      }
    };
    let formSchema = {
        jsonSchema: {
            title: '树形选择器测试',
            description: 'widget测试',
            type: 'object',
            properties: {
                travel: {
                    type: "string",
                    title: '航程',
                    data: [{
                        "label": "商旅订单问题",
                        "value": "travel",
                        "children": [{
                            "label": "机票",
                            "value": "travel-plane"
                        }, {
                            "label": "火车票",
                            "value": "travel-train"
                        }]
                    }, {
                        "label": "主动护航",
                        "value": "safe",
                        "children": [{
                            "label": "机票",
                            "value": "safe-plane"
                        }, {
                            "label": "火车票",
                            "value": "safe-train"
                        }]
                    }] 
                },
                subTravel: {
                    type: "string",
                    title: '航程',
                    data: [{
                        "label": "商旅订单问题",
                        "value": "travel",
                        "children": [{
                            "label": "机票",
                            "value": "travel-plane"
                        }, {
                            "label": "火车票",
                            "value": "travel-train"
                        }]
                    }, {
                        "label": "主动护航",
                        "value": "safe",
                        "children": [{
                            "label": "机票",
                            "value": "safe-plane"
                        }, {
                            "label": "火车票",
                            "value": "safe-train"
                        }]
                    }] 
                }
            }
        },
        uiSchema: {
            travel: {
                "ui:widget": "treeSelect",
                "ui:options": {
                    validate: [{
                        type: 'empty',
                        message: '请至少选择一项'
                    }]
                }
            },
            subTravel: {
                "ui:widget": "treeSelect",
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
    it('xform renders item length to be 2', ()=> {
        expect(xform.find('.xform-item').length).toBe(2);
    });
    it('xform select validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('请至少选择一项');
    });
    it('xform treeSelect noValue onChange', () => {
        const item = xform.find('.xform-item').at(0);
        const Select = item.find('CustomTreeSelect').first();
        const change = Select.props().onChange();
        expect(Select).toBeDefined();
    });
    it('xform treeSelect hasValue onChange', ()=> {
        const item = xform.find('.xform-item').at(1);
        const Select = item.find('CustomTreeSelect').first();
        const change = Select.props().onChange();
        expect(Select).toBeDefined();
    });
});
