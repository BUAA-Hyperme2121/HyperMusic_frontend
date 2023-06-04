<template>
  <div class="social-page">
    <el-row :gutter="20">
      <!-- 左侧动态部分，展示自己和关注用户的动态 -->
      <el-col :span="16">
        <div class="title">动态</div>
        <div class="social-left">
          <!-- 动态列表 -->
          <div class="activity-list">
            <ActivityItem
              v-for="activity in activityList"
              :activityInfo="activity"
              :key="activity.id"
              :user_id="user_id"
            ></ActivityItem>
            <el-divider></el-divider>
            <CommentPage></CommentPage>
          </div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="8">
        <!-- 用户个人信息 -->
        <div class="user-info">
          <div class="user-info-top">
            <!-- 用户头像和用户名 -->
            <div class="user-avatar">
              <el-avatar
                shape="square"
                fit="fill"
                :src="userInfo.avatar_path"
                style="height: 100%; width: 100%"
              ></el-avatar>
            </div>
            <div class="user-name">{{ userInfo.username }}</div>
          </div>
          <div class="user-info-foot">
            <el-link type="info" @click="showMyAct"
              >动态 {{ userInfo.activity_num }}</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="info" @click="showFollow"
              >关注 {{ userInfo.follow_num }}</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="info" @click="showFan"
              >粉丝 {{ userInfo.fan_num }}</el-link
            >
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 展示关注、粉丝列表 -->
        <div>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ActivityItem from "../components/ActivityItem.vue";
import CommentPage from "../components/CommentPage.vue";

export default {
  components: {
    ActivityItem,
    CommentPage,
  },
  methods: {
    // 展示指定用户发布的动态
    showMyAct() {
      if (this.user_id == undefined) {
        // 发送请求查找自己发布的动态,更新左边动态列表
        let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
        this.$axios({
          method: "post",
          url: "/message/get_user_post",
          data: JSON.stringify({
            JWT: jwt,
            user_id: this.userInfo.id,
          }),
        }).then((res) => {
          this.activityList = res.data.posts;
        });
      }
      //已经展示的是自己或其他用户发布的动态，不需要再次请求
      else {
        return;
      }
    },
    showFollow() {
      // 查看自己的关注列表
      if (this.user_id == undefined) {
        this.$router.push({
          path: "/social/follow",
          query: {
            user_id: this.userInfo.id,
          },
        });
      }
      // 查看指定用户（自己或其他用户）的关注列表
      else {
        this.$router.push({
          path: "/social/follow",
          query: {
            user_id: this.user_id,
          },
        });
      }
    },
    showFan() {
      // 如果是查看自己的粉丝列表，user_id为0
      if (this.user_id == 0 || this.user_id == undefined) {
        this.$router.push({
          path: "/social/fan",
          query: {
            user_id: 0,
          },
        });
      }
      // 查看别人的粉丝列表
      else {
        this.$router.push({
          path: "/social/fan",
          query: {
            user_id: this.user_id,
          },
        });
      }
    },

    addLikeCnt(activity_id) {
      // 更新动态列表中的点赞数
      for (let i = 0; i < this.activityList.length; i++) {
        if (this.activityList[i].id == activity_id) {
          this.activityList[i].like_num++;
          break;
        }
      }
    },
    subLikeCnt(activity_id) {
      // 更新动态列表中的点赞数
      for (let i = 0; i < this.activityList.length; i++) {
        if (this.activityList[i].id == activity_id) {
          this.activityList[i].like_num--;
          break;
        }
      }
    },
    changeLikeStatus(activity_id) {
      // 更新动态列表中的点赞状态
      for (let i = 0; i < this.activityList.length; i++) {
        if (this.activityList[i].id == activity_id) {
          this.activityList[i].is_liked = !this.activityList[i].is_liked;
          break;
        }
      }
    },
  },
  data() {
    return {
      user_id: undefined,
      // 不完全的用户信息，只是用来在动态页展示
      userInfo: {},
      // 动态列表
      activityList: [
        {},
        // {
        //   // 动态类型，1为分享歌曲，2为分享歌单
        //   activity_type: 1,
        //   activity_id: 1,
        //   activity_time: "2020-12-12 12:12:12",
        //   activity_content: "我上传了一首歌，一起来听听吧！",
        //   like_cnt: 10,
        //   is_liked: false, //是否已经点赞
        //   comment_cnt: 10,
        //   acter_id: 1,
        //   acter_name: "shyJyt",
        //   acter_avatar_url:
        //     "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        //   music_id: 1,
        //   poster_url:
        //     "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        //   music_name: "歌名/歌单名",
        //   music_owner: "演唱者/歌单拥有者",
        // },
      ],
    };
  },
  mounted() {
    // 获取用户id
    this.user_id = this.$route.query.user_id;
    // 只有已登录用户可以点击导航栏中的关注进入此页面，查看关注用户的动态，右侧显示自己信息
    if (this.user_id == undefined) {
      this.userInfo = this.$store.state.userInfo;
      // 发送请求查找关注用户的动态,更新左边动态列表
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "get",
        url: "/message/get_follow_post",
        params: {
          JWT: jwt,
        },
      }).then((res) => {
        this.activityList = res.data.posts;
      });
    }
    // 点击个人主页中的动态字样进入此页面，右侧显示该用户信息（自己或其他用户）
    else {
      let loginInfo = localStorage.getItem("loginInfo");
      //传jwt是为了判断是否点赞，如果游客访问，后端会把is_liked赋值为false
      let jwt = null;
      // 如果是游客访问
      if (loginInfo == null) {
        jwt = "-1";
        // 如果是登录用户访问
      } else {
        jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      }
      // 发送请求查找该用户的信息，更新右边用户信息
      this.$axios({
        method: "get",
        url: "/user/get_user_info/",
        params: {
          JWT: jwt,
          user_id: this.user_id,
        },
      }).then((res) => {
        this.userInfo = res.data.user_info;
      });
      // 发送请求查找该用户的动态,更新左边动态列表
      this.$axios({
        method: "get",
        url: "/message/get_user_post",
        params: {
          JWT: jwt,
          user_id: this.user_id,
        },
      }).then((res) => {
        this.activityList = res.data.posts;
      });
    }
  },
};
</script>

<style scoped>
.el-divider {
  margin: 10px;
}
.social-page {
  display: block;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-left: 15%;
  margin-right: 15%;
  padding: 20px;
}
.title {
  font-family: "Courier New", Courier, monospace;
  color: #666;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #c20c0c;
  margin-bottom: 20px;
}
.user-info-top {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.user-avatar {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}

.user-name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 20px;
}
.user-info-foot {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>