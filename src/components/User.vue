<template>
  <div id="user">
    <div class="head">
      <img class="head-image" src="../assets/img/account-head.png"/>
      <img class="avatar" src="../assets/img/avatar.png"/>
      <p class="username">王仁民</p>
      <p class="company">富德保控股份有限公司</p>
    </div>
    <div class="body">
      <group class="menu" gutter="0">
        <cell title="版本信息" :value="version">
          <img slot="icon" src="../assets/img/version.png"/>
        </cell>
      </group>
      <x-button text="退出登录" type="primary" plain class="exit-button">
      </x-button>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    XButton
  } from 'vux'
  export default {
    name: 'user',
    components: {
      Group,
      Cell,
      XButton
    },
    data () {
      return {
        version: 'v1.0.0'
      }
    },
    mounted () {
      this.$store.commit('UPDATE_SHOW_NAVIGATIONBAR', {
        showNavigationBar: false
      })
    }
  }
</script>

<style lang="less">
  #user {

    .head {
      height: 150px;
      text-align: center;
      width: 100%;

      .head-image {
        height: 150px;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
      }

      .avatar {
        height: 60px;
        position: relative;
        top: 30px;
        width: 60px;
      }

      .username {
        color: white;
        font-size: 14px;
        position: relative;
        top: 30px;
      }

      .company {
        color: white;
        font-size: 12px;
        position: relative;
        top: 30px;
      }
    }

    .body {

      .menu {

        .weui-cell {
          height: 25px;

          .weui-cell__hd {
            height: 24px;
            width: 24px;
            margin-right: 15px;

            img {
              height: 24px;
              width: 24px;
            }
          }

          .vux-cell-bd {
            color: #333333;
            font-size: 14px;
          }

          .weui-cell__ft {
            font-size: 14px;
          }
        }
      }

      .exit-button {
        color: #c20000;
        border-radius: 22.5px;
        border-color: #c20000;
        font-size: 16px;
        height: 45px;
        position: relative;
        top: 20px;
        width: 80%;
      }
    }
  }
</style>
