/**
 * 编辑器顶部操作栏：更多功能浮层组件
 * @props: visible（popover是否显示） formDataSourceList(表单数据源列表数据) formData（当前更多功能数据，当前的配置项数据为： {
    codeEditable: false,    // 是否允许查看和编辑字段Code
    fieldPreviewable: false // 是否允许字段预览
}, 存储在localStorage中） formDataChangeHandler（更多功能数据更新处理回调方法） moreFunctionVisibleChangeHandler（popover的onVisibleChange处理器） viewSchemaClickHandler（点击查看Schema的回调方法）
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Popover, Button} from 'antd';
import XForm from 'scalable-form-antd';
import './index.less';
import {getMessageId} from '../../i18n/localeMessages';

export default function MoreFunctionPopover(props) {
    const {messages, children, visible, formDataSourceList, customUploadRequest, formData, formDataChangeHandler, moreFunctionVisibleChangeHandler, viewSchemaClickHandler, onDetectSuccess, componentRecognize, popupContainer} = props;

    const uploadRequest = (file, onSuccess, onError) => {
        if (customUploadRequest) {
            customUploadRequest(file, (url) => {
                if (url && componentRecognize && componentRecognize.enable && componentRecognize.recognize) {
                    componentRecognize.recognize(url)
                        .then((schema) => {
                            console.warn('recognize success and get schema, ', schema);
                            onSuccess(url);
                            onDetectSuccess(schema);
                        });
                } else {
                    onSuccess(url);
                }
            }, onError);
        }
    };
    const jsonSchema = {
        type: 'object',
        title: '',
        properties: {
            codeEditable: {
                title: messages[getMessageId('xformMoreFunctionCodeView')],
                type: 'boolean',
                default: false
            },
            fieldPreviewable: {
                title: messages[getMessageId('xformMoreFunctionFieldPreview')],
                type: 'boolean',
                default: false
            },
            formDataSourceCode: {
                title: messages[getMessageId('xformMoreFunctionFormDataSource')],
                type: 'string',
                default: '',
                data: formDataSourceList
            }
        }
    };
    const uiSchema = {
        formDataSourceCode: {
            'ui:widget': 'select',
            'ui:help': messages[getMessageId('xformMoreFunctionFormDataSourceHelp')],
            'ui:placeholder': messages[getMessageId('configSchemaDataSourcePlaceholder')]
        }
    };
    if (componentRecognize && componentRecognize.enable) {
        jsonSchema.properties.crDetect = {
            type: "array",
            title: "智能识别",
            default: [],
            maxFileSize: 10,
            maxFileNum: 10,
            items: {
                "type": "string",
                "format": "data-url"
            },
            uniqueItems: true
        };
        uiSchema.crDetect = {
            'ui:options': {
                "label": "图片上传",
                "listType": "picture",
                "vertical": true,
                "accept": "image/*"
            },
            "ui:help": "<p>上传截图，生成可用的XForm表单</p>",
            "ui:disabled": false
        };
    }
    return (
        <Popover
            title=""
            content={(
                <div className="more-function-wrapper">
                    <XForm
                        formItemLayout={{
                            labelCol: {span: 6},
                            wrapperCol: {span: 18}
                        }}
                        alignType="vertical"
                        onChange={(formData) => {
                            formDataChangeHandler(formData);
                        }}
                        customUploadRequest={uploadRequest}
                        jsonSchema={jsonSchema}
                        uiSchema={uiSchema}
                        formData={{...formData}}
                        popupContainer={popupContainer}
                    />
                    <Button className="view-schema-button" type="default"
                            onClick={viewSchemaClickHandler}>{messages[getMessageId('xformSchemaViewButton')]}</Button>
                </div>
            )}
            visible={visible}
            onVisibleChange={moreFunctionVisibleChangeHandler}
            trigger="click"
            placement="bottomLeft"
            overlayClassName="app-xform-builder-more-function-popover"
            getPopupContainer={popupContainer}
        >
            {children}
        </Popover>
    );
}

MoreFunctionPopover.propTypes = {
    messages: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool.isRequired,
    formData: PropTypes.shape({
        codeEditable: PropTypes.bool.isRequired,
        fieldPreviewable: PropTypes.bool.isRequired
    }).isRequired,
    formDataChangeHandler: PropTypes.func.isRequired,
    moreFunctionVisibleChangeHandler: PropTypes.func.isRequired,
    viewSchemaClickHandler: PropTypes.func.isRequired,
    customUploadRequest: PropTypes.func.isRequired,
    componentRecognize: PropTypes.shape({
        enable: PropTypes.bool,
        recognize: PropTypes.func
    }),
    onDetectSuccess: PropTypes.func.isRequired,
    popupContainer: PropTypes.func.isRequired
};
