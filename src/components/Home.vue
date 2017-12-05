<template>
  <div id="home">
    <grid class="home-menu" :cols="3">
      <grid-item class="menu" v-for="menu in menus"
                 :key="menu.id"
                 :label="menu.label"
                 :link="menu.link"
                 @on-item-click="selectMenu(menu.label)">
        <img slot="icon" src="menu.icon"/>
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import {
    Grid,
    GridItem,
    Icon } from 'vux'
  export default {
    components: {
      Grid,
      GridItem,
      Icon
    },
    data () {
      return {
        menus: [
          {
            id: 101,
            label: '车险核保',
            icon: 'success',
            link: '/carUWHome'
          },
          {
            id: 102,
            label: '非车核保',
            icon: '',
            link: '/mocktest'
          },
          {
            id: 103,
            label: '报表中心',
            icon: '',
            link: ''
          },
          {
            id: 104,
            label: '催办事项',
            icon: '',
            link: ''
          }
        ]
      }
    },

    methods: {
      selectMenu (title) {
        this.$store.commit('UPDATE_SHOW_BACK', {
          showBack: true
        })

        this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: title
        })
      }
    }
}
</script>

<style scoped>
  .home-menu {
    margin: 10px;
  }

  .home-menu .menu {

  }
</style>
