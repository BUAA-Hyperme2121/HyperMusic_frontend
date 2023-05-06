<template>
  <div class="act-item">
    <!-- 发布者者头像 -->
    <div class="acter-avatar">
      <img src="../assets/avatar.png" alt="头像" />
    </div>
    <!-- 发布-->
    <div class="act-right">
      <div class="act-right-top">
        <!-- 发布者昵称 -->
        <span class="acter-name">
          <a href="" style="color: cornflowerblue">shyJyt</a>
        </span>
        <!-- 发布类型 -->
        <span class="act-type">上传单曲</span>
      </div>

      <!-- 发布时间 -->
      <div class="act-time">
        <span>2020-12-12 12:12:12</span>
      </div>

      <!-- 发布文案-->
      <div class="act-content">我上传了一首歌，一起来听听吧！</div>

      <!-- 发布链接  -->
      <div class="act-src">
        <!-- 封面 -->
        <div class="src-img">
          <img src="../assets/avatar.png" alt="" />
        </div>
        <div class="src-info">
          <!-- 歌名 -->
          <div class="src-name">歌名</div>
          <!-- 歌手/歌单所有者 -->
          <el-link type="info" class="src-owner">演唱者或歌单拥有者</el-link>
        </div>
      </div>

      <!-- 底部 -->
      <div class="act-right-foot">
        <!-- 点赞按钮 -->
        <el-button
          type="text"
          icon="el-icon-thumb"
          size="mini"
          class="like-btn"
          @click.once="like"
        >
          <span>点赞({{ likeCnt }})</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeCnt: 0,
    };
  },
  methods: {
    like() {
      this.likeCnt++;
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
.acter-avatar img {
  width: 100%;
  height: 100%;
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
.src-img img {
  width: 100%;
  height: 100%;
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