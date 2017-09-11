import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from './components/home-component.vue';
import EventsComponent from './components/events-component.vue';
import MyScheduleComponent from './components/myschedule-component.vue';
import LoginComponent from './components/login-component.vue'
import MainComponent from './components/main-component.vue'
import MyPassComponent from './components/mypass-component.vue'
import { pageDataResolver } from './resolvers';


Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/main',
        component: MainComponent,
        beforeEnter: (to, from, next) => {
            next(pageDataResolver());
        },
        children: [{
                path: '/',
                redirect: 'home'
            },
            {
                path: 'home',
                component: HomeComponent

            },
            {
                path: 'day/:id',
                component: EventsComponent
            },
            {
                path: 'myschedule',
                component: MyScheduleComponent
            },
            {
                path: 'mypass',
                component: MyPassComponent
            },
            {
                path: '**',
                redirect: 'home'
            }
        ]
    },
    {
        path: '**',
        redirect: '/login'
    }
]

export const router = new VueRouter({
    routes
});