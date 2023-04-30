<template>
  <div class="playlist-container">
    <el-row>
      <!-- 歌单封面 -->
      <el-col :span="6">
        <div class="playlist-cover">
          <img :src="playlist.cover" alt="" />
          <div class="playlist-play-btn">
            <el-button type="primary" icon="el-icon-play">播放全部</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 歌单名称、操作按钮 -->
        <div class="playlist-header">
          <div class="playlist-title">{{ playlist.name }}{{ id }}</div>
          <div class="playlist-actions">
            <el-button type="default" icon="el-icon-folder-add">收藏</el-button>
            <el-button type="default" icon="el-icon-plus">添加歌曲</el-button>
            <el-button type="default" icon="el-icon-share">分享</el-button>
            <el-button type="default" icon="el-icon-chat-dot-square"
              >评论</el-button
            >
            <el-button type="default" icon="el-icon-download">下载</el-button>
          </div>
        </div>
        <!-- 歌单简介 -->
        <div class="playlist-description">{{ playlist.description }}</div>
      </el-col>
    </el-row>
    <h2>歌曲列表</h2>
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
            <el-tooltip content="加入播放列表" placement="top" open-delay=1000>
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="addToFavorites(scope.row)" class="operation-link">
            <el-tooltip content="收藏" placement="top" open-delay=1000>
              <i class="el-icon-star-on"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="shareSong(scope.row)" class="operation-link">
            <el-tooltip content="分享" placement="top" open-delay=1000>
              <i class="el-icon-share"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="downloadSong(scope.row)" class="operation-link">
            <el-tooltip content="下载" placement="top" open-delay=1000>
              <i class="el-icon-download"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="deleteSong(scope.row)" class="operation-link">
            <el-tooltip content="删除" placement="top" open-delay=1000>
              <i class="el-icon-delete"></i>
            </el-tooltip>
          </el-link>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "PlaylistPage",
  props: ["id"],
  created() {
    // 通过 this.id 获取参数 id
    console.log(this.id); // 输出 123
    // 可以在这里根据 id 获取对应的歌单数据等操作
  },
  data() {
    return {
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

<style>
.playlist-container {
  padding: 20px;
}

.playlist-cover {
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.playlist-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.playlist-play-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.playlist-play-btn button {
  width: 100%;
}

.playlist-play-btn button:hover {
  transform: scale(1.1);
}

.playlist-header {
  margin-top: 20px;
  width: 100%;
}

.playlist-title {
  font-size: 30px;
  padding-bottom: 30px;
}

.playlist-actions {
  display: flex;
}

.playlist-actions button {
  margin-left: 10px;
}

.playlist-description {
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
