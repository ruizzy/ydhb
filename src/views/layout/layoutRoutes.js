import home from './componrnts/home.vue'

let routes = [
    {
        path: '/',
        component: home,
        name: '',
        hidden: true
    },
    {
        path: '*',
        component: home,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: home,
        name: '',
        hidden: true
    },
];

export default routes;