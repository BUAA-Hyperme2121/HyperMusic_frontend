<template>
  <div class="act-item">
    <!-- 发布者者头像 -->
    <div class="acter-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="activityInfo.poster_avatar_path"
        style="height: 100%; width: 100%"
      ></el-avatar>
    </div>
    <!-- 发布-->
    <div class="act-right">
      <div class="act-right-top">
        <!-- 发布者昵称 -->
        <span class="acter-name">
          <a href="" style="color: cornflowerblue">{{
            activityInfo.poster_name
          }}</a>
        </span>
        <!-- 发布类型 -->
        <span class="act-type" v-show="activityInfo.type == 1">分享单曲</span>
        <span class="act-type" v-show="activityInfo.type == 2">分享歌单</span>
      </div>

      <!-- 发布时间 -->
      <div class="act-time">
        <span>{{
          activityInfo.create_date.slice(0, 10) +
          " " +
          activityInfo.create_date.slice(11, 19)
        }}</span>
      </div>

      <!-- 发布文案-->
      <div class="act-content">{{ activityInfo.content }}</div>

      <!-- 发布链接  -->
      <div class="act-src">
        <!-- 封面 -->
        <div class="src-img">
          <el-avatar
            shape="square"
            fit="fill"
            :src="activityInfo.object_cover_path"
            style="height: 100%; width: 100%"
          ></el-avatar>
        </div>
        <div class="src-info">
          <!-- 歌名 -->
          <div class="src-name">{{ activityInfo.object_name }}</div>
          <!-- 歌手 -->
          <el-link
            type="info"
            class="src-owner"
            v-show="activityInfo.type == 1"
            >{{ activityInfo.object_owner_name }}</el-link
          >
          <!-- 歌单 -->
          <el-link
            type="info"
            class="src-owner"
            v-show="activityInfo.type == 2"
            >{{ activityInfo.object_owner_name }}</el-link
          >
        </div>
      </div>

      <!-- 底部 -->
      <div class="act-right-foot">
        <!-- 点赞按钮 -->
        <el-button
          type="text"
          icon="el-icon-caret-top"
          size="mini"
          class="like-btn"
          @click.native="addLike"
          v-if="activityInfo.is_liked == 0"
        >
          <span>点赞({{ activityInfo.like_num }})</span>
        </el-button>
        <!-- 取消点赞按钮 -->
        <el-button
          type="text"
          icon="el-icon-caret-top"
          size="mini"
          class="like-btn"
          @click.native="cancelLike"
          v-else
        >
          <span>取消点赞({{ activityInfo.like_num }})</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  props: ["activityInfo", "user_id"],
  data() {
    return {};
  },
  methods: {
    addLike() {
      // 点赞该动态
      console.log(this.activityInfo);
      //判断是否登录
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
        url: "/message/like/",
        data: qs.stringify({
          JWT: jwt,
          type: 1,
          object_id: this.activityInfo.id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "点赞成功",
              type: "success",
            });
            // 更新点赞数
            this.$emit("addLikeCnt", this.activityInfo.id);
            // 修改点赞状态
            this.$emit("changeLikeStatus", this.activityInfo.id);

            // // 向被点赞用户发送消息
            // this.$axios({
            //   methods: "post",
            //   url: "/message/send_message",
            //   data: qs.stringify({
            //     receiver_id: this.activityInfo.poster_id,
            //     content: "点赞了你的动态",
            //     poster_id: this.$store.state.userInfo.id,
            //     object_id: this.activityInfo.id,
            //     type: 1,
            //     message_type: 2,
            //   }),
            // });
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelLike() {
      // console.log(11111111);
      // 取消点赞该动态
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        url: "/message/cancel_like/",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          type: 1,
          object_id: this.activityInfo.id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "取消点赞成功",
              type: "success",
            });
            // 更新点赞数
            this.$emit("subLikeCnt", this.activityInfo.id);
            // 修改点赞状态
            this.$emit("changeLikeStatus", this.activityInfo.id);
            // // 删除消息，防止再次点赞后再次收到消息
            // this.$axios({
            //   path: "/message",
            //   method: "delete",
            //   data: JSON.stringify({
            //     JWT: jwt,
            //     // 1表示点赞类型的消息
            //     msg_type: 1,
            //     // 1表示点赞对象为动态
            //     type: 1,
            //     obj_id: this.activityInfo.activity_id,
            //   }),
            // })
            //   .then((res) => {
            //     if (res.data.code == 200) {
            //       console.log("删除消息成功");
            //     } else {
            //       console.log("删除消息失败");
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.act-item {
  display: flex;
  margin: 10px 0;
}
.acter-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}

.act-right {
  width: 100%;
}
.acter-name {
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}
.act-type {
  color: #666;
  font-size: 12px;
}
.act-time {
  color: #999;
  font-size: 8px;
  margin-bottom: 10px;
}
.act-content {
  margin-left: 10px;
  font-size: 14px;
  margin-bottom: 10px;
}
.act-src {
  padding: 10px;
  display: flex;
  background-color: #f2f2f2;
}
.src-img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.src-name {
  font-size: 14px;
}
.src-owner {
  font-size: 10px;
}
.act-right-foot {
  width: 100%;
  margin-top: 15px;
}
.like-btn {
  float: right;
}
</style>