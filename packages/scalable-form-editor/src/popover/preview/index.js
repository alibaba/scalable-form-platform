/**
 * 顶部基础操作栏：预览浮层组件
 * @props: visible(浮层是否可见) visibleChangeHandler(popover的onVisibleChange回调方法) formSchema（浮层内的schema数据） platform（预览的适配端，laptop：PC端、mobile：移动端、both：两者）
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Popover, Tabs, Button} from 'antd';
import XForm from 'scalable-form-antd';

import './index.less';
import {getMessageId} from '../../i18n/localeMessages';
import {util} from '../../common/util';

const {TabPane} = Tabs;

export default class PreviewModal extends PureComponent {
    static propTypes = {
        previewDomain: PropTypes.string.isRequired,
        namespace: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        visibleChangeHandler: PropTypes.func.isRequired,
        formSchema: PropTypes.object.isRequired,
        platform: PropTypes.oneOf(['laptop', 'mobile', 'both']).isRequired,
        messages: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
        popupContainer: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.renderPopoverContent = this.renderPopoverContent.bind(this);
        this.renderLaptopPreviewContent = this.renderLaptopPreviewContent.bind(this);
        this.renderMobilePreviewContent = this.renderMobilePreviewContent.bind(this);
        let initialPlatform = 'laptop';
        if (props.platform === 'mobile') {
            initialPlatform = 'mobile';
        }
        this.state = {
            current: initialPlatform   // 当前预览的端的类型
        };
    }

    handleTabChange(activeKey) {
        this.setState({
            current: activeKey
        });
    }

    renderPopoverContent() {
        const {messages, platform} = this.props;
        const {current} = this.state;
        switch (platform) {
            case 'laptop':
                return (
                    <div className="preview-wrapper">
                        {this.renderLaptopPreviewContent()}
                    </div>
                );
            case 'mobile':
                return (
                    <div className="preview-wrapper">
                        {this.renderMobilePreviewContent()}
                    </div>
                );
            case 'both':
                return (
                    <div className="preview-wrapper">
                        <Tabs activeKey={current} onChange={this.handleTabChange}>
                            <TabPane tab={messages[getMessageId('xformChangePlatformPCName')]} key="laptop">
                                {this.renderLaptopPreviewContent()}
                            </TabPane>
                            <TabPane tab={messages[getMessageId('xformChangePlatformMobileName')]} key="mobile">
                                {this.renderMobilePreviewContent()}
                            </TabPane>
                        </Tabs>
                    </div>
                );
            default:
                console.error('[xform-editor]platform属性值必须是laptop,mobile,both枚举值');
                return null;
        }

    }

    renderLaptopPreviewContent() {
        const {messages, formSchema, customInterfaces, customGateway, customUploadRequest, onImagePreview, registerWidgets, locale, popupContainer} = this.props;
        const xformCustomWidgets = util.getXFormCustomWidgets(registerWidgets);

        return <XForm
            customInterfaces={customInterfaces}
            customGateway={customGateway}
            customUploadRequest={customUploadRequest}
            onImagePreview={onImagePreview}
            labelType="vertical"
            popupContainer={popupContainer}
            registerWidgets={xformCustomWidgets}
            locale={locale}
            jsonSchema={formSchema.jsonSchema}
            uiSchema={formSchema.uiSchema}
            formData={formSchema.formData}
            bizData={formSchema.bizData}
            sequence={formSchema.sequence}
            onChange={(formData, bizData) => {
                console.log('预览表单的formData:', formData);
                console.log('预览表单的bizData:', bizData);
            }}
            onSubmit={(formData, bizData) => {
                console.log('提交表单的formData:', formData);
                console.log('提交表单的bizData:', bizData);
            }}
        >
            <Button
                htmlType="submit"
                type="primary"
            >
                {messages[getMessageId('xformPreviewSubmitButton')]}
            </Button>
        </XForm>
    }

    renderMobilePreviewContent() {
        const {namespace, previewDomain, formSchema} = this.props;
        const iframeId = `J_xform_preview_frame_${namespace}`;
        if (document.getElementById(iframeId)) {
            // 将schema通过postMessage发送给移动端预览页
            document.getElementById(iframeId).contentWindow.postMessage({
                type: 'update-xform-schema',
                schema: {
                    jsonSchema: formSchema.jsonSchema,
                    uiSchema: formSchema.uiSchema,
                    formData: formSchema.formData,
                    bizData: formSchema.bizData
                }
            }, '*');
        } else {
            return <div className="mobile-preview-demo-wrapper">
                <iframe src={`//${previewDomain}/clientform/editor-preview.html`} frameBorder={0} className="iframe" id={iframeId} onLoad={() => {
                    // 将schema通过postMessage发送给移动端预览页
                    document.getElementById(iframeId).contentWindow.postMessage({
                        type: 'update-xform-schema',
                        schema: {
                            jsonSchema: formSchema.jsonSchema,
                            uiSchema: formSchema.uiSchema,
                            formData: formSchema.formData,
                            bizData: formSchema.bizData
                        }
                    }, '*');
                }}></iframe>
            </div>
        }
    }

    render() {
        const {visible, visibleChangeHandler, popupContainer, children} = this.props;
        return (
            <Popover
                title=""
                content={this.renderPopoverContent()}
                visible={visible}
                onVisibleChange={visibleChangeHandler}
                trigger="click"
                placement="leftTop"
                overlayClassName="app-xform-builder-preview-popover"
                getPopupContainer={popupContainer}
            >
                {children}
            </Popover>
        );
    }
}
