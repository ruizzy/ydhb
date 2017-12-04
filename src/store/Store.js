import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n'

Vue.use(Vuex)

/**
 * @Param direction 转场方向
 * @Param title 页面标题
 * @Param showLoading 遮罩层
 * @Param isBack 控制是否跳出应用
 * @Param appType 应用环境 [pro, dev]
 * @Param eq 硬件平台 [ios, android]
 * @Param timeout 超时时间
 * @Param toastOPT 弹出框配置
 * @Param barOPT tabbar配置
 * @Param backPage 返回页面
 */
const state = {
  direction: 'forward',
  navigationTitle: '',
  showBack: false,
  showNavigationBar: true,
  showLoading: false,
  appType: 'dev',
  eq: 'ios',
  periodPay: '11',
  timeout: 1200000,
  toastOPT: {
    show: false,
    type: 'success',
    width: '',
    msg: ''
  },
  barOPT: {
    show: true,
    selected: '0'
  },
  tabIndex: '0',
  prompt: {
    show: false,
    msg: '',
    callback: null,
    cancel: false
  },
  backPage: '',
  scrollY: 0
}

const mutations = {
  UPDATE_SCROLLY (state, xx) {
    state.scrollY = xx
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  UPDATE_NAVIGATION_TITLE (state, obj) {
    state.title = obj.title
  },
  UPDATE_SHOW_BACK (state, obj) {
    state.showBack = obj.showBack
  },
  UPDATE_SHOW_NAVIGATIONBAR (state, obj) {
    state.showNavigationBar = obj.showNavigationBar
  },
  LOADING (state, ifShow) {
    state.showLoading = ifShow
  },
  UPDATE_TOAST (state, toastOPT) {
    state.toastOPT = {
      show: toastOPT.show || true,
      type: toastOPT.type || 'success',
      width: toastOPT.width || '',
      msg: toastOPT.msg || ''
    }
  },

  UPDATE_EQ (state, obj) {
    state.eq = obj.eq
  },
  UPDATE_BAROPT (state, obj) {
    state.barOPT = {
      show: obj.show !== undefined ? obj.show : true,
      selected: obj.selected || '0'
    }
  },
  UPDATE_TABINDEX (state, tabIndex) {
    state.tabIndex = tabIndex
  },
  UPDATE_PROMPT (state, prompt) {
    state.prompt = {
      show: prompt.show == undefined ? true : prompt.show,
      msg: prompt.msg,
      callback: prompt.callback == undefined ? null : prompt.callback,
      cancel: !!prompt.cancel
    }
  },
  UPDATE_BACKPAGE (state, backPage) {
    state.backPage = backPage
  },
  UPDATE_PERIODPAY (state, value) {
    state.periodPay = value
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    i18n: VuexI18n.store
  }
})

Vue.use(VuexI18n.plugin, store)

export default store
