import React, {Component} from 'react';
import {Button} from 'antd';
import ScalableFormAntd from '../packages/scalable-form-antd/src/index';

export default class ScalableFormAntdWithCodeExample extends Component {
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
    return (
      <div className="scalable-form-demo-element">
        <p className="demo-title">使用formCode的ScalableForm在线示例</p>
        <p className="demo-desc">
          ScalableFormAntd 渲染组件可以用来方便的渲染在ScalableForm编辑器中搭建的表单到PC页面中。ScalableFormAntd
          组件是基于ScalableFormCore组件的扩展，表单的渲染基于ant-design中Form相关的组件。
        </p>
        <ScalableFormAntd
          env="dev"
          formCode={'44ec2959e6014467899282d33970b1db'}
          formData={this.state.formData}
          beforeSchemaFetch={(formCode) => {
            console.log('get schema by formCode:', formCode);
          }}
          onload={(formData) => {
            console.log('ScalableForm onload event, formData is ', formData);
          }}
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{
              marginRight: '10px'
            }}
          >
            提交
          </Button>
        </ScalableFormAntd>
      </div>
    );
  }
}
