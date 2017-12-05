<template>
  <div id="app">
    <x-header class="navigation-header"
              :left-options="{backText: '', showBack: showBack}"
              v-show="showNavigationBar">
              <span v-show="title.length">{{ title }}</span>
    </x-header>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
    <transition name="fade">
      <tabbar v-show="barOPT.show">
        <tabbar-item :link="'/home'" selected @on-item-click="selectHome">
          <img slot="icon" src=""/>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :link="'/user'" @on-item-click="selectUser">
          <img slot="icon" src=""/>
          <span slot="label">个人</span>
        </tabbar-item>
      </tabbar>
    </transition>
    <!-- 以下是公共组件 -->
    <loading v-model="showLoading" text="载入中"></loading>
    <toast v-model="toastOPT.show" type="text" :width="toastOPT.width" :class="{ 'toast-text':toastOPT.type =='text' }">
      <div slot>
        <img v-show="toastOPT.type!='text'" class="g-toast-img" :src="'./static/img/' +toastOPT.type+ '.png'"/>
        <p :class="{ 'g-toast-p':toastOPT.type!='text' }">{{toastOPT.msg}}</p>
      </div>
    </toast>
    <!-- 样式待优化 -->
    <x-dialog v-model="prompt.show" class="g-dialog">
      <h3 class="popue-title">提示</h3>
      <div class="popue-content">
        {{prompt.msg}}
      </div>
      <div class="popue-footer">
        <button class="defaul_btn">确定</button>
        <button v-show="prompt.cancel" class="defaul_btn" @click="prompt.show=false">取消</button>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XHeader,
    Loading,
    Toast,
    Tabbar,
    TabbarItem,
    XDialog
  } from 'vux'

  export default {
    name: 'app',

    components: {
      XHeader,
      Loading,
      Toast,
      Tabbar,
      TabbarItem,
      XDialog
    },

    data () {
      return {
      }
    },

    created () {
        // 手机类型判断
      const _ua = window.navigator.userAgent
      if (_ua.match(/iPhone|iPad/i) != null) {
        this.$store.commit('UPDATE_EQ', {eq: 'ios'})
      } else if (_ua.match(/Android/i) != null) {
        this.$store.commit('UPDATE_EQ', {eq: 'android'})
      }

      // 清除首页 载入中 loading
      let _weui = document.getElementById('_weui')
      if (_weui) {
        _weui.remove()
      }
    },

    methods: {
      selectHome () {
        this.$store.commit('UPDATE_SHOW_BACK', {
          showBack: false
        })
        this.$store.commit('UPDATE_SHOW_NAVIGATIONBAR', {
          showNavigationBar: true
        })
      },
      selectUser () {
        this.$store.commit('UPDATE_SHOW_BACK', {
          showBack: false
        })
        this.$store.commit('UPDATE_SHOW_NAVIGATIONBAR', {
          showNavigationBar: false
        })
      }
    },

    computed: {
      direction () {
        return this.$store.state.direction
      },
      showBack () {
        return this.$store.state.showBack
      },
      showNavigationBar () {
        return this.$store.state.showNavigationBar
      },
      title () {
        return this.$store.state.navigationTitle
      },
      showLoading () {
        return this.$store.state.showLoading
      },
      toastOPT () {
        return this.$store.state.toastOPT
      },
      barOPT () {
        return this.$store.state.barOPT
      },
      tabIndex () {
        return this.$store.state.tabIndex
      },
      prompt () {
        return this.$store.state.prompt
      }
    }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  #app .navigation-header {
    background-color: #c20000;

    .vux-header-left {
      top: 3px;
      left: 3px;
      width: 44px;
      line-height: 44px;

      .left-arrow {
        top: 7px;
        left: 7px;
      }
    }

    .vux-header-title {
      color: white;
      font-size: 16px;
      line-height: 44px;
    }
  }

</style>
