import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../store/Store'
import NProgress from 'nprogress'
import {context, authName, authValue, timeout} from './config'
const commit = store.commit || store.dispatch;
// 遮罩数量，防止遮罩误关
let shadeNum = 0,
    nprogressNum = 0,
    token = null;

axios.defaults.headers.post['Content-Type'] = 'application/json';
/**
 * axios 公共配置
 * [1] 拦截请求
 * [2] 拦截返回
 */
axios.interceptors.request.use((config) => {
    // 超时设置
    config.timeout = config.timeout || timeout
    config.url = context + config.url
    //config.url = "http://127.0.0.1:18021" + config.url
    if(!token) {
        let user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            token = user.token || null;
        }

    }
    if(token) {
        config.headers[authName] = authValue + ' ' + token;
    }
    // 遮罩
    let shade = !config.shade ? false : true;
    if(!!shade && typeof(commit) == 'function') {
        commit("LOADING", true, config.shadeMsg);
        shadeNum++;
    }
    nprogressNum == 0 && NProgress.start();
    nprogressNum++;
    console.log("请求参数："+JSON.stringify(config.data, null, 4));
    if(config.data && config.data.content_type) {
        delete config.data.content_type;
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // 转换 post 中的 data
        config.transformRequest = [(data) => {
            (!!data) && (data = serializeObject(data))
            return data
        }]
    }

    return config;
}, (error) => {

    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    // 关闭遮罩
    let shade = response.config.shade
    shade = shade == undefined ? true : shade
    if(shade && shadeNum && typeof(commit) == 'function') {
        commit("LOADING", false);
        --shadeNum;
    }
    (!--nprogressNum) && NProgress.done();
    console.log("返回参数："+JSON.stringify(response.data.datas, null, 4));
    if (typeof response.data.datas == "object") {
        let code = response.data.data.code,
            msg = response.data.data.msg || "登录失效"
        if (code == "099") {
            this.$router.push('/login');
        }
    }
    return response;
}, (error) => {

    // 关闭遮罩
    shadeNum = 0;
    nprogressNum = 0;
    commit("LOADING", false)
    NProgress.done();
    console.log(error)
    return Promise.reject(error);
})

function serializeObject(obj) {
    var o = '';
    for (var name in obj) {
        if (obj[name] !== undefined) {
            o += name + '=' + obj[name] + '&';
        } else {
            o += name + '=' + '&';
        }
    }
    if (o.length > 0) o = o.substring(0, o.length - 1);
    return o;
}

function plugin(Vue) {
    Vue.http = axios

    Vue.store = store
}

Vue.use(plugin)
