<template>
    <transition name="slide-fade">
        <div class="the-aside" v-if="showAside">
            <div style="display: inline-block;">
                <h2 class="title">播放列表</h2>
            </div>
            <div style="display: inline-block;margin-left: 106px;">
                <el-link @click="deleteAll" class="operation-link" style="">
                    <el-tooltip content="清空播放列表" placement="top" >
                        <i style="color:white" class="el-icon-delete"></i>
                    </el-tooltip>
                </el-link>
            </div>
            <ul class="menus">
                <li v-for="(item,index) in listOfSongs" :key="index" :class="{'is-play': id==item.id}" >
                    <div style="display: inline-block; width: 190px;" @click="toplay(item.id,item.music_path,item.cover_path,item.music_name)">{{item.music_name}}</div>
                    <div style="display: inline-block; margin-left: 0px;" v-if="id!=item.id">
                        <el-link @click="deleteFromPlayList(item)" class="operation-link" style="">
                            <el-tooltip content="删除" placement="top" >
                                <i style="color:white" class="el-icon-delete"></i>
                            </el-tooltip>
                        </el-link>
                    </div>
                </li>
            </ul>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'showAside',
            'listOfSongs',
            'id',              //正在播放的音乐id
        ])
    },
    methods:{
        toplay: function(id, music_path, cover_path, music_name) {
            this.$store.commit('setIsPlay', true)
            this.$store.commit('setId', id);
            this.$store.commit('setPicUrl',cover_path);
            this.$store.commit('setUrl',music_path);
            this.$store.commit('setTitle', music_name)
        },
        deleteFromPlayList(item){
            this.$store.commit('deleteListOfSongs',item)
        },
        deleteAll(){
            this.$store.commit('deleteAll')
        }
    }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .2s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.the-aside {
    font-size: 14px;
    width: 250px;
    height: 370px;
    position: fixed;
    right: 0;
    top: 150px;
    z-index: 99;
    background-color: rgba(0,0,0,0.7);
    color:white;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(218, 218, 218, 0.5);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    overflow: hidden;
}

.title {
    padding-left: 20px;
    margin: 10px 0;
    box-sizing: border-box;
}

.menus {
    width: 100%;
    height: calc(100% - 19px);
    cursor: pointer;
    z-index: 100;
    overflow: scroll;
    white-space: nowrap;
    padding: 0px;
}
.menus li {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px rgba(255, 255, 255, 0.7);
}
.menus li:hover{
    background-color: rgba(255, 93, 93,0.7);
    color: white;
}
.is-play{
    color:rgb(249, 102, 131);
    font-weight: bold;
}
</style>