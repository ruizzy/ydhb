<template>
  <div id="car-uw-search-result">
    <x-table :cell-bordered="false">
      <thead>
      <tr>
        <th>业务号</th>
        <th>{{ isProcess ? '投保人' : '处理人'}}</th>
        <th>{{ isProcess ?'处理级别': '撤回'}}</th>
        <th v-show="isProcess"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Apple</td>
        <td>$1.25</td>
        <td> x 1</td>
        <td v-show="isProcess">高</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import { XTable } from 'vux'
  import {taskQuery} from 'business'
  import carService from '../carService'
  export default {
    name: 'car-uw-search-result',
    components: { XTable },
    data () {
      return {
      }
    },
    created() {
      this.$store.commit('UPDATE_NAVIGATION_TITLE', {
          navigationTitle: '查询结果'
        });
      carService.undwrtTaskQuery(taskQuery.temp).then(res => {
        console.log(res.data);
      },res => {
        console.log(res.data);
      });
    },
    computed: {

      isProcess () {
        return this.$route.params.isProcess === 'true'
      }
    }
  }
</script>

<style lang="less">

  #car-uw-search-result {
    thead {
      tr {
        background-color: #e5e5e5;
        font-size: 14px;
      }
    }

    tbody {
      tr {
        font-size: 14px;
      }
    }
  }
</style>
