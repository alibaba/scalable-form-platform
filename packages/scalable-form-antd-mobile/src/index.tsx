import React, { PureComponent } from 'react';
import ScalableFormCore, { ScalableFormCoreProps, Widget } from 'scalable-form-core';
import {
  defaultLogFunc,
  Locale,
  LocaleContext,
  LogFunc,
  Logger,
  LoggerContext,
  UploadFile,
  defaultErrorHandler,
  ScalableFormError,
  ErrorCode,
  LanguagePack,
} from 'scalable-form-tools';
import classNames from 'classnames';
import _ from 'lodash';
import widgets from './widgets';
import { MobileFormContext } from './types';
import './index.less';
import SubmitButton from './SubmitButton';
import CustomFieldTemplate from './templates/CustomFieldTemplate';
import CustomObjectFieldTemplate from './templates/CustomObjectFieldTemplate';
import localMessages from './localMessages';

const languagePack: LanguagePack = require('../i18n');

interface XFormMobileProps<T> extends ScalableFormCoreProps {
  /**
   * 用户自定义class
   */
  className?: string;
  /**
   * 国际化Locale
   */
  locale?: Locale;
  /**
   * 用户定制事件log方法
   */
  logEvent?: LogFunc;
  /**
   * 点击图片上传按钮时触发，用户自定义获取图片逻辑，适用于移动端上需要调用sdk能力实现图片拍照的场景
   * @param {{maxFileNum: number maxFileSize: number currentFileNum: number}} params
   * @returns {Promise<string[]>} 返回上传成功后的文件url地址
   */
  customUpload?: (params: { maxFileNum: number; maxFileSize: number; currentFileNum: number }) => Promise<string[]>;
  /**
   * 用户自定义上传方法，返回上传成功后的文件url地址
   * @param {UploadFile[]} uploadFiles 上传二进制文件
   * @param {{maxFileNum: number maxFileSize: number currentFileNum: number}} options
   * @returns {Promise<string[]>} 返回上传成功后的文件url地址
   */
  customUploadRequest?: (
    uploadFiles: UploadFile[],
    options: {
      maxFileNum: number;
      maxFileSize: number;
      currentFileNum: number;
    },
  ) => Promise<string[]>;
  /**
   * 用户自定义扩展组件
   */
  registerWidgets?: Record<string, Widget>;

  /**
   * 用户自定义错误处理
   * @param {ScalableFormError} e
   */
  onError?: (e: ScalableFormError) => void;
}

export default class FormMobile extends PureComponent<XFormMobileProps<string>, any> {
  public static defaultProps = {
    logEvent: defaultLogFunc,
    locale: Locale.ZH_CN,
    customUpload: undefined,
    customUploadRequest: undefined,
    className: undefined,
    registerWidgets: {},
  };

  private readonly logger: Logger;

  private scalableFormInstance: ScalableFormCore;

  private readonly formContext: MobileFormContext;

  constructor(props: XFormMobileProps<string>) {
    super(props);
    this.logger = new Logger(props.logEvent || defaultLogFunc);
    this.formContext = {
      onAddImageClick: props.customUpload,
      customUploadRequest: props.customUploadRequest,
      onError: props.onError || defaultErrorHandler,
    };
  }

  componentDidCatch(error: Error) {
    const e = new ScalableFormError(ErrorCode.UI_ERROR, error);
    if (this.props.onError) {
      this.props.onError(e);
    } else {
      defaultErrorHandler(e);
    }
  }

  public submit = () => {
    return this.scalableFormInstance.submit();
  };

  public getData = () => {
    return this.scalableFormInstance.getData();
  };

  public validate = () => {
    return this.scalableFormInstance.validate();
  };

  private handleSubmitClicked = () => {
    this.submit();
  };

  render() {
    return (
      <LocaleContext.Provider
        value={{
          locale: this.props.locale || Locale.ZH_CN,
          languagePack,
          localMessages,
        }}
      >
        <LoggerContext.Provider value={this.logger}>
          <ScalableFormCore
            {...this.props}
            formContext={this.formContext}
            ref={(ref: ScalableFormCore) => {
              this.scalableFormInstance = ref;
            }}
            widgets={_.merge(widgets, this.props.registerWidgets)}
            className={classNames({
              'scalable-form-mobile-wrapper': true,
              [this.props.className || '']: true,
            })}
            FieldTemplate={this.props.FieldTemplate || CustomFieldTemplate}
            ObjectFieldTemplate={this.props.ObjectFieldTemplate || CustomObjectFieldTemplate}
          >
            {this.props.children || <SubmitButton onClick={this.handleSubmitClicked} />}
          </ScalableFormCore>
        </LoggerContext.Provider>
      </LocaleContext.Provider>
    );
  }
}

export * from './types';
