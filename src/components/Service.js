import Vue from 'vue'

const Service = {};
//�û�ע��
Service.cancelUser = params => {
    return Vue.http.post('/app/cancelUser', params);
};
export default Service;
