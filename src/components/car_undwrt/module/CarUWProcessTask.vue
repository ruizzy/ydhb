<template>
  <div id="car-uw-process-task">
    <group label-width="60px"
           label-align="left"
           label-margin-right="15px"
           gutter="0">
      <x-input title="投保单号" placeholder="请输入投保单号" v-model="form.gwWfLogDto.businessNo"></x-input>
      <x-input title="投保人" placeholder="请输入投保人" v-model="form.guProposalMainDto.appliName"></x-input>
      <x-input title="被保人" placeholder="请输入被保人" v-model="form.gwWfLogDto.insuredName"></x-input>
      <x-input title="车主" placeholder="请输入车主" v-model="form.guProposalItemMotorDto.carOwner"></x-input>
      <x-input title="车牌号码" placeholder="请输入车牌号码" v-model="form.guProposalItemMotorDto.licenseNo"></x-input>
      <popup-radio title="险种" :options="page.riskCodes" v-model="form.gwWfLogDto.riskCode" placeholder=""></popup-radio>
      <cell-box align-items="flex-start">
        <x-input title="审核级别" placeholder="请输入" v-model="form.gwWfLogDto.minNodeNo"></x-input>
        <x-input title="至" placeholder="请输入" v-model="form.gwWfLogDto.maxNodeNo"></x-input>
      </cell-box>
      <datetime title="起始时间" v-model="form.gwWfLogDto.flowInTime_ForQueryStart" clear-text="今天" @on-clear="initDate('0')"></datetime>
      <datetime title="结束时间" v-model="form.gwWfLogDto.flowInTime_ForQueryEnd" clear-text="今天" @on-clear="initDate('1')"></datetime>
    </group>
    <x-button text="查询" :link="'/carUWSearchResult/true'" @click.native="searchBtnClicked"></x-button>
  </div>
</template>

<script>
  import {
    Group,
    XInput,
    PopupPicker,
    CellBox,
    Datetime,
    Icon,
    XButton,
    PopupRadio
  } from 'vux'
  import carService from '../carService'
  import {taskQuery} from 'business'
  export default {
    name: 'car-uw-process-task',
    data () {
      return {
        page: taskQuery.page,
        form: {
          gwWfLogDto: {
            businessNo: '',
            riskCode: '',
            minNodeNo: '',
            maxNodeNo: '',
            flowInTime_ForQueryStart: '',
            flowInTime_ForQueryEnd: '',
            insuredName: '',
          },
          guProposalMainDto: {
            appliName: '',
          },
          guProposalItemMotorDto: {
            carOwner: '',
            licenseNo: '',
          },
          pagination: {
            pageNo: 1,
            rowsPerPage: 8
          },
        }
      }
    },
    created () {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: '核保任务处理'
        })
      this.initDate()
    },
    methods: {
      searchBtnClicked () {
        taskQuery.initTaskQuery(this.form);
      },
      initDate(type) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        let today = now.getFullYear() + '-' + cmonth + '-' + day
        if(type == '0'){
            this.form.gwWfLogDto.flowInTime_ForQueryStart = today
        }else if(type == '1'){
            this.form.gwWfLogDto.flowInTime_ForQueryEnd = today
        }else{
            this.form.gwWfLogDto.flowInTime_ForQueryStart = this.setYesterday()
            this.form.gwWfLogDto.flowInTime_ForQueryEnd = today
        }
      },
      setYesterday(){
        let day = new Date();
        day.setTime(day.getTime()-24*60*60*1000);
        let s1 = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
        return s1;
      },
    },
    compute: {
    },
    components: {
      Group,
      XInput,
      PopupPicker,
      CellBox,
      Datetime,
      Icon,
      XButton,
      PopupRadio
    },
  }
</script>

<style lang="less">
  #car-uw-process-task {
    .weui-cell p label{
        font-size: 14px;
    }
    .vux-x-input.weui-cell {
      font-size: 14px;
      height: 25px;
    }

    .vux-cell-box {
      font-size: 14px;
      height: 45px;
    }

    .vux-cell-box.weui-cell {
      padding: 0;

      .vux-x-input.weui-cell {

        label.weui-label {
          padding-right: 5px;
        }
      }
    }

    .vux-datetime.weui-cell {
      height: 25px;

      p {
        color: #333333;
        font-size: 14px;
      }
    }

    .weui-btn {
      color: white;
      background-color: #c20000;
      font-size: 16px;
      height: 45px;
      width: 80%;
      position: relative;
      top: 20px;
    }
  }
</style>
