<template>
    <div>
    </div>
</template>

<script>
export default ({

    props: ["id"],
    components: {
        SonglistComponent,
    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.fetchSong();
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