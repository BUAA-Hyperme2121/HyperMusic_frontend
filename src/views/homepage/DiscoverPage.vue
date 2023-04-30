<template>
    <div>
        <carousel />
        <div class="main-div">
            <div class="left">
                <div class="section" v-for="(item,index) in recommendList" :key="index">
                    <div class="section-title">
                        <img src="@/assets/img/homepageTest/icon.jpg">
                        <em>{{item.name}}</em>
                        <router-link to="/homepage/playlist" v-if="index==1">更多></router-link>
                        <router-link to="/homepage/artist" v-if="index==2">更多></router-link>
                    </div>
                    <content-list :contentList="item.list"></content-list>
                </div>
            </div>
            <div class="right">
                <div class="login-section">
                    <div v-if="0">
                    <em>登录HyperMusic，开始你的音乐之旅</em>
                    <el-button type="danger" >用户登录</el-button>
                    </div>
                    <div v-if="1">
                    <img src="@/assets/img/homepageTest/icon.jpg" style="height: 100px;width: 100px;">
                    <p style="color:brown;font-weight:700;margin:0;">欢迎你，{{user.name }}</p>
                    <p style="color:brown;font-weight:700;margin:0;">动态:{{user.social}} | 关注:{{ user.following }} | 粉丝:{{user.follower}}</p>
                    </div>
                </div>
                <RankList />
            </div>
        </div>
    </div>
</template>
  
<script>
import ContentList from "../../components/homepage/ContentList.vue";
import Carousel from "../../components/homepage/Carousel.vue";
import {recommendList} from "../../assets/data/discoverlist";
import RankList from "../../components/homepage/RankList.vue";
export default {
    components:{
        Carousel,
        ContentList,
        RankList,
    },
    data (){
    return{
        recommendList: [],
        user:{
          name: "落雁",
          social: "1",
          follower: "14",
          following: "20"
        }
    }
    },
    created(){
        this.recommendList=recommendList;
    },
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
  width: 75%;
  height: auto;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
.right{
  float:right;
  width: 23%;
  flex: 1;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}

.main-div {
  display: flex;
  width: 80%;
  background-color: white;
  overflow: hidden;
  margin:auto;
  border:2px solid rgb(239, 239, 239);
}
</style>