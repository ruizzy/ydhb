<template>
  <div id="home">
    <img class="head-image" src="../assets/img/home-head.png"/>
    <grid :cols="3">
      <grid-item class="menu" v-for="menu in menus"
                 :key="menu.id"
                 :label="menu.label"
                 :link="menu.link"
                 @on-item-click="selectMenu(menu)">
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
            icon: require('../assets/img/car-uw.png'),
            link: '/carUWHome'
          },
          {
            id: 102,
            label: '非车核保',
            icon: require('../assets/img/non-car-uw.png'),
            link: ''
          },
          {
            id: 103,
            label: '报表中心',
            icon: require('../assets/img/form-center.png'),
            link: ''
          },
          {
            id: 104,
            label: '催办事项',
            icon: require('../assets/img/urgency.png'),
            link: ''
          }
        ]
      }
    },
    mounted () {
      const width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      Array.prototype.forEach.call(
        document.getElementById('home').getElementsByClassName('weui-grid'),
        function (grid) {
          grid.style.width = ((width - 40) / 3).toString() + 'px'
        })

      this.$store.commit('UPDATE_SHOW_NAVIGATIONBAR', {
        showNavigationBar: false
      })

      this.$store.commit('UPDATE_TABBAR_OPT', {
        show: true,
        selected: '0'
      })
    },
    methods: {
      selectMenu (menu) {
        if (menu.link.length === 0) {
          return
        }

        this.$store.commit('UPDATE_SHOW_NAVIGATIONBAR', {
          showNavigationBar: true
        })

        this.$store.commit('UPDATE_SHOW_BACK', {
          showBack: true
        })

        this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: menu.label
        })

        this.$store.commit('UPDATE_TABBAR_OPT', {
          show: false,
          selected: '0'
        })
      }
    }
}
</script>

<style lang="less">
  #home {

    .head-image {
      width: 100%;
      height: 150px;
    }

    .weui-grids:before {
      display: none;
    }

    .weui-grids:after {
      display: none;
    }

    .weui-grids {

      margin: 5px;

      .weui-grid:before {
        display: none;
      }

      .weui-grid:after {
        display: none;
      }

      .weui-grid {

        margin: 5px;
        padding: 5px;
        color: #333333;
        font-size: 14px;

        .weui-grid__icon {
          height: 75px;
          width: 75px;
        }
      }
    }

  }
</style>
