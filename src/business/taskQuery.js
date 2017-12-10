/**
 * @Param businessNo 业务单号
 */

import Vue from 'vue'

const taskQuery = {}

taskQuery.request = {
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
taskQuery.response = {
    gwWfLogDtoList: null,
}
// ================================ methods ============================
/**
 * @Param obj 查询条件
 */
taskQuery.initTaskQuery = (obj) => {
    Object.assign(taskQuery.request, obj);
};

taskQuery.refreshPagination = (obj) => {
    if (!!obj) {
        Object.assign(taskQuery.request.pagination, obj)
    } else {
      let nextPage = taskQuery.request.pagination.pageNo
      taskQuery.request.pagination.pageNo = ++nextPage
    }
  }
export default taskQuery