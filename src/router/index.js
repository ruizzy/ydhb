import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import User from '../components/User'
import CarUWHome from '../components/car_undwrt/module/CarUWHome'
import CarUWCheckTask from '../components/car_undwrt/module/CarUWCheckTask'
import CarUWProcessTask from '../components/car_undwrt/module/CarUWProcessTask'
import CarUWSearchResult from '../components/car_undwrt/module/CarUWSearchResult'
import CarUWTaskHandle from '../components/car_undwrt/module/CarUWTaskHandle'
import Submit from '../components/car_undwrt/module/Submit'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    component: Home
  }, {
    path: '/carUWHome',
    component: CarUWHome
  }, {
    path: '/carUWCheckTask',
    component: CarUWCheckTask
  }, {
    path: '/carUWProcessTask',
    component: CarUWProcessTask
  }, {
    path: '/carUWSearchResult/:isProcess',
    component: CarUWSearchResult
  }, {
    path: '/CarUWTaskHandle',
    component: CarUWTaskHandle
  }, {
    path: '/submit/:isJunior',
    component: Submit
  }, {
    path: '/user',
    component: User
  }, {
    path: '*',
    component: Home
  }, {
    path: '/',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
