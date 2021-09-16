/**
 * @description: 保留小数点size位
 * @param {number} num 目标数字
 * @param {number} size
 */

function fixNumber(num, size = 2) {
  let text = num.toString();
  let index = text.indexOf('.');
  if (text.length - index - 1 > size) {
    return parseFloat(num).toFixed(2);
  }
  return num;
}
fixNumber.code=`
/**
 * @description: 保留小数点size位
 * @param {number} num 目标数字
 * @param {number} size
 */
function fixNumber(num, size = 2) {
  let text = num.toString();
  let index = text.indexOf('.');
  if (text.length - index - 1 > size) {
    return parseFloat(num).toFixed(2);
  }
  return num;
}
`

export default {
  fixNumber
};
