<template>
  <div class="music-container">
    <el-row :gutter="20">
      <el-col :span="6" style="position: sticky; top: 20px">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleMenuSelect"
        >
          <!-- 我的歌手 -->
          <el-menu-item index="1"
            ><i class="el-icon-star-off"></i>
            <span>关注用户</span>
            <span>({{ Menus.singers.length }})</span>
          </el-menu-item>

          <!-- 创建的歌单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>创建的歌单</span>
              <span>({{ Menus.createdPlayLists.length }})</span>
              <i class="el-icon-plus"></i>
            </template>
            <el-menu-item
              v-for="playlist in Menus.createdPlayLists"
              :key="playlist.id"
              :index="'2-' + playlist.id"
            >
              <div class="playlist" style="display: flex">
                <img
                  :src="playlist.image"
                  alt=""
                  class="playlist-image"
                  style="height: 40px"
                />
                <div class="playlist-info" style="display: flex">
                  <div class="playlist-name">{{ playlist.name }}</div>
                  <div class="playlist-count">
                    {{ playlist.songCount }} 首歌曲
                  </div>
                </div>
              </div>
            </el-menu-item>
          </el-submenu>

          <!-- 
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-folder-opened"></i>
              <span>收藏的歌单</span>
              <span>({{ Menus.favoritePlayLists.length }})</span>
            </template>
            <el-menu-item
              v-for="playlist in Menus.favoritePlayLists"
              :key="playlist.id"
              :index="'3-' + playlist.id"
            >
              <div class="playlist" style="display: flex">
                <img
                  :src="playlist.image"
                  alt=""
                  class="playlist-image"
                  style="height: 40px"
                />
                <div class="playlist-info" style="display: flex">
                  <div class="playlist-name">{{ playlist.name }}</div>
                  <div class="playlist-count">
                    {{ playlist.songCount }} 首歌曲
                  </div>
                </div>
              </div>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      Menus: {
        singers: [],
        createdPlayLists: [],
        favoritePlayLists: [],
      },
    };
  },
  created() {
    // 从数据源获取菜单项的子项列表，例如API接口
    this.fetchMenus();
  },
  methods: {
    fetchMenus() {
      // 使用axios等工具从API接口获取子项列表数据
      // 然后将数据存储到Menus对象中
      this.Menus = {
        singers: [
          { name: "周杰伦", id: 1 },
          { name: "林俊杰", id: 2 },
          { name: "王菲", id: 3 },
        ],
        createdPlayLists: [
          {
            name: "我喜欢的音乐",
            id: 1,
            image:
              "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            songCount: 10,
          },
          {
            name: "2022年度歌单",
            id: 2,
            image:
              "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            songCount: 12,
          },
        ],
        favoritePlayLists: [
          {
            name: "歌单1",
            id: 1,
            image:
              "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            songCount: 10,
          },
          {
            name: "歌单2",
            id: 2,
            image:
              "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            songCount: 12,
          },
        ],
      };
    },
    handleMenuSelect(index) {
      if (index === "1") {
        // 点击“我的歌手”菜单项时跳转到 SingerListPage 页面
        this.$router.push({ name: "Singerlist", params: { id: "1" } });
      } else {
        // 点击其他菜单项时跳转到 PlaylistPage 页面
        const playlistId = index.split("-")[1];
        this.$router.push({ name: "Playlist", params: { id: playlistId } });
      }
      this.activeIndex = index;
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.music-container {
  margin: 20px;
}
.playlist {
  display: flex;
  padding: 10px;
}

.playlist-image {
  width: 40px;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
}

.playlist-info {
  display: flex;
  /* flex-direction: column; */
}

.playlist-count {
  color: #999;
}
</style>
