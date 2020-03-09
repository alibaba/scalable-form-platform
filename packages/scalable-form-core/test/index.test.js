import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ScalableFormCore from "../src/index";

class Example extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '这里有个初始值',
      }
    };
  }

  handleXFormSubmit = (formData, bizData) => {
    console.log('XForm Submitted!', formData, bizData);
  };

  render() {
    const jsonSchema = {
      title: '表单hello world',
      description: '这里是一段表单描述，这个表单拥有一个input输入框，并且还是必填的',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: '名称',
          default: '',
          maxLength: 15
        }
      }
    };
    const uiSchema = {
      name: {
        'ui:help': '',
        'ui:options': {
          placeholder: '请输入您的姓名'
        }
      }
    };

    const initFormData = this.state.formData;
    const bizData = {};

    return (
      <div id="xform-root-element">
        <ScalableFormCore
          jsonSchema={jsonSchema}
          uiSchema={uiSchema}
          formData={initFormData}
          bizData={bizData}
          onSubmit={this.handleXFormSubmit}
        />
      </div>
    );
  }
}

Enzyme.configure({adapter: new Adapter()});
const wrapper = Enzyme.mount(
  <Example />
);

describe('ScalableFormCoreExample Test', () => {
  it('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
