<template>
  <div>
    <group class="car-uw-menu" :gutter="0">
      <cell class="menu"
            v-for="menu in menus"
            :key="menu.id"
            :title="menu.title"
            :link="menu.link"
            :is-link="true">
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
            link: ''
          },
          {
            id: 202,
            title: '任务处理',
            icon: '',
            link: ''
          }
        ]
      }
    },
    methods: {

    }
}
</script>

<style scoped>
  .car-uw-menu .menu {
    height: 20px;
    font: 14px Helvetica;
  }
</style>
