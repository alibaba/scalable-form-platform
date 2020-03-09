import {Button} from 'antd';
import * as React from 'react';
import XFormBuilder from "scalable-form-editor";

import './index.less';

interface Props {
  formSchema: any,
  onBack: () => void,
  onSubmit: (formSchema: any) => Promise<any>
}

interface State {
  formSchema: any
}

class XFormConfig extends React.PureComponent<Props, State> {

  private builderInstance: any;
  private readonly id: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      formSchema: props.formSchema
    };
    this.id = `xform_builder_${Date.now()}`;
    this.builderInstance = null;
    console.log(29, this.id);
  }

  public handleSubmit = (formSchema: any) => {
    this.props.onSubmit(formSchema);
  };

  public handleSubmitButtonClicked = () => {
    if (this.builderInstance) {
      // console.log(this.builderInstance);
      this.builderInstance.handleFormSave();
    }
  };

  public render() {
    const formSchema = this.state.formSchema || {};
    const jsonSchema = formSchema.jsonSchema || {};
    const uiSchema = formSchema.uiSchema || {};
    const bizData = formSchema.bizData || {};
    const sequence = formSchema.sequence || [];
    return (
      <div className="xform-config">
        <div className="xform-editor-container">
          <XFormBuilder
            getInstance={(ref: any) => {
              this.builderInstance = ref;
            }}
            platformConfigSupport={true}
            platform="both"
            jsonSchema={jsonSchema}
            uiSchema={uiSchema}
            formData={{}}
            bizData={bizData}
            sequence={sequence}
            namespace={this.id}
            defaultActionButtons={false}
            beforeSubmit={this.handleSubmit}
            customInterfaces={{
              getInitConfig: '/xform/getInitConfig',

              dataSourceServerUrl: '/xform/getData',
              getSchemaByCode: '/formConfig/getJsonSchemaByCode.do',
              serverCheck: '/validate/validateField.do',
              getDataSourceListData: '/xform/queryDataSourceList',
              getServerCheckListData: '/xform/getAllValidators',

              saveFieldsData: '/formConfig/saveForm.do',
              updateFieldsData: '/formConfig/updateForm.do',
            }}
          />
        </div>
        <div className="xform-action-container">
          <Button
            onClick={this.props.onBack}
          >
            退出编辑
          </Button>
          <Button
            type="primary"
            onClick={this.handleSubmitButtonClicked}
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default XFormConfig;
