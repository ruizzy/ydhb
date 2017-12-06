import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import User from '../components/User'
import CarUWHome from '../components/carUWComponents/CarUWHome'
import CarUWCheckTask from '../components/carUWComponents/CarUWCheckTask'
import CarUWProcessTask from '../components/carUWComponents/CarUWProcessTask'
import CarUWSearchResult from '../components/carUWComponents/CarUWSearchResult'
import mocktest from '../components/test/mocktest'
import item from '../components/test/item'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/carUWHome',
    component: CarUWHome
  },
  {
    path: '/carUWCheckTask',
    component: CarUWCheckTask
  },
  {
    path: '/carUWProcessTask',
    component: CarUWProcessTask
  },
  {
    path: '/carUWSearchResult/:isProcess',
    component: CarUWSearchResult
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '*',
    component: Home
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/mocktest', // 测试用zgr
    component: mocktest
  },
  {
    path: '/item', // 测试用zgr
    component: item
  }
]

const router = new VueRouter({
  routes
})

export default router
