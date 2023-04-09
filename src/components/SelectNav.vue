
import { RouterLink } from 'vue-router';

<template>
    <div class="select-nav">
        <ul style="padding: 0;">
          <li><router-link to="/homepage/discover"><em>推荐</em></router-link></li>
          <li><router-link to="/homepage/toplist"><em>排行榜</em></router-link></li>
          <li><router-link to="/homepage/playlist"><em>歌单</em></router-link></li>
          <li><router-link to="/homepage/artist"><em>歌手</em></router-link></li>
        </ul>
    </div>
  </template>
  
<style scoped>
.select-nav ul{
    height: 30px;
    line-height: 30px;
    background-color: rgb(212, 3, 3);
    text-align: center;
    margin: 0;
    
}
.select-nav li{
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    width: 50px;
    line-height: 20px;
    font-size: small;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 12px;
}
.select-nav li:hover{
    background-color: brown;
}
.select-nav a{
  color: white;
  text-decoration: none;
}
</style>