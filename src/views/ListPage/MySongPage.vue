<template>
    <div>
        <h2>歌曲列表</h2>
        <SonglistComponent :songlist="this.music_list" />
    </div>
</template>

<script>
import SonglistComponent from '@/components/PageComponent/SonglistComponent.vue';
import { setPublic, setNotPublic, deleteList, changeMusiclist } from "@/api/api.js";
import { mixin } from '../../mixins'
export default ({
    data() {
        return {
            music_list: [],
        }
    },
    components: {
        SonglistComponent,
    },
    mounted() {
        this.fetchList();
    },
    methods: {
        fetchList() {
            if (localStorage.getItem("loginInfo") == null) {
                this.$message({
                    message: "请先登录",
                    type: "warning",
                });
                return;
            }
            let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
            console.log(jwt);
            this.axios.get("/music/get_music_list_info/", {
                params: {
                    JWT: this.jwt,
                }
            })
                .then((res) => {
                    if (res.data.music_list != "此歌单尚无歌曲") {
                        this.music_list = res.data.music_list;
                    }
                })
                .catch(
                    (err) => {
                        this.$message("获取上传歌曲失败！");
                    }
                )
        },
    }
})
</script>

<style scoped></style>