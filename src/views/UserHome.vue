<template>
  <div class="user-home">
    <div class="user-home-top">
      <!-- 头像框 注意src会发GET请求，相对地址会404-->
      <div class="avatar-container">
        <el-avatar
          shape="square"
          fit="fill"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          style="height: 100%; width: 100%"
        ></el-avatar>
      </div>
      <!-- 信息框 -->
      <div class="info-container">
        <!-- 用户基本信息 -->
        <div class="user-info">
          <!-- 用户名 -->
          <span class="user-name">shyJyt</span>
          <!-- 性别  -->
          <i class="el-icon-male"></i>
          <!-- 编辑按钮 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            style="margin-left: auto"
            @click="goSetting"
            >编辑</el-button
          >
        </div>
        <el-divider></el-divider>
        <!-- 用户关系  -->
        <ul class="user-relate">
          <!-- 动态数  -->
          <li class="activity-container">
            <span>动态 8</span>
          </li>
          <el-divider direction="vertical"></el-divider>
          <!-- 关注数 -->
          <li class="follow-container">
            <span>关注 10</span>
          </li>
          <el-divider direction="vertical"></el-divider>
          <!-- 粉丝数 -->
          <li class="fan-container">
            <span>粉丝 111</span>
          </li>
        </ul>

        <!-- 所在位置 -->
        <div class="location">
          <i class="el-icon-location-outline"></i> Beijing, China
        </div>
      </div>
    </div>
    <div class="user-home-mid">
      <!-- 个人简介 -->
      <div class="user-intro">
        <div class="title">个人简介(或许可以支持markdown??)</div>
        <div style="margin-top:10px;margin-bottom:10px">这里是个人简介</div>
      </div>
      <!-- 最近播放 -->
      <div class="user-recent-play">
        <div class="title">最近播放</div>
        <!-- 歌曲列表 -->
        <el-table :data="playlist.songs" style="width: 100%" stripe>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="歌曲名称"></el-table-column>
          <el-table-column prop="duration" label="时长"></el-table-column>
          <el-table-column prop="singer" label="歌手"></el-table-column>
          <el-table-column prop="album" label="专辑"></el-table-column>
          <el-table-column label="操作">
            <div class="operation">
              <el-link @click="addToPlaylist(scope.row)" class="operation-link">
                <el-tooltip
                  content="加入播放列表"
                  placement="top"
                  open-delay="1000"
                >
                  <i class="el-icon-plus"></i>
                </el-tooltip>
              </el-link>
              <el-link
                @click="addToFavorites(scope.row)"
                class="operation-link"
              >
                <el-tooltip content="收藏" placement="top" open-delay="1000">
                  <i class="el-icon-star-on"></i>
                </el-tooltip>
              </el-link>
              <el-link @click="shareSong(scope.row)" class="operation-link">
                <el-tooltip content="分享" placement="top" open-delay="1000">
                  <i class="el-icon-share"></i>
                </el-tooltip>
              </el-link>
              <el-link @click="downloadSong(scope.row)" class="operation-link">
                <el-tooltip content="下载" placement="top" open-delay="1000">
                  <i class="el-icon-download"></i>
                </el-tooltip>
              </el-link>
              <el-link @click="deleteSong(scope.row)" class="operation-link">
                <el-tooltip content="删除" placement="top" open-delay="1000">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </el-link>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <!-- 听歌排行 -->
      <div class="user-music-rank">
        <div class="title">听歌排行</div>
        <!-- 歌曲列表 -->
        <el-table :data="playlist.songs" style="width: 100%" stripe>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="歌曲名称"></el-table-column>
          <el-table-column prop="duration" label="时长"></el-table-column>
          <el-table-column prop="singer" label="歌手"></el-table-column>
          <el-table-column prop="album" label="专辑"></el-table-column>
          <el-table-column label="操作">
            <div class="operation">
              <el-link @click="addToPlaylist(scope.row)" class="operation-link">
                <el-tooltip
                  content="加入播放列表"
                  placement="top"
                  open-delay="1000"
                >
                  <i class="el-icon-plus"></i>
                </el-tooltip>
              </el-link>
              <el-link
                @click="addToFavorites(scope.row)"
                class="operation-link"
              >
                <el-tooltip content="收藏" placement="top" open-delay="1000">
                  <i class="el-icon-star-on"></i>
                </el-tooltip>
              </el-link>
              <el-link @click="shareSong(scope.row)" class="operation-link">
                <el-tooltip content="分享" placement="top" open-delay="1000">
                  <i class="el-icon-share"></i>
                </el-tooltip>
              </el-link>
              <el-link @click="downloadSong(scope.row)" class="operation-link">
                <el-tooltip content="下载" placement="top" open-delay="1000">
                  <i class="el-icon-download"></i>
                </el-tooltip>
              </el-link>
              <el-link @click="deleteSong(scope.row)" class="operation-link">
                <el-tooltip content="删除" placement="top" open-delay="1000">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </el-link>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHome",
  methods: {
    // 跳转到设置页面
    goSetting() {
      if (this.$route.path !== "/user/setting") {
        this.$router.push("/user/setting");
      }
    },
  },
  data() {
    return {
      userIntro: "",
      playlist: {
        name: "我的私人歌单",
        cover:
          "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        description: "这是我的私人歌单，收录了很多好听的歌曲。",
        songs: [
          {
            id: 1,
            name: "歌曲 1",
            duration: "04:30",
            singer: "歌手 A",
            album: "专辑 A",
          },
          {
            id: 2,
            name: "歌曲 2",
            duration: "03:45",
            singer: "歌手 B",
            album: "专辑 B",
          },
          {
            id: 3,
            name: "歌曲 3",
            duration: "05:12",
            singer: "歌手 C",
            album: "专辑 C",
          },
          // 其他歌曲数据...
        ],
      },
    };
  },
};
</script>

<style scoped>
.user-home {
  display: block;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-left: 10%;
  margin-right: 10%;
  padding: 20px;
}
.user-home-top {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-container {
  width: 200px;
  height: 200px;
  margin-right: 80px;
}

.info-container {
  font-size: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 30px;
  font-weight: bold;
}
.el-icon-male {
  color: #e03a24;
  margin-left: 10px;
}

.el-divider {
  margin: 10px;
}
.user-relate {
  padding: 10px;
  font-family: "Courier New", Courier, monospace;
}

.user-relate li {
  display: inline-block;
}

.location {
  font-family: "Courier New", Courier, monospace;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.el-icon-location-outline {
  font-size: 24px;
  color: #e03a24;
  margin-right: 10px;
}

.user-home-mid {
  margin-top: 50px;
}

.user-recent-play {
  margin-bottom: 20px;
}

.title {
  font-family: "Courier New", Courier, monospace;
  color: #666;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #c20c0c;
}
</style>