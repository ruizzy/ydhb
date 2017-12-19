<template>
  <div id="car-uw-check-task">
    <group label-width="60px"
           label-align="left"
           label-margin-right='15px'
           gutter="0">
      <x-input title="投保单号"
               placeholder="请输入投保单号"
               v-model="form.gwWfLogDto.businessNo">
      </x-input>
      <popup-radio title="险种"
                   :options="page.riskCodes"
                   v-model="form.gwWfLogDto.riskCode"
                   placeholder="请选择险种">
      </popup-radio>
      <popup-radio title="业务类型"
                   :options="page.businessTypes"
                   v-model="form.gwWfLogDto.businessType"
                   placeholder="请选择业务类型">
      </popup-radio>
      <cell-box align-items="flex-start">
        <x-input title="审核级别"
                 placeholder="请输入"
                 v-model="form.gwWfLogDto.minNodeNo">
        </x-input>
        <x-input title="至"
                 placeholder="请输入"
                 v-model="form.gwWfLogDto.maxNodeNo">
        </x-input>
      </cell-box>
      <datetime title="起始时间"
                v-model="form.gwWfLogDto.flowInTime_ForQueryStart"
                clear-text="今天"
                @on-clear="initDate('0')">
      </datetime>
      <datetime title="结束时间"
                v-model="form.gwWfLogDto.flowInTime_ForQueryEnd"
                clear-text="今天"
                @on-clear="initDate('1')">
      </datetime>
      <group-title>任务状态</group-title>
      <checker v-model="nodeStatus"
               type="checkbox"
               default-item-class="task-default"
               selected-item-class="task-selected">
        <checker-item v-for="status in page.taskStatuses"
                       :key="status.key"
                       :value="status.value">
          {{status.key}}
        </checker-item>
      </checker>
    </group>
    <x-button text="查询"
              :link="'/carUWSearchResult/false'"
              @click.native="searchBtnClicked">
    </x-button>
  </div>
</template>

<script>
  import {
    Group,
    GroupTitle,
    XInput,
    CellBox,
    Datetime,
    Checker,
    CheckerItem,
    XButton,
    PopupRadio
  } from 'vux'
  import carService from '../carService'
  import {taskQuery} from 'business'
  export default {
    name: 'car-uw-check-task',
    data () {
      return {
        page: taskQuery.page,
        nodeStatus: ['1', '2,3'],
        form: {
          gwWfLogDto: {
            businessNo: '',
            riskCode: '',
            businessType: '',
            minNodeNo: '',
            maxNodeNo: '',
            flowInTime_ForQueryStart: '',
            flowInTime_ForQueryEnd: '',
            nodeStatus: ''
          },
          pagination: {
            pageNo: 1,
            rowsPerPage: 8
          }
        }
      }
    },

    created () {
      this.initDate()
    },
    methods: {
      searchBtnClicked () {
        if (this.nodeStatus) {
          this.form.gwWfLogDto.nodeStatus = this.nodeStatus.join(',')
        }
        taskQuery.initTaskQuery(this.form)
      },
      initDate (type) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        let today = now.getFullYear() + '-' + cmonth + '-' + day
        if (type === '0'){
          this.form.gwWfLogDto.flowInTime_ForQueryStart = today
        } else if (type === '1'){
          this.form.gwWfLogDto.flowInTime_ForQueryEnd = today
        } else {
          this.form.gwWfLogDto.flowInTime_ForQueryStart = this.setYesterday()
          this.form.gwWfLogDto.flowInTime_ForQueryEnd = today
        }
      },
      setYesterday () {
        let day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000)
        let s1 = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
        return s1
      }
    },
    components: {
      Group,
      GroupTitle,
      XInput,
      CellBox,
      Datetime,
      Checker,
      CheckerItem,
      XButton,
      PopupRadio
    }
  }
</script>

<style lang="less">
  #car-uw-check-task {

    .weui-cells {
      color: #333333;
      font-size: 14px;
    }

    .weui-cell {
      height: 25px;
    }

    .vux-cell-box {
      height: 45px;
      padding: 0;

      .vux-x-input {

        label.weui-label {
          padding-right: 5px;
        }
      }
    }

    .weui-cells__title {
      color: #333333;
      font-size: 14px;
      height: 45px;
      line-height: 45px;
      margin: 0;
    }

    .vux-checker-box {
      height: 35px;
      padding: 0 10px 10px 10px;

      .vux-checker-item {
        border-radius: 3px;
        border: 1px solid;
        height: 18px;
        font-size: 14px;
        line-height: 18px;
        margin: 0 5px 5px 5px;
        padding: 5px 10px;
      }

      .task-default {
        border-color: #c8c8cd;
        color: #999999;
      }
      .task-selected {
        border-color: #d42319;
        color: #d42319;
      }
    }

    .weui-btn {
      color: white;
      background-color: #d42319;
      font-size: 16px;
      height: 45px;
      width: 80%;
      position: relative;
      top: 20px;
    }
  }

  .vux-popup-dialog {
    font-size: 14px;
  }

  .dp-container {
    font-size: 14px;

    .dp-header {

      .dp-item {
        font-size: 14px;
      }

      .dp-item.vux-datetime-cancel {
        color: #d42319;
      }

      .dp-item.vux-datetime-clear {
        color: #00a4ff;
      }
    }
  }
</style>
