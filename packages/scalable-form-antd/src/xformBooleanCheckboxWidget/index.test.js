/**
 * xform BooleanCheckboxes widget（boolean类型的Checkbox组件） 测试用例
 */

import React from 'react';
import XForm from '../index';
import { mount } from 'enzyme';

describe('xform BooleanCheckbox widget test', () => {
    let xform;
    const INIT_FORM_DATA = {
       isFavouriteCity: false
    };
    const BIZ_DATA = {
        isFavouriteCity: {
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
                    isFavouriteCity: {
                        type: 'boolean',
                        title: '请问这是你喜欢的城市吗？'
                    }
                }
        },
        uiSchema: {
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
    })

    it('xform renders form label', () => {
        const form = xform.find('form').first();
        expect(form).toBeDefined();
    });
    it('xform renders item length to be 1', ()=> {
        expect(xform.find('.xform-item').length).toBe(1);
    })
    it('xform renders label', () => {
        const label = xform.find('label');
        expect(label).toBeDefined();
    })
    it('xform Checkboxed onchange', ()=> {
        const item = xform.find('.xform-item').at(0);
        const input = item.find('input[type="checkbox"]').at(0);
        input.simulate('change', {target: {checked: true}});
        expect(input.node.checked).toBe(true);
    })
});
