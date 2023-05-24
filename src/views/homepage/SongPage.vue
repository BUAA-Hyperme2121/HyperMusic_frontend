<template>
    <div class="main-div-two"> 
      <div>
        <ul class="list-header">
          <li v-for="(item,index) in songStyle" :key="index" @click="changeClassification(item.name)" 
          :class="{active:item.name==activeName}">{{item.name}}</li>
        </ul>
      </div>
      <content-list :contentList="data" :type="1"></content-list>
      <div class="playlist-pagination">
        <el-pagination class="button" @current-change="changeCurrentPage" background layout="total,prev,pager,next" 
        :current-page="currentPage" :page-size="pageSize" :total="songList.length">
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import ContentList from "../../components/homepage/ContentList.vue";
  import {songStyle} from "../../assets/data/songstyle";
  import {songList} from "../../assets/data/songlist";
  import { getAllSongs } from "@/api/api";
  export default {
    components:{
      ContentList,
    },
    data (){
      return{
        songList:[], //所有歌曲数据
        pageSize: 15,   //页面歌曲数量
        currentPage: 1,  //当前页
        songStyle:[],
        activeName: '全部歌曲',
      }
    },
    created (){
      this.songStyle=songStyle;
      this.changeClassification('全部歌曲');          //调接口时需要改变
    },
    computed:{   //获取当前页面的歌曲数据
      data(){
        return this.songList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
    methods:{
      changeCurrentPage(val){     //改变当前页
        this.currentPage=val;
      },
      changeClassification(name){  //根据类型选取歌曲
        this.activeName=name;
        this.songList = [];
        if(name == '全部歌曲'){
          this.getSongs();             
        }else{
          this.getClassification(name);
        }
      },
      getClassification(style){
        getAllSongs()
          .then(res => {
            this.songList=res.data.music_list.filter(function(item){
              return item.labels.indexOf(style)!=-1;
            });
            this.currentPage=1
          })
          .catch(err => {
            console.log(err)
          })
      }, 
      getSongs(){
        getAllSongs()
          .then(res => {
            this.songList=res.data.music_list
            this.currentPage=1
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
  }
  </script>
    
  <style scoped>
  .main-div-two {
    display: block;
    width: 80%;
    min-height: 200px;
    background-color: white;
    overflow: hidden;
    margin:auto;
    border:2px solid rgb(239, 239, 239);
  }
  .list-header {
    width: 100%;
    padding: 0 40px;
  }
  .list-header li {
      display: inline-block;
      line-height: 40px;
      margin: 15px 20px 0 20px;
      font-size: 20px;
      font-weight: 400;
      color: rgb(70, 70, 70);
      border-bottom: none;
      cursor: pointer;
  }
  .list-header .active {
      color: black;
      font-weight: 600;
      border-bottom: 4px solid black;
  }
  .playlist-pagination {
    width: 100%;
    text-align: center;
  }
  .playlist-pagination > .button{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  </style>