/**
 * Created by wangzhilong on 2017/9/27.
 */

exports.paramValidator = function (param) {
  if (typeof param == 'undefined') {
    return false
  }
  if (typeof param == 'string' && param.length == 0) {
    return false
  }
  return true
};