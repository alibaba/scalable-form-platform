/**
 * @file 富文本编辑器
 * @description 富文本编辑器, 依赖 react-quill 实现
 */

import React, { PureComponent, ComponentProps, ContextType } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { WidgetProps } from 'scalable-form-core';
import { LoggerContext } from 'scalable-form-tools';

import 'react-quill/dist/quill.snow.css';
import './index.less';
import { BaseFormContext } from '../types';

/* eslint-disable @typescript-eslint/indent */
// https://github.com/typescript-eslint/typescript-eslint/issues/1824
export type RichTextWidgetOptions = Pick<
  ComponentProps<typeof ReactQuill>,
  'id' | 'className' | 'theme' | 'tabIndex' | 'bounds' | 'scrollingContainer' | 'modules'
>;
/* eslint-enable @typescript-eslint/indent */

export type RichTextWidgetProps = WidgetProps<string, RichTextWidgetOptions, BaseFormContext>;

interface FakeSizeStyle {
  whitelist: string[];
}

interface RichTextWidgetState {
  htmlValue: string;
  preHtmlValue: string;
}

export default class RichTextWidget extends PureComponent<RichTextWidgetProps, RichTextWidgetState> {
  static contextType = LoggerContext;

  public state: RichTextWidgetState;

  private editor: Quill;

  private editorRef: ReactQuill;

  private sizeStyle: FakeSizeStyle;

  constructor(props: WidgetProps, context: ContextType<typeof LoggerContext>) {
    super(props, context);
    // 为编辑器设置内联样式的html模式
    this.sizeStyle = Quill.import('attributors/style/size');
    this.sizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
    Quill.register(this.sizeStyle, true);

    this.state = {
      htmlValue: props.value,
      // Updating state based on props
      // eslint-disable-next-line max-len
      // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#alternative-1-reset-uncontrolled-component-with-an-id-prop
      preHtmlValue: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps: RichTextWidgetProps, state: RichTextWidgetState) {
    const { value } = nextProps;
    const { preHtmlValue } = state;

    let partialState: Partial<RichTextWidgetState> = { preHtmlValue: value };

    if (value !== preHtmlValue) {
      partialState = { ...partialState, htmlValue: value };
    }

    return partialState;
  }

  componentDidMount() {
    const logger = this.context as ContextType<typeof LoggerContext>;
    if (typeof logger?.logWidgetPV === 'function') {
      logger.logWidgetPV('richtext');
    }
    this.editor.getModule('toolbar').addHandler('image', () => {
      this.uploadImage();
    });
  }

  render() {
    const { disabled, readonly, placeholder, options } = this.props;
    const { htmlValue } = this.state;
    const { theme = 'snow', modules, ...restOptions } = options;

    const customModules = this.customModulesToolbar(modules);

    return (
      <div className="ant-form-item-control xform-custom-widget xform-custom-richtext">
        <ReactQuill
          {...restOptions}
          ref={this.handleRef}
          theme={theme}
          value={htmlValue}
          readOnly={readonly || disabled}
          placeholder={placeholder}
          modules={customModules}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  private customModulesToolbar = (modules: RichTextWidgetOptions['modules']) => {
    const originToolbar = modules?.toolbar;
    let toolbar: any[] = [];
    if (Array.isArray(originToolbar)) {
      toolbar = [[{ size: this.sizeStyle.whitelist }], ...originToolbar];
    } else {
      toolbar = [
        [{ size: this.sizeStyle.whitelist }],
        [{ align: [] }, 'direction'],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'super' }, { script: 'sub' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ];
    }

    return { ...modules, toolbar };
  };

  private uploadImage() {
    const { formContext } = this.props;
    const { customUploadRequest } = formContext || {};
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files?.[0];
      if (typeof customUploadRequest !== 'function') {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn('Needs formContext.customUploadRequest for image upload.');
        }
        return;
      }
      // file type is only image.
      if (file && file.type.startsWith('image/')) {
        customUploadRequest(file).then((url: string) => {
          this.insertToEditor(url);
          return url;
        });
      } else if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('You could only upload images.');
      }
    };
  }

  /**
   * insert image url to rich editor.
   *
   * @param {string} url
   */
  private insertToEditor(url: string) {
    // push image url to rich editor.
    const range = this.editor.getSelection();
    this.editor.insertEmbed(range?.index || 0, 'image', url);
  }

  private handleRef = (instance: ReactQuill) => {
    this.editorRef = instance;

    if (typeof this.editorRef?.getEditor === 'function') {
      this.editor = this.editorRef.getEditor();
    }
  };

  private handleChange = (v: string) => {
    const { onChange } = this.props;
    this.setState({ htmlValue: v });
    typeof onChange === 'function' && onChange(v);
  };
}
