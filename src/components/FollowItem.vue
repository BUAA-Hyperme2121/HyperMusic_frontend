<template>
  <div class="follow-item">
    <!-- 关注用户头像 -->
    <div class="follow-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="followInfo.avatar_path"
        style="height: 100%; width: 100%"
      ></el-avatar>
    </div>
    <!-- 关注用户信息 -->
    <div class="follow-info">
      <!-- 关注用户昵称 -->
      <div class="follow-name">{{ followInfo.username }}</div>
      <!-- 关注用户签名 -->
      <div class="follow-sign">{{ followInfo.introduction }}</div>
    </div>
    <!-- 关注状态 -->
    <div class="status">
      <el-button
        type="primary"
        size="mini"
        @click="follow"
        v-show="!followInfo.is_follow"
        >关注</el-button
      >
      <el-button
        type="primary"
        size="mini"
        @click="unFollow"
        v-show="followInfo.is_follow"
        @mouseover.native="enterBtnText"
        @mouseout.native="outBtnText"
        >{{ btnText }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["followInfo", "user_id"],
  data() {
    return {
      btnText: "已关注",
    };
  },
  methods: {
    //跳转到关注用户主页
    goFollowHome() {
      this.$router.push({
        path: "/user/home",
        query: {
          userId: this.followInfo.user_id,
        },
      });
    },
    // 鼠标经过按钮，显示取消关注
    enterBtnText() {
      this.btnText = "取消关注";
    },
    outBtnText() {
      this.btnText = "已关注";
    },

    //关注
    follow() {
      //判断是否登录
      if (!localStorage.getItem("loginInfo")) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        methods: "post",
        url: "/user/follow",
        data: {
          JWT: jwt,
          follow_user_id: this.followInfo.id,
        },
      }).then((res) => {
        if (res.data.result == 0) {
          this.$message({
            message: "关注成功",
            type: "success",
          });
          //触发FollowPage更新关注列表
          this.$emit("updateFollowList");
          //因为没有再次发送请求刷新数据，在这之前必须手动维护数据
          //增加关注者(当前登录用户)关注数量
          this.$store.commit("addFollowNum");
          // 向被关注用户发送消息
          this.$axios({
            methods: "post",
            url: "/message/send_message",
            data: {
              receiver_id: this.followInfo.id,
              content: "关注了你",
              poster_id: this.$store.state.userInfo.id,
              object_id: -1,
              type: -1,
              message_type: 3,
            },
          });
        } else {
          this.$message({
            message: "关注失败",
            type: "error",
          });
        }
      });
    },
    //取消关注,不用验证登录，因为只有登录用户才能看到已关注按钮
    unFollow() {
      this.$confirm("确定取消关注吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 确认取消关注
        .then(() => {
          let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
          this.$axios({
            methods: "post",
            url: "/user/unFollow",
            data: {
              JWT: jwt,
              user_id: this.followInfo.id,
            },
          }).then((res) => {
            if (res.data.reult == 0) {
              this.$message({
                type: "success",
                message: "取消关注成功",
              });
              // 更新关注列表
              this.$emit("updateFollowList");
              //因为没有再次发送请求刷新数据，在这之前必须手动维护数据
              //减少关注者(当前登录用户)关注数量
              this.$store.commit("reduceFollowNum");

            } else {
              this.$message({
                type: "error",
                message: "取消关注失败",
              });
            }
          });
        })
        // 取消取消关注
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>

<style scoped>
.follow-item {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
}
.follow-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.follow-info {
  margin-right: 10px;
}
.follow-sign {
  font-size: 12px;
  color: #999;
}
</style>