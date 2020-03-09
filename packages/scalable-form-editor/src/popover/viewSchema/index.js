/**
 * 查看Schema浮层组件
 * @props: visible(浮层是否可见) modalCloseHandler(关闭浮层回调方法) formSchema（浮层内的schema数据）
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Input, Button, message} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

import './index.less';
import {getMessageId} from '../../i18n/localeMessages';

const {TextArea} = Input;

export default function ViewSchemaModal(props) {
    const {messages, visible, modalCloseHandler, formSchema, popupContainer} = props;
    return (
        <Modal
            visible={visible}
            title={messages[getMessageId('xformSchemaModalTitle')]}
            width={600}
            wrapClassName="app-xform-builder-view-schema-modal"
            onCancel={() => {
                modalCloseHandler()
            }}
            footer={([
                <CopyToClipboard
                    text={JSON.stringify(formSchema, undefined, 4)}
                    onCopy={() => {
                        message.success(messages[getMessageId('xformSchemaModalCopySuccessTip')]);
                    }}
                >
                    <Button
                        type="default"
                    >
                        {messages[getMessageId('xformSchemaModalCopy')]}
                    </Button>
                </CopyToClipboard>,
                <Button
                    type="default"
                    onClick={() => {
                        modalCloseHandler();
                    }}
                >
                    {messages[getMessageId('xformSchemaModalCancel')]}
                </Button>
            ])}
            getContainer={popupContainer}
        >
            <TextArea
                rows={10}
                readOnly
                value={JSON.stringify(formSchema, undefined, 4)}
            />
        </Modal>
    );
}

ViewSchemaModal.propTypes = {
    messages: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    modalCloseHandler: PropTypes.func.isRequired,
    formSchema: PropTypes.object.isRequired,
    popupContainer: PropTypes.func.isRequired
};
