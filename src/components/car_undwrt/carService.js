import Vue from 'vue'

const carService = {}
// 核保任务查询/核保任务查看查询
carService.undwrtTaskQuery = params => {
  return Vue.http.post('/car/undwrtTaskQuery', params)
}
// 核保任务处理/核保任务详情
carService.undwrtTaskHandle = params => {
  return Vue.http.post('/car/undwrtTaskHandle', params)
}
// 获取人工核保原因
carService.showNoAutoCheckInfo = params => {
  return Vue.http.post('/car/showNoAutoCheckInfo', params)
}
// 获取平台信息
carService.queryCiPlatFormInfo = params => {
  return Vue.http.post('/car/queryCiPlatFormInfo', params)
}
// 获取影像附件
carService.viewMaterialAdjunct = params => {
  return Vue.http.post('/car/viewMaterialAdjunct', params)
}
// 审核通过
carService.submitPassAudit = params => {
  return Vue.http.post('/car/submitPassAudit', params)
}
// 下发修改预操作
carService.prepareSubmitJunior = params => {
  return Vue.http.post('/car/prepareSubmitJunior', params)
}
// 下发修改操作
carService.submitJunior = params => {
  return Vue.http.post('/car/submitJunior', params)
}
// 提交上级审核操作
carService.submitSuperior = params => {
  return Vue.http.post('/car/submitSuperior', params)
}
// 查看历次审核意见
carService.commonViewTrace = params => {
  return Vue.http.post('/car/commonViewTrace', params)
}
// 获取验车码
carService.queryCarCheckCode = params => {
  return Vue.http.post('/car/queryCarCheckCode', params)
}

export default carService
