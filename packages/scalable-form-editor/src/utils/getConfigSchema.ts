import ConfigSchema from '../schema/ConfigSchema';
import { Locale, WidgetKey } from 'scalable-form-tools';
import LanguagePack from 'scalable-form-tools/src/locale/LanguagePack';
import getMessageByKey from 'scalable-form-tools/src/locale/getMessageByKey';
import localMessages from '../localMessages';
import LabelWidgetSchema from '../schema/LabelWidgetSchema';
import GroupWidgetSchema from '../schema/GroupWidgetSchema';
import TextWidgetSchema from '../schema/TextWidgetSchema';
import TextareaWidgetSchema from '../schema/TextareaWidgetSchema';
import NumberWidgetSchema from '../schema/NumberWidgetSchema';
import SliderWidgetSchema from '../schema/SliderWidgetSchema';
import SliderRangeWidgetSchema from '../schema/SliderRangeWidgetSchema';
import RateSchemaSchema from '../schema/RateSchemaSchema';
import RadioWidgetSchema from '../schema/RadioWidgetSchema';
import CheckboxWidgetSchema from '../schema/CheckboxWidgetSchema';
import BooleanCheckboxWidgetSchema from '../schema/BooleanCheckboxWidgetSchema';
import AnonymousWidgetSchema from '../schema/AnonymousWidgetSchema';
import BooleanSwitchWidgetSchema from '../schema/BooleanSwitchWidgetSchema';
import PictureWidgetSchema from '../schema/PictureWidgetSchema';
import SelectWidgetSchema from '../schema/SelectWidgetSchema';
import MultiSelectWidgetSchema from '../schema/MultiSelectWidgetSchema';
import DatePickerWidgetSchema from '../schema/DatePickerWidgetSchema';
import DateTimePickerWidgetSchema from '../schema/DateTimePickerWidgetSchema';
import DateRangePickerWidgetSchema from '../schema/DateRangePickerWidgetSchema';

type P<L extends WidgetKey> = {
  [K in L]?: ConfigSchema;
};

type ConfigSchemaPack = P<WidgetKey>;

export default function getConfigSchema(
  widgetKey: WidgetKey,
  locale: Locale,
  languagePack: LanguagePack,
): ConfigSchema {
  function getMessage(key: string) {
    return getMessageByKey(key, locale, localMessages, languagePack);
  }
  const pack: ConfigSchemaPack = {
    [WidgetKey.LabelWidget]: LabelWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.GroupWidget]: GroupWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.TextWidget]: TextWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.TextareaWidget]: TextareaWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.NumberWidget]: NumberWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.SliderWidget]: SliderWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.RateWidget]: RateSchemaSchema.getConfigSchema(getMessage),
    [WidgetKey.SliderRangeWidget]: SliderRangeWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.CheckboxWidget]: CheckboxWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.BooleanCheckboxWidget]: BooleanCheckboxWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.BooleanSwitchWidget]: BooleanSwitchWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.PictureWidget]: PictureWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.SelectWidget]: SelectWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.MultiSelectWidget]: MultiSelectWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.DatePickerWidget]: DatePickerWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.DateTimePickerWidget]: DateTimePickerWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.DateRangePickerWidget]: DateRangePickerWidgetSchema.getConfigSchema(getMessage),
    [WidgetKey.RadioWidget]: RadioWidgetSchema.getConfigSchema(getMessage),
  };
  return pack[widgetKey] || AnonymousWidgetSchema.getConfigSchema(getMessage);
}
