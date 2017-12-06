import Mock from 'mockjs'

const undwrtTaskQuery = {
  'status': 0,
  'statusText': 'Success',
  'data': {
    pageNo: '0',
    rowsPerPage:'8',
    totalCount:'3',
    gwWfLogDtoList:[
      {
        businessNo:'0030199081220170002408',
        appliName:'张三',
        firstTrial:'正在处理'
      },{
        businessNo:'0040101081220170000160',
        appliName:'李四',
        firstTrial:'待处理'
      },{
        businessNo:'0040101080120170000163',
        appliName:'王麻子',
        firstTrial:'待处理'
      }
    ]
  }
}
const undwrtTaskHandle = {
  'status': 0,
  'statusText': 'Success',
  'data': {
    pageNo: '0',
    rowsPerPage:'8',
    totalCount:'3',
    GuProposalItemMotorDto:{
      CarOwner:'张云霞',
      LicenseNo:'粤BZ738E',
      brandName:'丰田GTM6480AD多用途乘用车',
      printBrandName:'丰田GTM6480AD多用途乘用车',
      carKindCodeShow:'11',
      frameNo:'LVGDA46A0AG078676',
      carUseType:'01',
      seatCount:'5',
      TonCount:'0.000000000',
      exhaustScale:'2670.0000',
      familyName:'汉兰达',
      powerType:'',
      specialShapedInd:'',
      purchasePrice:'215000.00',
      consultActualValue:'',
      actualValue:'185330.00',
      singeinDate:'2010/10/15',
      certificateDate:'',
      transferDate:'',
    },
    guProposalRiskDto:{
      startDate: '2012/8/18', 
      endDate: '2013/8/17 23:59:59',
      carRenewTurnFlag: '', 
      relationNo: ''
    },
    guProposalItemKindDto:{
      
    },
    guProposalCarShipTaxDto:{

    },
    guProposalRiskProfitDto:{

    },
    guProposalRiskSpecialClausesDto:{

    },
    guProposalRiskProfitDto:{

    },
    guProposalMainDto:{

    },
    guProposalSalesFeeDto:{

    },
    guEndorEndorTextDto:{

    },
    guEndorEndorTextBlockDto:{

    },
  }
}

export { undwrtTaskQuery, undwrtTaskHandle }
