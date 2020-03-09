import {Button, Icon, Input, Popover} from 'antd';
import * as React from 'react';
import './index.less';

interface Props {
  readonly: boolean,
  title: string,
  onChange: (title: string) => void,
  onBack: () => void
}

interface State {
  tmpTitle: string,
  visible: boolean,
}

class XFormConfigHeader extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      tmpTitle: props.title,
      visible: false
    }
  }

  public handleTitleChanged = (e: any) => {
    this.setState({
      tmpTitle: e.target.value
    });
  };

  public handleSubmitTitle = () => {
    this.props.onChange(this.state.tmpTitle);
    this.setState({
      visible: false
    })
  };

  public handleResetTitle = () => {
    this.setState({
      tmpTitle: this.props.title,
      visible: false
    });
  };

  public handleUpdateVisible = (visible: boolean) => {
    this.setState({
      visible
    });
  };

  public render() {
    return (
      <div className="xform-config-header">
        <div className="header-back">
          <Button
            icon="left"
            onClick={this.props.onBack}
          >
            返回
          </Button>
        </div>
        <Popover
          trigger="click"
          visible={(this.props.readonly) ? false : this.state.visible}
          onVisibleChange={this.handleUpdateVisible}
          content={(
            <div className="xform-config-header-pop">
              <div className="xform-config-header-label">
                表单标题
              </div>
              <div className="xform-config-header-value">
                <Input
                  value={this.state.tmpTitle}
                  placeholder="请输入表单标题"
                  onChange={this.handleTitleChanged}
                />
              </div>
              <div className="xform-config-header-action">
                <Button
                  onClick={this.handleResetTitle}
                >取消</Button>
                <Button
                  type="primary"
                  onClick={this.handleSubmitTitle}
                >确定</Button>
              </div>
            </div>
          )}
          title={null}
        >
          <div className="header-title">
            {this.props.title}
            {this.props.readonly ? null : (
              <Icon type="down" />
            )}
          </div>
        </Popover>
      </div>
    );
  }
}

export default XFormConfigHeader;
