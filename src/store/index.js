import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tagList: []
    },
    actions: {
    },
    mutations: {
        updateTagList(state,tagList) {
            state.tagList = tagList
        }
    }
})