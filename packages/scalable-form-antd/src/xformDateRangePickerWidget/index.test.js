/**
 * xform DateRangePicker widget（日期范围选择器） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform DateRangePicker widget test', () => {
    let xform, form;
    const INIT_FORM_DATA = {
       beginDateRange: '',
       endDateRange: '',
       arriveDateRange: ['2017-08-09', '2017-09-13']
    };
    const BIZ_DATA = {
        beginDateRange: {
            fieldType: 'system',
            canSearch: true
        },
        endDateRange: {
            fieldType: 'system',
            canSearch: true
        },
        arriveDateRange: {
            fieldType: 'system',
            canSearch: true
        }
    };
    let formSchema = {
        jsonSchema: {
            description: 'widget测试',
                type: 'object',
                required: ['beginDateRange', 'endDateRange', 'arriveDateRange'],
                properties: {
                    beginDateRange: {
                        type: 'array',
                        title: '开始的日期区间',
                        items: {
                            type: 'string',
                            enum: [],
                            enumNames: []
                        },
                        uniqueItems: true
                    },
                    endDateRange: {
                        type: 'array',
                        title: '结束的日期区间',
                        items: {
                            type: 'string',
                            enum: [],
                            enumNames: []
                        },
                        uniqueItems: true
                    },
                    arriveDateRange: {
                        type: 'array',
                        title: '到达的日期区间',
                        items: {
                            type: 'string',
                            enum: [],
                            enumNames: []
                        },
                        uniqueItems: true
                    }
                }
        },
        uiSchema: {
            beginDateRange: {
                'ui:widget': 'dateRange',
                'ui:options': {
                    placeholder: ['起始日期', '结束日期'],
                    validate: [{
                        type: 'empty',
                        message: '该项为必填项'
                    }]
                }
            },
            endDateRange: {
                'ui:widget': 'dateRange',
                'ui:options': {
                    placeholder: ['起始日期', '结束日期'],
                    validate: [{
                        type: 'empty',
                        message: '该项为必填项'
                    }]
                }
            },
            arriveDateRange: {
                'ui:widget': 'dateRange',
                'ui:options': {
                    placeholder: ['起始日期', '结束日期'],
                    validate: [{
                        type: 'empty',
                        message: '该项为必填项'
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
    })
    it('xform dateRangePicker validate', ()=> {
        expect(xform.find('.ant-form-explain').first().text()).toBe('该项为必填项');
    })
    it('xform RangePicker noValue onChange', () => {
        const item = xform.find('.xform-item').at(0);
        const RangePicker = item.find('RangePicker').first();
        const change = RangePicker.props().onChange();
        expect(RangePicker).toBeDefined();
    });
    it('xform RangePicker hasValue onChange', ()=> {
        const item = xform.find('.xform-item').at(2);
        const RangePicker = item.find('RangePicker').first();
        const change = RangePicker.props().onChange();
        expect(RangePicker).toBeDefined();
    });
});
