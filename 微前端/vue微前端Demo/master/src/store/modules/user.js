import serviceManger from "@/service";
import { resetRouter } from '@/router'

import cookie from "js-cookie";
let app = "vue-admin";

const user = {
    state: {
        token: cookie.get(app),
        name: "",
        avatar: "",
        roles: ''
    },
    getters: {
        getname: state => state.name,
        gettoken: state => state.token,
        getroles: state => state.roles,
        getavatar: state => state.avatar
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                serviceManger.login(username, userInfo.password).then(response => {
                    if (response) {
                        cookie.set(app, response.result); 
                        commit("SET_TOKEN", response.result);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                });
            });
        },
        // // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                serviceManger.getInfo(state.token).then(response => {
                    if (response) {
                        const data = response.result;
                        commit("SET_ROLES", data.roles);
                        commit("SET_NAME", data.name);
                        commit("SET_AVATAR", data.avatar);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                });
            });
        },
        //退出登录
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                serviceManger
                    .logout(state.token)
                    .then(() => {
                        commit("SET_TOKEN", "");
                        commit('SET_ROLES', "")
                        cookie.remove(app);
                        resetRouter()
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', "")
                cookie.remove(app);
                resolve()
            })
        },
    }
};
export default user;