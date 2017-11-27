import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import layoutRoutes from './views/layout/layoutRoutes'

Vue.use(VueRouter)
let routes = [];

//路由模块注册（请关注）
routes = routes.concat(layoutRoutes);


const router = new VueRouter({
  routes
})
NProgress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

router.afterEach(transition => {
	NProgress.done();
});
export default router;