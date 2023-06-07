<template>
  <div>
    <!-- playlistcomponent -->
    <el-table :data="songlist" class="songlist-list-container transparent-style" style="width: 100%;" stripe :show-header="false">
      <el-table-column width="80px" label="">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.$index + 1 }}</span>
        </template>

      </el-table-column>
      <el-table-column prop="name" label="歌曲名称">
        <template slot-scope="scope">
          <router-link class="songlist-table-link" :to="'/song/' + scope.row.id">{{
            scope.row.music_name
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="听歌数量">
        <template slot-scope="scope">
          <span>{{ scope.row.listen_nums }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="singer" label="歌手">
        <template slot-scope="scope">
          <router-link class="songlist-table-link" :to="'/singer/' + scope.row.singer_id">{{ scope.row.singer_name
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">

        <template slot-scope="scope">
          <div class="operation">
            <el-link @click="Play(scope.row)" class="songlist-operation-link" style="margin-left: 20px;">
              <i class="el-icon-video-play" style="padding-bottom: 5px;"></i>
            </el-link>
            <el-link @click="addToPlaylist(scope.row)" class="songlist-operation-link">
              <el-tooltip content="加入播放列表" placement="top">
                <i class="el-icon-plus"></i>
              </el-tooltip>
            </el-link>
            <el-link @click="shareSong(scope.row)" class="songlist-operation-link">
              <el-tooltip content="分享" placement="top" :open-delay="1000">
                <i class="el-icon-share"></i>
              </el-tooltip>
            </el-link>
            <!-- <el-link @click="downloadSong(scope.row)" class="songlist-operation-link">
              <el-tooltip content="下载" placement="top" :open-delay="1000">
                <i class="el-icon-download"></i>
              </el-tooltip>
            </el-link> -->
            <el-link v-if="!noAccess" @click="deleteSong(scope.row)" class="songlist-operation-link">
              <el-tooltip content="删除" placement="top" :open-delay="1000">
                <i class="el-icon-delete"></i>
              </el-tooltip>
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mixin } from '../../mixins'
import { delFromList, setPosts } from '@/api/api'
export default {
  name: "songlistComponent",
  mixins: [mixin],
  props: {
    songlist: {
      type: Array,
      required: true,
    },
    create_music_list: {
      type: Array,
      required: false,
    },
    noAccess: {
      type: Boolean,
      required: false,
      default: false,
    },
    fromList: {
      type: Boolean,
      default: true,
    },
    objectId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    Play(row) {
      console.log("play\n");
      this.toplay(row);
    },
    addToPlaylist(row) {
      console.log("addtolist\n");
      this.playlater(row);
    },
    deleteSong(row) {
      if (this.fromList) {
        var formData = new FormData();
        formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
        formData.append('favorites_id', this.objectId);
        formData.append('music_id', row.id);
        console.log(this.objectId);
        delFromList(formData)
          .then(res => {
            this.$message("已删除")
            location.reload(true)
            console.log(res)
          })
          .catch(err => {
            this.$message("删除失败，请重试")
            console.log(err)
          })

      }

    },
    shareSong(row) {
      if (localStorage.getItem('loginInfo') != null) {
        var formData = new FormData();
        formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
        formData.append('object_id', row.id)
        formData.append('type', '1')
        formData.append('content', "我分享了一首歌曲，快来看看吧~")
        setPosts(formData)
          .then(res => {
            //根据res进行区分
            this.$message.success("分享成功")
          })
          .catch(err => {
            this.$message.error("分享失败")
          })

      } else {
        this.$message.error("请先登录")
      }
    },
  }
};
</script>

<style>
.songlist-list-container {
  padding: 10px, 0, 0, 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.songlist-operation-link {
  padding-left: 5px;
}

.songlist-table-link {
  text-decoration: none;
  color: black;
}

.songlist-table-link:hover {
  color: #666;
  font-size: 14px;
}

.el-table,
        .el-table__expanded-cell {
            background-color: rgba(255,255,255,0.7) !important;
        }    
        .el-table th,
        .el-table tr,
        .el-table td {
            background-color: rgba(255,255,255,0) !important;
        } 


</style>
