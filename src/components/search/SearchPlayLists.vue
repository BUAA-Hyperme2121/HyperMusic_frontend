<template>
    <div class="playlists-list">
            <el-table :data="data" style="width: 100%;font-size: 10px;" :show-header="false" stripe >
                <el-table-column label="播放" width="30px">
                    <div class="operation">
                        <el-link @click="Play(scope.row)" class="operation-link">
                            <el-tooltip content="播放" placement="top" >
                            <i class="el-icon-video-play"></i>
                            </el-tooltip>
                        </el-link>
                    </div>
                </el-table-column>
                <el-table-column label="歌单封面" width="80px">
                    <template slot-scope="scope">
                        <el-image style="width: 60px;height: 60px;" :src="scope.row.cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="歌单名" width="200px"></el-table-column>
                <el-table-column  label="歌曲数量">
                    <template slot-scope="scope">
                        {{scope.row.num}}首
                    </template>
                </el-table-column>
                <el-table-column label="创作者" width="150px">
                    <template slot-scope="scope">
                        by {{scope.row.creator}}
                    </template>
                </el-table-column>
                <el-table-column label="收藏量">
                    <template slot-scope="scope">
                        收藏：{{scope.row.likes}}
                    </template>
                </el-table-column>
                <el-table-column label="播放量">
                    <template slot-scope="scope">
                        收听：{{scope.row.viewCounts}}
                    </template>
                </el-table-column>
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
                    </div>
                </el-table-column>
            </el-table>
            <div class="playlists-pagination">
                <el-pagination class="button" @current-change="changeCurrentPage" background layout="total,prev,pager,next" 
                :current-page="currentPage" :page-size="pageSize" :total="PlayListsRes.length">
                </el-pagination>
            </div>
    </div> 
</template>


<script>
export default{
    props: ['PlayListsRes'],
    data(){
        return{
            currentPage:1,
            pageSize:  3,
        }
    },
    computed:{   //获取当前页面的歌单数据
        data(){
        return this.PlayListsRes.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
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
.playlists-list {
    margin:auto;
    width: 80%;
    min-height:200px;
}
.playlists-pagination {
  width: 100%;
  text-align: center;
}
.playlists-pagination > .button{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>