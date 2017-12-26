/**
 * 核保处理
 */

const taskHandle = {}
// 请求参数
taskHandle.req = {
  gwWfLogDto: '',
  viewInd: '',
  pagination: {
    pageNo: 1,
    rowsPerPage: 8
  }
}
// 返回参数
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
 * @Param obj 核保处理数据初始化
 */
taskHandle.initTaskHandle = (obj) => {
  Object.assign(taskHandle.res, obj)
  if (taskHandle.res.guItemMotorDto) {
    taskHandle.setBasicInfo(taskHandle.res)
  }
  if (taskHandle.res.guRiskDto0801) {
    taskHandle.setTCIInfo(taskHandle.res)
  }
  if (taskHandle.res.guRiskDto0812) {
    taskHandle.setVCIInfo(taskHandle.res)
  }
  if (taskHandle.res.guRiskSpecialClausesDtoList) {
    taskHandle.setRiskSpecialClauses(taskHandle.res.guRiskSpecialClausesDtoList)
  }
  if (taskHandle.res.guMainDto) {
    taskHandle.setSellInfo(taskHandle.res)
  }
  if (taskHandle.res.showNoAutoCheckInfo) {
    taskHandle.setNoAutoCheckInfo(taskHandle.res.showNoAutoCheckInfo)
  }
}
// 基本信息
taskHandle.setBasicInfo = (obj) => {
  if (obj) {
    taskHandle.page.basicInfo = [
      {
        label: '车主',
        value: obj.guItemMotorDto.carOwner
      }, {
        label: '投保人',
        value: obj.guMainDto.appliName
      }, {
        label: '被保人',
        value: obj.guMainDto.insuredName
      }, {
        label: '厂牌型号',
        value: obj.guItemMotorDto.brandName
      }, {
        label: '打印型号',
        value: obj.guItemMotorDto.printBrandName
      }, {
        label: '号牌号码',
        value: obj.guItemMotorDto.licenseNo
      }, {
        label: 'VIN',
        value: obj.guItemMotorDto.frameNo
      }, {
        label: '车辆用途',
        value: obj.guItemMotorDto.carUseType // ggcode
      }, {
        label: '机动车种类',
        value: obj.guItemMotorDto.carKindCode // ggcode
      }, {
        label: '载客数',
        value: obj.guItemMotorDto.seatCount + '人'
      }, {
        label: '载质量',
        value: obj.guItemMotorDto.tonCount + '吨'
      }, {
        label: '排量',
        value: obj.guItemMotorDto.exhaustScale + 'ml/kw'
      }, {
        label: '车系',
        value: obj.guItemMotorDto.familyName
      }, {
        label: '能源类型',
        value: obj.guItemMotorDto.powerType
      }, {
        label: '异型车标志',
        value: obj.guItemMotorDto.specialShapedInd // ggcode
      }, {
        label: '新车购置价',
        value: obj.guItemMotorDto.purchasePrice + '元'
      }, {
        label: '实际价值',
        value: obj.guItemMotorDto.consultActualValue + '元'
      }, {
        label: '协商价值',
        value: obj.guItemMotorDto.actualValue + '元'
      }, {
        label: '初登日期',
        value: obj.guItemMotorDto.enrollDate
      }, {
        label: '发证日期',
        value: obj.guItemMotorDto.certificateDate
      }, {
        label: '过户日期',
        value: obj.guItemMotorDto.transferDate
      }, {
        label: '过户标志',
        value: obj.guItemMotorDto.chgOwnerFlag
      }
    ]
  }
  return taskHandle.page.basicInfo
}
taskHandle.getBasicInfo = () => {
  return taskHandle.page.basicInfo
}
// 交强险
taskHandle.setTCIInfo = (obj) => {
  if (obj) {
    let carRenewTurnFlag
    let startDate = new Date(obj.guRiskDto0801.startDate)
    let endDate = new Date(obj.guRiskDto0801.endDate)
    switch (obj.guRiskDto0801.carRenewTurnFlag) {
      case '2':
        carRenewTurnFlag = '续保'
        break
      case '3':
        carRenewTurnFlag = '转保'
        break
      default:
        carRenewTurnFlag = '新保'
        break
    }
    taskHandle.page.TCIInfo = [
      {
        label: '起终保日期',
        value: startDate.getFullYear() + '-' +
        (startDate.getMonth() + 1) + '-' +
        startDate.getDate() + '至' +
        endDate.getFullYear() + '-' +
        (endDate.getMonth() + 1) + '-' +
        endDate.getDate()
      }, {
        label: '基准保费',
        value: obj.guItemKindDto0801.benchmarkPremium
      }, {
        label: '计税分类',
        value: obj.guCarShipTaxDto.taxRelifFlag
      }, {
        label: '完税凭证',
        value: obj.guCarShipTaxDto.paidFreeCertificate
      }, {
        label: '新续转',
        value: carRenewTurnFlag
      }, {
        label: '车船税额',
        value: Number(obj.guCarShipTaxDto.taxDueActual) + Number(obj.guCarShipTaxDto.previousPay)
      }, {
        label: '折扣率',
        value: obj.guItemKindDto0801.discount
      }, {
        label: '整备质量',
        value: obj.guCarShipTaxDto.completeKerbMass
      }, {
        label: '机关代码',
        value: obj.guCarShipTaxDto.taxCompancyCode
      }, {
        label: '关联单号',
        value: obj.guRiskDto0801.relationNo
      }, {
        label: '签单保费',
        value: obj.guRiskDto0801.sumGrossPremium
      }]
  }
}
taskHandle.getTCIInfo = (obj) => {
  return taskHandle.page.TCIInfo
}
// 商业险
taskHandle.setVCIInfo = (obj) => {
  if (obj) {
    let carRenewTurnFlag
    let startDate = new Date(obj.guRiskDto0812.startDate)
    let endDate = new Date(obj.guRiskDto0812.endDate)
    switch (obj.guRiskDto0812.carRenewTurnFlag) {
      case '2':
        carRenewTurnFlag = '续保'
        break
      case '3':
        carRenewTurnFlag = '转保'
        break
      default:
        carRenewTurnFlag = '新保'
        break
    }
    let NCD
    let traffic
    let channel
    let underwriting
    for (let profit of obj.guRiskProfitDtoList) {
      if (profit.profitCode === 'C19' || profit.profitCode === 'G19') {
        NCD = profit.rate
      } else if (profit.profitCode === 'C27' || profit.profitCode === 'G27') {
        traffic = profit.rate
      } else if (profit.profitCode === 'C25' || profit.profitCode === 'G25') {
        channel = profit.rate
      } else if (profit.profitCode === 'C26' || profit.profitCode === 'G26') {
        underwriting = profit.rate
      }
    }
    taskHandle.page.VCIInfo.riskInfo = [
      {
        label: '起终保日期',
        value: startDate.getFullYear() + '-' +
        (startDate.getMonth() + 1) + '-' +
        startDate.getDate() + '至' +
        endDate.getFullYear() + '-' +
        (endDate.getMonth() + 1) + '-' + endDate.getDate()
      }, {
        label: 'NCD',
        value: NCD
      }, {
        label: '交通违法系数',
        value: traffic
      }, {
        label: '渠道系数',
        value: channel
      }, {
        label: '自主核保系数',
        value: underwriting
      }, {
        label: '建议折扣',
        value: obj.syInfo.hopeRate
      }, {
        label: '全单折扣',
        value: obj.syInfo.sumRate
      }, {
        label: '新续转',
        value: carRenewTurnFlag
      }, {
        label: '关联单号',
        value: obj.guRiskDto0812.relationNo
      }]
    for (let itemKind of obj.guItemKindDtoList0812) {
      taskHandle.page.VCIInfo.itemKind.push(
        {
          kindName: itemKind.kindName,
          sumInsured: itemKind.sumInsured,
          uwPremium: itemKind.uwPremium
        }
        )
    }
  }
}
taskHandle.getVCIInfo = (obj) => {
  return taskHandle.page.VCIInfo
}
// 特别约定
taskHandle.setRiskSpecialClauses = (obj) => {
  if (obj) {
    for (let special of obj) {
      if (special.riskCode === '0801') {
        taskHandle.page.riskSpecialClauses.TCI.push(special.clauseContext)
      } else {
        taskHandle.page.riskSpecialClauses.VCI.push(special.clauseContext)
      }
    }
  }
}
taskHandle.getRiskSpecialClauses = () => {
  return taskHandle.page.riskSpecialClauses
}
// 销售信息
taskHandle.setSellInfo = (obj) => {
  if (obj) {
    taskHandle.page.sellInfo.guMain = [
      {
        label: '协议号',
        value: obj.guMainDto.agreementNo
      }, {
        label: '子协议',
        value: obj.guMainDto.solutionCode
      }, {
        label: '归属机构',
        value: obj.guMainDto.companyCode
      }, {
        label: '中介名称',
        value: obj.guMainDto.intermediaryCode
      }, {
        label: '渠道类型',
        value: obj.guMainDto.channelDetailCode
      }, {
        label: '合作网点',
        value: obj.guMainDto.cooperateSiteCode
      }, {
        label: '业务员',
        value: obj.guMainDto.salesmanCode
      }, {
        label: '操作员',
        value: obj.guMainDto.operatorCode
      }]
    if (taskHandle.res.guCommissionDtoList) {
      for (let guCommission of taskHandle.res.guCommissionDtoList) {
        if (guCommission.riskCode === '0801') {
          taskHandle.page.sellInfo.TCIArr = [{
            expenseItem: '手续费',
            defaultValue: guCommission.commissionGrossPercent,
            adjustedValue: guCommission.commissionPercent
          }]
        } else {
          taskHandle.page.sellInfo.VCIArr = [{
            expenseItem: '手续费',
            defaultValue: guCommission.commissionGrossPercent,
            adjustedValue: guCommission.commissionPercent
          }]
        }
      }
    }
    if (taskHandle.res.guSalesFeeDtoList) {
      for (let guSalesFee of taskHandle.res.guSalesFeeDtoList) {
        let orgFeePercent
        switch (guSalesFee.feeType) {
          case '318':
            orgFeePercent = '客户关怀'
            break
          case '313':
            orgFeePercent = '绩效提奖'
            break
          case '314':
            orgFeePercent = '渠道维护'
            break
          default:
            orgFeePercent = false
            break
        }

        if (orgFeePercent && guSalesFee.riskCode === '0801') {
          taskHandle.page.sellInfo.TCIArr.push(
            {
              expenseItem: orgFeePercent,
              defaultValue: guSalesFee.orgFeePercent,
              adjustedValue: guSalesFee.feePercent
            }
            )
        } else if (orgFeePercent) {
          taskHandle.page.sellInfo.VCIArr.push(
            {
              expenseItem: orgFeePercent,
              defaultValue: guSalesFee.orgFeePercent,
              adjustedValue: guSalesFee.feePercent
            }
            )
        }
      }
    }
  }
}
taskHandle.getSellInfo = () => {
  return taskHandle.page.sellInfo
}
// 人工核保信息
taskHandle.setNoAutoCheckInfo = (obj) => {
  if (obj) {
    for (let item of obj) {
      taskHandle.page.showNoAutoCheckInfo.push({
        ruleName: item.ruledId,
        description: item.description,
        extraMessage: item.argumen
      })
    }
  }
}
taskHandle.getNoAutoCheckInfo = () => {
  return taskHandle.page.showNoAutoCheckInfo
}
taskHandle.page = {
  basicInfo: [],
  TCIInfo: [],
  VCIInfo: {
    riskInfo: [],
    itemKind: []
  },
  riskSpecialClauses: {
    TCI: [],
    VCI: []
  },
  sellInfo: {
    guMain: [],
    TCIArr: [],
    VCIArr: []
  },
  showNoAutoCheckInfo: []
}
export default taskHandle
