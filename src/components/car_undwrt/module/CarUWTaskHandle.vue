<template>
  <div id="car-uw-task-handle">
    <button-tab v-model="selectedItem">
      <button-tab-item selected @on-item-click="selectItem()">保单信息</button-tab-item>
      <button-tab-item @on-item-click="selectItem()">人工审核原因</button-tab-item>
      <button-tab-item @on-item-click="selectItem()">影像附件</button-tab-item>
    </button-tab>
    <div class="policy-info-group" v-show="showPolicyInfo">
      <group gutter="0" class="info-group basic">
        <cell is-link
              title="基本信息"
              :border-intent="false"
              :arrow-direction="showBasicInfo ? 'up': 'down'"
              @click.native="showBasicInfo = !showBasicInfo">
        </cell>
        <cell-form-preview v-show="showBasicInfo"
                           :list="basicInfo"
                           :border-intent="false">
        </cell-form-preview>
      </group>
      <card class="button-card basic" v-show="showBasicInfo">
        <x-button mini plain slot="content" text="精友信息"
                  class="has-right-border">
        </x-button>
        <x-button mini plain slot="content" text="精友预算"
                  class="has-right-border">
        </x-button>
        <x-button mini plain slot="content" text="纯风险保费">
        </x-button>
      </card>

      <group gutter="0" class="info-group TCI">
        <cell is-link
              title="交强险"
              :border-intent="false"
              :arrow-direction="showTCIInfo ? 'up': 'down'"
              @click.native="showTCIInfo = !showTCIInfo">
        </cell>
        <cell-form-preview v-show="showTCIInfo"
                           :list="TCIInfo"
                           :border-intent="false">
        </cell-form-preview>
      </group>
      <card class="button-card" v-show="showTCIInfo">
        <x-button mini plain slot="content" text="平台信息">
        </x-button>
      </card>

      <group gutter="0" class="info-group VCI">
        <cell is-link
              title="商业险"
              :border-intent="false"
              :arrow-direction="showVCIInfo ? 'up': 'down'"
              @click.native="showVCIInfo = !showVCIInfo">
        </cell>
        <cell-form-preview v-show="showVCIInfo"
                           :list="VCIInfo"
                           :border-intent="false">
        </cell-form-preview>
      </group>
      <card class="button-card" v-show="showVCIInfo">
        <x-button mini plain slot="content" text="平台信息">
        </x-button>
      </card>

      <group gutter="0" class="info-group special-agreement">
        <cell is-link
              title="特别约定"
              :border-intent="false"
              :arrow-direction="showSpecialAgreement ? 'up': 'down'"
              @click.native="showSpecialAgreement = !showSpecialAgreement">
        </cell>
      </group>

      <group gutter="0" class="info-group sell-info">
        <cell is-link
              title="销售信息"
              :border-intent="false"
              :arrow-direction="showSellInfo ? 'up': 'down'"
              @click.native="showSellInfo = !showSellInfo">
        </cell>
      </group>

    </div>
  </div>
</template>

<script>
import {
  ButtonTab,
  ButtonTabItem,
  Card,
  Cell,
  CellFormPreview,
  Group,
  XButton} from 'vux'
import {taskHandle} from 'business'
import carService from '../carService'
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Card,
    Cell,
    CellFormPreview,
    Group,
    XButton
  },
  data () {
    return {
      selectedItem: 0,
      showPolicyInfo: true,
      showManualReviewReason: false,
      showImageAttachments: false,
      showBasicInfo: false,
      basicInfo: [
        {
          label: '车主',
          value: '富德产险北京分公司'
        }
      ],
      showTCIInfo: false,
      TCIInfo: [
        {
          label: '起终保日期',
          value: '2017-05-06'
        }
      ],
      showVCIInfo: false,
      VCIInfo: [
        {
          label: '起终保日期',
          value: '2017-05-06'
        }
      ],
      showSpecialAgreement: false,
      showSellInfo: false
    }
  },
  created () {
    this.$store.commit('UPDATE_NAVIGATION_TITLE', {
      navigationTitle: taskHandle.req.viewInd === '0' ? '任务处理' : '任务详情'
    })
    taskHandle.res.gwWfLogDto = taskHandle.req.gwWfLogDto
    this.undwrtTaskHandle()
  },
  methods: {
    selectItem () {
      this.showPolicyInfo = (this.selectedItem === 0)
      this.showManualReviewReason = (this.selectedItem === 1)
      this.showImageAttachments = (this.selectedItem === 2)
    },
    // 下发修改提交操作
    submitJunior () {
      let params = {
        flowId: taskHandle.res.prepareHandle.gwWfLogDto.flowId,
        logNo: taskHandle.res.prepareHandle.gwWfLogDto.logNo,
        easyScanFlag: 'no',
        nodeNo: taskHandle.res.prepareHandle.gwWfLogDto.nodeNo,
        nextStepType: taskHandle.res.prepareHandle.gwWfLogDto.flag,
        reasonType: '02' // 下发原因
      }
      carService.submitJunior(params).then(res => {
        Object.assign(taskHandle.res, {submitJunior: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 下发修改预操作
    prepareHandle () {
      let params = {
        handleText: '下发修改预操作', // 下发
        businessType: taskHandle.res.gwWfLogDto.businessType,
        businessNo: taskHandle.res.gwWfLogDto.businessNo,
        flowId: taskHandle.res.gwWfLogDto.flowId,
        logNo: taskHandle.res.gwWfLogDto.logNo
      }
      carService.prepareHandle(params).then(res => {
        Object.assign(taskHandle.res, {prepareHandle: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 提交上级
    submitSuperior () {
      let params = {
        gwWfLogDto: taskHandle.res.gwWfLogDto,
        gwSwfNodeDto: {
          nodeNo: '9',
          nodeCName: '高2级'
        },
        handleType: '11',
        easyScanFlag: 'no'
      }
      carService.submitSuperior(params).then(res => {
        Object.assign(taskHandle.res, {submitSuperior: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    submitPassAudit () {
      let params = {
        handType: '11', // 核保、核赔标志，不知道哪里取
        handleText: '意见很大',
        flowId: taskHandle.res.gwWfLogDto.flowId,
        logNo: taskHandle.res.gwWfLogDto.logNo,
        businessNo: taskHandle.res.gwWfLogDto.businessNo,
      }
      carService.submitPassAudit(params).then(res => {
        Object.assign(taskHandle.res, {submitPassAudit: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 核保任务处理/核保任务详情
    undwrtTaskHandle (data) {
      let params = {
        gwWfLogDto: taskHandle.req.gwWfLogDto,
        viewInd: taskHandle.req.viewInd || data
      }
      carService.undwrtTaskHandle(params).then(res => {
        Object.assign(taskHandle.res, res.data.datas)
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 影像附件
    viewMaterialAdjunct () {
      let params = {
        businessNo: taskHandle.res.gwWfLogDto.businessNo,
        businessSeqNo: '',
        productRiskCode: taskHandle.res.gwWfLogDto.riskCode,
        businessType: 'Proposal',
        baseActionType: 'view'
      }
      carService.viewMaterialAdjunct(params).then(res => {
        Object.assign(taskHandle.res, {viewMaterialAdjunct: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 平台信息
    queryCiPlatFormInfo () {
      let planCode = taskHandle.res.gwWfLogDto.riskCode === '1363' ? '1363' : '0000'
      let params = {
        planCode: planCode,
        businessType: 'Proposal',
        productRiskCode: taskHandle.res.gwWfLogDto.riskCode,
        oldPolicyNo: '',
        proposalNo: taskHandle.res.gwWfLogDto.businessNo,
        businessNo: taskHandle.res.gwWfLogDto.businessNo,
        timestamp: ''
      }
      carService.queryCiPlatFormInfo(params).then(res => {
        Object.assign(taskHandle.res, {ciPlatFormInfo: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 人工核保原因
    showNoAutoCheckInfo () {
      let params = {
        gwWfLogDto: {
          businessNo: taskHandle.res.businessNo
        }
      }
      carService.showNoAutoCheckInfo(params).then(res => {
        Object.assign(taskHandle.res, {showNoAutoCheckInfo: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 查看历次审核意见
    commonViewTrace () {
      let params = {
        businessNo: taskHandle.res.gwWfLogDto.businessNo,
        businessType: taskHandle.res.gwWfLogDto.businessType,
      }
      carService.commonViewTrace(params).then(res => {
        Object.assign(taskHandle.res, {commonViewTrace: res.data.datas})

        console.log(res.data.datas)
        console.log(taskHandle.res)
      }, res => {
        console.log(res.data)
      })
    },
    // 获取验车码
    queryCarCheckCode () {
      let params = {
        proposalNo: taskHandle.res.gwWfLogDto.businessNo
      }
      carService.queryCarCheckCode(params).then(res => {
        Object.assign(taskHandle.res, {carCheckCode: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style lang="less">
  #car-uw-task-handle {

    .vux-button-group {
      padding: 9px 15px;

      .vux-button-tab-item {
        color: #333333;
        font-size: 14px;
      }

      .vux-button-tab-item:after {
        display: none;
      }

      .vux-button-group-current {
        color: #d42319 ;
        border-bottom: 2px solid #d42319;
        border-radius: 0;
        background-color: white;
      }
    }

    .policy-info-group {
      background-color: #f5f5f5;
      padding:10px;

      .info-group {
        background-color: #f5f5f5;
        margin-top: 10px;

        .weui-cells::before {
          display: none;
        }

        .weui-cells {

          .weui-cell {
            font-size: 14px;
            color: #d42319;
          }
        }

        .weui-cells::after {
          display: none;
        }

        .vux-cell-form-preview::before {
          margin: 0 15px;
        }

        .vux-cell-form-preview {

          .weui-form-preview__bd {
            font-size: 14px;
            text-align: left;


            .weui-form-preview__label {
              margin-right: 10px;
            }

            .weui-form-preview__value {
              color: #333333;
            }
          }
        }
      }

      .info-group.basic {
        margin-top: 0;
      }

      .button-card::before {
        margin: 0 15px;
      }

      .button-card {
        margin: 0;

        .vux-card-content {
          height: 40px;
          text-align: center;

          .weui-btn {
            color: #00a4ff;
            border-width: 0;
            height: 20px;
            line-height: 20px;
            margin: 10px 0;
          }

          .weui-btn.has-right-border::after {
            border-right: 1px solid #d9d9d9;
            border-radius: 0;
          }
        }
      }

      .button-card::after {
        display: none;
      }

      .button-card.basic {

        .weui-btn {
          width: 33%;
        }
      }
    }
  }
</style>
