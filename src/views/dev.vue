<template>
    <div>
        <el-col :gutter="20" style="margin: 40px 20px;">
            <!-- 歌单封面与信息 -->
            <el-row style="display: flex; flex: 1; margin-right: 20px;">
                <!-- cover -->
                <div class="fronthead-cover">
                    <img :src="this.music_list_info.cover_path" alt="music_list_info.cover_path" />
                    <div class="fronthead-play-btn">
                        <el-button type="primary" icon="el-icon-play">播放全部</el-button>
                    </div>
                </div>

                <div style="padding-left: 20px; padding-top: 10px;">
                    <div class="fronthead-title font-title">{{ this.music_list_info.name }}</div>
                    <div>
                        <span class="font-description">创建者：{{ this.music_list_info.creator_name }}</span>
                        <span class="font-description" style="margin-left: 20px;">歌曲数量：{{ this.music_list_info.music_num
                        }}</span>
                    </div>
                    <div class="fronthead-actions">
                        <el-button type="default" icon="el-icon-folder-add">收藏</el-button>
                        <el-button type="default" icon="el-icon-plus">添加歌曲</el-button>
                        <el-button type="default" icon="el-icon-share">分享</el-button>
                        <el-button type="default" icon="el-icon-chat-dot-square">评论</el-button>
                        <el-button type="default" icon="el-icon-download">下载</el-button>
                    </div>
                    <div class="fronthead-description font-description">{{ this.music_list_info.description }}</div>
                </div>
            </el-row>

            <!-- 歌单歌曲列表 -->
            <el-row>
                <h2>歌曲列表</h2>
                <SonglistComponent :songlist="this.music_list" />
            </el-row>
        </el-col>



    </div>
</template>

<script>
import SonglistComponent from '@/components/PageComponent/SonglistComponent.vue';
export default ({

    props: ["id"],
    components: {
        SonglistComponent,
    },
    data() {
        return {
            music_list_id: 0,
            music_list: [],
            music_list_info: [],
        }
    },
    mounted() {
        this.fetchList();
    },
    methods: {
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

                    console.log(this.music_list_info);
                    console.log(this.music_list);
                })
                .catch(
                    (err) => {
                        this.$message("获取歌单失败！");
                    }
                )
        },

    }
})
</script>

<style scoped></style>