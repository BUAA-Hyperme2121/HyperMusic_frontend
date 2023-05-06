<template>
  <div class="social-page">
    <el-row :gutter="20">
      <!-- 左侧动态部分，展示自己和关注用户的动态 -->
      <el-col :span="16">
        <div class="title">动态</div>
        <div class="social-left">
          <!-- 动态列表 -->
          <div class="activity-list">
            <ActivityItem></ActivityItem>
            <el-divider></el-divider>
            <ActivityItem></ActivityItem>
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
              <img src="../assets/avatar.png" alt="" />
            </div>
            <div class="user-name">shyJyt</div>
          </div>
          <div class="user-info-foot">
            <el-link type="info" @click="showMyAct">动态 1</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="info" @click="showFollow">关注 1</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="info" @click="showFan">粉丝 1</el-link>
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
    showMyAct() {
      // 发送请求查找用户自己发的动态,更新左边动态列表
    },
    showFollow() {
      this.$router.push("/social/follow");
    },
    showFan() {
      this.$router.push("/social/fan");
    },
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
.user-avatar img {
  width: 100%;
  height: 100%;
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