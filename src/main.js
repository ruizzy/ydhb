import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import {translationsZh, translationsEn} from './resources/i18n'
import store from './store/store'
import './config'

require('./assets/sass/app.scss')

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('zh', translationsZh)
Vue.i18n.set('zh')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
