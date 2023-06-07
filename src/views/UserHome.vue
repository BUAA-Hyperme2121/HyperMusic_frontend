<template>
  <div class="user-home">
    <div class="user-home-top">
      <div class="avatar-container">
        <el-avatar
          shape="square"
          fit="fill"
          :src="userInfo.avatar_path"
          style="height: 100%; width: 100%"
        ></el-avatar>
      </div>
      <!-- 信息框 -->
      <div class="info-container">
        <!-- 用户基本信息 -->
        <div class="user-info">
          <!-- 用户名 -->
          <span class="user-name">{{ userInfo.username }}</span>
          <!-- 性别  -->
          <!-- 根据性别展示不同icon -->
          <i class="el-icon-male" v-if="userInfo.gender == '男'"></i>
          <i class="el-icon-female" v-if="userInfo.gender == '女'"></i>
          <!-- 编辑按钮 -->
          <el-button
            icon="el-icon-edit"
            style="margin-left: auto"
            size="mini"
            @click.native="goSetting"
            v-show="user_id == $store.state.userInfo.id"
            >编辑信息</el-button
          >
          <!-- 关注按钮 -->
          <el-button
            icon="el-icon-plus"
            style="margin-left: auto"
            size="mini"
            @click.native="follow"
            v-show="user_id != $store.state.userInfo.id && !userInfo.is_follow"
            >关注</el-button
          >
          <el-button
            icon="el-icon-check"
            style="margin-left: auto"
            size="mini"
            @click.native="unFollow"
            v-show="user_id != $store.state.userInfo.id && userInfo.is_follow"
            @mouseover.native="enterBtnText"
            @mouseout.native="outBtnText"
            >{{ btnText }}</el-button
          >
        </div>
        <el-divider></el-divider>
        <!-- 用户关系  -->
        <ul class="user-relate">
          <!-- 动态数  -->
          <li>
            <span @click="goSocial">动态 {{ userInfo.post_num }}</span>
          </li>
          <el-divider direction="vertical"></el-divider>
          <!-- 关注数 -->
          <li>
            <span @click="goFollow">关注 {{ userInfo.follow_num }}</span>
          </li>
          <el-divider direction="vertical"></el-divider>
          <!-- 粉丝数 -->
          <li>
            <span @click="goFan">粉丝 {{ userInfo.fan_num }}</span>
          </li>
        </ul>

        <!-- 所在位置 -->
        <div class="location">
          <i class="el-icon-location-outline"></i>
          {{ userInfo.location }}
        </div>
      </div>
    </div>

    <!-- 音乐相关 -->
    <div class="music-relate">
      <!-- 播放相关 -->
      <div style="margin-bottom: 30px;" class="play-relate">
        <!-- 个人简介 -->
        <div class="user-intro">
          <div class="title">个人简介</div>
          <div style="margin-top: 10px; margin-bottom: 10px">
            {{ userInfo.introduction }}
          </div>
        </div>
        <!-- 最近播放，用户自定义最大记录数量10，20，50，仅自己可见-->
        <div style="margin-top: 30px;"
          class="user-recent-play"
          v-show="user_id == $store.state.userInfo.id"
        >
          <div class="title">最近播放</div>
          <!-- 歌曲列表 -->
          <el-table :data="historyList" style="width: 100%" stripe :show-header="false" max-height="478px">
            <el-table-column type="index" label="序号" width="100px" :show-header="false"></el-table-column>
            <el-table-column
              prop="music_name"
              label="歌曲名称"
            ></el-table-column>
          </el-table>
        </div>
        <!-- 听歌排行，最近一周/全部时间，播放最多的10首-->
        <div class="user-music-rank">
          <div class="title">
            <span>听歌排行</span>
            <!-- 时间选项 -->
            <span class="time-op">
              <el-link id="op1" type="info" @click="showWeek">最近一周</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link id="op2" type="info" @click="showAll">全部时间</el-link>
            </span>
          </div>
          <!-- 最近一周 -->
          <el-table
            :data="rankList1"
            style="width: 100%"
            stripe
            v-show="showRankOption == 0"
          >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
              prop="music_name"
              label="歌曲名称"
            ></el-table-column>
            <!-- <el-table-column prop="duration" label="时长"></el-table-column> -->
            <!-- <el-table-column prop="singer" label="歌手"></el-table-column> -->
            <el-table-column prop="user_listen_times" label="播放次数">
              <template slot-scope="scope">
                <el-progress
                  :percentage="
                    (scope.row.user_listen_times /
                      rankList1[0].user_listen_times) *
                    100
                  "
                  :format="
                    function () {
                      return scope.row.user_listen_times + '次';
                    }
                  "
                ></el-progress>
              </template>
            </el-table-column>
          </el-table>
          <!-- 全部时间 -->
          <el-table
            :data="rankList2"
            style="width: 100%"
            stripe
            v-show="showRankOption == 1"
          >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
              prop="music_name"
              label="歌曲名称"
            ></el-table-column>
            <!-- <el-table-column prop="duration" label="时长"></el-table-column> -->
            <!-- <el-table-column prop="singer" label="歌手"></el-table-column> -->
            <el-table-column prop="user_listen_times" label="播放次数">
              <template slot-scope="scope">
                <el-progress
                  :percentage="
                    (scope.row.user_listen_times /
                      rankList2[0].user_listen_times) *
                    100
                  "
                  :format="
                    function () {
                      return scope.row.user_listen_times + '次';
                    }
                  "
                ></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 30px;">
          <div class="title">{{userInfo.username}}创建的歌单</div>
          <content-list :contentList="myPlayList" :type=2></content-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import ContentList from "../components/homepage/ContentList.vue";
export default {
  name: "UserHome",
  components:{
    ContentList,
  },
  methods: {
    getMyPlayList(){
      let jwt = ''
      if (localStorage.getItem("loginInfo") == null) {
          jwt=-1;
      }
      else {
          jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      }
      this.$axios({
        method: "get",
        url: "/user/get_user_music_list/",
        params: {
          JWT: jwt,
          user_id:  this.user_id,
        },
      })
        .then((res) => {
          console.log(res.data.music_list)
          this.myPlayList=res.data.music_list
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 鼠标经过按钮，显示取消关注
    enterBtnText() {
      this.btnText = "取消关注";
    },
    outBtnText() {
      this.btnText = "已关注";
    },
    // 跳转到动态页面，并展示这个主页所有者的动态
    goSocial() {
      this.$router.push({
        path: "/social",
        query: {
          user_id: this.user_id,
        },
      });
    },
    goFollow() {
      this.$router.push({
        path: "/social/follow",
        query: {
          user_id: this.user_id,
        },
      });
    },
    goFan() {
      this.$router.push({
        path: "/social/fan",
        query: {
          user_id: this.user_id,
        },
      });
    },
    // 跳转到设置页面
    goSetting() {
      if (this.$route.path !== "/user/setting") {
        this.$router.push("/user/setting");
      }
    },
    // 获取最近播放歌曲列表
    getHistoryList() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "get",
        url: "/user/get_recent_listen_music_list/",
        params: {
          JWT: jwt,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.historyList = res.data.music_list;
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });
    },
    // 获取听歌排行，op=1表示最近一周，op=2表示全部时间
    getRankList(op) {
      this.$axios({
        method: "get",
        url: "/user/get_most_listen_music_list/",
        params: {
          user_id: this.user_id,
          op: op,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            if (op == 1) {
              this.rankList1 = res.data.music_list;
            } else {
              this.rankList2 = res.data.music_list;
            }
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });
    },
    // 展示最近一周听歌排行
    showWeek() {
      this.showRankOption = 0;
      //最近一周文字加粗
      document.getElementById("op1").style.fontWeight = "bold";
      document.getElementById("op2").style.fontWeight = "normal";
    },
    //展示全部时间
    showAll() {
      this.showRankOption = 1;
      //加粗文字
      document.getElementById("op2").style.fontWeight = "bold";
      document.getElementById("op1").style.fontWeight = "normal";
    },
    //关注用户
    follow() {
      if (localStorage.getItem("loginInfo") == null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "post",
        url: "/user/follow/",
        data: qs.stringify({
          JWT: jwt,
          follow_id: this.user_id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "关注成功",
              type: "success",
            });
            //因为没有再次发送请求刷新数据，在这之前必须手动维护数据
            //更新关注状态
            this.userInfo.is_follow = true;
            //更新被关注者粉丝数量
            this.userInfo.fan_num++;
            //增加关注者(当前登录用户)关注数量
            this.$store.commit("addFollowNum");
            //   // 向被关注用户发送消息
            //   this.$axios({
            //     methods: "post",
            //     url: "/message/send_message/",
            //     data: qs.stringify({
            //       receiver_id: this.user_id,
            //       content: "关注了你",
            //       poster_id: this.$store.state.userInfo.id,
            //       object_id: -1,
            //       type: -1,
            //       message_type: 3,
            //     }),
            //   })
            //     .then((res) => {
            //       if (res.data.result == 1) {
            //         console.log("关注消息发送成功");
            //       } else {
            //         this.$message({
            //           message: res.data.message,
            //           type: "error",
            //         });
            //       }
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //       this.$message({
            //         message: "服务器开摆了~(￣▽￣)~*",
            //         type: "error",
            //       });
            //     });
            //
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });
    },
    //取消关注
    unFollow() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "post",
        url: "/user/unfollow/",
        data: qs.stringify({
          JWT: jwt,
          follow_id: this.user_id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "取消关注成功",
              type: "success",
            });
            //因为没有再次发送请求刷新数据，在这之前必须手动维护数据
            //更新关注状态
            this.userInfo.is_follow = false;
            //更新被关注者粉丝数量
            this.userInfo.fan_num--;
            //减少关注者(当前登录用户)关注数量
            this.$store.commit("subFollowNum");
            // 不用向被关注用户发送消息
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });
    },
  },
  mounted() {
    // 获取用户信息
    this.user_id = this.$route.query.user_id;
    this.getMyPlayList();
    //自己的主页
    if (this.user_id == this.$store.state.userInfo.id) {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "get",
        url: "/page/get_user_info/",
        params: {
          JWT: jwt,
          user_id: this.user_id,
        },
      })
        .then((res) => {
          // 获取成功
          if (res.data.result == 1) {
            this.userInfo = res.data.user_info;
          }
          // 获取失败
          else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });
      // 获取最近播放歌曲列表
      this.getHistoryList();
      
    }
    // 如果是别人的主页，就需要获取用户信息，但不用获取最近播放，
    else {
      let loginInfo = localStorage.getItem("loginInfo");
      //传jwt是为了判断是否关注，如果游客访问，后端会把is_follow赋值为false
      let jwt = null;
      // 如果是游客访问
      if (loginInfo == null) {
        jwt = "-1";
        // 如果是登录用户访问
      } else {
        jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      }
      // console.log(jwt);
      this.$axios({
        method: "get",
        url: "/page/get_user_info/",
        params: {
          JWT: jwt,
          user_id: this.user_id,
        },
      })
        .then((res) => {
          // 获取成功
          if (res.data.result == 1) {
            this.userInfo = res.data.user_info;
          }
          // 获取失败
          else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });
    }
    // 获取听歌排行
    this.getRankList(1);
    this.getRankList(2);
  },
  data() {
    return {
      myPlayList:[],
      btnText: "已关注",
      user_id: 0,
      // 不完全的用户信息，只是用来在主页展示
      userInfo: {},
      //最近播放歌单
      historyList: [],
      // 控制展示一周还是全部时间 0-week 1-all
      showRankOption: 0,
      //最近一周听歌排行歌单
      rankList1: [],
      //全部时间听歌排行歌单
      rankList2: [],
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
  margin-left: 15%;
  margin-right: 15%;
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
  color: #409eff;
  margin-left: 10px;
}
.el-icon-female {
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
.user-relate :hover {
  color: #c20c0c;
  cursor: pointer;
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

.music-relate {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.play-relate {
  width: 90%;
  margin-right: 20px;
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
.time-op {
  font-size: 10px;
  float: right;
}
#op1 {
  font-weight: bold;
}
</style>