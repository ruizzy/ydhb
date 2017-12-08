/**
 * @Param businessNo 业务单号
 */

import Vue from 'vue'

const taskQuery = {}

taskQuery.temp = {
    gwWfLogDto: {
        businessNo: null,
        riskCode: null,
        businessType: null,
        firstTrial: null,
        submitTime: null,
        nodeStatus: null,
        operatorShowName: null
      },
    pagination: {
        pageNo: '0',
        rowsPerPage: '8'
    },
}
// ================================ methods ============================
/**
 * @Param obj 查询条件
 */
taskQuery.initTaskQuery = (obj) => {
    Object.assign(taskQuery.temp, obj);
};
export default taskQuery