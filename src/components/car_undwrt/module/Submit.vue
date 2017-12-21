<template>
  <div id="submit">
    <scroller lock-x scrollbarY height="-149">
      <div class="submit-content">
        <group gutter="0" v-for="(result, index) in resultList" :key="index">
          <cell class="title"
                :border-intent="false"
                value-align="right"
                title="选择节点" >
            <img :src="(selectedNode === result.nodeNum ? imgSelected: imgDeselected)"
                 @click="selectedNode = result.nodeNum"/>
          </cell>
          <cell :border-intent="false"
                value-align="right"
                title="节点号" :value="result.nodeNum"></cell>
          <cell :border-intent="false"
                value-align="right"
                title="节点名称"
                :value="result.nodeName">
          </cell>
        </group>
        <group gutter="0" v-if="isJunior">
          <popup-radio title="下发原因"
                       :options="page.businessTypes"
                       placeholder="请选择原因">
          </popup-radio>
        </group>
      </div>
    </scroller>

    <x-button :text="isJunior ? '下发修改' : '提交上级'">
    </x-button>

  </div>
</template>

<script>
  import {
    Cell,
    Group,
    PopupRadio,
    Scroller,
    XButton} from 'vux'
  import {taskQuery} from 'business'
  export default {
    name: 'submit',
    components: {
      Cell,
      Group,
      PopupRadio,
      Scroller,
      XButton
    },
    data () {
      return {
        isJunior: (this.$route.params.isJunior === 'junior'),
        imgSelected: require('../../../assets/img/selected.png'),
        imgDeselected: require('../../../assets/img/deselect.png'),
        selectedNode: 0,
        resultList: [
          {
            nodeNum: 2,
            nodeName: '首席核保'
          },
          {
            nodeNum: 5,
            nodeName: '首席核保'
          },
          {
            nodeNum: 8,
            nodeName: '首席核保'
          }
        ],
        page: taskQuery.page
      }
    },
    created () {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
        navigationTitle: this.isJunior ? '下发修改' : '提交上级'
      })
    }
  }
</script>

<style lang="less">
  #submit {
    background-color: #f5f5f5;
    padding:10px 10px 0;

    .weui-cells::before {
      display: none;
    }

    .weui-cells {
      margin-bottom: 10px;

     .weui-cell {
       font-size: 14px;
       height: 20px;

       .vux-cell-bd {
         color: #999999;
       }

       .weui-cell__ft {
         color: #333333;
       }
     }

      .weui-cell.title {

        .vux-cell-bd {
          color: #d42319;
        }

        .weui-cell__ft {
          height: 20px;

          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .weui-cells::after {
     display: none;
    }

    .weui-btn {
      color: white;
      background-color: #d42319;
      font-size: 16px;
      height: 45px;
      width: 80%;
      position: absolute;
      bottom: 10px;
    }
  }
</style>
