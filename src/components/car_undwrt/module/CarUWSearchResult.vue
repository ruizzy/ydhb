<template>
  <div id="car-uw-search-result">
    <scroller lock-x
              scrollbarY
              use-pullup :pullup-config="pullopt" @on-pullup-loading="loadMore" ref="scroller">
      <div v-show="noData" class="xs-plugin-pullup-container xs-plugin-pullup-undefined xs-plugin-pullup-up gl-nodata">查询不到更多的记录</div>
    </scroller>
  </div>
</template>

<script>
  import {
    Scroller,
    Group,
    Cell } from 'vux'
  import {
    taskQuery,
    taskHandle } from 'business'
  import carService from '../carService'
  export default {
    name: 'car-uw-search-result',
    components: {
      Scroller,
      Group,
      Cell
    },
    data () {
      return {
        noData: false,
        height:'500px',
        labels: {
          text_a: '业务号',
          text_b: '投保人',
          text_c: '处理级别',
        },
        pullopt: {
          content: '上拉加载更多',
          pullUpHeight: 60,
          height: 50,
          autoRefresh: false,
          downContent: '松开加载更多',
          upContent: '上拉加载更多',
          loadingContent: '载入中',
          clsPrefix: 'xs-plugin-pullup-'
        },

        pagination: taskQuery.req.pagination,
        list: []
      }
    },
    created () {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
        navigationTitle: '查询结果'
      })
      this.loadMore()
      this.pagination = null
    },
    methods: {
      initList(datas) {
        this.$route.params.isProcess === 'true' && (this.labels.text_b = '处理人',this.labels.text_c = '撤回');
        this.list = this.list.concat(datas)
      },
      loadMore () {
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
</style>
