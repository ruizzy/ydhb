<template>
  <div>
    <divider>iOS Gradients(v2.7.4)</divider>
    <box gap="10px 10px">
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="undwrtTaskHandle('0')">核保任务处理</x-button>
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="undwrtTaskHandle('1')">核保任务详情</x-button>
      <x-button :gradients="['#A644FF', '#FC5BC4']" @click.native="showNoAutoCheckInfo()">人工核保原因</x-button>
      <x-button :gradients="['#9479DF', '#6F1BFE']" @click.native="queryCiPlatFormInfo()">平台信息</x-button>
      <x-button :gradients="['#FF2719', '#FF61AD']" @click.native="queryCarCheckCode()">获取验车码</x-button>
      <x-button :gradients="['#6F1BFE', '#9479DF']" @click.native="commonViewTrace()">查看历次审核意见</x-button>
      <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="viewMaterialAdjunct()">影像附件</x-button>
      <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="submitPassAudit()">审核通过</x-button>
      <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="submitSuperior()">提交上级</x-button>
      <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="prepareHandle()">下发修改预操作</x-button>
      <x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="submitJunior()">下发修改提交操作</x-button>
    </box>

  </div>
</template>

<script>
import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider } from 'vux'
import {taskHandle} from 'business'
import carService from '../carService'
export default {
  data () {
    return {
      data: taskHandle.res,
    }
  },
  created(){
    this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: taskHandle.req.viewInd == '0' ? '任务处理' : '任务详情'
        });
    taskHandle.res.gwWfLogDto = taskHandle.req.gwWfLogDto
    this.undwrtTaskHandle()
  },
  methods: {
    //下发修改提交操作
    submitJunior () {
      let params = {
            flowId: this.data.prepareHandle.gwWfLogDto.flowId,
            logNo: this.data.prepareHandle.gwWfLogDto.logNo,
            easyScanFlag: 'no',
            nodeNo: this.data.gwWfLogDto.prepareHandle.gwWfLogDto.nodeNo,
            nextStepType: this.data.gwWfLogDto.prepareHandle.gwWfLogDto.flag,
            reasonType: '没原因'//下发原因
        };
      carService.submitJunior(params).then(res => {
          Object.assign(taskHandle.res, {submitJunior: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //下发修改预操作
    prepareHandle () {
      let params = {
            handleText: '下发修改预操作',//下发
            businessType: this.data.gwWfLogDto.businessType,
            businessNo: this.data.gwWfLogDto.businessNo,
            flowId: this.data.gwWfLogDto.flowId,
            logNo: this.data.gwWfLogDto.logNo,
        };
      carService.prepareHandle(params).then(res => {
          Object.assign(taskHandle.res, {prepareHandle: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //提交上级
    submitSuperior () {
      let params = {
            gwWfLogDto: this.data.gwWfLogDto,
            gwSwfNodeDto: {
                nodeNo: '9',
                nodeCName: '高2级'
            },
            handleType: '11',
            easyScanFlag: 'no'
        };
      carService.submitSuperior(params).then(res => {
          Object.assign(taskHandle.res, {submitSuperior: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    submitPassAudit () {
      let params = {
            handType: '11',//核保、核赔标志，不知道哪里取
            handleText: '意见很大',
            flowId: this.data.gwWfLogDto.flowId,
            logNo: this.data.gwWfLogDto.logNo,
            businessNo: this.data.gwWfLogDto.businessNo,
        };
      carService.submitPassAudit(params).then(res => {
          Object.assign(taskHandle.res, {submitPassAudit: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //核保任务处理/核保任务详情
    undwrtTaskHandle (data) {
      let params = {
        gwWfLogDto: taskHandle.req.gwWfLogDto,
        viewInd: taskHandle.req.viewInd || data
      };
      carService.undwrtTaskHandle(params).then(res => {
          taskHandle.res = res.data.datas;
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //影像附件
    viewMaterialAdjunct () {
      let params = {
            businessNo: this.data.gwWfLogDto.businessNo,
            businessSeqNo: '',
            productRiskCode: this.data.gwWfLogDto.riskCode,
            businessType: 'Proposal',
            baseActionType: 'view',
        };
      carService.viewMaterialAdjunct(params).then(res => {
          Object.assign(taskHandle.res, {viewMaterialAdjunct: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //平台信息
    queryCiPlatFormInfo () {
      let planCode = this.data.gwWfLogDto.riskCode == '1363' ? '1363' : '0000'
      let params = {
            planCode: planCode,
            businessType: 'Proposal',
            productRiskCode: this.data.gwWfLogDto.riskCode,
            oldPolicyNo: '',
            proposalNo: this.data.gwWfLogDto.businessNo,
            businessNo: this.data.gwWfLogDto.businessNo,
            timestamp: ''
        };
      carService.queryCiPlatFormInfo(params).then(res => {
          Object.assign(taskHandle.res, {ciPlatFormInfo: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //人工核保原因
    showNoAutoCheckInfo () {
      let params = {
            gwWfLogDto: {
                businessNo: this.data.businessNo
            },
        };
      carService.showNoAutoCheckInfo(params).then(res => {
          Object.assign(taskHandle.res, {showNoAutoCheckInfo: res.data.datas});
          console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
    //查看历次审核意见
    commonViewTrace () {
      let params = {
            businessNo: this.data.gwWfLogDto.businessNo,
            businessType: this.data.gwWfLogDto.businessType,
        };
      carService.commonViewTrace(params).then(res => {
        Object.assign(taskHandle.res, {commonViewTrace: res.data.datas})

        console.log(res.data.datas);
        console.log(taskHandle.res);
      },res => {
        console.log(res.data);
      });
    },
    //获取验车码
    queryCarCheckCode () {
        let params = {
            proposalNo: this.data.gwWfLogDto.businessNo
        };
      carService.queryCarCheckCode(params).then(res => {
        Object.assign(taskHandle.res, {carCheckCode: res.data.datas});
        console.log(res.data.datas);
      },res => {
        console.log(res.data);
      });
    },
  },
  components: {
    XButton,
    Box,
    GroupTitle,
    Group,
    Flexbox,
    FlexboxItem,
    Divider
  },
}
</script>

<style lang="less">
.custom-primary-red {
  border-radius: 99px!important;
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}
</style>