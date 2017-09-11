import Vue from 'vue';
import App from './App.vue'
import { router } from './routing';
import { store } from './store/index';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})