<template>
  <div id="car-uw-process-task">
    <group label-width="60px"
           label-align="left"
           label-margin-right="15px"
           gutter="0">
      <x-input title="投保单号" placeholder="请输入投保单号" v-model="policyNo"></x-input>
      <x-input title="投保人" placeholder="请输入投保人" v-model="policyholder"></x-input>
      <x-input title="被保人" placeholder="请输入被保人" v-model="insured"></x-input>
      <x-input title="车主" placeholder="请输入车主" v-model="carOwner"></x-input>
      <x-input title="车牌号码" placeholder="请输入车牌号码" v-model="plateNumber"></x-input>
      <popup-picker title="险种" v-model="product"></popup-picker>
      <popup-picker title="业务类型" v-model="service"></popup-picker>
      <cell-box align-items="flex-start">
        <x-input title="审核级别" placeholder="请输入" v-model="startLevel"></x-input>
        <x-input title="至" placeholder="请输入" v-model="endLevel"></x-input>
      </cell-box>
      <datetime title="查询时间" v-model="searchDate"></datetime>
    </group>
    <x-button text="查询" :link="'/'"></x-button>
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
    XButton
  } from 'vux'
  export default {
    name: 'car-uw-process-task',
    components: {
      Group,
      XInput,
      PopupPicker,
      CellBox,
      Datetime,
      Icon,
      XButton
    },
    data () {
      return {
        policyNo: '',
        policyholder: '',
        insured: '',
        carOwner: '',
        plateNumber: '',
        product: ['08-汽车险', '0802-机动车商业险'],
        service: ['申报'],
        startLevel: '',
        endLevel: '',
        searchDate: '2017-12-05'
      }
    },
    create () {

    },
    methods: {

    },
    compute: {

    }
  }
</script>

<style scoped lang="less">
  #car-uw-process-task {

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
  }
</style>
