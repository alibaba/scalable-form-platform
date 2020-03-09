/**
 * xform tag（标签展示编辑类） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform tag widget test', () => {
    let xform, form;

    const INIT_FORM_DATA = {
        nuoke: ['痞', 'freeStyle', '东北'],
        yantan: ['樱木', '温州'],
        tags: ['帅', '歌神', '国际范']
    };
    const BIZ_DATA = {
        tags: {
            fieldType: 'custom',
            canSearch: false
        }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
            type: 'object',
            required: ['tags'],
            properties: {
                nuoke: {
                    type: 'array',
                    title: '标签',
                    items: {
                        type: 'string',
                        enum: [],
                        enumNames: []
                    },
                    uniqueItems: true
                },
                yantan: {
                    type: 'array',
                    title: '标签',
                    items: {
                        type: 'string',
                        enum: [],
                        enumNames: []
                    },
                    uniqueItems: true,
                    data: [{
                        content: '樱木',
                        removable: true
                    }, {
                        content: '温州',
                        removable: true
                    }]
                },
                tags: {
                    type: 'array',
                    title: '标签',
                    items: {
                        type: 'string',
                        enum: [],
                        enumNames: []
                    },
                    uniqueItems: true,
                    data: [{
                        content: '帅',
                        removable: false
                    }, {
                        content: '歌神',
                        removable: true
                    }, {
                        content: '国际范',
                        removable: true
                    }]
                }
            }
        },
        uiSchema: {
            nuoke: {
                'ui:widget': 'tag',
                'ui:options': {
                    addTag: false,
                    validate: [{
                        type: 'empty',
                        message: '该字段不能为空'
                    }]
                }
            },
            yantan: {
                'ui:widget': 'tag',
                'ui:options': {
                    addTag: true
                }
            },
            tags: {
                'ui:widget': 'tag',
                'ui:options': {
                    addTag: true,
                    validate: [{
                        type: 'empty',
                        message: '该字段不能为空'
                    }],
                    _errorType: 'empty'
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
    it('xform renders item length to be 3', ()=> {
        expect(xform.find('.xform-item').length).toBe(3);
    })
    it('xform tag validate', () => {
        expect(xform.find('.ant-form-explain').first().text()).toBe('');
    })
    it('xform tag when addTag true close tag', () => {
        const item = xform.find('.xform-item').at(0);
        const tag = item.find('Tag').at(0);
        tag.props().afterClose();
        expect(item.find('span.ant-tag-text').at(0).text()).toBe('freeStyle');
    })
    it('xform tag when addTag true close tag', () => {
        const item = xform.find('.xform-item').at(1);
        const tag = item.find('Tag').at(0);
        tag.props().afterClose();
        expect(item.find('span.ant-tag-text').at(0).text()).toBe('温州');
    })
    it('xform tag click button show input', () => {
        const item = xform.find('.xform-item').at(1);
        const buttons = item.find('button');
        expect(item.find('Input').length).toBe(0);
        buttons.at(0).simulate('click');
        expect(item.find('Input').length).toBe(1);
    })
    it('xform tag input value correct', ()=> {
        const item = xform.find('.xform-item').at(1);
        const buttons = item.find('button');
        expect(item.find('input[type="text"]').length).toBe(0);
        buttons.at(0).simulate('click');
        const input = item.find('input[type="text"]').at(0);
        input.node.value = '消防群红人';
        input.simulate('change', input);
        expect(input.node.value).toBe('消防群红人');
    })
    it('xform tag input value to tag', ()=> {
        const item = xform.find('.xform-item').at(1);
        const buttons = item.find('button');
        expect(item.find('input[type="text"]').length).toBe(0);
        buttons.at(0).simulate('click');
        const input = item.find('input[type="text"]').at(0);
        input.node.value = '消防群红人';
        input.simulate('change', input);
        const Input = item.find('Input').at(0);
        Input.props().onPressEnter();
        expect(item.find('span.ant-tag-text').at(2).text()).toBe('消防群红人');
    })
});

