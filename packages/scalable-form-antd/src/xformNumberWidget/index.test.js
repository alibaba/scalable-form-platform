/**
 * xform NumberInput widget（数字输入框） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform numberInput widget test', () => {
    let xform, form;
    const INIT_FORM_DATA = {
        num: '',
        number: 10
    };
    const BIZ_DATA = {
      num: {
          fieldType: 'universal',
          canSearch: true
      },
      number: {
          fieldType: 'universal',
          canSearch: true
      }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
            type: 'object',
            required: [ "number"],
            properties: {
                num: {
                    type: 'number',
                    title: '数目'
                },
                number: {
                    type: 'number',
                    title: '个数'
                }
            }
        },
        uiSchema: {
            num: {
                'ui:widget': 'updown',
                'ui:options': {
                    placeholder: '请输入',
                    validate: [{
                        type: 'empty',
                        message: '该字段不能为空'
                    }]
                }
            },
            number: {
                'ui:widget': 'updown',
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
        const form = xform.find('form').first();
        expect(form).toBeDefined();
    });
    it('xform renders item length to 2', ()=> {
        expect(xform.find('.xform-item').length).toBe(2);
    })
    it('xform numberInput validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('该字段不能为空');
    })
    it('xform renders numberInput with initvalue', () => {
        const input = xform.find('input').at(1);
        expect(input.node.value).toBe('10');
    })
    it('xform number hasValue onChange', ()=> {
        const item = xform.find('.xform-item').at(0);
        const InputNumber = item.find('InputNumber').first();
        const change = InputNumber.props().onChange();
        expect(InputNumber).toBeDefined();
    });
});
