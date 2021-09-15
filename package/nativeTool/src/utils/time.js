/**
 * @description: 前n天的年月日
 * @param {number} n 前n天
 */
function getBeforeDate(n = 0){
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  let s = year + '-' + (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day);
  return s;
}
getBeforeDate.code=`
/**
 * @description: 前n天的年月日
 * @param {number} n 前n天
 */
function getBeforeDate(n = 0){
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  let s = year + '-' + (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day);
  return s;
}
`

export default {
  getBeforeDate
};
