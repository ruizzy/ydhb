import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import User from '../components/User'
import CarUWHome from '../components/carUWComponents/carUWHome'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
