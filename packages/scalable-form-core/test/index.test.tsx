import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ScalableFormCore, { JSONSchema } from '../src/index';

const jsonSchema: JSONSchema = {
  title: '表单hello world',
  description: '这里是一段表单描述，这个表单拥有一个input输入框，并且还是必填的',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      title: '名称',
      maxLength: 15,
    },
  },
};
const uiSchema = {
  name: {
    'ui:help': '',
    'ui:options': {
      placeholder: '请输入您的姓名',
    },
  },
};

Enzyme.configure({adapter: new Adapter()});
let formRef: ScalableFormCore | null;
const wrapper = Enzyme.mount(
  <ScalableFormCore
    ref={(ref) => {
      formRef = ref;
    }}
    schema={jsonSchema}
    uiSchema={uiSchema}
  />,
);

describe('render ScalableFormCore', () => {
  it('should render snapshot without error', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should mark name required when validate', async () => {
    await sleep(1);
    if (formRef) {
      const formData = formRef.getData();
      if (formData) {
        expect(formData.name).toBe(undefined);
      }
      expect(formRef.submit()).toBe(undefined);
      const validateResult = formRef.validate();
      expect(validateResult.errors[0].name).toBe('required');
      expect(validateResult.errors[0].property).toBe('.name');
    }
  });
});

function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
