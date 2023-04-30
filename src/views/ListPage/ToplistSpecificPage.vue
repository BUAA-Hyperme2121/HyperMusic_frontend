<template>
  <div class="toplist-container">
    <el-row>
      <!-- 歌单封面 -->
      <el-col :span="6">
        <div class="toplist-cover">
          <img :src="toplist.cover" alt="" />
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 歌单名称、操作按钮 -->
        <div class="toplist-header">
          <div class="toplist-title">{{toplist.name}}</div>
          <div class="toplist-actions">
            <el-button type="default" icon="el-icon-plus">播放</el-button>
            <el-button type="default" icon="el-icon-share">分享</el-button>
            <el-button type="default" icon="el-icon-chat-dot-square">评论</el-button>
            <el-button type="default" icon="el-icon-download">下载</el-button>
          </div>
        </div>
        <!-- 歌单简介 -->
        <div class="toplist-description">{{toplist.description}}</div>
      </el-col>
    </el-row>
    <h2>歌曲列表</h2>
    <!-- 歌曲列表 -->
    <el-table :data="toplist.songs" style="width: 100%" :show-header="false" stripe >
      <el-table-column label="播放" width="25px">
          <div class="operation">
              <el-link @click="Play(scope.row)" class="operation-link">
                  <el-tooltip content="播放" placement="top" >
                  <i class="el-icon-video-play"></i>
                  </el-tooltip>
              </el-link>
          </div>
      </el-table-column>
      <el-table-column prop="name" label="歌曲名称" width="450px"></el-table-column>
      <el-table-column prop="singer" label="歌手" width="200px"></el-table-column>
      <el-table-column prop="duration" label="时长"></el-table-column>
      <el-table-column label="操作">
          <div class="operation">
              <el-link @click="addToPlaylist(scope.row)" class="operation-link">
                  <el-tooltip content="加入播放列表" placement="top" >
                  <i class="el-icon-plus"></i>
                  </el-tooltip>
              </el-link>
              <el-link @click="addToFavorites(scope.row)" class="operation-link">
                  <el-tooltip content="收藏" placement="top">
                  <i class="el-icon-star-on"></i>
                  </el-tooltip>
              </el-link>
              <el-link @click="shareSong(scope.row)" class="operation-link">
                  <el-tooltip content="分享" placement="top" >
                  <i class="el-icon-share"></i>
                  </el-tooltip>
              </el-link>
              <el-link @click="downloadSong(scope.row)" class="operation-link">
                  <el-tooltip content="下载" placement="top" >
                  <i class="el-icon-download"></i>
                  </el-tooltip>
              </el-link>
          </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ToplistPage",
  props: ["id"],
  created() {
    // 通过 id 获取排行榜数据
    
  },
  data() {
    return {
      toplist: {
        name: "热歌榜",
        cover:
          "http://p2.music.126.net/ZyUjc7K_GDpD8MO1-GQkmA==/109951166952706664.jpg?param=150y150",
        description: "最近更新：4月1日",
        songs: [
          {
            id: 1,
            name: "歌曲 1",
            duration: "04:30",
            singer: "歌手 A",
          },
          {
            id: 2,
            name: "歌曲 2",
            duration: "03:45",
            singer: "歌手 B",
          },
          {
            id: 3,
            name: "歌曲 3",
            duration: "05:12",
            singer: "歌手 C",
          },
        ],
      },
    };
  },
};
</script>

<style>
.toplist-container {
  padding: 20px;
}

.toplist-cover {
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.toplist-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.toplist-header {
  margin-top: 20px;
  width: 100%;
}

.toplist-title {
  font-size: 30px;
  padding-bottom: 30px;
}

.toplist-actions {
  display: flex;
}

.toplist-actions button {
  margin-left: 10px;
}

.toplist-description {
  margin-top: 20px;
  font-size: small;
  width: 100%;
  color: gray;
}

.el-table__body-wrapper {
  overflow-y: auto;
  max-height: 400px;
}

.el-table__empty-block {
  padding: 20px;
  text-align: center;
  font-size: 16px;
}

.el-table__empty-text {
  margin-top: 10px;
}
</style>
