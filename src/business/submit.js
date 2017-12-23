/**
 * 提交上级/下发修改
 */


const submit = {}

submit.req = {
}
submit.res = {
}
// ================================ methods ============================
/**
 * @Param obj 
 */
submit.initSuperior = (obj) => {
    Object.assign(submit.req, obj);
};

submit.page = {
    reasonTypes: [
        {
            key: '02',
            value: '其他原因'
        },{
            key: '00',
            value: '--请选择下发原因'
        },{
            key: '01',
            value: '录单岗原因'
        },{
            key: '13',
            value: '录单岗初审岗原因'
        },
    ]
}
export default submit