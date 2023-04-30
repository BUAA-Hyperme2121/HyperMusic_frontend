<template>
  <div class="main-div"> 
    <div class="left-section">
      <p class="all-singer" @click="changeClassification('全部歌手')" :class="{active:activeName=='全部歌手'}">全部歌手</p>
      <ul style="padding: 0;">
        <li style="list-style-type: none;" v-for="(item,index) in artistClassification" :key="index">
        <p class="classify-title">{{item.category}}</p>
        <ul class="classify-section">
          <li v-for="(w,index) in item.list" :key="index"
          @click="changeClassification(w.name)" :class="{active:w.name==activeName}">{{w.name}}</li>
      </ul>
        </li>
      </ul>
    </div>
    <div class="right-section">
      <content-list :contentList="data"></content-list>
      <div class="artist-pagination">
        <el-pagination class="button" @current-change="changeCurrentPage" background layout="total,prev,pager,next" 
        :current-page="currentPage" :page-size="pageSize" :total="artistList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {artistList} from "../../assets/data/artistlist";
import {artistClassification} from "../../assets/data/artistclassify";
import ContentList from "../../components/homepage/ContentList.vue";
export default {
  components:{
    ContentList,
  },
  data(){
    return{
        artistList:[],
        artistClassification:[],
        currentPage:1,
        pageSize:  15,
        activeName: '全部歌手',
    }
  },
  created (){
    this.artistList=artistList;
    this.artistClassification=artistClassification;
  },
  computed:{   //获取当前页面的歌单数据
    data(){
      return this.artistList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    }
  },
  methods:{
    changeCurrentPage(val){     //改变当前页
      this.currentPage=val;
    },
    changeClassification(name){  //根据类型选取歌单
      this.activeName=name;
      this.artistList = [];
      if(name == '全部歌手'){
        this.getAll();
      }else{
        this.getClassification(name);
      }
    },
    getAll(){
      this.currentPage=1;
      this.artistList=artistList;
    },
    getClassification(style){
      this.currentPage=1;
      this.artistList=artistList.filter(function(item){
          return item.style==style;
      });
    }, 
  },
}
</script>


<style>
.all-singer {
  cursor: pointer;
  font-weight: 600;
}
.classify-title{
  color:white;
  background-color: rgb(212, 3, 3);
  text-align: center;
  font-size: large;
  list-style-type: none;
  font-weight:700;
  border-top:1px solid red;
  border-bottom:1px solid red;
}
.classify-section{
  padding: 0;
  margin: 0;
  text-align: center;
}
.classify-section li{
  font-weight: 600;
  cursor: pointer;
  margin: 20px 0;
}
.active {
  color:rgb(212, 3, 3);
}
.artist-pagination {
  width: 100%;
  text-align: center;
}
.artist-pagination > .button{
  margin-top: 20px;
  margin-bottom: 20px;
}
.left-section{
  float:left;
  width: 20%;
  flex: 1;
  text-align: center;
  background-color: rgb(240, 240, 240);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
.right-section{
  float:right;
  width: 80%;
  height: auto;
  min-height: 100px;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
.main-div {
  display:flex;
  width: 80%;
  min-height: 200px;
  background-color: white;
  overflow: hidden;
  margin:auto;
  border:2px solid rgb(239, 239, 239);
}

</style>