<template>
    <div class="toplist-container">
      <el-row>
        <!-- 歌单封面 -->
        <el-col :span="6">
          <div class="toplist-cover">
            <img :src="cover" alt="" />
          </div>
        </el-col>
        <el-col :span="18">
          <!-- 歌单名称、操作按钮 -->
          <div class="toplist-header">
            <div class="toplist-title">{{name}}</div>
            <div class="toplist-actions">
              <el-button type="default" icon="el-icon-plus" @click="playAll">播放全部歌曲</el-button>
            </div>
          </div>
          <!-- 歌单简介 -->
          <div class="toplist-description">{{description}}</div>
        </el-col>
      </el-row>
      <h2>歌曲列表</h2>
      <!-- 歌曲列表 -->
      <SongList :songs="songs"/>
    </div>
  </template>
  
  <script>
  import {mixin} from "../../mixins"
  import SongList from "./SongList.vue"; 
  export default {
    mixins: [mixin],
    name: "ToplistPage",
    props: ["songs"],
    components:{
      SongList
    },
    data() {
      return {
        name: "热歌榜",
        cover: "http://p2.music.126.net/ZyUjc7K_GDpD8MO1-GQkmA==/109951166952706664.jpg?param=150y150",
        description: "这是HyperMusic热歌榜",
      };
    },
    methods: {
      playAll(){
        this.toplayList(this.songs)
      },
    }
  };
  </script>
  
  <style scoped>
  .toplist-container {
    padding: 20px;
  }
  
  .toplist-cover {
    width: 200px;
    height: 200px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }
  
  .toplist-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .toplist-header {
    margin-top: 20px;
    width: 100%;
  }
  
  .toplist-title {
    font-size: 30px;
    padding-bottom: 30px;
  }
  
  .toplist-actions {
    display: flex;
  }
  
  .toplist-actions button {
    margin-left: 10px;
  }
  
  .toplist-description {
    margin-top: 20px;
    font-size: small;
    width: 100%;
    color: gray;
  }
  
  .el-table__body-wrapper {
    overflow-y: auto;
    max-height: 400px;
  }
  
  .el-table__empty-block {
    padding: 20px;
    text-align: center;
    font-size: 16px;
  }
  
  .el-table__empty-text {
    margin-top: 10px;
  }
  </style>