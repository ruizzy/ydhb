/**
 * 核保处理
 */
const taskHandle = {}

taskHandle.req = {
  gwWfLogDto: '',
  viewInd: '',
  pagination: {
    pageNo: 1,
    rowsPerPage: 8
  }
}
taskHandle.res = {
  gwWfLogDto: '',
  // 任务详情start
  businessNo: '',
  businessType: '',
  guCarShipTaxDto: '',
  guCommissionDtoList: '',
  guItemKindDto0801: '',
  guItemKindDtoList0812: '',
  guItemMotorDto: '',
  guMainDto: '',
  guRelatedPartyDto: '',
  guRiskDto0801: '',
  guRiskDto0812: '',
  guRiskProfitDtoList: '',
  guRiskRelatedPartyDto: '',
  guRiskSpecialClausesDtoList: '',
  guSalesFeeDtoList: '',
  gwSwfNodeDtoListtemp: '',
  syInfo: '',
  // 人工核保原因start
  showNoAutoCheckInfo: '',
  // 平台信息
  ciPlatFormInfo: '',
  // 验车码
  carCheckCode: '',
  // 查看历次审核意见
  commonViewTrace: '',
  // 影像附件
  viewMaterialAdjunct: '',
  // 下发修改预操作
  prepareHandle: '',
  // 下发修改提交操作
  submitJunior: '',
  // 审核通过
  submitPassAudit: '',
  // 提交上级
  submitSuperior: '',
  // 提交上级预操作
  prepareSubmitSuperior: ''
}

// ================================ methods ============================
/**
 * @Param obj 查询条件
 */
taskHandle.initTaskHandle = (obj) => {
  Object.assign(taskHandle.req, obj)
}

taskHandle.refreshPagination = (obj) => {
  if (obj) {
    Object.assign(taskHandle.req.pagination, obj)
  } else {
    let nextPage = taskHandle.req.pagination.pageNo
    taskHandle.req.pagination.pageNo = ++nextPage
  }
}

taskHandle.page = {
}

export default taskHandle
