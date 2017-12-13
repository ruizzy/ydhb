<template>
  <div id="car-uw-search-result" class="vux-form-preview weui-form-preview">
    <scroller lock-x use-pullup :pullup-config="pullopt" @on-pullup-loading="loadMore" :class="{'scroller-pt':scrollerPt}" ref="scroller" :height="height">
      <div class="box2">
        <div class="weui-form-preview__bd" v-for="bodys in list">
          <div class="weui-form-preview__item" v-for="item in bodys">
            <label class="weui-form-preview__label">{{$t(item.label)}}</label>
            <span class="weui-form-preview__value">{{$t(item.value)}}</span>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { Scroller, Divider, XSwitch, Group, Spinner } from 'vux'
  import {taskQuery} from 'business'
  import carService from '../carService'
  export default {
    name: 'car-uw-search-result',
    data () {
      return {
        height:'none',
        scrollerPt:true,
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
        list: [],
      }
    },
    created() {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: '查询结果'
        });
      this.scrollerPt = false
      carService.undwrtTaskQuery(taskQuery.request).then(res => {
        console.log(res.data);
        taskQuery.response.gwWfLogDtoList = res.data.data.gwWfLogDtoList;
        this.initList(taskQuery.response.gwWfLogDtoList);
      }, res => {
        console.log(res.data);
      });
    },
    methods: {
      initList(datas) {
        let label = {
          text_a: '业务号'
        };
        this.$route.params.isProcess === 'true'? (label.text_b = '投保人',label.text_c = '处理级别') : (label.text_b = '处理人',label.text_c = '撤回');
        for(var data of datas){
          this.list.push(
            [{
              label: label.text_a,
              value: data.businessNo
            }, {
              label: label.text_b,
              value: data.appliName
            }, {
              label: label.text_c,
              value: data.firstTrial
            }]
          );
        }
      },
      loadMore () {
        setTimeout(() => {
          this.initList(taskQuery.response.gwWfLogDtoList);//测试
          this.$nextTick(() => {
            this.$refs.scroller.donePullup()
            if (this.list.length >= 15) {
              this.$refs.scroller.disablePullup()
              console.log('No more data, Pullup disabled!')
            }
          })
        }, 2000)
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
