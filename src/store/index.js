import Vue from 'vue';
import Vuex from 'vuex';

import { UPDATE_USER_INFO, SAVE_PAGE_DATA, SAVE_TOKEN, SAVE_EVENTS_DATA, UPDATE_MYSCHEDULE } from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userInfo: null,
        pageData: null,
        userToken: null,
        eventsData: null,
        myschedule: {}
    },
    mutations: {
        [UPDATE_USER_INFO](state, payload) {
            state.userInfo = payload;
        },
        [SAVE_PAGE_DATA](state, payload) {
            state.pageData = payload;
        },
        [SAVE_TOKEN](state, payload) {
            state.userToken = payload;
        },
        [SAVE_EVENTS_DATA](state, payload) {
            state.eventsData = payload;
        },
        [UPDATE_MYSCHEDULE](state, payload) {
            state.myschedule = payload;
        }
    },
    actions: {
        [UPDATE_USER_INFO]({ commit }, data) {
            commit(UPDATE_USER_INFO, data.payload);
        },
        [SAVE_PAGE_DATA]({ commit }, data) {
            commit(SAVE_PAGE_DATA, data.payload);
        },
        [SAVE_TOKEN]({ commit }, data) {
            commit(SAVE_TOKEN, data.payload);
        },
        [SAVE_EVENTS_DATA]({ commit }, data) {
            commit(SAVE_EVENTS_DATA, data.payload);
        },
        [UPDATE_MYSCHEDULE]({ commit }, data) {
            commit(UPDATE_MYSCHEDULE, data.payload);
        }
    },
    getters: {
        getUserToken: state => {
            return state.userToken;
        },
        getPageData: state => {
            return state.pageData;
        },
        getUserInfo: state => {
            return state.userInfo;
        },
        getEventsData: state => {
            return state.eventsData;
        },
        getMySchedule: state => {
            return state.myschedule;
        }
    }
});