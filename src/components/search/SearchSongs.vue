<template>
    <div class="songs-list">
            <el-table :data="data" style="width: 100%" :show-header="false" stripe >
                <el-table-column label="播放" width="25px">
                    <div class="operation" slot-scope="scope">
                        <el-link class="operation-link" @click="Play(scope.row)">
                            <el-tooltip content="播放" placement="top" >
                            <i class="el-icon-video-play"></i>
                            </el-tooltip>
                        </el-link>
                    </div>
                </el-table-column>
                <el-table-column label="歌曲名称" width="500px">
                    <template slot-scope="scope">
                        <p style="cursor: pointer;" @click="goSong(scope.row)">{{ scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="歌手" width="270px">
                    <template slot-scope="scope">
                        <p style="cursor: pointer;" @click="goSinger(scope.row)">{{ scope.row.singer_name}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <div class="operation" slot-scope="scope">
                        <el-link @click="addToPlaylist(scope.row)" class="operation-link">
                            <el-tooltip content="加入播放列表" placement="top" >
                            <i class="el-icon-plus"></i>
                            </el-tooltip>
                        </el-link>
                        <el-link @click="addToLikes(scope.row)" style="width: 16px;" class="operation-link">
                            <el-tooltip content="喜欢" placement="top" >
                            <i style="font-size: 13px" class="iconfont icon-xihuan"></i>
                            </el-tooltip>
                        </el-link>
                        <el-link class="operation-link">
                            <el-tooltip content="收藏" placement="top" >
                                <i class="el-icon-star-on" @click="starSongFormVisible = true; changeStarSongForm(scope.row)"></i>
                            </el-tooltip>
                            <el-dialog title="收藏到你的收藏夹中" :visible.sync="starSongFormVisible" center :close-on-click-modal="false" :show-close="false">
                                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                    <div style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); width: 300px;">
                                        <div style="float:left">
                                            <img  style="width: 70px;height: 100%;display: block;" :src="starSongForm.cover_path" alt="">
                                        </div>
                                        <div style="float:left; margin-left: 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                            <p style="margin:0;">{{ starSongForm.name }} by {{ starSongForm.singer_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 100%; display: flex;">
                                    <div style="margin: auto; margin-top: 40px;">
                                        <el-select size="medium" :disabled="disabled" v-model="starSongForm.favorites_id">
                                            <el-option  v-for="(item,index) in favorites" :key="index" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="starSongFormVisible = false;clearStarSongForm()">取 消</el-button>
                                    <el-button type="primary" @click="starSongFormVisible = false;starSong()">确 定</el-button>
                                </div>
                            </el-dialog>
                        </el-link>
                        <el-link class="operation-link">
                            <el-tooltip content="分享" placement="top" >
                                <i class="el-icon-share" @click="shareSongFormVisible = true; changeShareSongForm(scope.row)"></i>
                            </el-tooltip>
                            <el-dialog title="分享到你的动态" :visible.sync="shareSongFormVisible" center :close-on-click-modal="false" :show-close="false">
                                <div>
                                    <el-input v-model="shareSongForm.description" placeholder="说点什么吧"></el-input>
                                </div>
                                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                    <div style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); width: 300px;">
                                        <div style="float:left">
                                            <img  style="width: 70px;height: 100%;display: block;" :src="shareSongForm.cover_path" alt="">
                                        </div>
                                        <div style="float:left; margin-left: 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                            <p style="margin:0;">{{ shareSongForm.name }} by {{ shareSongForm.singer_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="shareSongFormVisible = false;clearShareSongForm()">取 消</el-button>
                                    <el-button type="primary" @click="shareSongFormVisible = false;shareSong()">确 定</el-button>
                                </div>
                            </el-dialog>
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
import { SongsRes } from '@/assets/data/searchRes';
import {favorites} from '@/assets/data/favorites'
import { getSongRes,setFavorites,setLikes,setPosts,getFavorites,setMessages } from '@/api/api';
import {mixin} from '../../mixins'
export default{
    mixins: [mixin],
    data(){
        return{
            SongsRes:[],
            currentPage:1,
            pageSize:  20,
            shareSongFormVisible: false,
            shareSongForm: {
                description:'',
                cover_path:'',
                id:'',
                name:'',
                singer_name:'',
            },
            starSongFormVisible: false,
            starSongForm: {
                cover_path:'',
                id:'',
                name:'',
                singer_name:'',
                favorites_id:'',
            },
            favorites:[],
            disabled: false,
        }
    },
    mounted(){
        this.SongsRes=SongsRes;
       //this.getSongsRes()
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
        goSong(row){
            this.$router.push({path: `/song/${row.id}`});
        },
        goSinger(row){
            this.$router.push({path: `/singer/${row.id}`});
        },
        Play(row){
            this.toplay(row);
        },
        addToPlaylist(row){
            this.playlater(row);
        },
        getSongsRes(){
            getSongRes(this.$router.query.keywords)
                .then(res => {
                    this.SongsRes=res.data.musics
                })
                .catch(err => {
                    console.log(err)
                })
        },
        downloadSong(row){
            this.handleDownload(row.name,row.music_path)
        },
        addToLikes(row){
            if(localStorage.getItem('loginInfo')!=null){
                var formData = new FormData();
                formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('music_id',row.id)
                setLikes(formData)
                .then(res => {
                    //根据res进行区分
                    if(res.status==200){
                        this.$message.success("成功添加到喜欢的音乐")
                    }else{
                        this.$message.success("取消喜欢")
                    }
                })
                .catch(err => {
                    this.$message.error("添加失败")
                })
            }else{
                this.$message.error("请先登录")
            }
        },
        changeShareSongForm(row){
            this.shareSongForm.cover_path=row.cover_path
            this.shareSongForm.id=row.id
            this.shareSongForm.name=row.name
            this.shareSongForm.singer_name=row.singer_name
        },
        clearShareSongForm(){
            this.shareSongForm.description=''
        },
        shareSong(){
            if(localStorage.getItem('loginInfo')!=null){
                var formData = new FormData();
                formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('object_id',this.shareSongForm.id)
                formData.append('type','1')
                formData.append('content',this.shareSongForm.description)
                setPosts(formData)
                .then(res => {
                    //根据res进行区分
                    this.$message.success("分享成功")
                })
                .catch(err => {
                    this.$message.error("分享失败")
                })
                
            }else{
                this.$message.error("请先登录")
            }
            this.shareSongForm.description=''
        },
        changeStarSongForm(row){
            this.starSongForm.cover_path=row.cover_path
            this.starSongForm.id=row.id
            this.starSongForm.name=row.name
            this.starSongForm.singer_name=row.singer_name
            if(localStorage.getItem('loginInfo')!=null){
                /*getFavorites()
                .then(res => {
                    this.favorites=res.data.play_list;
                })
                .catch(err => {
                    this.$message.success("获取收藏夹失败")
                })*/
                this.favorites=favorites.play_list
            }else{
                this.disabled=true
            }
        },
        clearStarSongForm(){
            this.starSongForm.favorites_id=''
            this.disabled=false
        },
        starSong(){
            if(localStorage.getItem('loginInfo')!=null&&this.starSongForm.favorites_id!=''){
                var formData = new FormData();
                formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('music_id',this.starSongForm.id)
                formData.append('favorites_id',this.starSongForm.favorites_id) 
                setFavorites(formData)
                .then(res => {
                    //根据res进行区分
                    this.$message.success("收藏成功")
                })
                .catch(err => {
                    this.$message.error("收藏失败")
                })
            }else{
                this.$message.error("请先登录")
            }
            this.starSongForm.favorites_id=''
            this.disabled=false
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