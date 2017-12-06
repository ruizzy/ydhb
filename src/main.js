import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import {translationsZh, translationsEn} from './resources/i18n'
import store from './store/Store'
import './config'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('zh', translationsZh)
Vue.i18n.set('zh')

new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app-box')
