<template>
  <div id="car-uw-search-result" class="vux-form-preview weui-form-preview">
    <scroller lock-x use-pullup :pullup-config="pullopt" @on-pullup-loading="loadMore" ref="scroller" :height="height">
      <div class="box2">
        <div class="weui-form-preview__bd" v-for="item in list" @click="goTaskHandle(item)">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">{{$t(labels.text_a)}}</label>
            <span class="weui-form-preview__value">{{$t(item.businessNo)}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">{{$t(labels.text_b)}}</label>
            <span class="weui-form-preview__value">{{$t(item.appliName)}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">{{$t(labels.text_c)}}</label>
            <span class="weui-form-preview__value">{{$t(item.firstTrial)}}</span>
          </div>
        </div>
      </div>
      <div v-show="noData" class="xs-plugin-pullup-container xs-plugin-pullup-undefined xs-plugin-pullup-up gl-nodata">查询不到更多的记录</div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller, Divider, XSwitch, Group, Spinner } from 'vux'
  import {taskQuery, taskHandle} from 'business'
  import carService from '../carService'
  export default {
    name: 'car-uw-search-result',
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
        list: [],
      }
    },
    created() {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: '查询结果'
        });
      this.loadMore();
      this.pagination = null;
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
            taskQuery.res.gwWfLogDtoList = res.data.datas.gwWfLogDtoList;
            let pageSize = taskQuery.req.pagination.rowsPerPage;
            let len = taskQuery.res.gwWfLogDtoList.length;
            (len < pageSize) && (this.$refs.scroller.disablePullup(),this.noData = true);
            (len == pageSize && this.noData) && (this.$refs.scroller.enablePullup(),this.noData = false)
            this.initList(taskQuery.res.gwWfLogDtoList);
            this.$nextTick(() => {
              if(taskQuery.req.pagination.pageNo === 1){
                this.$refs.scroller.reset({
                      top: 0
                    })
              }else{
                this.$refs.scroller.donePullup()
                this.$refs.scroller.reset()
              }
            })
          },res => {
            console.log(res.data);
          });
        }, 500)
      },
      goTaskHandle(bodys) {
        taskHandle.req.gwWfLogDto = bodys;
        this.$route.params.isProcess === 'true' ? (taskHandle.req.viewInd = '0'): (taskHandle.req.viewInd = '1')
        this.$router.push({
                path: '/CarUWTaskHandle'
              })
      }
    },
    computed: {
    },
    components: { 
      Scroller,
      Divider,
      XSwitch,
      Group,
      Spinner
    },
  }
</script>

<style lang="less">
@import '../../../styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
  #car-uw-search-result {
    .weui-form-preview__bd {
      border-bottom: 1px solid #D6D6D6;
    }
  }
  #app {
    .weui-form-preview__bd {
      border-bottom: 1px solid #D6D6D6;
    }
  }
</style>
