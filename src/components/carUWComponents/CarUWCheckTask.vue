<template>
  <div id="car-uw-check-task">
    <group label-width="60px"
           label-align="left"
           label-margin-right="15px"
           gutter="0">
      <x-input title="投保单号" placeholder="请输入投保单号" v-model="policyNo"></x-input>
      <popup-picker title="险种" v-model="product"></popup-picker>
      <popup-picker title="业务类型" v-model="service"></popup-picker>
      <cell-box align-items="flex-start">
        <x-input title="审核级别" placeholder="请输入" v-model="startLevel"></x-input>
        <x-input title="至" placeholder="请输入" v-model="endLevel"></x-input>
      </cell-box>
      <datetime title="查询时间" v-model="searchDate"></datetime>
      <group-title>任务状态</group-title>
      <checker v-model="taskStatus" type="checkbox" default-item-class="task-default" selected-item-class="task-selected">
        <checker-item  v-for="status in taskStatuses"
                       :key="status.id"
                       :value="status.value">
          {{status.value}}
        </checker-item>
      </checker>
    </group>
    <x-button text="查询" :link="'/'"></x-button>
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
  export default {
    name: 'car-uw-check-task',
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
    data () {
      return {
        policyNo: '',
        product: ['08-汽车险', '0802-机动车商业险'],
        service: ['申报'],
        startLevel: '',
        endLevel: '',
        searchDate: '2017-12-05',
        taskStatus: [{
          id: '301',
          value: '待处理'
        }],
        taskStatuses: [
          {
            id: '301',
            value: '待处理'
          },
          {
            id: '302',
            value: '待处理'
          },
          {
            id: '303',
            value: '待处理'
          },
          {
            id: '304',
            value: '待处理'
          }
        ]
      }
    },

    create () {
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  #car-uw-check-task {
    .vux-x-input {
      font-size: 14px;
      height: 25px;
    }

    .vux-cell-box {
      font-size: 14px;
      height: 45px;
      padding: 0;
    }

    .vux-datetime {
      height: 25px;
    }

    .weui-btn {
      color: white;
      background-color: #c20000;
      height: 45px;
      width: 80%;
      position: relative;
      top: 20px;
    }

    .task-default {
      border: 1px solid #ececec;
      padding: 5px 15px;
    }
    .task-selected {
      border: 1px solid green;
    }
  }
</style>
