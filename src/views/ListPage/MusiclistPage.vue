<template>
    <div>
        <el-col :gutter="20">
            <!-- 歌单封面与信息 -->
            <el-row style="display: flex; flex: 1; margin-right: 20px;">
                <!-- cover -->
                <div class="fronthead-cover">
                    <img :src="this.music_list_info.cover_path" alt="music_list_info.cover_path" />
                    <div class="fronthead-play-btn">
                        <el-button type="primary" icon="el-icon-play">播放全部</el-button>
                    </div>

                </div>

                <div style="padding-left: 20px;">
                    <div class="fronthead-title font-title" v-if="!isModify">{{ this.music_list_info.name }}</div>
                    <div class="fronthead-title font-title" v-else>
                        <input type="text" v-bind:value="this.music_list_info.name" v-on:input="changeName"
                            style="height: 30px; border: 0px; font-size: 30px; background-color:transparent;">
                    </div>

                    <div>
                        <span class="font-description">创建者：{{ this.music_list_info.creator_name }}</span>
                        <span class="font-description" style="margin-left: 20px;">歌曲数量：{{ this.music_list_info.music_num
                        }}</span>

                    </div>
                    <el-switch class="mar" v-model="isPublic" active-text="公开" inactive-text="私有" @click="changePublic">
                    </el-switch>
                    <!--歌曲标签-->
                    <div style=" padding-top: 10px;">
                        <div v-if="isModifyLabel">
                            <el-button size="mini" round v-for="(label, index) in this.labels" :key="label._id"
                                :class="{ activeLabel: label.isSelect, label: !label.isSelect }"
                                @click="selectLabel(index)">
                                {{ label.label_name }}</el-button>
                            <el-button size="mini" round type="primary" @click="modifyLabel">完成</el-button>
                        </div>
                        <div v-else>
                            <el-button size="mini" round v-for="label in activeLabel" :key="label._id" disabled style="background-color: cadetblue;
                                border-color: cadetblue;
                                color: white;">
                                {{ label.label_name }}
                            </el-button>
                            <el-button size="mini" round type="primary" @click="modifyLabel">修改</el-button>

                        </div>
                    </div>

                    <div class="fronthead-actions">
                        <el-button type="default" icon="el-icon-folder-delete" @click="deleteMusicList">删除</el-button>
                        <el-button type="default" icon="el-icon-plus" @click="jumpToSearch">添加歌曲</el-button>
                        <el-button type="default" icon="el-icon-share">分享</el-button>
                        <el-button v-if="isModify" type="default" icon="el-icon-folder-add"
                            @click="submitModifyInfo">完成</el-button>
                        <el-button v-else type="default" icon="el-icon-folder-add" @click="modifyInfo">修改</el-button>

                    </div>
                    <div class="fronthead-description font-description" style="width: 50vw;" v-if="!isModify">{{
                        this.music_list_info.description
                    }}</div>
                    <div class="fronthead-description font-description" v-else>
                        <input type="text" v-bind:value="this.music_list_info.description" v-on:input="changeDescription"
                            style="height: 20px; border: 0px;  background-color:transparent;">
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
import { setPublic, deleteList, changeMusiclist } from "@/api/api.js";
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
        changePublic() {
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

<style scoped></style>