/**
 * 自定义类型表单配置form的schema（对于不同的自定义类型的表单，可能会有不同的自定义字段属性设置）
 */
import InitSchema from '../schema/InitSchema';
import { Locale, WidgetKey } from 'scalable-form-tools';
import LanguagePack from 'scalable-form-tools/src/locale/LanguagePack';
import localMessages from '../localMessages';
import getMessageByKey from 'scalable-form-tools/src/locale/getMessageByKey';
import LabelWidgetSchema from '../schema/LabelWidgetSchema';
import GroupWidgetSchema from '../schema/GroupWidgetSchema';
import TextWidgetSchema from '../schema/TextWidgetSchema';
import TextareaWidgetSchema from '../schema/TextareaWidgetSchema';
import NumberWidgetSchema from '../schema/NumberWidgetSchema';
import RateSchemaSchema from '../schema/RateSchemaSchema';
import SliderWidgetSchema from '../schema/SliderWidgetSchema';
import SliderRangeWidgetSchema from '../schema/SliderRangeWidgetSchema';
import RadioWidgetSchema from '../schema/RadioWidgetSchema';
import CheckboxWidgetSchema from '../schema/CheckboxWidgetSchema';
import BooleanCheckboxWidgetSchema from '../schema/BooleanCheckboxWidgetSchema';
import BooleanSwitchWidgetSchema from '../schema/BooleanSwitchWidgetSchema';
import AnonymousWidgetSchema from '../schema/AnonymousWidgetSchema';
import PictureWidgetSchema from '../schema/PictureWidgetSchema';
import SelectWidgetSchema from '../schema/SelectWidgetSchema';
import MultiSelectWidgetSchema from '../schema/MultiSelectWidgetSchema';
import DatePickerWidgetSchema from '../schema/DatePickerWidgetSchema';
import DateTimePickerWidgetSchema from '../schema/DateTimePickerWidgetSchema';
import DateRangePickerWidgetSchema from '../schema/DateRangePickerWidgetSchema';
import ObjectFieldSchema from '../schema/ObjectFieldSchema';

type P<L extends WidgetKey> = {
  [K in L]?: InitSchema;
};

type InitSchemaPack = P<WidgetKey>;

export default function getInitSchema(widgetKey: WidgetKey, locale: Locale, languagePack: LanguagePack): InitSchema {
  function getMessage(key: string) {
    return getMessageByKey(key, locale, localMessages, languagePack);
  }

  const pack: InitSchemaPack = {
    [WidgetKey.LabelWidget]: LabelWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.GroupWidget]: GroupWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.TextWidget]: TextWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.TextareaWidget]: TextareaWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.NumberWidget]: NumberWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.RateWidget]: RateSchemaSchema.getInitSchema(getMessage),
    [WidgetKey.SliderWidget]: SliderWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.SliderRangeWidget]: SliderRangeWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.RadioWidget]: RadioWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.CheckboxWidget]: CheckboxWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.BooleanCheckboxWidget]: BooleanCheckboxWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.BooleanSwitchWidget]: BooleanSwitchWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.PictureWidget]: PictureWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.SelectWidget]: SelectWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.MultiSelectWidget]: MultiSelectWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.DatePickerWidget]: DatePickerWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.DateTimePickerWidget]: DateTimePickerWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.DateRangePickerWidget]: DateRangePickerWidgetSchema.getInitSchema(getMessage),
    [WidgetKey.ObjectField]: ObjectFieldSchema.getInitSchema(),
    [WidgetKey.AnonymousWidget]: AnonymousWidgetSchema.getInitSchema(),
  };
  return pack[widgetKey] || AnonymousWidgetSchema.getInitSchema();
}
