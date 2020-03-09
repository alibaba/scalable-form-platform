import {Popconfirm, Table} from 'antd';
import moment from 'moment';
import * as React from 'react';
import './index.less';

interface Props {
  page: number,
  pageSize: number,
  total: number,
  list: any[],
  loading: boolean,
  onChange: (pagination: any) => void,
  onEdit: (record: any) => void,
  onView: (record: any) => void,
  onDelete: (record: any) => void
}

class SchemaList extends React.PureComponent<Props, null> {

  private readonly columns: any[];

  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: '表单名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '访问量',
        dataIndex: 'visitCount',
        key: 'visitCount',
      },
      {
        title: '数据量',
        dataIndex: 'dataCount',
        key: 'dataCount',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (value: string) => {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '修改时间',
        dataIndex: 'lastModified',
        key: 'lastModified',
        render: (value: string) => {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      {
        title: '操作',
        key: 'id',
        fixed: 'right',
        width: 80,
        render: (id: number, record: any) => (
          <span className="form-list-action-list">
            <span
              className="action-item"
              onClick={() => {
                this.props.onView(record);
              }}
            >
              查看
            </span>
            <span
              className="action-item"
              onClick={() => {
                this.props.onEdit(record);
              }}
            >
              编辑
            </span>
            <Popconfirm
              title="确定删除此表单吗？"
              onConfirm={() => {
                this.props.onDelete(record);
              }}
              okText="确定"
              cancelText="取消"
            >
              <span
                className="action-item"
              >
                删除
              </span>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  public render() {
    const list = this.props.list || [];
    const pagination = {
      current: this.props.page,
      pageSize: this.props.pageSize,
      total: this.props.total,
      showSizeChanger: true,
      showQuickJumper: true
    };

    return (
      <div className="xform-schema-list-wrapper">
        <Table
          loading={this.props.loading}
          columns={this.columns}
          dataSource={list}
          onChange={this.props.onChange}
          pagination={pagination}
        />
      </div>
    );
  }
}

export default SchemaList;
