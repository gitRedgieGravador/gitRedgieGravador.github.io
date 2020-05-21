import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import service from '../services/auth'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('token') ? JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])).user : {},
        showSB: false,
        id: localStorage.getItem('id') || null
    },
    getters: {
        isLogin(state) {
            return state.token != null;
        },
        user(state) {
            return state.user
        },
        showSB(state) {
            return state.showSB
        },
        GetId(state) {
            return state.id
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        LOGOUT(state) {
            state.token = null;
            state.user = {};
        },
        SET_SB(state, bool) {
            state.showSB = bool
        },
        SET_ID(state, id) {
            state.id = id
        }
    },
    actions: {
        setSB({ commit }, bool) {
            commit('SET_SB', bool)
        },
        SET_ID({ commit }, id) {
            return new Promise((resolve) => {
                commit('SET_ID', id)
                localStorage.setItem('id', id)
                resolve(true)
            })
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                service.login(user).then(result => {
                    if (result.error) {
                        reject(result)
                    } else {
                        commit('SET_TOKEN', result.body.token);
                        commit('SET_USER', JSON.parse(window.atob(result.body.token.split('.')[1])).user);
                        axios.defaults.headers.common['Authorization'] = result.body.token
                        localStorage.setItem('token', result.body.token)
                        resolve(result);
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        confirm({ commit }, body) {
            return new Promise((resolve, reject) => {
                service.verifyCode(body).then(result => {
                    if (result.error) {
                        reject(result)
                    } else {
                        commit('SET_TOKEN', result.body.token);
                        commit('SET_USER', JSON.parse(window.atob(result.body.token.split('.')[1])).user);
                        axios.defaults.headers.common['Authorization'] = result.body.token
                        localStorage.setItem('token', result.body.token)
                            //axios.defaults.timeout.common = 1000
                        resolve(result);
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                    commit("LOGOUT");
                    delete axios.defaults.headers.common['Authorization']
                    localStorage.removeItem('token')
                    resolve(true)
                })
                //delete axios.defaults.timeout.common
        }
    }
})