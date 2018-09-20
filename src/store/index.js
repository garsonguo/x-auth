import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '../api/user.js'
import { setToken } from '../libs/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tagList: []
    },
    actions: {
        handleLogin({commit},formLogin) {
            return new Promise((resolve, reject) => {
                login(formLogin).then(res => {
                    if(res.status === 200) {
                        setToken(formLogin)
                        resolve(true)
                    }
                })
            })
        }
    },
    mutations: {
        updateTagList(state, tagList) {
            state.tagList = tagList
        }
    }
})