/**
 * 表单基本信息浮层（目前是标题和描述）
 * @props: visible（popover是否显示） formData（当前的配置数据） formDataChangeHandler（数据变换处理回调方法） visibleChangeHandler（popover的onVisibleChange处理器）
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Popover} from 'antd';
import XForm from 'scalable-form-antd';

import './index.less';
import {getMessageId} from '../../i18n/localeMessages';

export default class BaseFormConfigPopover extends PureComponent {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        popupContainer: PropTypes.func.isRequired,
        children: PropTypes.element.isRequired,
        visible: PropTypes.bool.isRequired,
        formData: PropTypes.shape({
            formTitle: PropTypes.string,
            formDesc: PropTypes.string
        }).isRequired,
        formDataChangeHandler: PropTypes.func.isRequired,
        visibleChangeHandler: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.renderPopoverContent = this.renderPopoverContent.bind(this);
    }

    renderPopoverContent() {
        const {messages, formData, formDataChangeHandler} = this.props;
        return (
            <div className="base-config-wrapper">
                <p className="popover-title">{messages[getMessageId('xformBaseConfigPopoverTitle')]}</p>
                <XForm
                    formItemLayout={{
                        labelCol: {span: 3},
                        wrapperCol: {span: 21}
                    }}
                    alignType="vertical"
                    onChange={(formData) => {
                        formDataChangeHandler(formData);
                    }}
                    jsonSchema={{
                        type: 'object',
                        title: '',
                        properties: {
                            formTitle: {
                                title: messages[getMessageId('xformBaseConfigFormTitleLabel')],
                                type: 'string',
                                maxLength: 20
                            },
                            formDesc: {
                                title: messages[getMessageId('xformBaseConfigFormDescLabel')],
                                type: 'string',
                                maxLength: 200
                            }
                        }
                    }}
                    uiSchema={{
                        formTitle: {
                            'ui:options': {
                                placeholder: messages[getMessageId('xformBaseConfigFormTitlePlaceholder')]
                            }
                        },
                        formDesc: {
                            'ui:widget': 'textarea',
                            'ui:options': {
                                placeholder: messages[getMessageId('xformBaseConfigFormDescPlaceholder')]
                            }
                        }
                    }}
                    formData={{...formData}}
                />
            </div>
        );
    }

    render() {
        const {children, visible, visibleChangeHandler, popupContainer} = this.props;
        return (
            <Popover
                title=""
                content={this.renderPopoverContent()}
                visible={visible}
                onVisibleChange={visibleChangeHandler}
                trigger="click"
                placement="bottomLeft"
                overlayClassName="app-xform-builder-base-config-popover"
                getPopupContainer={popupContainer}
            >
                {children}
            </Popover>
        );
    }

}
