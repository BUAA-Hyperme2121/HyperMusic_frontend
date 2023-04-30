<template>
   <div class="rank-list">
    <p style="color:rgb(212, 3, 3);font-size:18px;font-weight:700;">热搜榜</p>
        <div style="width: 100%;border-top:2px solid rgb(212, 3, 3);border-bottom:2px solid rgb(212, 3, 3);">
            <ul style="list-style-type: none;padding: 0;margin:0; ">
            <li v-for="(item,index) in songsRankList" :key="index">
                <div class="rank-style-one" v-if="index%2==1">
                    <em style="margin-left:30%;font-size: 10px;font-weight: 700;">{{ index+1 }}</em>
                    <a style="margin-left:15%;text-decoration: none; color: black;" href="#">{{ item.name }}</a>
                </div>
                <div class="rank-style-two" v-if="index%2==0">
                    <em style="color:rgb(212, 3, 3);margin-left:30%;font-size: 10px;font-weight: 700;">{{ index+1 }}</em>
                    <a style="margin-left:15%;text-decoration: none; color: black;" href="#">{{ item.name }}</a>
                </div>           
            </li>
        </ul>
        </div>
        <div style="width:100%;text-align: right;">
            <router-link style="text-align:right;font-size:10px;color: black;text-decoration:none;" to="/homepage/toplist">查看更多></router-link>
        </div>
   </div> 
</template>
<script>
import {songsRankList} from "../../assets/data/songsRank";
export default{
    name: "RankList",
    data(){
        return {
            songsRankList: []
        }
    },
    created (){
        this.songsRankList = songsRankList;
    }
}
</script>

<style scoped>
.rank-list {
    width: 100%;
    height: auto;
    background-color: white;
    text-align: center;
    
}
.rank-style-one {
    text-align: left;
    width: 100%;
    height:30px;
    line-height: 30px;
    background-color: white;
    overflow: hidden;
}
.rank-style-two {
    text-align: left;
    width: 100%;
    height:30px;
    line-height: 30px;
    background-color: rgb(248, 248, 248);
    overflow: hidden;
}
</style>