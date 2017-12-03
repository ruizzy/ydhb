import Vue from 'vue'

const Service = {};

Service.getItem = params => {
    return Vue.http.post('/car/getItem', params);
};
export default Service;
