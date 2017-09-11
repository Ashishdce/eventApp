import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
var get = require('lodash.get');

Vue.use(VeeValidate)
Vue.use(VueAxios, axios);

export const HTTP = axios.create({
    baseURL: 'http://localhost:4201/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Application/json'
    }
})

export const lodash = get;