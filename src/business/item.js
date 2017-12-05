/**
 * 标的
 */

/**
 * @Param proposalNo 投保单号
 * @Param endorNo 批改申请单号
 */

import Vue from 'vue'

const item = {}

item.temp = {
    proposalNo:'',
    endorNo:''
}
// ================================ methods ============================
/**
 * @Param obj 标的
 */
item.initItem = obj => {
  Object.assign(item.temp, obj);
};
export default item