<template>
    <div class="songs-list">
            <el-table :data="data" style="width: 100%" :show-header="false" stripe >
                <el-table-column label="播放" width="25px">
                    <div class="operation">
                        <el-link @click="Play(scope.row)" class="operation-link">
                            <el-tooltip content="播放" placement="top" >
                            <i class="el-icon-video-play"></i>
                            </el-tooltip>
                        </el-link>
                    </div>
                </el-table-column>
                <el-table-column prop="name" label="歌曲名称" width="500px"></el-table-column>
                <el-table-column prop="singer" label="歌手" width="200px"></el-table-column>
                <el-table-column prop="duration" label="时长"></el-table-column>
                <el-table-column label="操作">
                    <div class="operation">
                        <el-link @click="addToPlaylist(scope.row)" class="operation-link">
                            <el-tooltip content="加入播放列表" placement="top" >
                            <i class="el-icon-plus"></i>
                            </el-tooltip>
                        </el-link>
                        <el-link @click="addToFavorites(scope.row)" class="operation-link">
                            <el-tooltip content="收藏" placement="top">
                            <i class="el-icon-star-on"></i>
                            </el-tooltip>
                        </el-link>
                        <el-link @click="shareSong(scope.row)" class="operation-link">
                            <el-tooltip content="分享" placement="top" >
                            <i class="el-icon-share"></i>
                            </el-tooltip>
                        </el-link>
                        <el-link @click="downloadSong(scope.row)" class="operation-link">
                            <el-tooltip content="下载" placement="top" >
                            <i class="el-icon-download"></i>
                            </el-tooltip>
                        </el-link>
                    </div>
                </el-table-column>
            </el-table>
            <div class="songs-pagination">
                <el-pagination class="button" @current-change="changeCurrentPage" background layout="total,prev,pager,next" 
                :current-page="currentPage" :page-size="pageSize" :total="SongsRes.length">
                </el-pagination>
            </div>
    </div> 
</template>
<script>
export default{
    props: ['SongsRes'],
    data(){
        return{
            currentPage:1,
            pageSize:  3,
        }
    },
    computed:{   //获取当前页面的歌单数据
        data(){
        return this.SongsRes.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
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
.songs-list {
    margin:auto;
    width: 80%;
    min-height:200px;
}
.songs-pagination {
  width: 100%;
  text-align: center;
}
.songs-pagination > .button{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>