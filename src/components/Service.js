import Vue from 'vue'

const Service = {};
//ÓÃ»§×¢Ïú
Service.cancelUser = params => {
    return Vue.http.post('/app/cancelUser', params);
};
export default Service;
