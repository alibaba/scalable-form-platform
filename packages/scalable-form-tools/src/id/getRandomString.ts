/**
 * 生成随机length位数的字符串
 * @param {number} length 默认16位
 * @returns {string}
 */
export function getRandomString(length = 16): string {
  const $firstChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      pwd += $firstChars.charAt(Math.floor(Math.random() * $firstChars.length));
    } else {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
  }
  return pwd;
}
