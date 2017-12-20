<template>
  <div id="car-uw-search-result">
    <scroller lock-x
              scrollbarY
              use-pullup
              height="-64"
              :pullup-config="pullUpConfig"
              @on-pullup-loading="loadMoreData" ref="scroller">
      <group gutter="0">
        <div class="weui-cell vux-cell-form-preview" :class="{'vux-cell-no-border-intent': !borderIntent}" v-for="(list, index) in data">
          <div class="weui-form-preview__bd" @click="goTaskHandle(list)">
            <div class="weui-form-preview__item" >
              <label class="weui-form-preview__label" v-html="labels.text_a"></label>
              <span class="weui-form-preview__value" v-html="list.businessNo"></span>
              <label class="weui-form-preview__label" v-html="labels.text_b"></label>
              <span class="weui-form-preview__value" v-html="list.appliName"></span>
              <label class="weui-form-preview__label" v-html="labels.text_c"></label>
              <span class="weui-form-preview__value" v-html="list.firstTrial"></span>
            </div>
          </div>
        </div>
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
        borderIntent: false,
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
        data: [],
        labels:{
          text_a: '业务号',
          text_b: '处理人',
          text_c: '处理级别'
        },
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
        this.data = this.data.concat(datas)
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
      goTaskHandle (list) {
        taskHandle.req.gwWfLogDto = list
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
@import '../../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../../styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';

.vux-cell-form-preview .weui-form-preview__bd {
  width: 100%;
  padding: 0;
}
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
