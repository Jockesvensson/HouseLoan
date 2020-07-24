import Vue from 'vue'
import Vuex from 'vuex'
import helpText from './helpText'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        helpText: helpText,
    },
    getters: {
        getHelpText: state => {
            return state.helpText
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})