/**
 * 使用json-schema的表单组件xform
 * @props: env（指定xform组件当前运行的环境，dev表示开发环境、daily表示日常环境、pre表示预发环境、prod表示生产环境；默认值为生产环境） formContext（表单上下文属性，传入的属性自定义字段可以通过this.props.formContext获取到） popupContainer（xform组件内部使用的popup渲染的根节点，默认为xform组件的Root Element） formItemLayout（表单field的layout设置） labelType（表单的label与表单元素的排列方式，默认为并排排列） labelAlign（表单的label对齐方式，默认右对齐） defaultSubmitButton（表单是否使用默认的提交操作按钮，在将xform作为某业务表单中的一部分的场景下设置为false，如果直接使用默认提交设置为true） alignType（表单对齐方式：vertical表示垂直对齐，inline表示水平对齐） itemNumberInRow（在inline的对齐方式下，可以设置一行放几个field） noLabel（表单不包含label） disabled（是否设置表单各项为禁用状态） readonly（是否设置表单各项为只读态） validation（表单校验的方法，允许传入一个自定义校验方法，组件不会中断标单提交，需要业务自行实现） beforeDataSourceFetch（在数据源请求执行之前注入的方法，会传入数据源code，当前的formData和bizData作为参数） formCode（表单的formCode，根据formCode可以自动获取表单相应的信息渲染出来表单） customGateway（自定义网关） customInterfaces（自定义服务端请求配置） mockInterfaces(自定义接口mock数据的配置) customUploadRequest（自定义上传方法，指定后则不会走默认的xform的OSS上传） jsonSchema（描述表单的jsonSchema） uiSchema（描述表单的uiSchema） formData（描述表单初始数据的formData） bizData（描述表单的业务属性，这部分数据组件不做处理，只做传递，任何与表单的字段相关的业务属性均存储在这里，不能放置到jsonSchema中，防止污染） sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） className（表单的自定义class值） onImagePreview（表单中图片预览处理器，默认是新窗口打开图片url地址的处理方式） onload（表单onload处理器，会传入初始的formData和bizData作为参数） onError（将组件catch的错误上报） onChange（表单change处理器，会传入formData和bizData作为参数） onSubmit（表单submit处理器，会传入formData和bizData作为参数）
 * @states: bizCode（xform使用场景的bizCode，图片上传等场景用来区分上传到的图片域） sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） jsonSchema（描述表单的jsonSchema） uiSchema（uiSchema中的ui:options字段里面会包含表单的校验状态，联动状态，数据源状态等） formData（描述表单初始数据的formData） bizData（描述表单字段的业务属性） customInterfacesParams（自定义服务端请求配置自定义参数，会merge到对应的customInterfaces接口中）
 */

import './index.less';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, message} from 'antd';
import classnames from 'classnames';

import XFormCore from 'scalable-form-core';
import localeMessagesWrapper from './localeHOC';
import {getMessageId} from './i18n/localeMessages';
import TreeSelect from './xformTreeSelectWidget';
import MultiTreeSelect from './xformMultiTreeSelectWidget';
import CustomSelect from './xformSelectWidget';
import CustomMultiSelect from './xformMultiSelectWidget';
import CustomSuggestSelect from './xformSuggestSelectWidget';
import CustomBaseInput from './xformInputWidget';
import CustomTextarea from './xformTextareaWidget';
import CustomInputNumber from './xformNumberWidget';
import CustomDatePicker from './xformDatePickerWidget';
import CustomDateTimePicker from './xformDateTimePickerWidget';
import CustomDateRangePicker from './xformDateRangePickerWidget';
import CustomRichText from './xformRichTextWidget';
import CustomRadio from './xformRadioWidget';
import CustomCheckbox from './xformCheckboxWidget';
import CustomBooleanCheckbox from './xformBooleanCheckboxWidget';
import CustomSwitch from './xformSwitchWidget';
import CustomUpload from './xformUploadWidget';
import CustomTag from './xformTagWidget';
import CustomLabel from './xformLabelWidget';
import CustomGroup from './xformGroupWidget';
import CustomRate from './xformRateWidget';
import CustomSlider from './xformSliderWidget';
import CustomSliderRange from './xformSliderRangeWidget';
import CustomCascader from './xformCascaderWidget';
import CustomFieldTemplate from './templates/customFieldTemplate';
import CustomArrayFieldTemplate from './templates/customArrayFieldTemplate';
import Logger from './logger';

const customWidgets = {
    treeSelect: TreeSelect,
    multiTreeSelect: MultiTreeSelect,
    SelectWidget: CustomSelect,
    multiSelect: CustomMultiSelect,
    suggestSelect: CustomSuggestSelect,
    TextWidget: CustomBaseInput,
    TextareaWidget: CustomTextarea,
    UpDownWidget: CustomInputNumber,
    DateWidget: CustomDatePicker,
    DateTimeWidget: CustomDateTimePicker,
    dateRange: CustomDateRangePicker,
    RadioWidget: CustomRadio,
    CheckboxesWidget: CustomCheckbox,
    CheckboxWidget: CustomBooleanCheckbox,
    FileWidget: CustomUpload,
    cascader: CustomCascader,
    slider: CustomSlider,
    sliderRange: CustomSliderRange,
    switch: CustomSwitch,
    tag: CustomTag,
    label: CustomLabel,
    group: CustomGroup,
    rate: CustomRate,
    richtext: CustomRichText
};

const customFields = {};

class XForm extends Component {

    static propTypes = {
        env: PropTypes.oneOf(['dev', 'prod']),
        messages: PropTypes.object.isRequired,
        formContext: PropTypes.object,
        popupContainer: PropTypes.func,
        formCode: PropTypes.string,
        customGateway: PropTypes.object,
        mockInterfaces: PropTypes.shape({
            dataSourceServerUrl: PropTypes.any,
            getSchemaByCode: PropTypes.any,
            serverCheck: PropTypes.any
        }),
        customInterfaces: PropTypes.shape({
            dataSourceServerUrl: PropTypes.any,
            getSchemaByCode: PropTypes.any,
            serverCheck: PropTypes.any
        }),
        customInterfacesParams: PropTypes.shape({
            dataSourceServerUrl: PropTypes.object,
            getSchemaByCode: PropTypes.object,
            serverCheck: PropTypes.object
        }),
        customUploadRequest: PropTypes.func,
        jsonSchema: PropTypes.object,
        uiSchema: PropTypes.object,
        formData: PropTypes.object,
        bizData: PropTypes.object,
        formItemLayout: PropTypes.shape({
            labelCol: PropTypes.shape({span: PropTypes.number}),
            wrapperCol: PropTypes.shape({span: PropTypes.number})
        }),
        className: PropTypes.string,
        noLabel: PropTypes.bool,
        defaultSubmitButton: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        labelType: PropTypes.oneOf(['vertical', 'inline']),
        labelAlign: PropTypes.oneOf(['left', 'right']),
        alignType: PropTypes.oneOf(['vertical', 'inline']),
        itemNumberInRow: PropTypes.number,
        sequence: PropTypes.array,
        beforeSchemaFetch: PropTypes.func,
        beforeDataSourceFetch: PropTypes.func,
        beforeServerCheck: PropTypes.func,
        registerWidgets: PropTypes.object,
        registerFields: PropTypes.object,
        registerFieldTemplate: PropTypes.element,
        registerArrayFieldTemplate: PropTypes.element,
        registerObjectFieldTemplate: PropTypes.element,
        validation: PropTypes.func,
        onImagePreview: PropTypes.func,
        onload: PropTypes.func,
        onError: PropTypes.func,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        env: 'prod',
        formContext: {},
        formCode: '',
        formItemLayout: {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        },
        className: '',
        noLabel: false,
        defaultSubmitButton: false,
        disabled: false,
        readonly: false,
        labelType: 'inline',
        labelAlign: 'right',
        alignType: 'vertical',
        itemNumberInRow: 2,
        beforeSchemaFetch: function() { return {}; },
        beforeDataSourceFetch: function() { return {}; },
        beforeServerCheck: function() { return {}; },
        registerWidgets: {},
        registerFields: {},
        registerFieldTemplate: null,
        registerArrayFieldTemplate: null,
        registerObjectFieldTemplate: null,
        validation: function() {return true;},
        onImagePreview: function(url) {window.open(url)},
        onload: function() {},
        onChange: function() {},
        onSubmit: function() {}
    };

    constructor(props) {
        super(props);
        this.getWrappedInstance = this.getWrappedInstance.bind(this);
        this.XFormSubmit = this.XFormSubmit.bind(this);
        this.XFormInitFormData = this.XFormInitFormData.bind(this);
        this.XFormReset = this.XFormReset.bind(this);
        this.XFormSetFormData = this.XFormSetFormData.bind(this);
        this.XFormCurrentFormData = this.XFormCurrentFormData.bind(this);
        this.XFormBizData = this.XFormBizData.bind(this);
        this.XFormValidate = this.XFormValidate.bind(this);
        this.XFormValidateSync = this.XFormValidateSync.bind(this);
        this.XFormFetchAllFromDataSource = this.XFormFetchAllFromDataSource.bind(this);
        this.XFormFetchFromDataSource = this.XFormFetchFromDataSource.bind(this);
        this.xform = null;
        const logEvent = props.logEvent || (() => {});
        this.logger = new Logger(logEvent);
    }

    componentDidCatch(error, info) {
        const {onError} = this.props;
        if (typeof onError === 'function') {
            onError(error, info);
        }
        console.error('[xform] error', error);
    }

    getWrappedInstance() {
        return this.xform;
    }

    XFormSubmit() {
        this.getWrappedInstance().XFormSubmit();
    }

    XFormInitFormData() {
        return this.getWrappedInstance().XFormInitFormData();
    }

    XFormReset() {
        this.getWrappedInstance().XFormReset();
    }

    XFormSetFormData(...args) {
        this.getWrappedInstance().XFormSetFormData(...args);
    }

    XFormCurrentFormData() {
        return this.getWrappedInstance().XFormCurrentFormData();
    }

    XFormBizData() {
        return this.getWrappedInstance().XFormBizData();
    }

    XFormValidate(...args) {
        this.getWrappedInstance().XFormValidate(...args);
    }

    XFormValidateSync() {
        return this.getWrappedInstance().XFormValidateSync();
    }

    XFormFetchAllFromDataSource() {
        this.getWrappedInstance().XFormFetchAllFromDataSource();
    }

    XFormFetchFromDataSource(...args) {
        this.getWrappedInstance().XFormFetchFromDataSource(...args);
    }

    render() {
        const {env, messages, formContext, registerWidgets, registerFields, registerFieldTemplate, registerArrayFieldTemplate, registerObjectFieldTemplate, formItemLayout, bizCode, customGateway, customInterfaces, mockInterfaces, customInterfacesParams, customUploadRequest, alignType, labelType, labelAlign, itemNumberInRow, className, validation, onImagePreview, noLabel, defaultSubmitButton} = this.props;
        const defaultSubmitBtn = (
            <Button
                className="xform-submit-button"
                type="primary"
                htmlType="submit"
            >{messages[getMessageId('xformDefaultSubmitButtonLabel')]}</Button>
        );

        return (
            <XFormCore
                {...this.props}
                ref={(xform) => {
                    this.xform = xform;
                }}
                validation={(formData, bizData) => {
                    // 在提交校验前增加对图片/文件上传状态的强制校验，如果图片上传中或图片上传失败，提示[图片上传中，请稍后提交]
                    let uploadFields = [], imageUploadFields = [];
                    let fieldName, fieldFormData, fieldBizData;
                    let pass = validation(formData, bizData);
                    for (fieldName in formData) {
                        if (formData.hasOwnProperty(fieldName)) {
                            fieldFormData = formData[fieldName];
                            fieldBizData = bizData[fieldName];

                            if (fieldBizData && (fieldBizData.type === 'file' || fieldBizData.type === 'upload')) {
                                uploadFields.push(fieldFormData);
                            }

                            if (fieldBizData && (fieldBizData.type === 'upload')) {
                                imageUploadFields.push(fieldFormData);
                            }
                        }
                    }

                    // 检测是否有“上传中”的图片或文件，如果有不让上传
                    uploadFields.map((uploadField) => {
                        uploadField.map((uploadFieldItem) => {
                            const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                            const ext = uploadFieldItem.name.slice(uploadFieldItem.name.lastIndexOf('.') + 1).toLowerCase();
                            // 判断上传文件的扩展名是否在黑名单中
                            if (blacklistExts.indexOf(ext) > -1) {
                                message.error(messages[getMessageId('xformUploaderFileCheckMessage')], 10);
                                pass = false;
                            }

                            if (uploadFieldItem.status === 'uploading') {
                                message.error(messages[getMessageId('xformUploaderUploadingStatusCheckMessage')], 10);
                                pass = false;
                            } else if (uploadFieldItem.status === 'error') {
                                message.error(messages[getMessageId('xformUploaderErrorStatusCheckMessage')], 10);
                                pass = false;
                            }
                        });
                    });

                    // 检测是否有上传的不是图片类型的文件（根据文件后缀判断）
                    imageUploadFields.map((uploadField) => {
                        uploadField.map((uploadFieldItem) => {
                            const imageExts = ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp', 'jfif'];
                            const ext = uploadFieldItem.name.slice(uploadFieldItem.name.lastIndexOf('.') + 1).toLowerCase();
                            if (imageExts.indexOf(ext) <= -1) {
                                message.error(messages[getMessageId('xformUploaderImageFileCheckMessage')], 10);
                                pass = false;
                            }
                        });
                    });

                    return pass;
                }}
                xtrackerCode="xform"
                defaultSubmitButtonComponent={defaultSubmitBtn}
                widgets={Object.assign({}, customWidgets, registerWidgets)}
                fields={Object.assign({}, customFields, registerFields)}
                fieldTemplate={registerFieldTemplate !== null ? registerFieldTemplate : CustomFieldTemplate}
                arrayFieldTemplate={registerArrayFieldTemplate !== null ? registerArrayFieldTemplate : CustomArrayFieldTemplate}
                ObjectFieldTemplate={registerObjectFieldTemplate !== null ? registerObjectFieldTemplate : undefined}
                formContext={{
                    ...formContext,
                    ...formItemLayout,
                    env,
                    messages,
                    bizCode,
                    customGateway,
                    customInterfaces,
                    mockInterfaces,
                    customInterfacesParams,
                    customUploadRequest,
                    alignType,
                    labelType,
                    labelAlign,
                    itemNumberInRow,
                    onImagePreview,
                    logger: this.logger
                }}
                className={classnames({
                    'xform-wrapper': true,
                    'xform-antd-wrapper': true,
                    'xform-action-hidden': !defaultSubmitButton,
                    'xform-vertical': alignType === 'vertical',
                    'xform-inline': alignType === 'inline',
                    'xform-title-hidden': noLabel,
                    [className]: true
                })}
            >{this.props.children}</XFormCore>
        );
    }
}

export default localeMessagesWrapper(XForm);
