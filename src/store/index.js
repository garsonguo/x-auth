import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tagList: [],
        isCollapsed: false
    },
    actions: actions,
    mutations: mutations
})