import React, { PureComponent } from 'react';
import ScalableFormCore, { Widget } from 'scalable-form-core';

import './index.less';
import { ScalableFormAntdProps } from './types';
import CustomFieldTemplate from './templates/CustomFieldTemplate';
import CustomArrayFieldTemplateProps from './templates/CustomArrayFieldTemplate';
import TextWidget from './TextWidget';
import BooleanCheckboxWidget from './BooleanCheckboxWidget';
import CheckboxesWidget from './CheckboxesWidget';
import CascaderWidget from './CascaderWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import RichTextWidget from './RichTextWidget';
import AnonymousWidget from './AnonymousWidget';
import DateRangePickerWidget from './DateRangePickerWidget';
import GroupWidget from './GroupWidget';
import LabelWidget from './LabelWidget';
import SelectWidget from './SelectWidget';
import MultiSelectWidget from './MultiSelectWidget';
import TreeSelectWidget from './TreeSelectWidget';
import MultiTreeSelectWidget from './MultiTreeSelectWidget';
import NumberWidget from './NumberWidget';
import RadioWidget from './RadioWidget';
import RateWidget from './RateWidget';
import SliderWidget from './SliderWidget';
import SliderRangeWidget from './SliderRangeWidget';
import SuggestSelectWidget from './SuggestSelectWidget';
import SwitchWidget from './SwitchWidget';
import TextareaWidget from './TextareaWidget';
import TagWidget from './TagWidget';
import UploadWidget from './UploadWidget';
import { WidgetKey } from 'scalable-form-tools';

/**
 * TODO：
 * 1、表单校验，采用 jsonschema 的校验，会有一些坑，是否重写
 * 2、core 默认的 jsonschema 校验在给了 enum 配置项后，如果为空数组会报错
 * 3、core 默认的 jsonschema 校验在给了 enum 配置项后，如果 value 不是 enum 的枚举值，也会校验报错（针对 suggest-select 有坑)
 */

const customWidgets: Record<string, Widget> = {
  [WidgetKey.LabelWidget]: LabelWidget,
  [WidgetKey.RichTextWidget]: RichTextWidget,
  [WidgetKey.BooleanCheckboxWidget]: BooleanCheckboxWidget,
  [WidgetKey.BooleanSwitchWidget]: SwitchWidget,
  [WidgetKey.PictureWidget]: TextWidget,
  [WidgetKey.DatePickerWidget]: DatePickerWidget,
  [WidgetKey.DateTimePickerWidget]: DateTimePickerWidget,
  [WidgetKey.DateRangePickerWidget]: DateRangePickerWidget,
  [WidgetKey.AnonymousWidget]: AnonymousWidget,
  [WidgetKey.TextWidget]: TextWidget,
  [WidgetKey.CheckboxWidget]: BooleanCheckboxWidget,
  [WidgetKey.GroupWidget]: GroupWidget,
  [WidgetKey.SelectWidget]: SelectWidget,
  [WidgetKey.MultiSelectWidget]: MultiSelectWidget,
  [WidgetKey.NumberWidget]: NumberWidget,
  [WidgetKey.RadioWidget]: RadioWidget,
  [WidgetKey.RateWidget]: RateWidget,
  [WidgetKey.SliderWidget]: SliderWidget,
  [WidgetKey.SliderRangeWidget]: SliderRangeWidget,
  [WidgetKey.TextareaWidget]: TextareaWidget,
  UploadWidget,
  CheckboxesWidget,
  CascaderWidget,
  TreeSelectWidget,
  MultiTreeSelectWidget,
  SuggestSelectWidget,
  SwitchWidget,
  TagWidget,
};

class ScalableFormAntd extends PureComponent<ScalableFormAntdProps> {
  render() {
    return (
      <ScalableFormCore
        {...this.props}
        widgets={{
          ...customWidgets,
          ...(this.props.widgets || {})
        }}
        FieldTemplate={this.props.FieldTemplate || CustomFieldTemplate}
        ArrayFieldTemplate={this.props.ArrayFieldTemplate || CustomArrayFieldTemplateProps}
      >
        {this.props.children}
      </ScalableFormCore>
    );
  }
}

export default ScalableFormAntd;

export * from './types';
