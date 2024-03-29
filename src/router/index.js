import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        // alias: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/home',
        redirect: '/',
        component: Home
    },
    // {
    //     path: '/search',
    //     name: 'Search',
    //     component: Home
    // },
    {
        path: '/about',
        name: 'About',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')

    },
    {
        path: '*',
        name: 'PageNotFound',
        component: () =>
            import ('../views/PageNotFound.vue')

    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
