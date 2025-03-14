import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dimensions: null,
        thickness:null,
    },
    mutations: {
        dimensionsData(state, value) {
            state.dimensions = value
            

        },
        thicknessData(state,value)
        {
            state.thickness=value
        }
    },

});
