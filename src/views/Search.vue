<template>
   <div class="background-div">
        <div class="search-main-div">
            <div class="search">
                <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords">
                <div class="search-button" @click="goSearch()">
                    <i class="icon iconfont icon-sousuo"></i>
                </div>
            </div>
            <div class="search-result">
                <nav class="searchList-nav">
                    <span :class="{isActive: toggle=='Songs'}" @click="changeView('Songs')">歌曲</span>
                    <span :class="{isActive: toggle=='PlayLists'}" @click="changeView('PlayLists')">歌单</span>
                    <span :class="{isActive: toggle=='Artists'}" @click="changeView('Artists')">歌手</span>
                    <span :class="{isActive: toggle=='Users'}" @click="changeView('Users')">用户</span>
                </nav>
            </div>
            <div v-if="currentView=='SearchSongs' && render"><SearchSongs /></div>
            <div v-if="currentView=='SearchPlayLists' && render"><SearchPlayLists /></div>
            <div v-if="currentView=='SearchArtists' && render"><SearchSingers /></div>
            <div v-if="currentView=='SearchUsers' && render"><SearchUsers /></div>
        </div>
   </div> 
</template>

<script>
import { mapGetters } from 'vuex';
import SearchSongs from '../components/search/SearchSongs.vue';
import SearchPlayLists from '../components/search/SearchPlayLists.vue';
import SearchSingers from '../components/search/SearchSingers.vue';
import SearchUsers from '../components/search/SearchUsers.vue';
export default {
    
    components: {
        SearchSingers,
        SearchPlayLists,
        SearchSongs,
        SearchUsers,
    },
    data(){
        return {
            render: true,
            SongsRes: [],
            PlayListsRes: [],
            ArtistsRes: [],
            UsersRes: [],
            toggle: 'Songs',
            currentView: 'SearchSongs',      //当前页面
            keywords: '',             //搜索字符串
        }
    },
    computed: {
        ...mapGetters([
            'searchRender',
        ])
    },
    watch:{
        searchRender(){
            this.forceRerender();
            this.$store.commit('setSearchRender',true);
        }
    },
    methods: {
        goSearch(){
            this.$router.push({path:'/search',query:{keywords:this.keywords}});
            this.forceRerender();
        },
        changeView(component){
            this.currentView = 'Search'+component;
            this.toggle=component;
        },
        async forceRerender() {
            this.render=false;
            await this.$nextTick();
            this.render=true;
        }
    },
    
    
}

</script>

<style>
.background-div {
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 248);
  padding-bottom: 100px;
}
.search-main-div {
  width: 75%;
  background-color: white;
  min-height: 600px;
  margin:auto;
  border:2px solid rgb(239, 239, 239);
}
.search{
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: center;
    margin: 20px;
}
.search input{
    display: inline-block;
    height: 38px;
    width: 25%;
    border-radius: 3px;
    vertical-align: middle;
}
.search .search-button{
    display: inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    background-color: rgb(239, 239, 239);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
    text-align: center;
    vertical-align: middle;

}
.search .icon{
    font-size: 22px;
    font-weight: 600;
    color:grey;
}
.search .icon:hover{
    color:black;
    cursor: pointer;
}
.search-result{
  margin: auto;
  margin-top: 40px;
  background-color: rgb(248, 248, 248);
  width: 80%;
  position: relative;
}
.searchList-nav {
  justify-content: space-around;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 20px;
  color: black;
  border-left: 2px solid rgb(212, 212, 212);
  border-right: 2px solid rgb(212, 212, 212);
}
.searchList-nav span {
    font-size: 20px;
    text-align: center;
    width: 25%;
    line-height: 50px;
    cursor: pointer;
    border-top: 2px solid rgb(212, 212, 212);
    border-bottom: 2px solid rgb(212, 212, 212);
}

.searchList-nav .isActive {
  font-weight: 600;
  border-top:5px solid red;
  border-bottom:0;
  background-color: white;
}

</style>