<template>
  <div class="main-div">
    <div class="left-content">
      <h4>特色榜单</h4>
      <el-menu
      active-text-color="red"
      background-color="rgb(245, 245, 245)"
      text-color="black"
      default-active="activeIndex"
      @select="handleMenuSelect">
        <el-menu-item index="1">
          <img src="http://p2.music.126.net/ZyUjc7K_GDpD8MO1-GQkmA==/109951166952706664.jpg?param=150y150" alt="" style="height:40px;width: 40px;">
          <span style="margin-left: 30px;font-size: small; font-weight: 600;">热歌榜</span>
        </el-menu-item>
        <el-menu-item index="2">
          <img src="http://p1.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg?param=150y150" alt="" style="height:40px;width: 40px;">
          <span style="margin-left: 30px;font-size: small; font-weight: 600;">新歌榜</span>
        </el-menu-item>
        <el-menu-item index="3">
          <img src="http://p1.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg?param=150y150" alt="" style="height:40px;width: 40px;">
          <span style="margin-left: 30px;font-size: small; font-weight: 600;">飙升榜</span>
        </el-menu-item>
        <el-menu-item index="4">
          <img src="http://p1.music.126.net/iFZ_nw2V86IFk90dc50kdQ==/109951166961388699.jpg?param=150y150" alt="" style="height:40px;width: 40px;">
          <span style="margin-left: 30px;font-size: small; font-weight: 600;">原创榜</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-content">
      <div v-if="activeIndex==1"><Hot :songs="hotlist"></Hot></div>
      <div v-if="activeIndex==2"><New :songs="newlist"></New></div>
      <div v-if="activeIndex==3"><Surge :songs="surgelist"></Surge></div>
      <div v-if="activeIndex==4"><Origin :songs="originlist"></Origin></div>
    </div>
  </div>
</template>

<script>
import New from '@/components/ranklist/New.vue';
import Hot from '@/components/ranklist/Hot.vue';
import Origin from '@/components/ranklist/Origin.vue';
import Surge from '@/components/ranklist/Surge.vue';
import { getRankList1,getRankList2,getRankList3,getRankList4 } from '@/api/api';
import { ranklist1,ranklist2,ranklist3,ranklist4 } from '@/assets/data/ranklist';
export default {
  components : {
    Hot,
    New,
    Origin,
    Surge,
  },
  data(){
    return{
      activeIndex: 1,
      hotlist: [],
      newlist: [],
      surgelist: [],
      originlist: [],
    }
  },
  created(){
    
    this.getHot();
    this.getNew();
    this.getSurge();
    this.getOrigin();
    
  },
  methods:{
    handleMenuSelect(index) {
      this.activeIndex = index;
    },
    getHot(){
      getRankList1()
        .then(res => {
          this.hotlist=res.data.hot_music_rank
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNew(){
      getRankList2()
        .then(res => {
          this.newlist=res.data.new_music_rank
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSurge(){
      getRankList3()
        .then(res => {
          this.surgelist=res.data.surge_music_rank
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOrigin(){
      getRankList4()
        .then(res => {
          this.originlist=res.data.original_music_rank
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style>
.main-div {
  display: flex;
  width: 85%;
  background-color: white;
  overflow: hidden;
  margin:auto;
  border:2px solid rgb(239, 239, 239);
}
.left-content{
  text-align: center;
  float:left;
  width: 15%;
  height: auto;
  background-color: rgb(245, 245, 245);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
.right-content{
  float:right;
  width: 83%;
  padding:1%;
  flex: 1;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
</style>