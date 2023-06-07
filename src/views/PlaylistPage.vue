<template>
    <div>
        <!-- background -->
        <div class="background-container">
            <img :src="this.music_list_info.cover_path" alt="music_info.cover_path" class="background-image">
        </div>

        <div style="display: flex;justify-content: center;padding-top: 60px;">
            <div style="width: 80vw;">

                <el-col :gutter="20">
                    <!-- 歌单封面与信息 -->
                    <el-row style="display: flex; flex: 1; margin-left: 20px;">
                        <!-- cover -->
                        <div class="fronthead-cover">
                            <img :src="this.music_list_info.cover_path" alt="music_list_info.cover_path" />
                            <div class="fronthead-play-btn">
                                <el-button type="primary" icon="el-icon-play" @click="addToPlaylistAll">播放全部</el-button>
                            </div>

                        </div>

                        <div style="padding-left: 40px;">
                            <div class="fronthead-title font-title" v-if="!isModify"
                                style="color: white; font-weight: bold;">{{ this.music_list_info.name }}</div>
                            <div class="fronthead-title font-title" v-else>
                                <input type="text" v-bind:value="this.music_list_info.name" v-on:input="changeName"
                                    style="height: 30px; border: 0px; font-size: 30px; background-color:transparent;">
                            </div>

                            <div>
                                <span class="font-description">创建者：{{ this.music_list_info.creator_name }}</span>
                                <span class="font-description" style="margin-left: 20px;">歌曲数量：{{
                                    this.music_list_info.music_num
                                }}</span>

                            </div>
                            <!--歌曲标签-->
                            <div style=" padding-top: 10px;">
                                <div>
                            <el-button size="mini" round v-for="label in this.music_list_info.labels" :key="label._id" disabled style="background-color: cadetblue;
                                border-color: cadetblue;
                                color: white;">
                                {{ label }}
                            </el-button>

                        </div>
                            </div>

                            <div class="fronthead-actions" style="padding-top: 10px;">
                                <!-- 投诉 -->
                                <el-link>
                                    <el-tooltip content="投诉" placement="top">
                                        <el-button type="default" icon="el-icon-folder-add"
                                            @click="complaintFormVisible = true; changeComplaintForm()" size="mini">投诉</el-button>
                                    </el-tooltip>
                                    <el-dialog title="投诉信息" :visible.sync="complaintFormVisible" center
                                        :close-on-click-modal="false" :show-close="false">

                                        <div
                                            style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                            <div
                                                style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); min-width: 300px;border-radius: 5px;">
                                                <div style="float:left">
                                                    <img style="width: 70px;height: 70px;display: block;border-radius:  5px 0px 0px 5px;"
                                                        :src="complaintForm.cover_path" alt="">
                                                </div>
                                                <div
                                                    style="float:left; margin:0px 26px; height: 100%; line-height: 70px; font-size: 15px;">
                                                    <p style="margin:0;">{{ complaintForm.name }} by {{
                                                        complaintForm.creator_name }}</p>
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
                                            <el-button @click="complaintFormVisible = false; clearcomplaintForm()">取
                                                消</el-button>
                                            <el-button type="primary"
                                                @click="complaintFormVisible = false; complaintPlaylist()">确
                                                定</el-button>
                                        </div>
                                    </el-dialog>
                                </el-link>
                                <el-button type="default" icon="el-icon-plus" @click="jumpToSearch"
                                    style="margin-left: 20px;" size="mini">批量添加</el-button>

                            </div>
                            <div class="fronthead-description font-description" style="width: 50vw;" v-if="!isModify">{{
                                this.music_list_info.description
                            }}</div>
                            <div class="fronthead-description font-description" v-else>
                                <input type="text" v-bind:value="this.music_list_info.description"
                                    v-on:input="changeDescription"
                                    style="height: 20px; border: 0px;  background-color:transparent;">
                            </div>
                        </div>
                    </el-row>

                    <!-- 歌单歌曲列表 -->
                    <el-row style="padding-top: 20px;">
                        <h2>歌曲列表</h2>
                        <SonglistComponent :songlist="this.music_list" :noAccess="true"
                            :object-id="this.music_list_info.id" />
                    </el-row>
                </el-col>


            </div>
        </div>
    </div>
</template>

<script>
import SonglistComponent from '@/components/PageComponent/SonglistComponent.vue';
import { setPublic, setNotPublic, deleteList, changeMusiclist,complainMusic } from "@/api/api.js";
import { mixin } from '../mixins'
export default ({
    props: ["id"],
    mixins: [mixin],
    components: {
        SonglistComponent,
    },
    data() {
        return {
            music_list: [],
            music_list_info: [],
            isModify: false,
            isModifyLabel: false,
            isPublic: false,
            labels: [
                {
                    label_name: "label1",
                    isSelect: false,
                },
                {
                    label_name: "label2",
                    isSelect: true,
                },
                {
                    label_name: "label3",
                    isSelect: false,
                },
            ],
            complaintFormVisible: false,
            complaintForm: {
                cover_path: '',
                name: '',
                creator_name: '',
                object_id: '',
                content: '',
                title: '',
            },
            disabled: false,
        }
    },
    mounted() {
        this.fetchList();
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to, from, next)
        if (to.fullPath != from.fullPath) {
            next()
            this.reload();
        }
    },
    computed: {
        activeLabel: function () {
            return this.labels.filter((item) => {
                return item.isSelect;
            });
        },
    },
    methods: {
        addToPlaylistAll() {
            var i;
            if (this.music_list.length) {
                for (i = 0; i < this.music_list.length; i++) {
                    this.playlater(this.music_list[i]);
                }
                this.toplay(this.music_list[0])
            }

        },
        changeComplaintForm() {
            this.complaintForm.cover_path = this.music_list_info.cover_path
            this.complaintForm.object_id = this.music_list_info.id
            this.complaintForm.name = this.music_list_info.name
            this.complaintForm.creator_name = this.music_list_info.creator_name
        },
        complaintPlaylist() {
            if (localStorage.getItem('loginInfo') != null) {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('object_id', this.complaintForm.object_id)
                formData.append('type', '2')
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
        changePublic() {
            console.log("setPublic");
            if (this.isPublic) {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('favorites_id', this.id)
                setPublic(formData)
                    .then(res => {
                        this.$message.success("成功设置为公开")
                        console.log(res)
                    })
                    .catch(err => {
                        this.$message.success("设置失败，请重试")
                        this.isPublic = !this.isPublic;
                        console.log(err)
                    })
            }
            else {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('favorites_id', this.id)
                setNotPublic(formData)
                    .then(res => {
                        this.$message.success("成功设置为私有")
                        console.log(res)
                    })
                    .catch(err => {
                        this.$message.success("设置失败，请重试")
                        this.isPublic = !this.isPublic;
                        console.log(err)
                    })
            }


        },
        jumpToSearch() {
            this.$router.push("/search");
        },
        changeName: function (e) {
            this.music_list_info.name = e.target.value;
        },
        changeDescription: function (e) {
            this.music_list_info.description = e.target.value;
        },
        modifyInfo() {
            this.isModify = true;
        },
        submitModifyInfo() {
            console.log("submitModifyInfo");
            this.isModify = false;
            //post
            var formData = new FormData();
            formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
            formData.append('favorites_id', this.music_list_info.id)
            formData.append('name', this.music_list_info.name)
            formData.append('description', this.music_list_info.description)
            changeMusiclist(formData)
                .then(res => {
                    //根据res进行区分
                    this.$message.success("修改成功")
                })
                .catch(err => {
                    this.$message.error("修改失败，请重试")
                })
        },
        fetchList() {
            //是否需要登录？
            // if (localStorage.getItem("loginInfo") == null) {
            //     this.$message({
            //         message: "请先登录",
            //         type: "warning",
            //     });
            //     return;
            // }
            // let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
            // console.log(jwt);
            this.axios.get("/music/get_music_list_info/", {
                params: {
                    music_list_id: this.id,
                }
            })
                .then((res) => {
                    console.log(this.id);
                    this.music_list_info = res.data.music_list_info;
                    this.music_list = res.data.music_list;
                    this.isPublic = res.data.music_list_info.is_public;
                    console.log(this.music_list_info);
                    console.log(this.music_list);
                })
                .catch(
                    (err) => {
                        this.$message("获取歌单失败！");
                    }
                )
        },
        deleteMusicList() {
            var formData = new FormData();
            formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
            formData.append('favorites_id', this.id)
            deleteList(formData)
                .then(res => {
                    this.$message.success("删除成功")
                    console.log(res)
                })
                .catch(err => {
                    this.$message.success("删除失败，请重试")
                    console.log(err)
                })
            // this.$router.push("/homepage");
        },
        modifyLabel() {
            console.log(this.isModifyLabel);
            this.isModifyLabel = !this.isModifyLabel;
        },
        selectLabel(index) {
            this.labels[index].isSelect = !this.labels[index].isSelect;
        },
    }
})
</script>

<style scoped>
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
</style>