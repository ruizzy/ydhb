import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import User from '../components/User'
import CarUWHome from '../components/car_undwrt/module/CarUWHome'
import CarUWCheckTask from '../components/car_undwrt/module/CarUWCheckTask'
import CarUWProcessTask from '../components/car_undwrt/module/CarUWProcessTask'
import CarUWSearchResult from '../components/car_undwrt/module/CarUWSearchResult'
import CarUWSearchResult_a from '../components/car_undwrt/module/CarUWSearchResult_a'
import pullupPage from '../components/car_undwrt/module/pullupPage'

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
    path: '/CarUWSearchResult_a/:isProcess',
    component: CarUWSearchResult_a
  },
  {
    path: '/pullupPage',
    component: pullupPage
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
]

const router = new VueRouter({
  routes
})

export default router
