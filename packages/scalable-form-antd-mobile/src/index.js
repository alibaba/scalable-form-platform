/**
 * 使用json-schema的表单组件xform
 * @props: env（指定xform组件当前运行的环境，dev表示开发环境、daily表示日常环境、pre表示预发环境、prod表示生产环境；默认值为生产环境） formContext（表单上下文属性，传入的属性自定义字段可以通过this.props.formContext获取到） popupContainer（xform组件内部使用的popup渲染的根节点，默认为xform组件的Root Element） formItemLayout（表单field的layout设置） labelType（表单的label与表单元素的排列方式，默认为并排排列） labelAlign（表单的label对齐方式，默认右对齐） defaultSubmitButton（表单是否使用默认的提交操作按钮，在将xform作为某业务表单中的一部分的场景下设置为false，如果直接使用默认提交设置为true） alignType（表单对齐方式：vertical表示垂直对齐，inline表示水平对齐） itemNumberInRow（在inline的对齐方式下，可以设置一行放几个field） noLabel（表单不包含label） disabled（是否设置表单各项为禁用状态） readonly（是否设置表单各项为只读态） validation（表单校验的方法，允许传入一个自定义校验方法，组件不会中断标单提交，需要业务自行实现） beforeDataSourceFetch（在数据源请求执行之前注入的方法，会传入数据源code，当前的formData和bizData作为参数） formCode（表单的formCode，根据formCode可以自动获取表单相应的信息渲染出来表单） gateway（指定网关体系，默认值为buc网关） customGateway（自定义网关） customInterfaces（自定义服务端请求配置） mockInterfaces(自定义接口mock数据的配置) customUploadRequest（自定义上传方法，指定后则不会走默认的xform的OSS上传） jsonSchema（描述表单的jsonSchema） uiSchema（描述表单的uiSchema） formData（描述表单初始数据的formData） bizData（描述表单的业务属性，这部分数据组件不做处理，只做传递，任何与表单的字段相关的业务属性均存储在这里，不能放置到jsonSchema中，防止污染） sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） className（表单的自定义class值） onload（表单onload处理器，会传入初始的formData和bizData作为参数） onError（将组件catch的错误上报） onChange（表单change处理器，会传入formData和bizData作为参数） onSubmit（表单submit处理器，会传入formData和bizData作为参数）
 * @states: bizCode（xform使用场景的bizCode，图片上传等场景用来区分上传到的图片域） sequence（form的字段顺序设置，如果不设定该属性则按schema object的顺序） jsonSchema（描述表单的jsonSchema） uiSchema（uiSchema中的ui:options字段里面会包含表单的校验状态，联动状态，数据源状态等） formData（描述表单初始数据的formData） bizData（描述表单字段的业务属性）
 */

import './index.less';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import XFormCore from 'scalable-form-core';
import {Button, WingBlank, WhiteSpace, Toast} from 'antd-mobile';
import classnames from 'classnames';

import localeMessagesWrapper from './localeHOC';
import {getMessageId} from './i18n/localeMessages';
import TreeSelect from './xformTreeSelectWidget';
import CustomNumberInput from './xformNumberWidget';
import CustomGroup from './xformGroupWidget';
import CustomLabel from './xformLabelWidget';
import CustomDateRangePicker from './xformDateRangePickerWidget';
import CustomSelect from './xformSelectWidget';
import CustomBaseInput from './xformInputWidget';
import CustomTextarea from './xformTextareaWidget';
import CustomDatePicker from './xformDatePickerWidget';
import CustomDateTimePicker from './xformDateTimePickerWidget';
import CustomRadio from './xformRadioWidget';
import CustomCheckbox from './xformCheckboxWidget';
import CustomBooleanCheckbox from './xformBooleanCheckboxWidget';
import CustomSlider from './xformSliderWidget';
import CustomSliderRange from './xformSliderRangeWidget';
import CustomCascader from './xformCascaderWidget';
import CustomUpload from './xformUploadWidget';
import CustomFieldTemplate from './templates/customFieldTemplate';
import CustomObjectFieldTemplate from './templates/customObjectFieldTemplate';
import Logger from './logger';

const customWidgets = {
    treeSelect: TreeSelect,
    group: CustomGroup,
    label: CustomLabel,
    dateRange: CustomDateRangePicker,
    multiSelect: CustomCheckbox,
    UpDownWidget: CustomNumberInput,
    SelectWidget: CustomSelect,
    TextWidget: CustomBaseInput,
    TextareaWidget: CustomTextarea,
    DateWidget: CustomDatePicker,
    DateTimeWidget: CustomDateTimePicker,
    RadioWidget: CustomRadio,
    CheckboxesWidget: CustomCheckbox,
    CheckboxWidget: CustomBooleanCheckbox,
    FileWidget: CustomUpload,
    switch: CustomBooleanCheckbox,
    slider: CustomSlider,
    sliderRange: CustomSliderRange,
    cascader: CustomCascader
};

const customFields = {};


class XFormMobile extends Component {

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
        customUpload: PropTypes.func,
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
        this.xformMobile = null;
        const logEvent = props.logEvent || (() => {});
        this.logger = new Logger(logEvent);
    }

    componentDidCatch(error, info) {
        const {onError} = this.props;
        if (typeof onError === 'function') {
            onError(error, info);
        }
        console.error('[xform-mobile] error', error);
    }

    getWrappedInstance() {
        return this.xformMobile;
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
        const {env, messages, formContext, registerWidgets, registerFields, registerFieldTemplate, registerArrayFieldTemplate, registerObjectFieldTemplate, formItemLayout, bizCode, customGateway, customInterfaces, mockInterfaces, customInterfacesParams, customUpload, customUploadRequest, alignType, labelType, labelAlign, itemNumberInRow, className, validation, noLabel, defaultSubmitButton} = this.props;
        const defaultSubmitBtn = (
            <div className="xform-submit-button">\
                <WhiteSpace size="lg" />
                <WingBlank size="md">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >{messages[getMessageId('xformDefaultSubmitButtonLabel')]}</Button>
                </WingBlank>
                <WhiteSpace size="large" />
            </div>
        );

        return (
            <XFormCore
                {...this.props}
                ref={(xform) => {
                    this.xformMobile = xform;
                }}
                validation={(formData, bizData) => {
                    // 在提交校验前增加对图片/文件上传状态的强制校验，如果图片上传中或图片上传失败，提示[图片上传中，请稍后提交]
                    let uploadFields = [];
                    let fieldName, fieldFormData, fieldBizData;
                    let pass = validation(formData, bizData);
                    for (fieldName in formData) {
                        if (formData.hasOwnProperty(fieldName)) {
                            fieldFormData = formData[fieldName];
                            fieldBizData = bizData[fieldName];

                            if (fieldBizData && (fieldBizData.type === 'file' || fieldBizData.type === 'upload')) {
                                uploadFields.push(fieldFormData);
                            }
                        }
                    }
                    uploadFields.map((uploadField) => {
                        uploadField.map((uploadFieldItem) => {
                            if (uploadFieldItem.status === 'uploading') {
                                Toast.fail(messages[getMessageId('xformUploaderUploadingStatusCheckMessage')], 5);
                                pass = false;
                            } else if (uploadFieldItem.status === 'error') {
                                Toast.fail(messages[getMessageId('xformUploaderErrorStatusCheckMessage')], 5);
                                pass = false;
                            }
                        });
                    });
                    return pass;
                }}
                xtrackerCode="xform-mobile"
                defaultSubmitButtonComponent={defaultSubmitBtn}
                widgets={Object.assign({}, customWidgets, registerWidgets)}
                fields={Object.assign({}, customFields, registerFields)}
                fieldTemplate={registerFieldTemplate !== null ? registerFieldTemplate : CustomFieldTemplate}
                arrayFieldTemplate={registerArrayFieldTemplate !== null ? registerArrayFieldTemplate : undefined}
                objectFieldTemplate={registerObjectFieldTemplate !== null ? registerObjectFieldTemplate : CustomObjectFieldTemplate}
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
                    customUpload,
                    customUploadRequest,
                    alignType,
                    labelType,
                    labelAlign,
                    itemNumberInRow,
                    logger: this.logger
                }}
                className={classnames({
                    'xform-wrapper': true,
                    'xform-antd-mobile-wrapper': true,
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

export default localeMessagesWrapper(XFormMobile);
