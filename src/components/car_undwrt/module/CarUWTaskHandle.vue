<template>
  <div id="car-uw-task-handle">
    <button-tab v-model="selectedItem">
      <button-tab-item selected @on-item-click="selectItem()">保单信息</button-tab-item>
      <button-tab-item @on-item-click="selectItem()">人工核保原因</button-tab-item>
      <button-tab-item @on-item-click="selectItem()">影像附件</button-tab-item>
      <button-tab-item v-if="showApproveTab" @on-item-click="selectItem()">核批详情</button-tab-item>
    </button-tab>
    <scroller lock-x scrollbarY height="-154">
      <div class="policy-info-group" v-show="showPolicyInfo">
        <group gutter="0" class="info-group basic">
          <cell is-link
                class="title"
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
                class="title"
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
                class="title"
                title="商业险"
                :border-intent="false"
                :arrow-direction="showVCIInfo ? 'up': 'down'"
                @click.native="showVCIInfo = !showVCIInfo">
          </cell>
          <cell-form-preview v-show="showVCIInfo&&VCIInfo.riskInfo.length"
                             :list="VCIInfo.riskInfo"
                             :border-intent="false">
          </cell-form-preview>
          <div class="info-table" v-show="showVCIInfo&&VCIInfo.itemKind.length">
            <x-table full-bordered>
              <thead>
              <tr>
                <th>承保险别</th>
                <th>保额(元)</th>
                <th>保费(元)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in VCIInfo.itemKind" :key="index">
                <td>{{item.kindName}}</td>
                <td class="orange">{{item.sumInsured}}</td>
                <td class="red">{{item.uwPremium}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </group>
        <card class="button-card" v-show="showVCIInfo">
          <x-button mini plain slot="content" text="平台信息">
          </x-button>
        </card>

        <group gutter="0" class="info-group special-agreement">
          <cell is-link
                class="title"
                title="特别约定"
                :border-intent="false"
                :arrow-direction="showSpecialAgreement ? 'up': 'down'"
                @click.native="showSpecialAgreement = !showSpecialAgreement">
          </cell>
          <group class="title" title="交强险" v-show="showSpecialAgreement && riskSpecialClauses.TCI.length">
            <cell value-align="left"
                  v-for="(item, index) in riskSpecialClauses.TCI"
                  :key="index"
                  :title="index+1"
                  :value="item">
            </cell>
          </group>
          <group class="title" title="商业险" v-show="showSpecialAgreement && riskSpecialClauses.VCI.length">
            <cell value-align="left"
                  v-for="(item, index) in riskSpecialClauses.VCI"
                  :key="index"
                  :title="index+1"
                  :value="item">
            </cell>
          </group>
        </group>

        <group gutter="0" class="info-group sell-info">
          <cell is-link
                class="title"
                title="销售信息"
                :border-intent="false"
                :arrow-direction="showSellInfo ? 'up': 'down'"
                @click.native="showSellInfo = !showSellInfo">
          </cell>
          <cell-form-preview v-show="showSellInfo&&sellInfo.guMain.length"
                             :list="sellInfo.guMain"
                             :border-intent="false">
          </cell-form-preview>
          <group class="title" title="交强险" v-show="showSellInfo&&sellInfo.TCIArr.length">
            <div class="info-table">
              <x-table full-bordered>
                <thead>
                <tr>
                  <th>费用项目</th>
                  <th>预设值(元)</th>
                  <th>调整值(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in sellInfo.TCIArr" :key="index">
                  <td>{{item.expenseItem}}</td>
                  <td class="orange">{{item.defaultValue}}</td>
                  <td class="red">{{item.adjustedValue}}</td>
                </tr>
                </tbody>
              </x-table>
            </div>
          </group>
          <group class="title" title="商业险" v-show="showSellInfo&&sellInfo.VCIArr.length">
            <div class="info-table">
              <x-table full-bordered>
                <thead>
                <tr>
                  <th>费用项目</th>
                  <th>预设值(元)</th>
                  <th>调整值(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in sellInfo.VCIArr" :key="index">
                  <td>{{item.expenseItem}}</td>
                  <td class="orange">{{item.defaultValue}}</td>
                  <td class="red">{{item.adjustedValue}}</td>
                </tr>
                </tbody>
              </x-table>
            </div>
          </group>
        </group>
      </div>

      <div class="manual-review-reason-group" v-show="showManualReviewReason">
        <div class="info-table no-cell-border" >
          <x-table :cell-bordered="false">
            <thead>
            <tr>
              <th>规则名称</th>
              <th>规则违反信息描述</th>
              <th>附加信息</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in noAutoCheckInfo" :key="index">
              <td>{{item.ruleName}}</td>
              <td>{{item.description}}</td>
              <td>{{item.extraMessage}}</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </div>

      <div class="image-attachments-group" v-show="showImageAttachments">

      </div>

      <div class="approve-info-group" v-show="showApproveInfo">
        <group gutter="0" class="info-group basic" v-show="showApproveInfo && approveInfo.headerInfo">
          <cell-form-preview :list="approveInfo.headerInfo"
                             :border-intent="false">
          </cell-form-preview>
        </group>
        <group gutter="0" class="info-group" v-show="showApproveInfo && approveInfo.TCIInfo">
          <cell class="title" title="交强险" :border-intent="false"></cell>
          <cell-form-preview :list="approveInfo.TCIInfo"
                             :border-intent="false">
          </cell-form-preview>
        </group>
        <group gutter="0" class="info-group" v-show="showApproveInfo && approveInfo.VCIInfo">
          <cell class="title" title="商业险" :border-intent="false"></cell>
          <cell-form-preview :list="approveInfo.VCIInfo"
                             :border-intent="false">
          </cell-form-preview>
        </group>
        <group gutter="0" class="info-group">
          <cell class="title" title="批文比较内容" :border-intent="false"></cell>
          <div class="info-table"
               v-show="showApproveInfo && approveInfo.compareInfo.list.length">
            <x-table full-bordered>
              <thead>
              <tr>
                <th>变更项目</th>
                <th>变化前</th>
                <th>变化后</th>
                <th>保费变化(元)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in approveInfo.compareInfo.list" :key="index">
                <td>{{item.itemName}}</td>
                <td>{{item.before}}</td>
                <td>{{item.after}}</td>
                <td class="red">{{item.change}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
          <cell-form-preview v-show="showApproveInfo && approveInfo.compareInfo.footer"
                             :list="approveInfo.compareInfo.footer"
                             :border-intent="false">
          </cell-form-preview>
        </group>
      </div>
    </scroller>
    <card class="button-card operation">
        <x-button mini plain slot="content"
                  @click.native="submitPassAudit()"
                  text="审核通过"
                  class="has-right-border">
        </x-button>
        <x-button mini plain slot="content"
                  @click.native="prepareHandle()"
                  text="下发修改"
                  class="has-right-border">
        </x-button>
        <x-button mini plain slot="content"
                  @click.native="prepareSubmitSuperior()"
                  text="提交上级">
        </x-button>
      </card>
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
  Scroller,
  XTable,
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
    Scroller,
    XTable,
    XButton
  },
  data () {
    return {
      selectedItem: 0,
      showPolicyInfo: true,
      showManualReviewReason: false,
      showImageAttachments: false,
      showApproveInfo: false,
      showBasicInfo: false,
      basicInfo: [],
      showTCIInfo: false,
      TCIInfo: [],
      VCIInfo: [],
      showVCIInfo: false,
      showSpecialAgreement: false,
      riskSpecialClauses: {},
      showSellInfo: false,
      sellInfo: {},
      noAutoCheckInfo: [],
      approveInfo: {
        headerInfo: [
          {
            label: '交强险批发方式',
            value: '手批'
          }, {
            label: '商业险批发方式',
            value: '手批'
          }, {
            label: '按原折扣计算保费',
            value: '是'
          }
        ],
        TCIInfo: [
          {
            label: '批头',
            value: '3278312674628316481236871'
          }
        ],
        VCIInfo: [
          {
            label: '批头',
            value: '3278312674628316481236871'
          }
        ],
        compareInfo: {
          list: [
            {
              itemName: '项目名称',
              before: '张飞',
              after: '关羽',
              change: '30000'
            }, {
              itemName: '项目名称',
              before: '张飞',
              after: '关羽',
              change: '30000'
            }
          ],
          footer: [
            {
              label: '批尾',
              value: '1237129621356123128823'
            }
          ]
        }
      }
    }
  },
  created () {
    this.$store.commit('UPDATE_NAVIGATION_TITLE', {
      navigationTitle: taskHandle.req.viewInd === '0' ? '任务处理' : '任务详情'
    })
    this.initPageData()
  },
  methods: {
    selectItem () {
      this.showPolicyInfo = (this.selectedItem === 0)
      this.showManualReviewReason = (this.selectedItem === 1)
      this.showImageAttachments = (this.selectedItem === 2)
      this.showApproveInfo = (this.selectedItem === 3)
    },
    // 下发修改预操作
    prepareHandle () {
      let params = {
        handleText: '下发修改预操作', // 下发
        businessType: taskHandle.req.gwWfLogDto.businessType,
        businessNo: taskHandle.req.gwWfLogDto.businessNo,
        flowId: taskHandle.req.gwWfLogDto.flowId,
        logNo: taskHandle.req.gwWfLogDto.logNo
      }
      carService.prepareHandle(params).then(res => {
        Object.assign(taskHandle.res, {prepareHandle: res.data.datas})
        if(res.data.datas.SL_RSLT_CODE ==='999999'){

          this.$router.push({
                path: '/submit/junior'
              })
        }else{
          this.$vux.alert.show({
            title: '提示',
            content: res.data.datas.SL_RSLT_MESG
          })
        }
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 提交上级预操作
    prepareSubmitSuperior () {
      let params = {
        handleText: '提交上级预操作',
        businessType: taskHandle.req.gwWfLogDto.businessType,
        businessNo: taskHandle.req.gwWfLogDto.businessNo,
        flowId: taskHandle.req.gwWfLogDto.flowId,
        logNo: taskHandle.req.gwWfLogDto.logNo,
        nodeNo: taskHandle.req.gwWfLogDto.nodeNo
      }
      carService.prepareSubmitSuperior(params).then(res => {
        Object.assign(taskHandle.res, {prepareSubmitSuperior: res.data.datas})
        if(res.data.datas.SL_RSLT_CODE ==='999999'){

          // this.$router.push({
          //       path: '/submit/superior'
          //     })
        }else{
          this.$vux.alert.show({
            title: '提示',
            content: res.data.datas.SL_RSLT_MESG
          })
        }
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 审核通过
    submitPassAudit () {
      let params = {
        handType: '11', // 核保、核赔标志，不知道哪里取
        handleText: '意见很大',
        flowId: taskHandle.req.gwWfLogDto.flowId,
        logNo: taskHandle.req.gwWfLogDto.logNo,
        businessNo: taskHandle.req.gwWfLogDto.businessNo
      }
      let _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定要审核通过吗？',
        onConfirm () {
          carService.submitPassAudit(params).then(res => {
            Object.assign(taskHandle.res, {submitPassAudit: res.data.datas})
            if(res.data.datas.SL_RSLT_CODE ==='999999'){
              _this.$vux.alert.show({
                title: '提示',
                content: res.data.datas.SL_RSLT_MESG
              })
            }
            console.log(res.data.datas);
          }, res => {
            console.log(res.data)
          })
        }
      })
    },
    // 核保任务处理/核保任务详情
    initPageData () {
      this.basicInfo = taskHandle.getBasicInfo()
      this.TCIInfo = taskHandle.getTCIInfo()
      this.VCIInfo = taskHandle.getVCIInfo()
      this.riskSpecialClauses = taskHandle.getRiskSpecialClauses()
      this.sellInfo = taskHandle.getSellInfo()
      this.noAutoCheckInfo = taskHandle.getNoAutoCheckInfo()
    },
    // 影像附件
    viewMaterialAdjunct () {
      let params = {
        businessNo: taskHandle.req.gwWfLogDto.businessNo,
        businessSeqNo: '',
        productRiskCode: taskHandle.req.gwWfLogDto.riskCode,
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
      let planCode = taskHandle.req.gwWfLogDto.riskCode === '1363' ? '1363' : '0000'
      let params = {
        planCode: planCode,
        businessType: 'Proposal',
        productRiskCode: taskHandle.req.gwWfLogDto.riskCode,
        oldPolicyNo: '',
        proposalNo: taskHandle.req.gwWfLogDto.businessNo,
        businessNo: taskHandle.req.gwWfLogDto.businessNo,
        timestamp: ''
      }
      carService.queryCiPlatFormInfo(params).then(res => {
        Object.assign(taskHandle.res, {ciPlatFormInfo: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 查看历次审核意见
    commonViewTrace () {
      let params = {
        businessNo: taskHandle.req.gwWfLogDto.businessNo,
        businessType: taskHandle.req.gwWfLogDto.businessType
      }
      carService.commonViewTrace(params).then(res => {
        Object.assign(taskHandle.res, {commonViewTrace: res.data.datas})

        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    },
    // 获取验车码
    queryCarCheckCode () {
      let params = {
        proposalNo: taskHandle.req.gwWfLogDto.businessNo
      }
      carService.queryCarCheckCode(params).then(res => {
        Object.assign(taskHandle.res, {carCheckCode: res.data.datas})
        console.log(res.data.datas)
      }, res => {
        console.log(res.data)
      })
    }
  },
  computed:{
    showApproveTab(){
      return taskHandle.req.gwWfLogDto.businessType === 'E'
    },
    showOperationTab(){
      return taskHandle.req.viewInd === '0'
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

    .policy-info-group, .approve-info-group {
      background-color: #f5f5f5;
      padding:10px;

      .info-group {
        background-color: #f5f5f5;
        margin-top: 10px;
      }

      .info-group.basic {
        margin-top: 0;
      }
    }

    //weui-cells style
    .weui-cells::before {
      display: none;
    }

    .weui-cells__title {
      font-size: 14px;
      color: #d42319;
    }
    .weui-cells {

      .weui-cell {
        font-size: 14px;
        color: #333333;
      }

      .weui-cell.title {
        font-size: 14px;
        color: #d42319;
      }
    }

    .weui-cells::after {
      display: none;
    }

    .title .weui-cells__title {
      font-size: 13px;
    }

    .title .weui-cell{
      font-size: 13px;

      .vux-cell-bd {
        margin-right: 10px;
        color: #999999;
      }

      .weui-cell__ft {
        color: #333333;
      }
    }

    //cell-form-preview style
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

    // button-card style
    .button-card::before {
      margin: 0 15px;
    }

    .button-card {
      margin: 0;
      height: 40px;
      text-align: center;

      .vux-card-content {

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
        width: 33.028%;
      }
    }

    .button-card.operation::before {
      margin: 0;
    }

    .button-card.operation {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;

      .weui-btn {
        width: 32.333%;
      }
    }

    .info-table {
      color: #333333;
      background-color: #f5f5f5;
      font-size: 14px;
      font-weight: 400;
      margin: 0 15px 10px 15px;

      td.orange {
        color: #ff5b00;
      }

      td.red {
        color: #d42319;
      }

      .vux-table:before {
        border-left-color: #d9d9d9;
      }

      .vux-table:after {
        border-top-color: #d9d9d9;
      }

      .vux-table td:before, .vux-table th:before {
        border-bottom-color: #d9d9d9;
      }

      .vux-table td:after, .vux-table th:after {
        border-right-color: #d9d9d9;
      }
    }

    .info-table.no-cell-border {
      margin: 0;
      border-color: white;

      .vux-table:before {
        border-left-color: white;
      }

      .vux-table:after {
        border-top-color: white;
      }

      .vux-table td:before, .vux-table th:before {
        border-bottom-color: white;
      }

      .vux-table td:after, .vux-table th:after {
        border-right-color: white;
      }
    }

  }
</style>
