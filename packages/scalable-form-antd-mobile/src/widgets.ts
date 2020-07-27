import { Widget } from 'scalable-form-core';
import { WidgetKey } from 'scalable-form-tools';
import TextareaWidget from './TextareaWidget';
import BooleanCheckboxWidget from './BooleanCheckboxWidget';
import GroupWidget from './GroupWidget';
import LabelWidget from './LabelWidget';
import CheckboxWidget from './CheckboxWidget';
import NumberWidget from './NumberWidget';
import RadioWidget from './RadioWidget';
import InputWidget from './InputWidget';
import SliderWidget from './SliderWidget';
import SliderRangeWidget from './SliderRangeWidget';
import DateRangePickerWidget from './DateRangePickerWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import UploadWidget from './UploadWidget';
import SelectWidget from './SelectWidget';
import AnonymousWidget from './AnonymousWidget';

type P<L extends WidgetKey> = {
  [K in L]?: Widget<any, any>;
};

/**
 * 语言包数据结构
 */
type WidgetPack = P<WidgetKey>;

/**
 * 基于移动端的组件扩展
 */
const widgets: WidgetPack = {
  TextareaWidget,
  BooleanCheckboxWidget,
  [WidgetKey.BooleanSwitchWidget]: BooleanCheckboxWidget,
  GroupWidget,
  LabelWidget,
  RadioWidget,
  DatePickerWidget,
  DateTimePickerWidget,
  CheckboxWidget,
  NumberWidget,
  TextWidget: InputWidget,
  SliderWidget,
  SliderRangeWidget,
  DateRangePickerWidget,
  [WidgetKey.PictureWidget]: UploadWidget,
  [WidgetKey.SelectWidget]: SelectWidget,
  AnonymousWidget,
  MultiSelectWidget: CheckboxWidget,
};

export default widgets;
