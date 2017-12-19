<template>
  <div id="car-uw-search-result">
    <scroller lock-x
              scrollbarY
              use-pullup
              height="-64"
              :pullup-config="pullUpConfig"
              @on-pullup-loading="loadMoreData">
    <group gutter="0">
      <cell-form-preview
        v-for="(list, index) in data"
        :key="index"
        :list="list"
        :border-intent="false"
        @click.native="goTaskHandle">
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
        noMoreData: false,
        pullUpConfig: {
          content: '上拉加载更多',
          pullUpHeight: 60,
          height: 50,
          autoRefresh: false,
          downContent: '松开加载更多',
          upContent: '上拉加载更多',
          loadingContent: '载入中...',
          clsPrefix: 'xs-plugin-pullup-'
        },

        pagination: taskQuery.req.pagination,
        data: [
          [
            {
              label: '业务号',
              value: '0029902081220170001215'
            },
            {
              label: '投保人',
              value: '测试人员'
            },
            {
              label: '处理级别',
              value: '一级核保'
            }
          ],
          [
            {
              label: '业务号',
              value: '0029902081220170001216'
            },
            {
              label: '投保人',
              value: '测试人员'
            },
            {
              label: '处理级别',
              value: '一级核保'
            }
          ]
        ]
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
      initList(datas) {
        this.$route.params.isProcess === 'true' && (this.labels.text_b = '处理人',this.labels.text_c = '撤回');
        this.list = this.list.concat(datas)
      },
      loadMoreData () {
        taskQuery.refreshPagination(this.pagination)
        setTimeout(() => {
          carService.undwrtTaskQuery(taskQuery.req).then(res => {
            taskQuery.res.gwWfLogDtoList = res.data.datas.gwWfLogDtoList
            let pageSize = taskQuery.req.pagination.rowsPerPage
            let len = taskQuery.res.gwWfLogDtoList.length;
            (len < pageSize) && (this.$refs.scroller.disablePullup(), this.noData = true);
            (len == pageSize && this.noData) && (this.$refs.scroller.enablePullup(), this.noData = false)
            this.initList(taskQuery.res.gwWfLogDtoList)
            this.$nextTick(() => {
              if (taskQuery.req.pagination.pageNo === 1) {
                this.$refs.scroller.reset({
                  top: 0
                })
              } else {
                this.$refs.scroller.donePullup()
                this.$refs.scroller.reset()
              }
            })
          }, res => {
            console.log(res.data);
          })
        }, 500)
      },
      goTaskHandle (bodys) {
        taskHandle.req.gwWfLogDto = bodys
        this.$route.params.isProcess === 'true' ? (taskHandle.req.viewInd = '0') : (taskHandle.req.viewInd = '1')
        this.$router.push({
          path: '/CarUWTaskHandle'
        })
      }
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
