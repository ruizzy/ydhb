import Vue from 'vue'
import { refreshTime } from '../config/config'
const layoutService = {
    refreshTime: null
};


layoutService.requestLogin = params => {
    return Vue.http.post('/jwt/auth', params, { shade: true });
};

layoutService.refresh = () => {
    layoutService.cancellation();
    let user = sessionStorage.getItem('user');
    if (user) {
        layoutService.refreshTime = window.setInterval(() => {
            Vue.http.post('/refresh', {}, { shade: false });
        }, refreshTime);
    }
};

layoutService.cancellation = () => {
    if (layoutService.refreshTime) {
        window.clearInterval(layoutService.refreshTime);
        layoutService.refreshTime = null;
    }
};
export default layoutService;
