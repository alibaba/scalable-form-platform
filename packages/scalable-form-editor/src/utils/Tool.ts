import { Platform } from 'scalable-form-tools';
import { UiSchema } from 'scalable-form-core';
import PickerItem from '../schema/PickerItem';
import _ from 'lodash';

/**
 * 判断当前字段类型是否能够支持当前的适配端，默认不支持
 * @param {PickerItem} pickerItem
 * @param {string} platform
 * @returns {boolean}
 */
export function isPickerItemInPlatform(pickerItem: PickerItem, platform: string): boolean {
  const configPlatformList = pickerItem.platform || [];
  if (platform === Platform.BOTH) {
    return configPlatformList.indexOf(Platform.LAP) > -1 && configPlatformList.indexOf(Platform.MOBILE) > -1;
  } else if (platform === Platform.LAP || platform === Platform.MOBILE) {
    return configPlatformList.indexOf(platform) > -1;
  } else {
    return false;
  }
}

export function formatInitUiSchema(uiSchema: UiSchema) {
  const result = _.cloneDeep<UiSchema>(uiSchema);
  if (!result['ui:order']) {
    const orders: string[] = _.keys(result).map((itemKey) => {
      return itemKey;
    });
    result['ui:order'] = orders || [];
  }
  return result;
}
