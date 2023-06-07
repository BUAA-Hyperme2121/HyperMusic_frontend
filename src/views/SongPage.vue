<template>
    <div class="song-container">
        <!-- background -->
        <div class="background-container">
            <img :src="this.music_info.cover_path" alt="music_info.cover_path" class="background-image">
        </div>

        <!-- main -->
        <el-row :gutter="20" style="height: max-content;">
            <!-- music_info -->
            <el-col :offset="1" :span="8"
                style="display: flex;height: 95vh; overflow:auto; flex-direction:column; margin-bottom: 20px ;justify-content: center;align-items: center;">
                
                <div class="fronthead-cover-big">
                    <img :src="music_info.cover_path" alt="album cover" @click="Play" />
                </div>
                <!--name, description-->
                <div class="fronthead-header">
                    <div class="fronthead-title">
                        <span class="font-title" style="color: white; font-size: 40px; ">
                            {{ music_info.music_name }}
                        </span>

                    </div>
                    <div style="display: flex;">

                        <a-button type="link" ghost @click="like_song">
                            <img v-if="isLike" src="../assets/like.png" style="height: 40px" />
                            <img v-else src="../assets/notlike.png" style="height: 40px" />
                        </a-button>
                        <div style="padding-left: 20px;">
                            <router-link class="font-description" style="text-decoration: none;" :to="'/singer/' + this.music_info.singer_id">歌手：{{ this.music_info.singer_name }}</router-link>
                            <div class="font-description" style="">
                                播放量：{{ music_info.listen_nums }}
                            </div>
                        </div>

                    </div>
                    <!--歌曲标签-->
                    <div style=" padding-top: 10px;">
                        <div>
                            <el-button size="mini" round v-for="(label, index) in this.music_info.labels" :key="label._id"
                                style="background-color: cadetblue;
                                border-color: cadetblue;
                                color: white;">
                                {{ label }}
                            </el-button>
                        </div>
                    </div>
                    <!--对歌曲的操作-->
                    <div class="fronthead-actions">
                        <el-link class="operation-link">
                            <el-tooltip content="收藏" placement="top">
                                <el-button type="default" icon="el-icon-folder-add" size="mini"
                                    @click="starSongFormVisible = true; changeStarSongForm()">收藏</el-button>
                            </el-tooltip>
                            <el-dialog title="收藏到你的收藏夹中" :visible.sync="starSongFormVisible" center
                                :close-on-click-modal="false" :show-close="false">
                                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                    <div
                                        style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); border-radius: 5px; min-width: 300px;">
                                        <div style="float:left">
                                            <img style="width: 70px;height: 70px;display: block; border-radius: 5px 0px 0px 5px;"
                                                :src="starSongForm.cover_path" alt="">
                                        </div>
                                        <div
                                            style="float:left; margin:0px 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                            <p style="margin:0;">{{ starSongForm.music_name }} by {{
                                                starSongForm.singer_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 100%; display: flex;">
                                    <div style="margin: auto; margin-top: 40px;">
                                        <el-select size="medium" :disabled="disabled" v-model="starSongForm.favorites_id">
                                            <el-option v-for="(item, index) in create_music_list" :key="index"
                                                :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="starSongFormVisible = false; clearStarSongForm()">取 消</el-button>
                                    <el-button type="primary" @click="starSongFormVisible = false; starSong()">确
                                        定</el-button>
                                </div>
                            </el-dialog>
                        </el-link>
                        <el-link style="padding-left: 10px;">
                            <el-tooltip content="分享" placement="top">
                                <el-button type="default" icon="el-icon-folder-add" size="mini"
                                    @click="shareSongFormVisible = true; changeShareSongForm()">分享</el-button>
                            </el-tooltip>
                            <el-dialog title="分享到你的动态" :visible.sync="shareSongFormVisible" center
                                :close-on-click-modal="false" :show-close="false">
                                <div>
                                    <el-input v-model="shareSongForm.description" placeholder="说点什么吧"></el-input>
                                </div>
                                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                    <div
                                        style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); min-width: 300px;border-radius: 5px;">
                                        <div style="float:left">
                                            <img style="width: 70px;height: 70px;display: block;border-radius:  5px 0px 0px 5px;"
                                                :src="shareSongForm.cover_path" alt="">
                                        </div>
                                        <div
                                            style="float:left; margin:0px 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                            <p style="margin:0;">{{ shareSongForm.music_name }} by {{
                                                shareSongForm.singer_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="shareSongFormVisible = false; clearShareSongForm()">取 消</el-button>
                                    <el-button type="primary" @click="shareSongFormVisible = false; shareSong()">确
                                        定</el-button>
                                </div>
                            </el-dialog>
                        </el-link>
                        <!-- 投诉 -->
                        <el-link style="padding-left: 10px;">
                            <el-tooltip content="投诉" placement="top">
                                <el-button type="default" icon="el-icon-folder-add" size="mini"
                                    @click="complaintFormVisible = true; changeComplaintForm()">投诉</el-button>
                            </el-tooltip>
                            <el-dialog title="投诉信息" :visible.sync="complaintFormVisible" center
                                :close-on-click-modal="false" :show-close="false">

                                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                    <div
                                        style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); min-width: 300px;border-radius: 5px;">
                                        <div style="float:left">
                                            <img style="width: 70px;height: 70px;display: block;border-radius:  5px 0px 0px 5px;"
                                                :src="complaintForm.cover_path" alt="">
                                        </div>
                                        <div
                                            style="float:left; margin:0px 26px; height: 100%; line-height: 70px; font-size: 15px;">
                                            <p style="margin:0;">{{ complaintForm.music_name }} by {{
                                                complaintForm.singer_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-top: 40px;">
                                    <el-input v-model="complaintForm.title" placeholder="投诉标题"></el-input>
                                </div>
                                <div style="margin-top: 30px; ">
                                    <el-input v-model="complaintForm.description" placeholder="投诉内容" type="textarea"
                                        :rows="3"></el-input>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="complaintFormVisible = false; clearcomplaintForm()">取 消</el-button>
                                    <el-button type="primary" @click="complaintFormVisible = false; complaintSong()">确
                                        定</el-button>
                                </div>
                            </el-dialog>
                        </el-link>
                        <el-link @click="downloadSong()" class="operation-link" style="padding-left: 10px;">
                            <el-tooltip content="下载" placement="top">
                                <el-button type="default" icon="el-icon-folder-add" size="mini">下载</el-button>
                            </el-tooltip>
                        </el-link>
                    </div>
                    <div class="fronthead-description font-description" style="width: 30vw;">
                        {{ music_info.description }}
                    </div>
                </div>
            </el-col>
            <!-- 歌词 -->
            <el-col :span="14" class="lyrics-container">
                <div class="lyrics-outline">
                    <ul class="lyrics" v-if="lyrics.length">
                        <li v-for="(item, index) in lyrics" v-bind:key="index">
                            {{ item[1] }}
                        </li>
                    </ul>
                </div>
                <el-button style="margin-top: 20px;" size="mini" round @click="changeRightDiv">查看评论</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { setFavorites, setLikes, setPosts, complainMusic } from '@/api/api';
import { mixin } from '@/mixins'
import { mapGetters } from 'vuex'
export default ({
    mixins: [mixin],
    props: ["music_id"],
    data() {
        return {
            isLike: false,
            isDescription: false,
            lyrics: [],
            music_info: {
                id: 0,
                music_name: "",
                singer_name: "",
                singer_id: '',
                music_path: '',
                cover_path: '',
                listen_nums: '',
                description: '',
                labels: [],
            },
            shareSongFormVisible: false,
            shareSongForm: {
                description: '',
                cover_path: '',
                id: '',
                music_name: '',
                singer_name: '',
            },
            starSongFormVisible: false,
            starSongForm: {
                cover_path: '',
                id: '',
                music_name: '',
                singer_name: '',
                favorites_id: '',
            },
            complaintFormVisible: false,
            complaintForm: {
                cover_path: '',
                music_name: '',
                singer_name: '',
                object_id: '',
                content: '',
                title: '',
            },
            disabled: false,
            create_music_list: [],

        }
    },
    computed: {
        ...mapGetters([
            'curTime',
            'id',
        ])
    },
    watch: {
        //监听歌词变化
        curTime() {
            if (this.lyrics.length !== 0) {
                for (let i = 0; i < this.lyrics.length; i++) {
                    if (this.curTime >= this.lyrics[i][0]) {
                        for (let j = 0; j < this.lyrics.length; j++) {
                            document.querySelectorAll('.lyrics li')[j].style.color = '#FAEBD7'
                            document.querySelectorAll('.lyrics li')[j].style.fontSize = '20px'
                        }
                        if (i >= 0) {
                            document.querySelectorAll('.lyrics li')[i].style.color = '#FFA1A8'
                            document.querySelectorAll('.lyrics li')[i].style.fontSize = '25px'
                            document.querySelector('.lyrics').style.transform = `translateY(${250 - (40 * (i + 1))}px)`
                        }
                    }
                }
            }
        },
        //监听歌曲id变化
        id() {
            if (this.id != this.music_info.id) {
                this.$router.push({ path: `/song/${this.id}` });
            }
        }
    },
    mounted() {
        this.fetchSong();
    },
    beforeRouteUpdate(to, from, next) {
        next()
        if (to.fullPath != from.fullPath) {
            this.fetchSong();
        }
    },
    methods: {
        changeComplaintForm() {
            this.complaintForm.cover_path = this.music_info.cover_path
            this.complaintForm.object_id = this.music_info.id
            this.complaintForm.music_name = this.music_info.music_name
            this.complaintForm.singer_name = this.music_info.singer_name
        },
        complaintSong() {
            if (localStorage.getItem('loginInfo') != null) {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('object_id', this.complaintForm.object_id)
                formData.append('type', '1')
                formData.append('content', this.complaintForm.content)
                formData.append('title', this.complaintForm.title)
                complainMusic(formData)
                    .then(res => {
                        //根据res进行区分
                        this.$message.success("投诉成功")
                    })
                    .catch(err => {
                        this.$message.error("投诉失败")
                    })

            } else {
                this.$message.error("请先登录")
            }
            this.complaintForm.content = ''
            this.complaintForm.title = ''
        },
        clearComplaintForm() {
            this.complaintForm.content = ''
            this.complaintForm.title = ''
        },
        downloadSong() {
            this.handleDownload(this.music_info.music_name, this.music_info.music_path)
        },
        changeShareSongForm() {
            this.shareSongForm.cover_path = this.music_info.cover_path
            this.shareSongForm.id = this.music_info.id
            this.shareSongForm.music_name = this.music_info.music_name
            this.shareSongForm.singer_name = this.music_info.singer_name
        },
        clearShareSongForm() {
            this.shareSongForm.description = ''
        },
        shareSong() {
            if (localStorage.getItem('loginInfo') != null) {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('object_id', this.shareSongForm.id)
                formData.append('type', '1')
                formData.append('content', this.shareSongForm.description)
                setPosts(formData)
                    .then(res => {
                        //根据res进行区分
                        this.$message.success("分享成功")
                    })
                    .catch(err => {
                        this.$message.error("分享失败")
                    })

            } else {
                this.$message.error("请先登录")
            }
            this.shareSongForm.description = ''
        },
        changeStarSongForm() {
            this.starSongForm.cover_path = this.music_info.cover_path
            this.starSongForm.id = this.music_info.id
            this.starSongForm.music_name = this.music_info.music_name
            this.starSongForm.singer_name = this.music_info.singer_name
        },
        clearStarSongForm() {
            this.starSongForm.favorites_id = ''
            this.disabled = false
        },
        starSong() {
            if (localStorage.getItem('loginInfo') != null && this.starSongForm.favorites_id != '') {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('music_id', this.starSongForm.id)
                formData.append('favorites_id', this.starSongForm.favorites_id)
                setFavorites(formData)
                    .then(res => {
                        //根据res进行区分
                        this.$message.success("收藏成功")
                    })
                    .catch(err => {
                        this.$message.error("收藏失败")
                    })
            } else {
                this.$message.error("请先登录")
            }
            this.starSongForm.favorites_id = ''
            this.disabled = false
        },
        markMusic(musiclist) {
            if (localStorage.getItem("loginInfo") == null) {
                this.$message({
                    message: "请先登录",
                    type: "warning",
                });
                return;
            }
            var formData = new FormData();
            formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
            formData.append('music_id', this.music_info.id)
            formData.append('favorites_id', musiclist.id)
            setFavorites(formData)
                .then(res => {
                    this.$message.success("已添加到收藏夹")
                    console.log(res)
                })
                .catch(err => {
                    this.$message.error("添加失败，请重试")
                    console.log(err)
                })
        },
        changeRightDiv() {
            this.isDescription = !this.isDescription;
        },
        Play() {
            this.toplay(this.music_info);
        },
        getlyrics() {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.open('GET', this.music_info.lyrics_path);
            xhr.send();
            xhr.onload = () => {
                const lyricsText = xhr.response;
                let lines = lyricsText.split('\n')
                let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g
                let result = []
                if (!(/\[.+\]/.test(lyricsText))) {
                    return [
                        [0, lyricsText]
                    ]
                }
                while (!pattern.test(lines[0])) {
                    lines = lines.slice(1)
                }
                lines[lines.length - 1].length === 0 && lines.pop()
                for (let item of lines) {
                    let time = item.match(pattern)
                    let value = item.replace(pattern, '')
                    for (let item1 of time) {
                        let t = item1.slice(1, -1).split(':')
                        if (value !== '') {
                            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
                        }
                    }
                }
                result.sort(function (a, b) {
                    return a[0] - b[0]
                })
                this.lyrics = Object.assign([], result)
            }
        },
        fetchSong() {
            //this.$message.success("调用")
            let jwt = ''
            if (localStorage.getItem("loginInfo") == null) {
                jwt = -1;
            }
            else {
                jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
            }
            let num = 0;
            const routePath = this.$route.path;
            const matches = routePath.match(/\/(\d+)$/);
            if (matches && matches.length > 1) {
                num = parseInt(matches[1], 10);
            }
            this.axios.get("/music/get_music_info/", {
                params: {
                    JWT: jwt,
                    music_id: num,
                }
            })
                .then((res) => {
                    this.music_info = res.data.music_info;
                    this.isLike = res.data.music_info.is_like;
                    this.toplay(this.music_info)
                    if (this.music_info.lyrics_path == "") {
                        this.lyrics = [];
                        this.lyrics.push([0, "暂时没有歌词哦~"])
                    }
                    else {
                        this.getlyrics();
                    }
                    console.log(this.music_info);
                    this.fetchMenus();
                })
                .catch((err) => {
                    this.$message("获取歌曲失败！");
                    console.log(err);
                    this.$router.push("/homepage");
                })
        },
        like_song() {
            this.isLike = !this.isLike;
            if (localStorage.getItem('loginInfo') != null) {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('music_id', this.music_id)
                setLikes(formData)
                    .then(res => {
                        //根据res进行区分
                        if (res.data.flag == 2) {
                            this.$message.success("成功添加到喜欢的音乐")
                        } else {
                            this.$message.success("取消喜欢")
                        }
                    })
                    .catch(err => {
                        this.$message.error("添加失败")
                        this.isLike = !this.isLike;
                    })
            } else {
                this.$message.error("请先登录")
            }
        },
        fetchMenus() {
            if (localStorage.getItem("loginInfo") == null) {
                this.$message({
                    message: "请先登录",
                    type: "warning",
                });
                return;
            }
            let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
            this.axios.get("/user/get_create_music_list/", {
                params: {
                    JWT: jwt,
                }
            })
                .then((res) => {
                    this.create_music_list = res.data.create_music_list.slice(1);
                })
                .catch(
                    (err) => {
                        this.$message("获取我的音乐失败！请尝试重新登陆");

                    }
                )
        },
    }
})

</script>

<style scoped>
::-webkit-scrollbar {
    display: none;
}

.background-container {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.background-image {
    width: 100%;
    height: 100%;
    transform: scale(1.09);
    object-fit: cover;
    z-index: -1;
    filter: blur(10px) brightness(70%);
}

.lyrics-container {
    height: 100%;
    padding-top: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.lyrics-outline {
    overflow: hidden;
    overflow-y: scroll;
    height: 70vh;
    width: 50vw;
}

.lyrics {
    padding-left: 0;
    list-style-type: none;
    white-space: pre-wrap;
    font-size: 20px;
    line-height: 2;
    text-align: center;
    color: antiquewhite;
}
</style>