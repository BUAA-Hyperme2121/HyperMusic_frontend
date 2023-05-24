import Vue from 'vue'
import Vuex from 'vuex'
import information from './information'
import song from './song'

Vue.use(Vuex)
const userInfo = {
    state: {
        id: 1,
        isAdmin: true,
        username: "shyJyt",
        gender: "male",
        introduction: "这个人很懒，什么都没有留下",
        //关注用户数量
        follow_num: 0,
        //粉丝数量
        fan_num: 0,
        //动态数量
        activity_num: 0,
        location: "中国",
        avatar_path: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        email: "2873704761@qq.com",
        isLogin: true,
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