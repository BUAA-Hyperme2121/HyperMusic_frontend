<template>
  <div>
      <el-row :gutter="20" style="margin: 40px 20px;">
          <!-- left menu -->
          <el-col :span="7">
              <div class="menu-item content-box" style="margin-bottom: 20px;">
                  <span>我的音乐</span>
                  <el-button type="primary" size="mini">CLICK</el-button>
              </div>
              
              <el-menu class="left-menu content-box" @select="handleMenuSelect" >
                  <!-- following people -->
                  <el-menu-item index="1" >
                      <i class="el-icon-star-off"></i>
                      <span>关注用户</span>
                      <span class="ml">({{ follow_num }})</span>
                  </el-menu-item>

                  <!-- my favorite -->
                  <el-menu-item index="2">
                      <i class="el-icon-star-off"></i>
                      <span>我喜欢的音乐</span>
                  </el-menu-item>

                  <!-- created playlist -->
                  <el-submenu index="3" >
                      <!-- title -->
                      <template slot="title">
                          <i class="el-icon-notebook-2"></i>
                          <span>创建的歌单</span>
                          <span class="ml">({{ playlist_num - 1 }})</span>
                      </template>

                      <!--  created-music-list-->
                      <el-menu-item v-for="music_list in create_music_list" :key="music_list.id" :index="'3-' + music_list.id">
                          <img  :src="music_list.cover_path" alt="music_list.cover_path" style="height: 40px;">
                          <span class="ml">{{ music_list.name }}</span>
                          <span class="ml">({{ music_list.music_num }})</span>
                          <i class="el-icon-setting ml" ></i>
                      </el-menu-item>

                  </el-submenu>
                  <!-- add musiclist -->
                  <el-menu-item index="4" >
                          <i class="el-icon-plus"></i>
                          <span>创建新歌单</span>
                      </el-menu-item>
              </el-menu>
          </el-col>

          <!-- main -->
          <el-col :span="17">
              <router-view v-if="ifRouterAlive"></router-view>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default ({
  data() {
      return {
          playlist_num: 1,
          favorite_music_list: [],
          create_music_list: [],
          follow_num: 1,
          ifRouterAlive: true,
      }
  },
  mounted() {
      this.fetchMenus();
  },
  provide() {
    return {
      reload: this.reload
    }
  },
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
                      this.$message("获取歌曲失败！");
                  }
              )
      },

      handleMenuSelect(index) {
          console.log("handleMenuSelect: " + index)
          if (index === "1") {
              // jump to the people i follow
              console.log("jump to the people i follow");
              this.$router.push({ name: "Singerlist", params: { id: "1" } });
              this.reload();
          } else if (index == "2") {
              this.$router.push({ name: "Musiclist", params: { id: this.favorite_music_list.id } });
              this.reload();
          }else if (index == "4") {
              this.$router.push({ name: "Musiclist", params: { id: this.favorite_music_list.id } });
              this.reload();
          }
          else {
              // jump to other playlist
              const playlistId = index.split("-")[1];
              this.$router.push({ name: "Musiclist", params: { id: playlistId } });
              this.reload();
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
  }
})
</script>

<style scoped>

</style>