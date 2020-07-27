import React from 'react';
import ScalableFormMobile from '../src/index';
import { JSONSchema, UiSchema } from 'scalable-form-core';
import Locale from 'scalable-form-tools/src/locale/Locale';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WidgetKey } from 'scalable-form-tools';

const uiSchema: UiSchema = {
  'CAJ8j6TbFx': {
    'ui:options': {
      'exampleImageUrl': '',
      'label': '图片上传',
      'listType': 'picture',
      'uploadType': 'picture',
      'vertical': true,
      'accept': 'image/*',
    },
    'ui:widget': WidgetKey.FileWidget
  }
};

const jsonSchema:JSONSchema = {
  'title': '',
  'description': '',
  'type': 'object',
  'required': [
    'HhSA8pcMDW',
  ],
  'properties': {
    'CAJ8j6TbFx': {
      'type': 'array',
      'title': '图片',
      'default': [],
      'maxFileSize': 10,
      'maxFileNum': 10,
      'items': {
        'type': 'string',
        'format': 'data-url',
      },
      'uniqueItems': true,
    }
  },
}
Enzyme.configure({adapter: new Adapter()});
let formRef: ScalableFormMobile | null;
const wrapper = Enzyme.mount(
  <ScalableFormMobile
    locale={Locale.ZH_CN}
    schema={jsonSchema}
    uiSchema={uiSchema}
  />,
);

describe('render ScalableFormMobile', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
