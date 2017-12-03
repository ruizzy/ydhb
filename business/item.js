/**
 * 标的
 */

/**
 * @Param proposalNo 投保单号
 * @Param endorNo 批改申请单号
 */

import Vue from 'vue'
import ext from '../libs/com/extend.min'

let item = {}

item.temp = {
    proposalNo:'',
    endorNo:''
}
// ================================ methods ============================
/**
 * @Param obj 标的
 */
item.initItem = (obj) => {
  if (!!obj) {
    ext.extend(item.temp, obj)
  } 
}
export default item