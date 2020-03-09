import {Button, Icon, message} from 'antd';
// import 'antd/dist/antd.less'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ScalableForm from 'scalable-form-antd';
import API from '../API';
import './index.less';

const detector = require('detector');

const os = `${detector.os.name}(${detector.os.version})`;
const browser = `${detector.browser.name}(${detector.browser.version})`;

interface State {
  title: string;
  schemaCode: string;
  jsonSchema: {
    [key: string]: any
  };
  uiSchema: {
    [key: string]: any
  };
  bizData: {
    [key: string]: any
  };
  sequence: string[];
  formData: {
    [key: string]: any
  },
  submitSuccess: boolean
}

class XFormPortal extends React.PureComponent<any, State> {
  private form: any;

  constructor(props: any) {
    super(props);
    const schema = (window as any).schema || {};
    if (!schema.jsonSchema) {
      message.error('获得表单数据失败');
    }
    this.state = {
      schemaCode: schema.schemaCode,
      jsonSchema: schema.jsonSchema,
      uiSchema: schema.uiSchema,
      bizData: schema.bizData,
      sequence: schema.sequence,
      formData: {},
      submitSuccess: false,
      title: schema.title
    };
  }

  public handleXformSubmit = (formData: any) => {
    console.log('Xform Submitted!', formData);
    API.saveData({
      data: JSON.stringify({
        schemaCode: this.state.schemaCode,
        formData,
        os,
        browser
      })
    })
      .then((data: any) => {
        this.setState({
          submitSuccess: true
        })
      })
      .catch((e: any) => {
        message.error(`表单提交失败 ${e.message}`);
      })
  };

  public handleSubmitButtonClicked = () => {
    if (this.form) {
      this.form.XFormSubmit();
    }
  };

  public render() {
    if (this.state.submitSuccess) {
      return (
        <div className="xform-success">
          <Icon type="check-circle" theme="filled" />
          <div className="xform-success-desc">
            提交成功
          </div>
        </div>
      );
    } else {
      return (
        <div className="xform-portal">
          <div className="xform-content">
            <div className="xform-title">
              {this.state.title}
            </div>
            <ScalableForm
              ref={(ref: any) => {
                this.form = ref;
              }}
              labelType="vertial"
              locale="zh-cn"
              defaultSubmitButton={false}
              jsonSchema={this.state.jsonSchema}
              uiSchema={this.state.uiSchema}
              formData={this.state.formData}
              bizData={this.state.bizData}
              onSubmit={this.handleXformSubmit}
            />
          </div>
          <div className="commit-bar">
            <Button
              type="primary"
              onClick={this.handleSubmitButtonClicked}
            >
              提交
            </Button>
          </div>
        </div>
      );
    }

  }
}

ReactDOM.render((
  <XFormPortal />
), document.getElementById('root'));
