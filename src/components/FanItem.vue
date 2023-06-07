<template>
  <div class="fan-item">
    <!-- 粉丝头像 -->
    <div class="fan-avatar" @click="goFanHome" style="cursor: pointer;">
      <el-avatar
        shape="square"
        fit="fill"
        :src="fanInfo.avatar_path"
        style="height: 45px; width: 45px"
      ></el-avatar>
    </div>
    <!-- 粉丝信息 -->
    <div class="fan-info">
      <!-- 粉丝昵称 -->
      <div class="fan-name" @click="goFanHome">{{ fanInfo.username }}</div>
      <!-- 粉丝签名 -->
      <div class="fan-sign">{{ fanInfo.introduction }}</div>
    </div>
    <!-- 关注状态(对观察者而言)-->
    <div class="status">
      <el-button
        type="primary"
        size="mini"
        @click="follow"
        v-show="!fanInfo.is_follow"
        >关注</el-button
      >
      <el-button
        type="primary"
        size="mini"
        @click="unFollow"
        v-show="fanInfo.is_follow"
        @mouseover.native="enterBtnText"
        @mouseout.native="outBtnText"
        >{{ btnText }}</el-button
      >
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  //传入粉丝信息
  props: ["fanInfo"],
  methods: {
    //跳转到粉丝主页
    goFanHome() {
      this.$router.push({
        path: "/user/home",
        query: {
          user_id: this.fanInfo.id,
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
    //关注粉丝
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
        method: "post",
        url: "/user/follow/",
        data: qs.stringify({
          JWT: jwt,
          follow_id: this.fanInfo.id,
        }),
      }).then((res) => {
        if (res.data.result == 1) {
          this.$message({
            message: "关注成功",
            type: "success",
          });
          //触发FanPage更新粉丝列表
          this.$emit("updateFanList");
          //因为没有再次发送请求刷新数据，在这之前必须手动维护数据
          //增加关注者(当前登录用户)关注数量
          this.$store.commit("addFollowNum");
          // 向被关注用户发送消息
          // this.$axios({
          //   methods: "post",
          //   url: "/message/send_message",
          //   data: {
          //     receiver_id: this.fanInfo.id,
          //     content: "关注了你",
          //     poster_id: this.$store.state.userInfo.id,
          //     object_id: -1,
          //     type: -1,
          //     message_type: 3,
          //   },
          // });
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    },
    //取消关注粉丝，不用验证登录，因为只有登录用户才能看到已关注按钮
    unFollow() {
      this.$confirm("确定取消关注吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 确认取消关注
        .then(() => {
          let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
          // console.log(jwt);
          // console.log(this.fanInfo.id);
          this.$axios({
            method: "post",
            url: "/user/unfollow/",
            data: qs.stringify({
              JWT: jwt,
              follow_id: this.fanInfo.id,
            }),
          }).then((res) => {
            if (res.data.result == 1) {
              this.$message({
                type: "success",
                message: "取消关注成功",
              });
              // 更新粉丝列表
              this.$emit("updateFanList");
              //因为没有再次发送请求刷新数据，在这之前必须手动维护数据
              //减少关注者(当前登录用户)关注数量
              this.$store.commit("subFollowNum");
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
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
  data() {
    return {
      btnText: "已关注",
    };
  },
};
</script>

<style scoped>
.fan-item {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
}
.fan-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.fan-avatar :hover {
  cursor: pointer;
}
.fan-name :hover {
  cursor: pointer;
}
.fan-info {
  margin-right: 10px;
  width: 200px;
}
.fan-sign {
  font-size: 12px;
  color: #999;
}
</style>