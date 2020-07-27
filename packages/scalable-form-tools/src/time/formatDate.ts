import moment from 'moment';

/**
 * 格式化时间展示
 * @param {Date | string | number | null} originDate
 * @param {string} style 默认'yyyy-MM-DD hh:mm:ss'
 * @returns {string}
 */
export function formatDate(originDate?: Date | string | number | null, style = 'yyyy-MM-DD hh:mm:ss'): string {
  if (originDate === null || typeof originDate === 'undefined') {
    return '';
  }
  const date = moment(originDate);
  return date.format(style);
}
