import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import User from '../components/User'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes
})

export default router
