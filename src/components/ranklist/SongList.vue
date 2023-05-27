<template>
    <div>
        <el-table :data="songs" style="width: 100%" :show-header="false" stripe >
            <el-table-column label="序号" width="50px">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="播放" width="25px">
                <div class="operation" slot-scope="scope">
                    <el-link @click="Play(scope.row)" class="operation-link">
                        <el-tooltip content="播放" placement="top" >
                        <i class="el-icon-video-play"></i>
                        </el-tooltip>
                    </el-link>
                </div>
            </el-table-column>
            <el-table-column label="歌曲名称" width="450px">
            <template slot-scope="scope">
                <p style="cursor: pointer;" @click="goSong(scope.row)">{{ scope.row.music_name}}</p>
            </template>
            </el-table-column>
            <el-table-column label="歌手" width="230px">
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
                            <div style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); min-width: 300px;">
                                <div style="float:left">
                                    <img  style="width: 70px;height: 70px;display: block;" :src="starSongForm.cover_path" alt="">
                                </div>
                                <div style="float:left; margin:0px 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                    <p style="margin:0;">{{ starSongForm.music_name }} by {{ starSongForm.singer_name }}</p>
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
                            <i class="el-icon-share" @click="shareFormVisible = true; changeShareForm(scope.row)"></i>
                        </el-tooltip>
                        <el-dialog title="分享到你的动态" :visible.sync="shareFormVisible" center :close-on-click-modal="false" :show-close="false">
                            <div>
                                <el-input v-model="shareForm.description" placeholder="说点什么吧"></el-input>
                            </div>
                            <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                <div style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); min-width: 300px;">
                                    <div style="float:left">
                                        <img  style="width: 70px;height: 70px;display: block;" :src="shareForm.cover_path" alt="">
                                    </div>
                                    <div style="float:left; margin:0px 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                        <p style="margin:0;">{{ shareForm.music_name }} by {{ shareForm.singer_name }}</p>
                                    </div>
                                </div>
                            </div>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="shareFormVisible = false;clearShareForm()">取 消</el-button>
                                <el-button type="primary" @click="shareFormVisible = false;shareSong()">确 定</el-button>
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
    </div>
</template>
<script>
import { mixin } from '@/mixins';
import { setFavorites,setLikes,setPosts,getFavorites } from "@/api/api";
export default{
    name: "carousel",
    mixins: [mixin],
    props: ["songs"],
    data() {
      return {
        shareFormVisible: false,
        shareForm: {
            description:'',
            cover_path:'',
            id:'',
            music_name:'',
            singer_name:'',
        },
        starSongFormVisible: false,
            starSongForm: {
                cover_path:'',
                id:'',
                music_name:'',
                singer_name:'',
                favorites_id:'',
            },
            favorites:[],
            disabled: false,
      };
    },
    methods: {
      goSong(row){
        this.$router.push({path: `/song/${row.id}`});
      },
      goSinger(row){
        this.$router.push({path: `/singer/${row.singer_id}`});
      },
      Play(row){
        this.toplay(row);
      },
      addToPlaylist(row){
        this.playlater(row);
      },
      downloadSong(row){
        this.handleDownload(row.music_name,row.music_path);
      },
      addToLikes(row){
            if(localStorage.getItem('loginInfo')!=null){
                var formData = new FormData();
                formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('music_id',row.id)
                setLikes(formData)
                .then(res => {
                  if(res.data.flag==2){
                        this.$message.success("成功添加到喜欢的音乐")
                    }else{
                        this.$message.success("取消喜欢")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.$message.error("请先登录")
            }
      },
      changeShareForm(row){
            this.shareForm.cover_path=row.cover_path
            this.shareForm.id=row.id
            this.shareForm.music_name=row.music_name
            this.shareForm.singer_name=row.singer_name
      },
      clearShareForm(){
          this.shareForm.description=''
      },
      shareSong(){
          if(localStorage.getItem('loginInfo')!=null){
              var formData = new FormData();
              formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
              formData.append('object_id',this.shareForm.id)
              formData.append('type','1')
              formData.append('content',this.shareForm.description)
              setPosts(formData)
              .then(res => {
                  this.$message.success("分享成功")
              })
              .catch(err => {
                  this.$message.error("分享失败")
              })
              
          }else{
              this.$message.error("请先登录")
          }
          this.shareForm.description=''
      },
      changeStarSongForm(row){
            this.starSongForm.cover_path=row.cover_path
            this.starSongForm.id=row.id
            this.starSongForm.music_name=row.music_name
            this.starSongForm.singer_name=row.singer_name
            if(localStorage.getItem('loginInfo')!=null){
                getFavorites()
                .then(res => {
                    this.favorites=res.data.create_music_list;
                })
                .catch(err => {
                    this.$message.error("获取收藏夹失败")
                })
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

        
        