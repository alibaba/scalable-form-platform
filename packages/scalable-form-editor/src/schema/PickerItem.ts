import { WidgetKey } from 'scalable-form-tools';

/**
 * 单个字段选择器
 */
export default interface PickerItem {
  /**
   * key，字段选择器主键
   */
  key: WidgetKey;
  /**
   * 字段选择器icon
   */
  icon: string;
  /**
   * 字段选择器label
   */
  label: string;
  /**
   * 字段适配平台
   */
  platform: string[];
}
