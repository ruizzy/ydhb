/**
 * @Param businessNo 业务单号
 */

import Vue from 'vue'

const taskQuery = {}

taskQuery.temp = {
    gwWfLogDto: {
        businessNo: '',
        riskOrPlan: [],
        businessType: [],
        firstTrial: '',
        submitTime: '',
        nodeStatus: '',
        operatorShowName: ''
      },
    pagination: {
        pageNo: '0',
        rowsPerPage: '8'
    }
}
// ================================ methods ============================
/**
 * @Param obj 查询条件
 */
taskQuery.initTaskQuery = (obj) => {
    Object.assign(taskQuery.temp, obj);
};
export default taskQuery