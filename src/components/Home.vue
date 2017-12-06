<template>
  <div id="home-menu">
    <grid :cols="3">
      <grid-item class="menu" v-for="menu in menus"
                 :key="menu.id"
                 :label="menu.label"
                 :link="menu.link"
                 @on-item-click="selectMenu(menu.label)">
        <img slot="icon" :src="menu.icon"/>
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
            icon: require('../assets/img/carUW.png'),
            link: '/carUWHome'
          },
          {
            id: 102,
            label: '非车核保',
            icon: require('../assets/img/nonCarUW.png'),
            link: '/mocktest'
          },
          {
            id: 103,
            label: '报表中心',
            icon: require('../assets/img/formCenter.png'),
            link: ''
          },
          {
            id: 104,
            label: '催办事项',
            icon: require('../assets/img/emergency.png'),
            link: ''
          }
        ]
      }
    },
    mounted () {
      const width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      console.log(width)

      Array.prototype.forEach.call(
        document.getElementById('home-menu').getElementsByClassName('weui-grid'),
        function (grid) {
          grid.style.width = ((width - 40) / 3).toString() + 'px'
        })

      this.$store.commit('UPDATE_SHOW_BACK', {
        showBack: false
      })

      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
        navigationTitle: ''
      })
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

<style lang="less">
  #home-menu {

    .weui-grids {
      border: none;
      margin: 5px;

      .weui-grid {
        border: none;
        margin: 5px;
        padding: 5px;

        .weui-grid__icon {
          height: 50px;
          width: 50px;
        }

        .weui-grid__label {
          color: #333333;
          font-size: 14px;
        }
      }
    }
  }
</style>
