import moment from 'moment';
import * as React from 'react';
import PhoneQRCode from "../qr";
import './index.less';

interface Props {
  currentForm: any
}

class XFormInfo extends React.PureComponent<Props, any> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    const currentForm = this.props.currentForm || {};
    const uuid = currentForm.uuid || '';
    const formURL = getPortalURL(uuid);
    return (
      <div className="xform-dashboard-info">
        <div className="xform-info-list">
          <div className="xform-info-item">
            <div className="item-value">
              {currentForm.visitCount}
            </div>
            <div className="item-label">
              累计访问次数
            </div>
          </div>
          <div className="xform-info-item">
            <div className="item-value">
              {currentForm.dataCount}
            </div>
            <div className="item-label">
              表单总数据量
            </div>
          </div>
        </div>
        <div className="xform-info-address">
          <div className="address-item">
            <div className="address-label">
              表单创建时间
            </div>
            <div className="address-value">
              {moment(currentForm.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
          <div className="address-item">
            <div className="address-label">
              上次修改时间
            </div>
            <div className="address-value">
              {moment(currentForm.lastModified).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
          <div className="address-item">
            <div className="address-label">
              表单填写地址
            </div>
            <div className="address-value">
              <a
                target="_blank"
                href={formURL}
              >{formURL}</a>
            </div>
          </div>
          <div className="address-item">
            <div className="address-label" />
            <div className="address-value">
              <PhoneQRCode url={formURL} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default XFormInfo;

function getPortalURL(uuid: string) {
  let serverPath = (window as any).serverPath || '';
  serverPath = serverPath.trim().toLowerCase().replace(/\*$/, '').replace(/\/$/, '');
  return `${location.origin}${serverPath}/portal/${uuid}`;
}
