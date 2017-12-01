<template>
  <div id="app">
    <x-header class="navigation-header"
              :left-options="{backText: '', showBack: false}">
    </x-header>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
    <transition name="fade">
      <tabbar v-show="barOPT.show">
        <tabbar-item :link="/home" selected>
          <img slot="icon" src=""/>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :link="/user">
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
        <button class="defaul_btn" @click="closePromp">确定</button>
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
    Tab,
    TabItem,
    XDialog
  } from 'vux'

  export default {
    name: 'app',
    data () {
      return {
        showBar: true,
        barSelected: '0',
      }
    },
    created () {
        // 手机系统类型判断
      const _ua = window.navigator.userAgent
      if (_ua.match(/iPhone|iPod|iPad/i) != null) {
        this.$store.commit('UPDATE_EQ', 'i')
      } else if (_ua.match(/Android/i) != null) {
        this.$store.commit('UPDATE_EQ', 'a')
      }

      // 清除首页 载入中 loading
      let _weui = document.getElementById('_weui')
      if (_weui) {
        _weui.remove()
      }
    },
    methods: {
      onClickBack () {
        if (this.$store.state.isBack) {
          let backPage = this.$store.state.backPage
          if (!backPage) {
            window.history.back()
          } else {
            this.$router.push(backPage)
            this.$store.commit('UPDATE_BACKPAGE', '')
          }
        } else {
          // 登出系统
          // user.logoutFromDevice()
        }
      },
      closePromp () {
        this.prompt.show = false
        let callback = this.$store.state.prompt.callback;
        !!callback && callback()
      }
    },
    computed: {
      direction () {
        return this.$store.state.direction
      },
      title () {
        return this.$store.state.title
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
    },
    components: {
      XHeader,
      Loading,
      Toast,
      Tabbar,
      TabbarItem,
      Tab,
      TabItem,
      XDialog
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

#app .navigation-header {
  background-color: #c20000;
}
</style>
