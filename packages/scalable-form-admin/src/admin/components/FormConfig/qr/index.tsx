import * as React from 'react';
import './QRCode.less';

const QRCode = require('qrcode');

interface Props{
  url: string
}
interface State {
  qrCodeURL: string
}
export default class PhoneQRCode extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      qrCodeURL: ''
    };
  }

  public componentDidMount(): void {
    this.getNewCode(this.props.url);
  }

  public componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.url !== this.props.url) {
      this.getNewCode(nextProps.url);
    }
  };

  public getNewCode = (url:string) => {
    QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }, (err:any, result:string) => {
      this.setState({
        qrCodeURL: result
      });
    });
  };

  public render() {
    return (
      <div className="qr-code-container">
        <div className="qr-code-wrapper">
          <img src={this.state.qrCodeURL} className="qr-code" />
        </div>
      </div>
    );
  }
}

