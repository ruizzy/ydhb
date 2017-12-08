<template>
  <div id="car-uw-check-task">
    <group label-width="60px"
           label-align="left"
           label-margin-right='15px'
           gutter="0">
      <x-input title="投保单号" placeholder="请输入投保单号" v-model="form.gwWfLogDto.businessNo"></x-input>
      <popup-picker title="险种" v-model="riskCode" :data="product" ></popup-picker>
      <popup-picker title="业务类型" v-model="businessType" :data="service"></popup-picker>
      <cell-box align-items="flex-start">
        <x-input title="审核级别" placeholder="请输入" v-model="form.gwWfLogDto.firstTrial"></x-input>
        <x-input title="至" placeholder="请输入" v-model="form.gwWfLogDto.firstTrial"></x-input>
      </cell-box>
      <datetime title="查询时间" v-model="form.gwWfLogDto.submitTime"></datetime>
      <group-title>任务状态</group-title>
      <checker v-model="form.gwWfLogDto.nodeStatus" type="checkbox" default-item-class="task-default" selected-item-class="task-selected">
        <checker-item  v-for="status in taskStatuses"
                       :key="status.id"
                       :value="status">
          {{status.value}}
        </checker-item>
      </checker>
    </group>
    <x-button text="查询" :link="'/carUWSearchResult/false'" @click.native="searchBtnClicked"></x-button>
  </div>
</template>

<script>
  import {
    Group,
    GroupTitle,
    XInput,
    PopupPicker,
    CellBox,
    Datetime,
    Checker,
    CheckerItem,
    XButton
  } from 'vux'
  import carService from '../carService'
  import {taskQuery} from 'business'
  export default {
    name: 'car-uw-check-task',
    data () {
      return {
        form: {
          gwWfLogDto: {
            businessNo: '132323',
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
        },
        riskCode:[],
        businessType:[],
        product: [['08-汽车险', '0802-机动车商业险']],
        service: [['申报']],
        taskStatuses: [
          {
            id: 301,
            value: '待处理'
          },
          {
            id: 302,
            value: '暂存'
          },
          {
            id: 303,
            value: '下发修改'
          },
          {
            id: 304,
            value: '处理完毕'
          }
        ]
      }
    },

    create () {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: '核保任务查询'
        })
    },
    methods: {
      searchBtnClicked () {
        taskQuery.initTaskQuery(this.form);
      }
    },
    components: {
      Group,
      GroupTitle,
      XInput,
      PopupPicker,
      CellBox,
      Datetime,
      Checker,
      CheckerItem,
      XButton
    },
  }
</script>

<style lang="less">
  #car-uw-check-task {
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
        border-color: #ececec;
        color: #999999;
      }
      .task-selected {
        border-color: #c20000;
        color: #c20000;
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
