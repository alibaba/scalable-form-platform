import React, {Component} from 'react';
import {Button, WingBlank} from 'antd-mobile';
import ScalableFormAntdMobile from '../packages/scalable-form-antd-mobile/src/index';

export default class ScalableFormMobileWithCodeExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    }
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
      <div
        className="scalable-form-demo-element mobile"
      >
        <ScalableFormAntdMobile
          env="dev"
          formCode={'44ec2959e6014467899282d33970b1db'}
          onload={(formData, bizData) => {
            console.log('xform onload formData:', formData);
            console.log('xform onload bizData:', bizData);
          }}
          onChange={this.handleChanged}
          onSubmit={this.handleSubmit}
        >
          <WingBlank>
            <Button
              type="primary"
            >
              提交
            </Button>
          </WingBlank>
        </ScalableFormAntdMobile>
      </div>
    );
  }
}

