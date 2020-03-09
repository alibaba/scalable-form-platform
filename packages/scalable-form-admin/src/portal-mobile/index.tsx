import {Button, Icon, Result, Toast} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ScalableFormAntdMobile from 'scalable-form-antd-mobile';
import API from '../API';
import './index.less';
const detector = require('detector');

const os = `${detector.os.name}(${detector.os.version})`;
const browser = `${detector.browser.name}(${detector.browser.version})`;

interface State {
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

export default class XFormPortalMobile extends React.PureComponent<any, State> {

  private form: any;

  constructor(props: any) {
    super(props);
    const schema = (window as any).schema || {};
    if (!schema.jsonSchema) {
      Toast.fail('获得表单数据失败');
    }
    this.state = {
      schemaCode: schema.schemaCode,
      jsonSchema: schema.jsonSchema,
      uiSchema: schema.uiSchema,
      bizData: schema.bizData,
      sequence: schema.sequence,
      formData: {},
      submitSuccess: false
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
        Toast.fail(`表单提交失败 ${e.message}`);
        console.error(e);
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
        <Result
          img={(
            <Icon
              size="lg"
              type="check-circle"
              className="spe"
              color="#4caf50"
            />
          )}
          title="表单提交成功"
          message={null}
        />
      );
    } else {
      return (
        <div className="xform-portal-mobile">
          <div className="xform-content">
            <ScalableFormAntdMobile
              ref={(ref: any) => {
                this.form = ref;
              }}
              locale="zh-cn"
              xtrackerCode="xform-core-demo"
              alignType="inline"
              labelAlign="left"
              defaultSubmitButton={false}
              itemNumberInRow={3}
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
  <XFormPortalMobile />
), document.getElementById('root'));
