<template>
    <div>
        <el-row :gutter="20" style="margin: 40px 20px 80px 20px;">
            <!-- left menu -->
            <el-col :span="7">
                <div class="menu-item content-box" style="margin-bottom: 20px;">
                    <h2>我的音乐</h2>
                </div>

                <el-menu class="left-menu content-box" @select="handleMenuSelect">
                    <!-- following people -->
                    <el-menu-item index="1">
                        <i class="el-icon-star-off"></i>
                        <span>关注用户</span>
                        <!-- <span class="ml">({{ follow_num }})</span> -->
                    </el-menu-item>

                    <!-- my favorite -->
                    <el-menu-item index="2">
                        <i class="el-icon-star-off"></i>
                        <span>我喜欢的音乐</span>
                    </el-menu-item>

                    <!-- created playlist -->
                    <el-submenu index="3">
                        <!-- title -->
                        <template slot="title">
                            <i class="el-icon-notebook-2"></i>
                            <span>创建的歌单</span>
                            <span class="ml">({{ playlist_num - 1 }})</span>
                        </template>

                        <!--  created-music-list-->
                        <el-menu-item v-for="music_list in create_music_list" :key="music_list.id"
                            :index="'3-' + music_list.id">
                            <img :src="music_list.cover_path" alt="music_list.cover_path" style="height: 40px;">
                            <span class="ml">{{ music_list.name }}</span>
                            <span class="ml">({{ music_list.music_num }})</span>
                            <!-- <i class="el-icon-setting ml"></i> -->
                        </el-menu-item>

                    </el-submenu>
                    <!-- add musiclist -->
                    <el-menu-item index="4" @click="createList">
                        <i class="el-icon-plus"></i>
                        <span>创建歌单</span>
                    </el-menu-item>

                </el-menu>

                <!-- create Musiclist -->
                <div v-show="iscreatingList" class="menu-item content-box" style="margin-top: 20px;">
                    <h3>创建歌单</h3>
                    <el-form ref="form" :model="form" label-width="auto" style="margin-top: 20px; width: 20vw;">
                        <el-form-item label="歌单名称">
                            <el-input v-model="form.favorites_name"></el-input>
                        </el-form-item>
                        <el-form-item label="歌单封面">
                            <el-upload list-type="picture-card" :auto-upload="false" :class="{ 'none-up': uploadDisabled }"
                                accept="image/jpeg,image/jpg" :limit="1" action="" :on-change="handleLimit"
                                :on-remove="handleRemove">
                                <img v-if="form.cover" :src="form.cover">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="歌曲标签">
                            <el-checkbox-group v-model="form.labels">
                                <el-checkbox label="流行" name="type"></el-checkbox>
                                <el-checkbox label="摇滚" name="type"></el-checkbox>
                                <el-checkbox label="民谣" name="type"></el-checkbox>
                                <el-checkbox label="电子" name="type"></el-checkbox>
                                <el-checkbox label="说唱" name="type"></el-checkbox>
                                <el-checkbox label="轻音乐" name="type"></el-checkbox>
                                <el-checkbox label="古风" name="type"></el-checkbox>
                                <el-checkbox label="爵士" name="type"></el-checkbox>
                                <el-checkbox label="金属" name="type"></el-checkbox>
                                <el-checkbox label="拉丁" name="type"></el-checkbox>
                                <el-checkbox label="其他" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="歌单简介">
                            <el-input v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain @click="onSubmit">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

            <!-- main -->
            <el-col :span="17">
                <router-view v-if="ifRouterAlive"></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import qs from "qs";
import { createList } from '@/api/api.js'
export default ({
    data() {
        return {
            playlist_num: 1,
            favorite_music_list: [],
            create_music_list: [],
            follow_num: 1,
            ifRouterAlive: true,

            iscreatingList: false,
            uploadDisabled: false,
            form: {
                favorites_name: '',
                description: '',
                cover: null,
                labels: [],
            }
        }
    },
    created() {
        this.reload();
        this.fetchMenus();
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    // beforeRouteUpdate(to, from, next) {
    //     if (to.fullPath != from.fullPath) {
    //         console.log("111");
    //         next()
    //         this.fetchMenus();
    //     }
    // },
    methods: {
        fetchMenus() {
            if (localStorage.getItem("loginInfo") == null) {
                this.$message({
                    message: "请先登录",
                    type: "warning",
                });
                return;
            }
            let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
            console.log(jwt);
            this.axios.get("/user/get_create_music_list/", {
                params: {
                    JWT: jwt,
                }
            })
                .then((res) => {
                    console.log(res.data);
                    this.playlist_num = res.data.playlist_num;
                    this.favorite_music_list = res.data.create_music_list[0],
                        this.create_music_list = res.data.create_music_list.slice(1);
                    console.log(this.playlist_num);
                    console.log(this.create_music_list);
                    console.log(this.favorite_music_list);
                    this.$router.push({ name: "Musiclist", params: { id: this.favorite_music_list.id } });
                    this.reload();
                })
                .catch(
                    (err) => {
                        this.$message("获取我的音乐失败！");
                    }
                )
        },

        handleMenuSelect(index) {
            console.log("handleMenuSelect: " + index)
            if (index === "1") {
                // jump to the people i follow
                console.log("jump to the people i follow");
                this.$router.push({ name: "Singerlist" });
                // this.reload();
            } else if (index == "2") {
                this.$router.push({ name: "Musiclist", params: { id: this.favorite_music_list.id } });
                location.reload(true)
            } else if (index == "4") {
                // this.$router.push({ name: "Musiclist", params: { id: this.favorite_music_list.id } });
                // this.reload();
            }
            else {
                // jump to other playlist
                const playlistId = index.split("-")[1];
                this.$router.push({ name: "Musiclist", params: { id: playlistId } });
                // location.reload(true)
            }
            this.activeIndex = index;
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        },
        reload() {
            this.ifRouterAlive = false;
            this.$nextTick(() => {
                this.ifRouterAlive = true;
            });
        },
        createList() {
            this.iscreatingList = !this.iscreatingList;
        },
        onSubmit() {
            if (localStorage.getItem('loginInfo') != null) {
                if (this.form.favorites_name == '') {
                    alert("内容不能为空");
                } else {
                    var formData = new FormData();
                    formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                    formData.append('favorites_name', this.form.favorites_name)
                    formData.append('description', this.form.description)
                    formData.append('cover', this.form.cover)
                    formData.append('labels', this.form.labels)
                    console.log(this.form);
                    createList(formData)
                        .then(res => {
                            this.$message.success("已创建新歌单")
                            console.log(res)
                            this.form.cover = null,
                                this.form.description = '',
                                this.form.favorites_name = ''
                            this.iscreatingList = !this.iscreatingList;
                            location.reload(true)
                        })
                        .catch(err => {
                            this.$message.success("创建失败，请重试")
                            console.log(err)
                        })
                    // this.$router.push("/homepage");
                    // this.$axios
                    //     .post("/user/create_favorites/", qs.stringify({
                    //         JWT: JSON.parse(localStorage.getItem("loginInfo")).JWT,
                    //         favorites_name: this.form.favorites_name,
                    //         description: this.form.description,
                    //         cover: this.form.cover,
                    //     }))
                    //     .then(res => {
                    //         this.$message("已创建歌单！");
                    //         console.log(res);
                    //         this.$forceUpdate();
                    //     })
                    //     .catch(err => {
                    //         this.$message("创建失败，请重试")
                    //         console.log(err)
                    //     })

                }
            } else {
                alert("请先登录")
            }
        },
        handleLimit(file, fileList) {
            if (fileList.length >= 1) {
                console.log("handleLimit");
                this.uploadDisabled = true;
                this.$set(this, 'uploadDisabled', true);
                this.onCoverChange(file.raw);
                location.reload(true)
            }
        },
        handleRemove() {
            this.uploadDisabled = false;
            this.$set(this, 'uploadDisabled', false);
            this.form.cover = '';
            location.reload(true)
        },
        onCoverChange(file) {
            this.form.cover = file;
        },
    }
})
</script>

<style scoped>
.none-up /deep/ .el-upload--picture-card {
    display: none;
}
</style>