import {message, Popconfirm, Table} from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import API from "../../../../API";
import './index.less';

const ReactHTMLTableToExcel = require('react-html-table-to-excel').default;

interface Props {
  title: string,
  uuid: string,
  formSchema: any
}

interface State {
  list: any[],
  total: number,
  page: number,
  pageSize: number
}

class XFormData extends React.PureComponent<Props, State> {

  private readonly columns: any[];
  private table: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      total: 0,
      page: 1,
      pageSize: 10,
      list: []
    };
    console.log(props.formSchema);
    const formSchema = props.formSchema || {};
    const jsonSchema = formSchema.jsonSchema || {};
    const formData = formSchema.formData || {};
    const uiSchema = formSchema.uiSchema || {};
    const sequence = formSchema.sequence || [];
    const properties = jsonSchema.properties || {};
    this.columns = [
      {
        title: '提交时间',
        dataIndex: 'createTime',
        fixed: true,
        key: 'createTime',
        render: (value: string) => {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '浏览器',
        dataIndex: 'browser',
        key: 'browser'
      },
      {
        title: '操作系统',
        dataIndex: 'os',
        key: 'os'
      }
    ];
    sequence.forEach((sequenceKey: string) => {
      const property = properties[sequenceKey];
      const title = property.title;
      this.columns.push({
        title,
        dataIndex: sequenceKey,
        key: sequenceKey,
        render: (value: string) => {
          // console.log(57, key);
          // const value = formData[sequenceKey];
          return renderFormData(property, uiSchema, sequenceKey, value);
        }
      })
    });
    this.columns.push({
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      render: (id: number) => {
        return (
          <span className="data-action">
            <Popconfirm
              title="确定删除当前数据吗?"
              onConfirm={() => {
                this.handleDeleteData(id);
              }}
            >
              <span
                className="data-action-item"
              >
                删除
              </span>
            </Popconfirm>
          </span>
        );
      }
    })
  }

  public componentDidMount(): void {
    const tableCon = ReactDOM.findDOMNode(this.table)
    const table = (tableCon as any).querySelector('table')
    table.setAttribute('id', 'table-to-xls');
    this.getDataList();
  }

  public handleExportData = () => new Promise((resolve, reject) => {
    API.exportData({
      data: {
        uuid: this.props.uuid
      }
    })
      .then((data: any) => {
        console.error(data);
      })
      .catch((e: any) => {
        message.error(`删除数据失败 ${e.message}`);
        reject(e);
      });
  });

  public handleDeleteData = (id: number) => new Promise((resolve, reject) => {
    API.deleteData({
      data: {
        id
      }
    })
      .then((data: any) => {
        this.getDataList().then(resolve).catch(reject);
      })
      .catch((e: any) => {
        message.error(`删除数据失败 ${e.message}`);
        reject(e);
      });
  });

  public getDataList = () => new Promise((resolve, reject) => {
    API.getDataList({
      data: {
        page: this.state.page,
        pageSize: this.state.pageSize,
        uuid: this.props.uuid
      }
    })
      .then((data: any) => {
        this.setState({
          list: data.list || [],
          total: data.total || 0,
        }, resolve);
      })
      .catch((e: any) => {
        message.error(`获得数据失败 ${e.message}`);
        reject(e);
      })
  });

  public handleTableChanged = (pagination: any) => new Promise((resolve, reject) => {
    this.setState({
      page: pagination.current || 0,
      pageSize: pagination.pageSize || 10,
    }, () => {
      this.getDataList()
        .then(resolve)
        .catch(reject);
    });
  });

  public render() {
    let list = this.state.list || [];
    list = list.map((item: any) => {
      return {
        ...item,
        ...(item.formData || {})
      }
    });
    const pagination = {
      current: this.state.page,
      pageSize: this.state.pageSize,
      total: this.state.total,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '50', '100', '1000']
    };
    return (
      <div className="xform-dashboard-data">
        <div className="data-action">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="ant-btn"
            table="table-to-xls"
            filename={`${this.props.title}_数据`}
            sheet="tablexls"
            buttonText="导出"
          />
        </div>
        <Table
          ref={(ref: any) => {
            this.table = ref;
          }}
          columns={this.columns}
          dataSource={list}
          onChange={this.handleTableChanged}
          pagination={pagination}
          scroll={{
            x: true
          }}
        />
      </div>
    );
  }
}

export default XFormData;

function renderFormData(property: any, uiSchema: any, key: string, value: any) {
  console.log(174, value);
  if (uiSchema && uiSchema[key] && uiSchema[key]['ui:widget']) {
    if (uiSchema[key]['ui:widget'] === 'label') {
      return value;
    } else if (uiSchema[key]['ui:widget'] === 'group') {
      return '-';
    } else if (uiSchema[key]['ui:widget'] === 'checkboxes') {
      const items = property.items || [];
      const enumNames = items.enumNames || [];
      const enums = items.enum || [];
      const newValue = (value || []).map((singleValue: string) => {
        const enumIndex = enums.findIndex((enumValue: string) => {
          return enumValue === singleValue;
        });
        if (enumIndex >= 0) {
          return enumNames[enumIndex];
        } else {
          return ''
        }
      });
      return newValue.join(',');
    } else if (uiSchema[key]['ui:widget'] === 'radio') {
      const enumNames = property.enumNames || [];
      const enums = property.enum || [];
      const enumIndex = enums.findIndex((enumValue: string) => {
        return enumValue === value;
      });
      if (enumIndex >= 0) {
        return enumNames[enumIndex];
      } else {
        return ''
      }
    } else if (uiSchema[key]['ui:widget'] === 'dateRange') {
      return (value || []).join(' ~ ')
    }
  }
  return value
}
