<template>
  <div class="act-item">
    <!-- 发布者者头像 -->
    <div class="acter-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="activityInfo.avatar_path"
        style="height: 100%; width: 100%"
      ></el-avatar>
    </div>
    <!-- 发布-->
    <div class="act-right">
      <div class="act-right-top">
        <!-- 发布者昵称 -->
        <span class="acter-name">
          <a href="" style="color: cornflowerblue">{{
            activityInfo.username
          }}</a>
        </span>
        <!-- 发布类型 -->
        <span class="act-type" v-show="activityInfo.type == 1">分享单曲</span>
        <span class="act-type" v-show="activityInfo.type == 2">分享歌单</span>
      </div>

      <!-- 发布时间 -->
      <div class="act-time">
        <span>{{ activityInfo.create_date }}</span>
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
            :src="activityInfo.cover_path"
            style="height: 100%; width: 100%"
          ></el-avatar>
        </div>
        <div class="src-info">
          <!-- 歌名 -->
          <div class="src-name">{{ activityInfo.name }}</div>
          <!-- 歌手 -->
          <el-link
            type="info"
            class="src-owner"
            v-show="activityInfo.type == 1"
            >{{ activityInfo.singer_name }}</el-link
          >
          <!-- 歌单 -->
          <el-link
            type="info"
            class="src-owner"
            v-show="activityInfo.type == 2"
            >{{ activityInfo.creator_name }}</el-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activityInfo"],
  data() {
    return {};
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