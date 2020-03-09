import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

class PopPanel extends React.PureComponent {

  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      showHideAnimation: false
    };
  }

  handleClose = () => {
    this.setState({
      showHideAnimation: true
    });
    setTimeout(() => {
      this.props.onClose();
      this.setState({
        showHideAnimation: false
      });
    }, 200);
  };

  handleContentClicked = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  };

  handleSubmit = () => {
    this.props.onSubmit();
    this.handleClose();
  };

  handleCancel = () => {
    this.handleClose();
  };

  render() {
    if (this.props.show) {
      return (
        <div className='popup-wrapper'>
          <div
            className='popup-mask'
            onClick={this.handleClose}
          >
            <div
              className={classNames({
                'popup-content': true,
                'slideUp': true,
                'slide-in-from-bottom': !this.state.showHideAnimation,
                'slide-out-to-bottom': this.state.showHideAnimation
              })}
              onClick={this.handleContentClicked}
            >
              <div className="popup-content-header clearfix">
                <div
                  className="popup-content-header-left"
                  onClick={this.handleCancel}
                >
                  取消
                </div>
                <div className="popup-content-header-center">
                  {this.props.title}
                </div>
                <div
                  className="popup-content-header-right"
                  onClick={this.handleSubmit}
                >
                  确定
                </div>
              </div>
              {React.Children.map(this.props.children, (child) => {
                return React.cloneElement(
                  child,
                  {
                    onClose: this.handleClose
                  }
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default PopPanel;
