import Vue from 'vue'
import Vuex from "vuex"
import article from './article'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{},
    mutations:{},
    modules:{article}
});

export default store;