/**
 * xform input widget（普通文本输入框） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform input widget test', () => {
    let xform, form;
    const noop = function() {};
    const INIT_FORM_DATA = {
        name: '',
        bizName: '初始值'
    };
    const BIZ_DATA = {
        name: {
            fieldType: 'universal',
            canSearch: true
        },
        bizName: {
            fieldType: 'universal',
            canSearch: true
        }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
            type: 'object',
            required: ['name', 'bizName'],
            properties: {
                name: {
                    type: 'string',
                    title: '名称',
                    maxLength: 15
                },
                bizName: {
                    type: 'string',
                    title: '业务视图名称',
                    maxLength: 15
                }
            }
        },
        uiSchema: {
            name: {
                'ui:options': {
                    placeholder: '请输入',
                    validate: [{
                        type: 'empty',
                        message: '该字段不能为空'
                    }]
                }
            },
            bizName: {
                'ui:options': {
                    placeholder: '请输入',
                    validate: [{
                        type: 'empty',
                        message: '该字段不能为空'
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
    it('xform input validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('该字段不能为空');
    })
    it('xform input onChange call', ()=> {
        let input = xform.find('input[type="text"]').at(1);
        input.node.value = 'Change value';
        input.simulate('change', input);
        expect(input.node.value).toBe('Change value');
    })
});

