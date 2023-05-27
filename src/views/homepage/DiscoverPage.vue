<template>
    <div>
        <Swiper/>
        <div class="main-div">
            <div class="left">
                <div class="section">
                    <div class="section-title">
                        <img src="@/assets/img/homepageTest/icon.jpg">
                        <em>随便听听</em>
                        <router-link to="/homepage/song">更多></router-link>
                    </div>
                    <content-list :contentList="recommendsongs" :type="1"></content-list>
                </div>
                <div class="section">
                    <div class="section-title">
                        <img src="@/assets/img/homepageTest/icon.jpg">
                        <em>推荐歌单</em>
                        <router-link to="/homepage/playlist">更多></router-link>
                    </div>
                    <content-list :contentList="recommendplaylists" :type="2"></content-list>
                </div>
                <div class="section">
                    <div class="section-title">
                        <img src="@/assets/img/homepageTest/icon.jpg">
                        <em>推荐歌手</em>
                        <router-link to="/homepage/artist">更多></router-link>
                    </div>
                    <content-list :contentList="recommendsingers" :type="3"></content-list>
                </div>
            </div>
            <div class="right">
                <div class="login-section">
                    <div v-if="Object.keys($store.state.userInfo).length == 0">
                      <div style="margin-bottom: 20px;">
                        <em>登录HyperMusic，开始你的音乐之旅</em>
                      </div>     
                      <el-button type="danger" @click="goLogin">用户登录</el-button>
                    </div>
                    <div v-else>
                      <img :src="$store.state.userInfo.avatar_path" style="height: 100px;width: 100px; border-radius: 15%;">
                      <p style="color:brown;font-weight:700;margin:0;">欢迎你，{{$store.state.userInfo.username}}</p>
                    </div>
                </div>
                <RankList :rankList="rankList"/>
            </div>
        </div>
    </div>
</template>
  
<script>
import ContentList from "../../components/homepage/ContentList.vue";
import Carousel from "../../components/homepage/Carousel.vue";
import {recommendsongs, recommendsingers,recommendplaylists} from "../../assets/data/discoverlist";
import RankList from "../../components/homepage/RankList.vue";
import {getAllPlaylists,getAllSingers,getAllSongs,getRankList1} from "@/api/api";
import Swiper from "@/components/homepage/Swiper.vue";
export default {
    components:{
    Carousel,
    ContentList,
    RankList,
    Swiper
},
    data (){
      return{
        recommendsongs: [],
        recommendsingers: [],
        recommendplaylists: [],
        rankList: [],
        isLogin:false,
      }
    },
    mounted (){                      
      /*
      this.recommendsongs=recommendsongs
      this.recommendsingers=recommendsingers
      this.recommendplaylists=recommendplaylists
      this.rankList=songsRankList
      */
      this.getSongs()
      this.getPlaylists()
      this.getSingers()
      this.getRankList()
      if(localStorage.getItem('loginInfo')!=null){
        this.isLogin=true;
      }else{
        this.isLogin=false;
      }
    },
    methods:{
        getSongs(){
          getAllSongs()
            .then(res => {
              this.recommendsongs=res.data.music_list.slice(0,10)
            })
            .catch(err => {
              console.log(err)
            })
        },
        getPlaylists(){
          getAllPlaylists()
            .then(res => {
              this.recommendplaylists=res.data.music_list_all.slice(0,10)
            })
            .catch(err => {
              console.log(err)
            })
        },
        getSingers(){
          getAllSingers()
            .then(res => {
              this.recommendsingers=res.data.singer_list.slice(0,10)
            })
            .catch(err => {
              console.log(err)
            })
        },
        getRankList(){
          getRankList1()
            .then(res => {
              this.rankList=res.data.hot_music_rank.slice(0,20)
            })
            .catch(err => {
              console.log(err)
            })
        },
        goLogin(){
          this.$router.push('/login');
        },
    }
}
</script>
  
<style>
.section{
  width: 100%;
  margin-top: 20px;
  background-color: white;
}
.section-title{
  overflow: hidden;
  height: 60px;
  border-bottom:solid 3px rgb(212, 3, 3);
}
.section-title img{
  height: 60px;
  width: 60px;
  float:left;
  margin-right:20px;
}
.section-title em{
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 500;
  color: black;
  float:left;
}
.section-title a{
  height:60px;
  line-height: 60px;
  font-size:13px;
  color:rgb(212, 3, 3);
  text-decoration: none;
  float:right;
}

.login-section {
  width: 90%;
  min-height: 100px;
  height: auto;
  padding:5%;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  color:grey;
  background-color: rgb(245, 245, 245);
  border-bottom: 1px solid rgb(229, 229, 229);
}
.left{
  padding:1%;
  float:left;
  width: 78%;
  height: auto;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
.right{
  float:right;
  width: 20%;
  flex: 1;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}

.main-div {
  display: flex;
  width: 74%;
  background-color: white;
  overflow: hidden;
  margin:auto;
  border:2px solid rgb(239, 239, 239);
}
</style>