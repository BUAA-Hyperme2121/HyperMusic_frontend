import Vue from 'vue'
import Vuex from 'vuex'
import information from './information'
import song from './song'

Vue.use(Vuex)
const userInfo = {
    state: {

    },
    mutations: {
        //增加关注数量
        addFollowNum(state) {
            state.follow_num++;
        },
        //减少关注数量
        reduceFollowNum(state) {
            state.follow_num--;
        }
    },
    actions: {},
};
const store = new Vuex.Store({
    modules: {
        information,
        song,
        userInfo
    }
})

export default store