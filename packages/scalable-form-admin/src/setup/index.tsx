import {Button, Layout, message, Modal, Alert} from 'antd';
// import 'antd/lib/style/components.less';
// import 'antd/lib/style/index.less';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import * as React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import * as ReactDOM from 'react-dom';
import API from "../API";
import './index.less';

require('codemirror/mode/sql/sql');
const {Header, Content} = Layout;

interface State {
  showSQL: boolean,
  initStatusCode: string
}

export default class SetUp extends React.PureComponent<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      showSQL: false,
      initStatusCode: (window as any).initStatusCode || ''
    }
    ;
  }

  public checkInitStatus = () => new Promise((resolve, reject) => {
    location.reload();
  });

  public initDB = () => new Promise((resolve, reject) => {
    API.initDB({
      data: {}
    })
      .then((data: any) => {
        message.loading('请稍等，正在建表');
        setTimeout(() => {
          message.success('建表成功，正在前往表单管理页');
          setTimeout(() => {
            location.href = getAdminURL();
          }, 2000);
        }, 2000);
        resolve(data);
      })
      .catch((e: any) => {
        message.error(`初始化建表失败，${e.message}`);
      });
  });

  public render() {
    const db = (window as any).db || {};
    const initStatusCode = this.state.initStatusCode;
    const schemaTableSQL = (window as any).schemaTableSQL || '';
    const dataTableSQL = (window as any).dataTableSQL || '';
    const dailyReportTableSQL = (window as any).dailyReportTableSQL || '';
    const sql = `${schemaTableSQL}\n${dataTableSQL}\n${dailyReportTableSQL}\n`;
    return (
      <Layout className="app-common-layout app-setup">
        <Header className="header layout-header">
          <div className="logo">
            XForm
          </div>
        </Header>
        <Content className="content layout-content">
          <React.Fragment>
            <div className="info-item">
              <div className="info-label">
                当前数据库不包含可用的table表，是否自动创建？
              </div>
              <div className="info-action">
                <Button
                  type="primary"
                  onClick={this.initDB}
                >
                  自动创建
                </Button>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">
                或者，您可以使用以下sql自行创建数据表
              </div>
              <div className="info-action">
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      showSQL: true
                    });
                  }}
                >
                  查看建表SQL
                </Button>
                <Button
                  icon="redo"
                  onClick={this.checkInitStatus}
                >
                  刷新结果
                </Button>
              </div>
            </div>
            <div className="info-result">
              <div className="result-item">
                <div className="result-label">
                  数据库连接
                </div>
                <div className="result-value">
                  {initStatusCode === 'TABLE_ERROR' ? (
                    <span className="success">成功</span>
                  ) : (
                    <span className="error">成功</span>
                  )}
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">
                  数据库建表
                </div>
                <div className="result-value">
                  {initStatusCode === 'TABLE_ERROR' ? (
                    <span className="default">未建表</span>
                  ) : null}
                </div>
              </div>
              <div className="result-item">
                <div className="result-label">
                  数据库信息
                </div>
                <div className="result-value">
                  <span className="default">{db}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
          {(window as any).isDemo ? (
            <Alert
              message="【demo模式】没有配置数据库信息"
              description="当前服务运行在demo模式下，系统使用内存数据库保存数据，重启后所有数据将消失，您可以查看这里配置数据库连接"
              type="warning"
              showIcon
            />
          ) : null}
          <Modal
            title="建表SQL"
            width={800}
            visible={this.state.showSQL}
            onOk={() => {
              this.setState({
                showSQL: false
              });
            }}
            onCancel={() => {
              this.setState({
                showSQL: false
              });
            }}
          >
            <pre className="app-setup-sql">
              <CodeMirror
                value={sql}
                options={{
                  mode: 'sql',
                  theme: 'material',
                  lineNumbers: true,
                  readOnly: true
                }}
              />
            </pre>
          </Modal>
        </Content>
      </Layout>
    );
  }
}

ReactDOM.render((
  <SetUp />
), document.getElementById('root'));

function getAdminURL() {
  let serverPath = (window as any).serverPath || '';
  serverPath = serverPath.trim().toLowerCase().replace(/\*$/, '').replace(/\/$/, '');
  return `${location.origin}${serverPath}/admin`;
}
