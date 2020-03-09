/**
 * xform Radio widget（单选器） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform radio widget test', () => {
    let xform, form;
    const INIT_FORM_DATA = {
       company: '',
       district: 'chaoyang',
       city: 'hangzhou'
    };
    const BIZ_DATA = {
        company: {
            fieldType: 'system',
            canSearch: false
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
                required: [ 'note'],
                properties: {
                    company: {
                        type: 'string',
                        title: '请选择公司',
                        enum: ['alibaba', 'tencent'],
                        enumNames: ['阿里', '腾讯']
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
                        enumNames: ['北京', '上海', '杭州'],
                        data: [
                            {
                                label: '北京',
                                value: 'beijing'
                            }
                        ]
                    }
                }
        },
        uiSchema: {
            company: {
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
                'ui:widget': 'radio',
                'ui:options': {
                    vertical: false,
                    validate: [{
                        type: 'empty',
                        message: '请选择'
                    }],
                    style: "test",
                    
                }
            },
            city: {
                'ui:widget': 'radio',
                'ui:options': {
                    vertical: false,
                    validate: [{
                        type: 'empty',
                        message: '请选择'
                    }],
                    style: "button"
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
    })
    it('xform radio validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('请选择');
    })
    it('xform radio style onchange', ()=> {
        const item = xform.find('.xform-item').at(0);
        const input = item.find('input[type="radio"]').at(0);
        input.simulate('change', {target: {checked: true}});
        expect(input.node.checked).toBe(true)
    })
    it('xform radio button onchange', ()=> {
        const item = xform.find('.xform-item').at(2);
        const input = item.find('input[type="radio"]').at(0);
        input.simulate('change', {target: {checked: true}});
        expect(input.node.checked).toBe(true)
    })
});
