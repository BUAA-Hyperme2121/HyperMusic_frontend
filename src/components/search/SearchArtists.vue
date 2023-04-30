<template>
    <div class="artists-list">
            <ul class="content">
                <li class="content-item" v-for="(item,index) in data" :key="index">
                    <div class="item-outline">
                        <img class="item-img" :src="item.cover">
                    </div>
                    <p class="item-title">{{item.title}}</p>
                </li>
            </ul>
            <div class="artists-pagination">
                <el-pagination class="button" @current-change="changeCurrentPage" background layout="total,prev,pager,next" 
                :current-page="currentPage" :page-size="pageSize" :total="ArtistsRes.length">
                </el-pagination>
            </div>
    </div> 
</template>


<script>
export default{
    props: ['ArtistsRes'],
    data(){
        return{
            currentPage:1,
            pageSize:  10,
        }
    },
    computed:{   //获取当前页面的歌单数据
        data(){
        return this.ArtistsRes.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    methods:{
        changeCurrentPage(val){     //改变当前页
            this.currentPage=val;
        },
    }
}
</script>

<style>
.artists-list {
    margin:auto;
    width: 80%;
    min-height:200px;
}
.artists-pagination {
  width: 100%;
  text-align: center;
}
.artists-pagination > .button{
  margin-top: 20px;
  margin-bottom: 20px;
}
.content {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    padding:0;
}

.content-item {
    width: 18%;
    margin: 20px 1%;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
    cursor: pointer;
    
}
.item-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    box-orient: vertical;
    line-clamp: 2;
    margin: 10px 8px;
}

.item-img {
    width: 100%;
    transition: all 0.4s ease;
}

.item-outline {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    overflow: hidden;
}

</style>