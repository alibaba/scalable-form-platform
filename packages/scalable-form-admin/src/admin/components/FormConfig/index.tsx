import {Button, Icon, Input, message, Modal, Tabs} from 'antd';
import * as React from 'react';
import API from '../../../API';
import * as Config from '../../../Config';
import SchemaList from "../SchemaList";
import XFormConfig from "./config";
import XFormData from "./data";
import XFormConfigHeader from "./head";
import './index.less';
import XFormInfo from "./info";
import PhoneQRCode from './qr';

const {Search} = Input;
const {TabPane} = Tabs;

const CURRENT_ROUTE_LIST = 'LIST';
const CURRENT_ROUTE_ITEM = 'ITEM';
const TAB_INFO = 'TAB_INFO';
const TAB_CONFIG = 'TAB_CONFIG';
const TAB_DATA = 'TAB_DATA';
const TAB_REPORT = 'TAB_REPORT';

interface State {
  page: number,
  pageSize: number,
  total: number,
  list: any[],
  loading: boolean,
  searchKey: string,
  selectedFormUUID: string,
  currentRoute: string,
  currentTab: string,
  showNewFormModal: boolean,
  tmpNewFormName: string,
  tmpFormSchema: any,
  showSuccessModal: boolean
}

export default class XFormDashboard extends React.PureComponent<any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      page: Config.DEFAULT_PAGE,
      pageSize: Config.DEFAULT_PAGE_SIZE,
      total: 0,
      list: [],
      loading: false,
      searchKey: '',
      selectedFormUUID: null,
      currentRoute: CURRENT_ROUTE_LIST,
      currentTab: TAB_CONFIG,
      tmpNewFormName: 'New title',
      showNewFormModal: false,
      tmpFormSchema: null,
      showSuccessModal: false
    }
  }

  public componentDidMount = () => {
    this.getFormList();
  };

  public getFormList = () => new Promise((resolve) => {
    this.setState({
      loading: true
    });
    API.getFormList({
      data: {
        page: this.state.page,
        pageSize: this.state.pageSize,
        title: this.state.searchKey || undefined
      }
    })
      .then((data: any) => {
        this.setState({
          loading: false,
          page: data.page || Config.DEFAULT_PAGE,
          pageSize: data.pageSize || Config.DEFAULT_PAGE_SIZE,
          total: data.total || 0,
          list: data.list || [],
        }, resolve);
      })
      .catch((e: any) => {
        message.error(`获得表单列表出错 ${e.message}`);
        this.setState({
          loading: false
        });
      });
  });

  public handleTableChanged = (pagination: any) => new Promise((resolve, reject) => {
    this.setState({
      page: pagination.current || Config.DEFAULT_PAGE,
      pageSize: pagination.pageSize || Config.DEFAULT_PAGE_SIZE,
    }, () => {
      this.getFormList()
        .then(resolve)
        .catch((e) => {
          message.error(`获得表单列表出错 ${e.message}`);
          reject(e);
        });
    });
  });

  public handleEdit = (record: any) => {
    this.setState({
      selectedFormUUID: record.uuid,
      tmpNewFormName: record.title,
      tmpFormSchema: record.formSchema,
      currentRoute: CURRENT_ROUTE_ITEM,
      currentTab: TAB_CONFIG
    });
  };

  public handleView = (record: any) => {
    this.setState({
      selectedFormUUID: record.uuid,
      tmpNewFormName: record.title,
      tmpFormSchema: record.formSchema,
      currentRoute: CURRENT_ROUTE_ITEM,
      currentTab: TAB_INFO
    });
  };

  public handleDelete = (record: any) => {
    console.log(record);
    API.deleteSchema({
      data: {
        uuid: record.uuid
      }
    })
      .then((data: any) => {
        this.getFormList();
      })
      .catch((e: any) => {
        message.error(`删除表单数据失败 ${e.message}`);
      })
  };

  public handleOpenModal = () => {
    this.setState({
      showNewFormModal: true,
      tmpNewFormName: ''
    });
  };

  public handleOk = () => {
    this.setState({
      showNewFormModal: false,
      currentRoute: CURRENT_ROUTE_ITEM,
      currentTab: TAB_CONFIG,
      selectedFormUUID: 'NEW',
      tmpFormSchema: null,
    })
  };

  public handleCancel = () => {
    this.setState({
      showNewFormModal: false
    })
  };

  public handleNewTitleChanged = (e: any) => {
    this.setState({
      tmpNewFormName: e.target.value
    })
  };

  public handleUpdateTitle = (tmpNewFormName: string) => {
    this.setState({
      tmpNewFormName
    });
  };

  public handleBackToList = () => {
    this.setState({
      currentRoute: CURRENT_ROUTE_LIST
    }, () => {
      this.getFormList();
    })
  };

  public handleSaveSchema = (schema: any) => new Promise((resolve, reject) => {
    console.log(schema);
    let selectedFormUUID = this.state.selectedFormUUID;
    if (selectedFormUUID === 'NEW') {
      selectedFormUUID = null;
    }
    API.saveForm({
      data: JSON.stringify({
        title: this.state.tmpNewFormName,
        formSchema: schema,
        uuid: selectedFormUUID
      })
    })
      .then(({id, uuid}: any) => {
        console.log(143, id, uuid);
        message.success('保存表单成功');
        this.setState({
          selectedFormUUID: uuid,
          showSuccessModal: true
        }, resolve);
      })
      .catch((e: any) => {
        message.error(`error in save form ${e.message}`);
        reject(e);
      });
  });

  public render() {
    const formURL = getPortalURL(this.state.selectedFormUUID);
    const list = this.state.list || [];
    const selectedFormUUID = this.state.selectedFormUUID;
    const selectedFormIndex = list.findIndex((form) => {
      return form.uuid === selectedFormUUID;
    });
    let currentForm = null;
    if (selectedFormIndex >= 0) {
      currentForm = list[selectedFormIndex];
    }
    return (
      <div className="app-dev-xform-config-list-wrapper">
        {this.state.currentRoute === CURRENT_ROUTE_LIST ? (
          <div
            className="list-container"
          >
            <div className="list-menu-list">
              <div className="list-menu-item selected">
                所有表单
              </div>
            </div>
            <div className="list-content">
              <div className="list-content-header">
                <Search
                  value={this.state.searchKey}
                  onChange={(e: any) => {
                    this.setState({
                      searchKey: e.target.value
                    })
                  }}
                  placeholder="输入表单名称进行搜索"
                  onSearch={this.getFormList}
                  enterButton={true}
                />
                <div className='list-content-header-action'>
                  <Button
                    icon="plus"
                    type="primary"
                    onClick={this.handleOpenModal}
                  >
                    新建表单
                  </Button>
                </div>
              </div>
              <div className="list-content-table">
                <SchemaList
                  loading={this.state.loading}
                  page={this.state.page}
                  pageSize={this.state.pageSize}
                  total={this.state.total}
                  list={this.state.list}
                  onChange={this.handleTableChanged}
                  onEdit={this.handleEdit}
                  onView={this.handleView}
                  onDelete={this.handleDelete}
                />
              </div>
            </div>
            <Modal
              title="创建表单"
              visible={this.state.showNewFormModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className="app-dev-xform-config-list-new-modal">
                <div className="modal-title">
                  为你的表单起一个名字吧
                </div>
                <div className="modal-input">
                  <Input
                    placeholder="请输入表单标题"
                    value={this.state.tmpNewFormName}
                    onChange={this.handleNewTitleChanged}
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <div className="config-container">
            <XFormConfigHeader
              title={this.state.tmpNewFormName}
              onChange={this.handleUpdateTitle}
              onBack={this.handleBackToList}
              readonly={this.state.currentTab !== TAB_CONFIG}
            />
            <Tabs
              activeKey={this.state.currentTab}
              onChange={(key: string) => {
                this.setState({
                  currentTab: key
                });
              }}
            >
              <TabPane
                tab="表单信息"
                key={TAB_INFO}
              >
                <XFormInfo
                  currentForm={currentForm}
                />
              </TabPane>
              <TabPane
                tab="编辑表单"
                key={TAB_CONFIG}
              >
                <XFormConfig
                  key={this.state.selectedFormUUID}
                  formSchema={this.state.tmpFormSchema}
                  onSubmit={this.handleSaveSchema}
                  onBack={this.handleBackToList}
                />
              </TabPane>
              <TabPane
                tab="数据"
                key={TAB_DATA}
              >
                <XFormData
                  title={this.state.tmpNewFormName}
                  uuid={currentForm && currentForm.uuid}
                  formSchema={currentForm && currentForm.formSchema}
                />
              </TabPane>
            </Tabs>
          </div>
        )}
        <Modal
          title={null}
          visible={this.state.showSuccessModal}
          onOk={() => {
            this.setState({
              showSuccessModal: false,
            }, () => {
              this.handleBackToList()
            })
          }}
          onCancel={() => {
            this.setState({
              showSuccessModal: false
            })
          }}
        >
          <div className="app-dev-xform-config-success-modal">
            <div className="modal-title">
              <Icon type="check-circle" theme="filled" />
              <span className="title-content">
                    表单保存成功
                  </span>
            </div>
            <div className="modal-content">
              <div className="modal-label">您可以将表单地址直接发给填表者</div>
              <div className="modal-value">
                <a href={formURL} target="_blank">{formURL}</a>
              </div>
              <div className="modal-label">也可以发送表单二维码给填表者</div>
              <div className="modal-value-qr">
                <PhoneQRCode url={formURL} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

function getPortalURL(uuid: string) {
  let serverPath = (window as any).serverPath || '';
  serverPath = serverPath.trim().toLowerCase().replace(/\*$/, '').replace(/\/$/, '');
  return `${location.origin}${serverPath}/portal/${uuid}`;
}
