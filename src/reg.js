import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import layoutRoutes from './views/layout/layoutRoutes'
import carUWRoutes from './views/car_undwrt/carUWRoutes'

Vue.use(VueRouter)
let routes = [];

//路由模块注册（请关注）
routes = routes.concat(layoutRoutes,carUWRoutes);


const router = new VueRouter({
  routes
})
NProgress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/home') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  /*if (!user && to.path != '/home') {
    next({ path: '/home' })
  } else {*/
    next()
  //}
})

router.afterEach(transition => {
	NProgress.done();
});
export default router;