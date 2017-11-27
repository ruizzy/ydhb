import HelloFromVux from './componrnts/HelloFromVux.vue'

let routes = [
    {
        path: '/',
        component: HelloFromVux,
        name: '',
        hidden: true
    },
    {
        path: '*',
        component: HelloFromVux,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: HelloFromVux,
        name: '',
        hidden: true
    },
];

export default routes;