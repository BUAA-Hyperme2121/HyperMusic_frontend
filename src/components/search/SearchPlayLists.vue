<template>
    <div class="playlists-list">
            <el-table :data="data" style="width: 100%;font-size: 10px;" :show-header="false" stripe >
                <el-table-column label="歌单封面" width="80px">
                    <template slot-scope="scope">
                        <el-image style="width: 60px;height: 60px; cursor: pointer; border-radius: 10%;" :src="scope.row.cover_path" @click="goPlaylist(scope.row)"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="歌单名" width="400px">
                    <template slot-scope="scope">
                        <p style="cursor: pointer;" @click="goPlaylist(scope.row)">{{ scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column  label="歌曲数量">
                    <template slot-scope="scope">
                        <p>{{scope.row.music_num}}首歌曲</p>
                    </template>
                </el-table-column>
                <el-table-column label="创作者" width="200px">
                    <template slot-scope="scope">
                       <p style="cursor: pointer;" @click="goUser(scope.row)">by {{scope.row.creator_name}}</p> 
                    </template>
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
import { PlayListsRes } from '@/assets/data/searchRes';
import { getPlaylistRes } from '@/api/api';
export default{
    data(){
        return{
            PlayListsRes:[],
            currentPage:1,
            pageSize:  10,
        }
    },
    computed:{   //获取当前页面的歌单数据
        data(){
        return this.PlayListsRes.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    mounted(){
        //this.PlayListsRes=PlayListsRes
        this.getPlaylistsRes()
    },
    methods:{
        changeCurrentPage(val){     //改变当前页
            this.currentPage=val;
        },
        goPlaylist(row){
            this.$router.push({path: `/album/${row.id}`});
        },
        goUser(row){
            this.$router.push({path: `/user/home`,query:{user_id:row.creator_id}});
        },
        getPlaylistsRes(){
            getPlaylistRes(this.$route.query.keywords)
                .then(res => {
                    this.PlayListsRes=res.data.musiclists
                })
                .catch(err => {
                    console.log(err)
                })
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