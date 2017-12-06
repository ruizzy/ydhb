import Vue from 'vue'

const carService = {};
//核保任务查询
carService.undwrtTaskQuery = params => {
    return Vue.http.post('/car/undwrtTaskQuery', params);
};
//核保任务处理
carService.undwrtTaskHandle = params => {
    return Vue.http.post('/car/undwrtTaskHandle', params);
};
export default carService;
