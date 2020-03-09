/**
 * xform textarea widget（多行文本输入框） 测试用例
 */


import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform textarea widget test', () => {
    let xform, form;
    const INIT_FORM_DATA = {
       text: '',
       note: '人生如此美妙！'
    };
    const BIZ_DATA = {
        note: {
            fieldType: 'system',
            canSearch: false
        }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
                type: 'object',
                required: [ 'note'],
                properties: {
                    text: {
                        type: 'string',
                        title: '备注',
                        maxLength: 150
                    },
                    note: {
                        type: 'string',
                        title: '备注',
                        maxLength: 150
                    }
                }
        },
        uiSchema: {
            text: {
                'ui:widget': 'textarea',
                'ui:disabled': false,
                'ui:options': {
                    validate: [{
                        type: 'empty',
                        message: '备注不能为空'
                    }]
                }
            },
            note: {
                'ui:widget': 'textarea',
                'ui:disabled': false,
                'ui:options': {
                    validate: [{
                        type: 'empty',
                        message: '备注不能为空'
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
    })
    it('xform renders textarea[type=textarea]', () => {
        const textarea = xform.find('textarea[type="textarea"]');
        expect(textarea).toBeDefined();
    });
    it('xform textarea validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('备注不能为空');
    });
    it('xform textarea onChange', ()=> {
        const item = xform.find('.xform-item').at(0);
        const textarea = item.find('TextArea').first();
        const event = {
            currentTarget: {
                value: ''
            }
        }
        const change = textarea.props().onChange(event);
        expect(textarea).toBeDefined();
    });
});
