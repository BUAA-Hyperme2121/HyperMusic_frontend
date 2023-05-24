<template>
  <div>
    <!-- playlistcomponent -->
    <el-table
      :data="songlist.songs"
      class="songlist-list-container"
      style="width: 100%"
      stripe
    >
      <el-table-column width="80px" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
          <el-link @click="playSong(scope.row)" class="songlist-operation-link">
            <i class="el-icon-video-play" style="padding-bottom: 10px;"></i>
          </el-link>
        </template>
        
      </el-table-column>
      <el-table-column prop="name" label="歌曲名称">
        <template slot-scope="scope">
          <router-link class="songlist-table-link" :to="'/song/' + scope.row.songId">{{
            scope.row.name
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="时长"></el-table-column>
      <el-table-column prop="singer" label="歌手" v-if="!noSinger">
        <template slot-scope="scope">
          <router-link
            class="songlist-table-link"
            :to="'/singer/' + scope.row.singerId"
            >{{ scope.row.singer }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="album" label="专辑" v-if="!noAlbum">
        <template slot-scope="scope">
          <router-link class="songlist-table-link" :to="'/album/' + scope.row.albumId">{{
            scope.row.album
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作"  fixed="right">
        <div class="operation">
          <el-link @click="addToPlaylist(scope.row)" class="songlist-operation-link">
            <el-tooltip
              content="加入播放列表"
              placement="top"
            >
              <i class="el-icon-plus"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="addToFavorites(scope.row)" class="songlist-operation-link">
            <el-tooltip content="收藏" placement="top" open-delay="1000">
              <i class="el-icon-star-on"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="shareSong(scope.row)" class="songlist-operation-link">
            <el-tooltip content="分享" placement="top" open-delay="1000">
              <i class="el-icon-share"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="downloadSong(scope.row)" class="songlist-operation-link">
            <el-tooltip content="下载" placement="top" open-delay="1000">
              <i class="el-icon-download"></i>
            </el-tooltip>
          </el-link>
          <el-link @click="deleteSong(scope.row)" class="songlist-operation-link">
            <el-tooltip content="删除" placement="top" open-delay="1000">
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
  name: "songlistComponent",
  props: {
    songlist: {
      type: Array,
      required: true,
    },
    noAlbum: {
      type: Boolean,
      required: false,
      default: false,
    },
    noSinger: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
};
</script>

<style>
.songlist-list-container {
  padding: 10px, 0, 0, 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.songlist-operation-link {
  padding: 5px;
}
.songlist-table-link {
  text-decoration: none;
  color: black;
}
.songlist-table-link:hover {
  color: #666;
  font-size: 14px;
}
</style>
