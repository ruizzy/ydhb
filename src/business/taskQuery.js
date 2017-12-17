/**
 * @Param businessNo 业务单号
 */


const taskQuery = {}

taskQuery.req = {
    gwWfLogDto: {
        businessNo: '',
        riskCode: '',
        businessType: '',
        firstTrial: '',
        submitTime: '',
        nodeStatus: '',
        operatorShowName: ''
      },
    pagination: {
        pageNo: 0,
        rowsPerPage: 8
    },
}
taskQuery.res = {
    gwWfLogDtoList: null,
}
// ================================ methods ============================
/**
 * @Param obj 查询条件
 */
taskQuery.initTaskQuery = (obj) => {
    Object.assign(taskQuery.req, obj);
};

taskQuery.refreshPagination = (obj) => {
    if (!!obj) {
        Object.assign(taskQuery.req.pagination, obj)
    } else {
      let nextPage = taskQuery.req.pagination.pageNo
      taskQuery.req.pagination.pageNo = ++nextPage
    }
  }


taskQuery.page = {
    riskCodes:[{
        key: '0801',
        value: '0801-交强险'
    }, {
        key: '0812',
        value: '0812-机动车商业险'
    }],
    businessTypes:[{
        key: '',
        value: '*-所有'
    }, {
        key: 'Q',
        value: '询报价'
    }, {
        key: 'O',
        value: '暂保'
    }, {
        key: 'T',
        value: '投保'
    }, {
        key: 'E',
        value: '批改'
    }, {
        key: 'R',
        value: '续保'
    }, {
        key: 'N',
        value: '申报'
    }],
    taskStatuses: [
        {
          key: '待处理',
          value: '1'
        },
        {
          key: '暂存',
          value: '2,3'
        },
        {
          key: '下发修改',
          value: '5'
        },
        {
          key: '处理完毕',
          value: '6'
        }
      ]
}
export default taskQuery