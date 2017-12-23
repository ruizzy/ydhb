import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import {translationsZh, translationsEn} from './resources/i18n'
import store from './store/Store'
import './config'
import {ConfirmPlugin,AlertPlugin} from 'vux'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('zh', translationsZh)
Vue.i18n.set('zh')

Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app-box')
