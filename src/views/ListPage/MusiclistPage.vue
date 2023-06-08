<template>
    <div>
        <el-col :gutter="20">
            <!-- 歌单封面与信息 -->
            <el-row style="display: flex; flex: 1; margin-right: 20px;">
                <!-- cover -->
                <div>
                    <img class="fronthead-cover" :src="this.music_list_info.cover_path" alt="music_list_info.cover_path"
                        @click="addToPlaylistAll" />
                    <!-- <el-upload class="fronthead-cover" style=" display: flex;justify-content: center;align-items: center;" v-else list-type="picture-card" :auto-upload="false" :class="{ 'none-up': uploadDisabled }"
                        accept="image/jpeg,image/jpg" :limit="1" action="" :on-change="handleLimit"
                        :on-remove="handleRemove">
                        <img class="fronthead-cover" style="width: 250px;height: 250px;" v-if="this.change_cover" :src="change_cover">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload> -->
                    <div class="fronthead-play-btn">

                    </div>
                    <!-- <el-button type="primary" icon="el-icon-play">播放全部</el-button> -->

                </div>

                <div style="padding-left: 20px;">
                    <div class="fronthead-title font-title" v-if="!isModify">{{ this.music_list_info.name }}</div>
                    <div class="fronthead-title font-title" v-else>
                        <input type="text" v-bind:value="this.music_list_info.name" v-on:input="changeName"
                            style="height: 30px; border: 0px; font-size: 30px;max-width: 50vw; background-color:transparent;">
                    </div>

                    <div>
                        <span class="font-description">创建者：{{ this.music_list_info.creator_name }}</span>
                        <span class="font-description" style="margin-left: 20px;">歌曲数量：{{ this.music_list_info.music_num
                        }}</span>

                    </div>
                    <el-switch class="mar" v-model="isPublic" active-text="公开" inactive-text="私有" @change="changePublic">
                    </el-switch>
                    <!--歌曲标签-->
                    <div style=" padding-top: 10px;">
                        <div v-if="isModify">
                            <el-button size="mini" round v-for="(label, index) in this.labels" :key="label._id"
                                :class="{ activeLabel: label.isSelect, label: !label.isSelect }"
                                @click="selectLabel(index)">
                                {{ label.label_name }}</el-button>
                        </div>
                        <div v-else>
                            <el-button size="mini" round v-for="label in activeLabel" :key="label._id" disabled style="background-color: cadetblue;
                                border-color: cadetblue;
                                color: white;">
                                {{ label.label_name }}
                            </el-button>

                        </div>
                    </div>

                    <div class="fronthead-actions">
                        <el-button type="default" icon="el-icon-folder-delete" @click="deleteMusicList">删除</el-button>
                        <el-button type="default" icon="el-icon-plus" @click="jumpToSearch">添加歌曲</el-button>
                        <el-link style="margin-left: 10px;">
                            <el-button type="default" icon="el-icon-folder-add"
                                @click="shareListFormVisible = true; changeshareListForm()">分享</el-button>
                            <el-dialog title="分享到你的动态" :visible.sync="shareListFormVisible" center
                                :close-on-click-modal="false" :show-close="false">
                                <div>
                                    <el-input v-model="shareListForm.description" placeholder="说点什么吧"></el-input>
                                </div>
                                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                                    <div
                                        style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); min-width: 300px;border-radius: 5px;">
                                        <div style="float:left">
                                            <img style="width: 70px;height: 70px;display: block;border-radius:  5px 0px 0px 5px;"
                                                :src="shareListForm.cover_path" alt="">
                                        </div>
                                        <div
                                            style="float:left; margin:0px 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                                            <p style="margin:0;">{{ shareListForm.music_name }} by {{
                                                shareListForm.singer_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="shareListFormVisible = false; clearshareListForm()">取 消</el-button>
                                    <el-button type="primary" @click="shareListFormVisible = false; shareList()">确
                                        定</el-button>
                                </div>
                            </el-dialog>
                        </el-link>
                        <el-button style="margin-left: 10px; " v-if="isModify" type="default" icon="el-icon-folder-add"
                            @click="submitModifyInfo">完成</el-button>
                        <el-button style="margin-left: 10px; " v-else type="default" icon="el-icon-folder-add"
                            @click="modifyInfo">修改</el-button>

                    </div>
                    <div class="fronthead-description font-description" style="max-width: 50vw;" v-if="!isModify">{{
                        this.music_list_info.description
                    }}</div>
                    <div class="fronthead-description font-description" v-else>
                        <input type="text" v-bind:value="this.music_list_info.description" v-on:input="changeDescription"
                            style="height: 20px; border: 0px;   background-color:transparent;">
                    </div>
                </div>
            </el-row>

            <!-- 歌单歌曲列表 -->
            <el-row>
                <h2>歌曲列表</h2>
                <SonglistComponent :songlist="this.music_list" :object-id="this.music_list_info.id" />
            </el-row>
        </el-col>



    </div>
</template>

<script>
import SonglistComponent from '@/components/PageComponent/SonglistComponent.vue';
import { setPublic, setNotPublic, deleteList, changeMusiclist } from "@/api/api.js";
import { mixin } from '../../mixins'
export default ({
    inject: ['reload'],
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
            music_labels: [],
            uploadDisabled: false,
            change_cover: null,
            shareListFormVisible: false,
            shareListForm: {
                description: '',
                cover_path: '',
                id: '',
                music_name: '',
                singer_name: '',
            },
            labels: [
                {
                    label_name: "怀旧",
                    isSelect: false,
                },
                {
                    label_name: "浪漫",
                    isSelect: false,
                },
                {
                    label_name: "伤感",
                    isSelect: false,
                },
                {
                    label_name: "放松",
                    isSelect: false,
                },
                {
                    label_name: "治愈",
                    isSelect: false,
                },
                {
                    label_name: "其他",
                    isSelect: false,
                }
            ],
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
        activeLabelList: function () {
            return this.labels.filter((item) => {
                return item.isSelect;
            }).map(function (label) {
                return label.label_name;
            });
        },
    },
    methods: {
        shareList() {
            if (localStorage.getItem('loginInfo') != null) {
                var formData = new FormData();
                formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('object_id', this.shareListForm.id)
                formData.append('type', '2')
                formData.append('content', this.shareListForm.description)
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
            this.shareListForm.description = ''
        },
        changeshareListForm() {
            this.shareListForm.cover_path = this.music_list_info.cover_path
            this.shareListForm.id = this.music_list_info.id
            this.shareListForm.music_name = this.music_list_info.name
            this.shareListForm.singer_name = this.music_list_info.creator_name
        },
        clearshareListForm() {
            this.shareListForm.description = ''
        },
        addToPlaylistAll() {
            var i;
            if (this.music_list.length) {
                for (i = 0; i < this.music_list.length; i++) {
                    this.playlater(this.music_list[i]);
                    this.toplay(this.music_list[0])
                }
            }
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
            this.old_labels = this.labels;
        },
        submitModifyInfo() {
            console.log("submitModifyInfo");
            this.isModify = false;
            //post
            var formData = new FormData();
            formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
            formData.append('favorites_id', this.music_list_info.id)
            formData.append('name', this.music_list_info.name)
            console.log(this.activeLabelList)

            this.activeLabelList.forEach(function (e) {
                formData.append('labels', e)
            })
            formData.append('description', this.music_list_info.description)
            // formData.append('old_labels', this.change_cover)
            changeMusiclist(formData)
                .then(res => {
                    //根据res进行区分
                    this.$message.success("修改成功")
                })
                .catch(err => {
                    this.$message.error("修改失败，请重试")
                    location.reload(true);
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
                    if (res.data.music_list != "此歌单尚无歌曲") {
                        this.music_list = res.data.music_list;
                    }
                    console.log(this.music_list_info);
                    console.log(this.music_list);
                    this.isPublic = res.data.music_list_info.is_public;
                    this.music_labels = res.data.music_list_info.labels;
                    console.log(this.music_labels);
                    var j, i;
                    console.log("labels.length: " + this.labels.length)
                    for (i = 0; i < this.labels.length; i++) {
                        for (j = 0; j < this.music_labels.length; j++) {
                            if (this.labels[i].label_name == this.music_labels[j]) {
                                this.labels[i].isSelect = true;
                            }

                        }
                    }



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
                    this.$router.push("/user/music");
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
        onCoverChange(file) {
            this.change_cover = file;
        },
        handleLimit(file, fileList) {
            if (fileList.length >= 1) {
                console.log("handleLimit");
                this.uploadDisabled = true;
                this.$set(this, 'uploadDisabled', true);
                this.onCoverChange(file.raw);
            }
        },
        handleRemove() {
            this.uploadDisabled = false;
            this.$set(this, 'uploadDisabled', false);
            this.change_cover = '';
        },

    }
})
</script>

<style scoped></style>