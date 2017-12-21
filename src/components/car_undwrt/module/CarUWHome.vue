<template>
  <div id="car-uw-menu">
    <group gutter="0">
      <cell :border-intent="false"
            v-for="menu in menus"
            :key="menu.id"
            :title="menu.title"
            :is-link="true"
            :link="menu.link">
      </cell>
    </group>
  </div>
</template>

<script>
  import {
    Group,
    Cell } from 'vux'
  export default {
    components: {
      Group,
      Cell
    },
    data () {
      return {
        menus: [
          {
            id: 201,
            title: '任务查看',
            icon: '',
            link: '/carUWCheckTask'
          },
          {
            id: 202,
            title: '任务处理',
            icon: '',
            link: '/carUWProcessTask'
          }
        ]
      }
    },
    created () {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
        navigationTitle: '车险核保'
      })
    },
    methods: {
    }
}
</script>

<style lang="less">
  #car-uw-menu {

    .weui-cell {
      height: 25px;
      color: #333333;
      font-size: 14px;
    }
  }
</style>
