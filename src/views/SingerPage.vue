<template>
  <div>
    <!-- background -->
    <div class="background-container">
      <img :src="this.singer_info.cover_path" alt="singer_info.cover_path" class="background-image">
    </div>
    <!-- main -->
    <el-row :gutter="20">
      <!-- music_info -->
      <el-col :offset="1" :span="8"
        style="display: flex;flex-direction:column; ;justify-content: center;align-items: center;">
        <div class="fronthead-cover-round">
          <img :src="this.singer_info.cover_path" alt="album cover" @click="addToPlaylistAll" />
        </div>
        <!--name, description-->
        <div class="fronthead-header">
          <div class="fronthead-title">
            <span class="font-title" style="color: white; font-size: 40px; ">
              {{ singer_info.name }}
            </span>

          </div>
          <div style="display: flex;">

            <el-button type="primary" @click="followSinger" size="mini">关注</el-button>
            <el-button type="primary" @click="goToHome" size="mini">访问主页</el-button>

          </div>
          <!--歌手标签-->
          <!-- <div style=" padding-top: 10px;">
            <div>
              <el-button size="mini" round v-for="(label, index) in this.music_info.labels" :key="label._id" style="background-color: cadetblue;
                                border-color: cadetblue;
                                color: white;">
                {{ label.label_name }}
              </el-button>
            </div>
          </div> -->
          <!--对歌曲的操作-->
          <!-- <div class="fronthead-actions">
            <el-link class="operation-link">
              <el-tooltip content="收藏" placement="top">
                <el-button type="default" icon="el-icon-folder-add" size="mini"
                  @click="starSongFormVisible = true; changeStarSongForm()">收藏</el-button>
              </el-tooltip>
              <el-dialog title="收藏到你的收藏夹中" :visible.sync="starSongFormVisible" center :close-on-click-modal="false"
                :show-close="false">
                <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                  <div
                    style="margin: auto; margin-top: 30px; box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3); border-radius: 5px; min-width: 300px;">
                    <div style="float:left">
                      <img style="width: 70px;height: 70px;display: block; border-radius: 5px 0px 0px 5px;"
                        :src="starSongForm.cover_path" alt="">
                    </div>
                    <div style="float:left; margin:0px 26px;  height: 100%; line-height: 70px; font-size: 15px;">
                      <p style="margin:0;">{{ starSongForm.music_name }} by {{
                        starSongForm.singer_name }}</p>
                    </div>
                  </div>
                </div>
                <div style="width: 100%; display: flex;">
                  <div style="margin: auto; margin-top: 40px;">
                    <el-select size="medium" :disabled="disabled" v-model="starSongForm.favorites_id">
                      <el-option v-for="(item, index) in create_music_list" :key="index" :label="item.name"
                        :value="item.id"></el-option>
                    </el-select>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="starSongFormVisible = false; clearStarSongForm()">取 消</el-button>
                  <el-button type="primary" @click="starSongFormVisible = false; starSong()">确
                    定</el-button>
                </div>
              </el-dialog>
            </el-link>

            <el-link @click="downloadSong()" class="operation-link" style="padding-left: 10px;">
              <el-tooltip content="下载" placement="top">
                <el-button type="default" icon="el-icon-folder-add" size="mini">下载</el-button>
              </el-tooltip>
            </el-link>
          </div> -->
          <div class="fronthead-description font-description" style="width: 30vw;">
            {{ singer_info.introduction }}
          </div>
        </div>
      </el-col>
      <el-col style="padding-top: 20px;" :span="13" :offset="1" class="lyrics-container">
        <h2 style="margin-top: 100px; color: white;">歌曲列表</h2>
        <SonglistComponent :songlist="this.music_list" :noAccess="true" :object-id="this.music_list_info.id" />
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import SonglistComponent from "@/components/PageComponent/SonglistComponent.vue";
import { following } from "@/api/api.js";
import { mixin } from '@/mixins'
export default {
  name: "SingerPage",
  mixins: [mixin],
  props: ["id"],
  components: {
    SonglistComponent,
  },
  data() {
    return {
      singer_info: [{
        id: '',
        name: '',
        cover_path: '',
        introduction: '',
        starSongFormVisible: false,
        starSongForm: {
          cover_path: '',
          id: '',
          music_name: '',
          singer_name: '',
          favorites_id: '',
        },
      }],
      music_list_info: [],
      music_list: [],
    }
  },
  mounted() {
    this.fetchSinger();
  },
  methods: {
    goToHome() {
      this.$router.push("/user/home?user_id=" + this.id);
    },
    addToPlaylistAll() {
            var i;
            if (this.music_list.length) {
                for (i = 0; i < this.music_list.length; i++) {
                    this.playlater(this.music_list[i]);
                }
                this.toplay(this.music_list[0])
            }

        },
    followSinger() {
      if (localStorage.getItem('loginInfo') != null) {
        var formData = new FormData();
        formData.append('JWT', JSON.parse(localStorage.getItem("loginInfo")).JWT)
        formData.append('follow_id', this.id)
        following()(formData)
          .then(res => {
            //根据res进行区分
            this.$message.success("关注成功")
          })
          .catch(err => {
            this.$message.error("关注失败")
          })

      } else {
        this.$message.error("请先登录")
      }
    },
    fetchSinger() {
      this.axios.get("/music/get_singer_info/", {
        params: {
          singer_id: this.id,
        }
      })
        .then((res) => {
          this.singer_info = res.data.singer_info;
          this.music_list = res.data.music_list;
          console.log(this.singer_info);
        })
        .catch((err) => {
          this.$message("获取歌手信息失败！请刷新页面");
          console.log(err);
          // this.$router.push("/homepage");
        })
    }
  },

};
</script>
<style scoped>
/* 页面遮罩 */
/* 页面遮罩样式 */
.background-container {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.background-image {
  width: 100%;
  height: 100%;
  transform: scale(1.09);
  object-fit: cover;
  z-index: -1;
  filter: blur(10px) brightness(70%);
}
</style>
  