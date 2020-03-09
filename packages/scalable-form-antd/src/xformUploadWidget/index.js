/**
 * image/file upload widget
 * @props: formContext.customUploadRequest（自定义上传方法） value（值为fileList的数据结构）
 * @states: fileList（上传的文件的info，antd数据结构）
 * {
 *     uid: -1,
 *     name: 'xxx.png',
 *     status: 'done',
 *     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
 * }
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {message, Icon, Upload, Button, Tooltip, Popover} from 'antd';
import classnames from 'classnames';

import './index.less';
import {getMessageId} from '../i18n/localeMessages';

export default class CustomUploadWidget extends Component {
    constructor(props) {
        super(props);
        this.hubUrl = [];
        this.handleImageView = this.handleImageView.bind(this);
        this._customRequest = this._customRequest.bind(this);
        this._getUrlFormHub = this._getUrlFormHub.bind(this);
        this.state = {
            fileList: []
        };
    }

    componentDidMount() {
        const value = this._checkDataUniqueId(this.props.value);
        this.setState({
            fileList: value
        });
        // 初始更新ossUrlHub
        this.hubUrl = value.map((item) => {
            return {
                uid: item.uid,
                name: item.name,
                url: item.url
            };
        });
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'upload');
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
            const value = this._checkDataUniqueId(nextProps.value);
            this.setState({
                fileList: value
            });
            // 更新ossUrlHub
            this.hubUrl = value.map((item) => {
                return {
                    uid: item.uid,
                    name: item.name,
                    url: item.url
                };
            });
        }
    }

    // 示例图片、上传图片预览
    handleImageView(url) {
        const {formContext} = this.props;
        const {onImagePreview} = formContext;
        if (typeof url !== 'string') {
            return;
        }
        onImagePreview(url);
    }

    // 检查传入组件的数据中是不是有uid字段，如果没有uid，要默认生成一个uid
    _checkDataUniqueId(data) {
        const result = [];
        // 兼容判断，有些场景初始value写的是‘’
        if (Array.isArray(data)) {
            data.map((dataItem) => {
                if (typeof dataItem.uid !== 'undefined') {
                    result.push(dataItem);
                } else {
                    dataItem.uid = 'rc-upload-' + randomString();
                    result.push(dataItem);
                }
            });
            return result;
        } else {
            return result;
        }
    }

    // 自定义图片上传request（定制上传aliyun OSS用）
    _customRequest(option) {
        const {formContext} = this.props;
        const {customUploadRequest} = formContext;

        // 是否指定了自定义上传，如果没有则使用内置的OSS上传
        if (typeof customUploadRequest === 'function') {
            customUploadRequest(option.file, (url) => {
                const {onChange} = this.props;
                const {fileList} = this.state;
                let fieldFormData;
                this.hubUrl = this.hubUrl.filter((item) => {
                    return item.uid !== option.file.uid;
                });
                this.hubUrl.push({
                    name: option.file.name,
                    uid: option.file.uid,
                    url
                });
                fieldFormData = fileList.map((file) => {
                    return {
                        name: file.name,
                        uid: file.uid,
                        status: file.status,
                        url: this._getUrlFormHub(file)
                    };
                });
                this.setState({
                    fileList: fieldFormData
                });
                // 这个会将传入的值放到Upload组件的file.response里面
                option.onSuccess(url);
                onChange(fieldFormData);
            }, (e) => {
                option.onError(e);
            });
        } else {
            console.warn('[xform]: customUploadRequest props need to be configured before using image/file upload. For more detail, please see customUpload props in Upload component in ant design project');
            const logger = this.props.formContext.logger;
            logger.logException('xform.noCustomUploadRequestProps', false);
        }
    }

    _getUrlFormHub(file) {
        let result = '';
        const uid = file.uid;
        this.hubUrl.map((hubItem) => {
            if (hubItem.uid === uid) {
                result = hubItem.url;
            }
        });
        return result;
    }

    _getValidateMessage(errorType, validate) {
        let errorMessage = '';
        validate.map((validateItem) => {
            if (validateItem.type === errorType) {
                errorMessage = validateItem.message;
                return false;
            }
        });
        return errorMessage;
    }

    render() {
        const {fileList} = this.state;
        const messages = this.props.formContext && this.props.formContext.messages;
        let schema = this.props.schema;
        let options = this.props.options,
            disabled = this.props.disabled,
            onChange = this.props.onChange;

        // templateFileUrl表示配置的模板地址，如果该字段非空字符串，则在提交按钮右侧展示“模板”；exampleImageUrl表示配置的示例图片，如果该字段非空字符串，则在字段下面展示“示例图片”
        let {_errorType, validate, label, uploadType, vertical, listType, templateFileUrl, exampleImageUrl, ...otherOptions} = options;
        let maxFileNum = schema.maxFileNum || Infinity;
        let maxFileSize = schema.maxFileSize || Infinity;
        if (uploadType === 'picture') {
            vertical = true;
            listType = 'picture';
        } else if (uploadType === 'picture-inline') {
            vertical = false;
            listType = 'picture';
        } else if (uploadType === 'picture-card') {
            vertical = true;
            listType = 'picture-card';
        } else {
            vertical = false;
            listType = 'text';
        }
        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        _errorType = _errorType || '';
        if (_errorType !== '' && typeof validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, validate);
        }

        const uploader = (
            <Upload
                multiple
                disabled={disabled}
                customRequest={this._customRequest}
                withCredentials
                beforeUpload={(file, fileList) => {
                    const filename = file.name;
                    const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                    const current = this.state.fileList;
                    const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

                    // 文件的扩展名不能在黑名单里
                    if (blacklistExts.indexOf(ext) > -1) {
                        message.error(messages[getMessageId('xformUploaderFileCheckMessage')]);
                        return false;
                    }

                    // 文件数量不能超出最大限制
                    if (fileList.length + current.length > maxFileNum) {
                        message.error(messages[getMessageId('xformMaxFileNumErrorTip')]);
                        return false;
                    }
                    // 文件大小不能超过配置
                    if (file.size > maxFileSize * 1024 * 1024) {
                        message.error(file.name + messages[getMessageId('xformMaxFileSizeErrorTip')] + maxFileSize + 'M');
                        return false;
                    }
                    return true;
                }}
                onChange={(info) => {
                    const current = this.state.fileList;
                    let fileList = info.fileList;
                    let file = info.file;
                    const filename = file.name;
                    const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                    const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

                    if (info.file.status === 'error') {
                        message.error(info.file.name + messages[getMessageId('xformUploadErrorTip')]);
                    }
                    // 文件数量不能超出最大限制
                    // 文件大小不能超过配置
                    // 文件扩展名不能在黑名单里
                    if ((fileList.length > maxFileNum) ||
                    (file.size > maxFileSize * 1024 * 1024) ||
                    (blacklistExts.indexOf(ext) > -1)) {

                        this.setState({
                            fileList: current
                        });
                    } else {
                        this.setState({
                            fileList
                        });
                    }
                }}
                onRemove={(file) => {
                    // 如果是字段禁用状态，不允许删除
                    if (disabled) {
                        return false;
                    }
                    const {fileList} = this.state;
                    const filterFileList = fileList.filter((fileItem) => {
                        return file.uid !== fileItem.uid;
                    });
                    this.setState({
                        fileList: filterFileList
                    });
                    // const submitFileList = filterFileList.filter((fileItem) => {
                    //     return !(fileItem.originFileObj);
                    // });
                    onChange(filterFileList);
                }}
                onPreview={(previewFile) => {
                    const fileList = this.state.fileList;
                    let url;
                    fileList.map((file) => {
                        if (file.uid === previewFile.uid) {
                            url = file.url;
                        }
                    });
                    this.handleImageView(url);
                }}
                fileList={fileList}
                listType={listType}
                {...otherOptions}
            >
                <Tooltip placement="top" title={messages[getMessageId('xformBatchUploadToolTip')]}>
                    <Button type="ghost" disabled={disabled}>
                        <Icon type="upload" />
                        {label || messages[getMessageId('xformBatchUploadDefaultLabel')]}
                    </Button>
                </Tooltip>
            </Upload>
        );

        let uploaderActionWrapper = '';
        if (typeof templateFileUrl !== 'undefined' && templateFileUrl.length > 0) {
            if (typeof exampleImageUrl !== 'undefined' && exampleImageUrl.length > 0) {
                uploaderActionWrapper = (
                    <div className="uploader-action-wrapper">
                        {uploader}
                        <a href={templateFileUrl[0].url} className="template-trigger-link" download={templateFileUrl[0].name}>{messages[getMessageId('xformFileTemplateLabel')]}</a>
                        <div className="example-pic-wrapper">
                            <p className="example-pic-trigger-label">{messages[getMessageId('xformExampleImageLabel')]}</p>
                            <Popover
                                content={(<img src={exampleImageUrl[0].url} onClick={() => {this.handleImageView(exampleImageUrl[0].url);}} />)}
                                overlayClassName="xform-custom-uploader-popover"
                                arrowPointAtCenter
                            >
                                <img className="example-pic-trigger" src={exampleImageUrl[0].url} onClick={() => {this.handleImageView(exampleImageUrl[0].url);}} />
                            </Popover>
                        </div>
                    </div>
                );
            } else {
                uploaderActionWrapper = (
                    <div className="uploader-action-wrapper">
                        {uploader}
                        <a href={templateFileUrl[0].url} className="template-trigger-link" download={templateFileUrl[0].name}>{messages[getMessageId('xformFileTemplateLabel')]}</a>
                    </div>
                );
            }

        } else {
            if (typeof exampleImageUrl !== 'undefined' && exampleImageUrl.length > 0) {
                uploaderActionWrapper = (
                    <div className="uploader-action-wrapper">
                        {uploader}
                        <div className="example-pic-wrapper">
                            <p className="example-pic-trigger-label">{messages[getMessageId('xformExampleImageLabel')]}</p>
                            <Popover
                                content={(<img src={exampleImageUrl[0].url} onClick={() => {this.handleImageView(exampleImageUrl[0].url);}} />)}
                                overlayClassName="xform-custom-uploader-popover"
                                arrowPointAtCenter
                            >
                                <img className="example-pic-trigger" src={exampleImageUrl[0].url} onClick={() => {this.handleImageView(exampleImageUrl[0].url);}} />
                            </Popover>
                        </div>
                    </div>
                );
            } else {
                uploaderActionWrapper = (
                    <div className="uploader-action-wrapper">
                        {uploader}
                    </div>
                );
            }
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-uploader': true,
                'upload-list-inline': !vertical,
                'has-error': _errorType !== ''
            })}>
                {uploaderActionWrapper}
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}

/**
 * generate random string with length of len
 * @param len
 */
function randomString(len) {
    len = len || 16;
    const $firstChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';  /* first chars */
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /* remove confused chars such as oOLl,9gq,Vv,Uu,I1 */
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        if (i === 0) {
            pwd += $firstChars.charAt(Math.floor(Math.random() * $firstChars.length));
        } else {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
    }
    return pwd;
}
