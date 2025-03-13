import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dimensions: null,
    },
    mutations: {
        dimensionsData(state, value) {
            state.dimensions = value

        }
    },

});
