import React, {Component} from 'react';
import ScalableFormCore from '../packages/scalable-form-core/src';

const FORM_CODE = '44ec2959e6014467899282d33970b1db';

export default class ScalableFormCoreWithCodeExample extends Component {
  constructor(args) {
    super(args);
    this.state = {
      formData: {}
    };
  }

  handleChanged = (formData, bizData) => {
    console.log('ScalableForm Changed!', formData);
    console.log('ScalableForm Changed!', bizData);
    this.setState({
      formData: {...formData}
    });
  };

  handleSubmit = (formData, bizData) => {
    console.log('ScalableForm Submitted!', formData);
    console.log('ScalableForm Submitted!', bizData);
  };

  render() {
    const {formData} = this.state;
    return (
      <div className="scalable-form-demo-element">
        <div className="demo-title">
          使用formCode的ScalableForm在线示例
        </div>
        <p className="demo-desc">
          在XFormCore中是没有携带任何UI的（只是react-jsonschema-form默认的bootstrap风格的UI），所有与表单UI相关的内容完全需要渲染组件自己去实现。其中主要包括两个部分：
        </p>
        <ScalableFormCore
          env="dev"
          formCode={FORM_CODE}
          formData={formData}
          beforeSchemaFetch={(formCode) => {
            console.log('get schema by formCode:', formCode);
          }}
          onload={(formData) => {
            console.log('ScalableForm onload event, formData is ', formData);
          }}
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
