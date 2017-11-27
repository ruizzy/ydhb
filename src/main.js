// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("./assets/sass/app.scss")

import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './reg'
import {translationsZh, translationsEn} from "./resources/i18n"
import store from './vuex/store'

import Vuex from 'vuex'

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.i18n.add('en', translationsEn);
Vue.i18n.add('zh', translationsZh);

Vue.i18n.set('zh');

import "./config"// 引入配置
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
