<template>
  <div id="car-uw-search-result">
    <scroller lock-x
              scrollbarY
              use-pullup
              height="-64"
              :pullup-config="pullUpConfig"
              v-show="resultList.length"
              @on-pullup-loading="loadMoreData"
              ref="scroller">
      <group gutter="0">
        <cell-form-preview
          v-for="(result, index) in resultList"
          :key="index"
          :list="processResult(result)"
          :border-intent="false"
          @click.native="goTaskHandle(result)">
        </cell-form-preview>
      </group>
    </scroller>
  </div>
</template>

<script>
  import {
    Scroller,
    Group,
    CellFormPreview } from 'vux'
  import {
    taskQuery,
    taskHandle } from 'business'
  import carService from '../carService'
  export default {
    name: 'car-uw-search-result',
    components: {
      Scroller,
      Group,
      CellFormPreview
    },
    data () {
      return {
        isProcess: (this.$route.params.isProcess === 'process'),
        noMoreData: false,
        borderIntent: false,
        pullUpConfig: {
          content: '上拉加载更多',
          pullUpHeight: 0,
          height: 25,
          autoRefresh: false,
          downContent: '松开加载更多',
          upContent: '上拉加载更多',
          loadingContent: '数据加载中',
          clsPrefix: 'xs-plugin-pullup-'
        },
        pagination: taskQuery.req.pagination,
        resultList: []
      }
    },
    created () {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
        navigationTitle: '查询结果'
      })
      this.loadMoreData()
      this.pagination = null
    },
    methods: {
      processResult (result) {
        return [
          {
            label: '业务号',
            value: result.businessNo
          }, {
            label: this.isProcess ? '投保人' : '处理人',
            value: this.isProcess ? result.appliName : result.appliName
          }, {
            label: this.isProcess ? '处理级别' : '撤回',
            value: this.isProcess ? result.firstTrial : result.firstTrial
          }
        ]
      },
      loadMoreData () {
        this.$store.commit('UPDATE_SHOW_LOADING', {
          showLoading: true
        })
        taskQuery.refreshPagination(this.pagination)
        setTimeout(() => {
          carService.undwrtTaskQuery(taskQuery.req).then(res => {
            this.$store.commit('UPDATE_SHOW_LOADING', {
              showLoading: false
            })
            taskQuery.res.gwWfLogDtoList = res.data.datas.gwWfLogDtoList
            let pageSize = taskQuery.req.pagination.rowsPerPage
            let len = taskQuery.res.gwWfLogDtoList.length
            if (len < pageSize) {
              this.$refs.scroller.disablePullup()
              this.noData = true
            }

            if (len === pageSize) {
              this.$refs.scroller.enablePullup()
              this.noData = false
            }

            this.resultList = this.resultList.concat(taskQuery.res.gwWfLogDtoList)

            this.$nextTick(() => {
              this.$refs.scroller.donePullup()

              if (taskQuery.req.pagination.pageNo === 1) {
                this.$refs.scroller.reset({
                  top: 0
                })
              } else {
                this.$refs.scroller.reset()
              }
            })
          }, res => {
            this.$store.commit('UPDATE_SHOW_LOADING', {
              showLoading: false
            })
            console.log(res.data)
          })
        }, 500)
      },
      goTaskHandle (result) {
        taskHandle.req.gwWfLogDto = result
        this.isProcess ? (taskHandle.req.viewInd = '0') : (taskHandle.req.viewInd = '1')
        // 核保任务处理/核保任务详情
        let params = {
          gwWfLogDto: result,
          viewInd: taskHandle.req.viewInd || data
        }
        let _this = this
        carService.undwrtTaskHandle(params).then(res => {
          taskHandle.initTaskHandle(res.data.datas)
          if(res.data.datas.SL_RSLT_CODE ==='999999'){
            this.$router.push({
              path: '/CarUWTaskHandle'
            })
          }else{
            _this.$vux.alert.show({
                title: '提示',
                content: res.data.datas.SL_RSLT_MESG
              })
          }
          console.log(res.data.datas)
        }, res => {
          console.log(res.data)
        })
      },
      //核保通过撤回
      recallTask (result) {
        taskHandle.req.gwWfLogDto = result
        let params = {
          businessNo: result.businessNo
        }
        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确定要撤回吗？',
          onConfirm () {
            carService.recallTask(params).then(res => {
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
    },
    computed: {
    }
  }
</script>

<style lang="less">
  #car-uw-search-result {

    .vux-cell-form-preview  {

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

      :after {
        content: "";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 17px;
      }
    }
  }
</style>
