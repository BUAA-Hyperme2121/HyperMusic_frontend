<template>
  <div class="comment-item">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="commentInfo.avatar_path"
        style="height: 100%; width: 100%"
      ></el-avatar>
    </div>
    <div class="comment-item-right">
      <!-- 用户名和评论内容 -->
      <div class="comment-item-right-top">
        <span class="user-name">{{ commentInfo.poster_name }} :</span>
        <span class="comment-content">{{ commentInfo.content }}</span>
      </div>

      <div class="comment-item-right-foot">
        <!-- 评论时间 -->
        <span class="comment-time">{{ commentInfo.create_date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["commentInfo"],
};
</script>

<style scoped>
.comment-item {
  display: flex;
  margin-bottom: 20px;
}
.user-avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.user-name {
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}
.comment-item-right {
  width: 100%;
}
.comment-item-right-foot {
  margin-top: 10px;
  overflow: auto;
}
.comment-time {
  color: #999;
  font-size: 8px;
}
.reply-btn {
  float: right;
}
.like-btn {
  float: right;
  margin-right: 5px;
}
.delete-btn {
  float: right;
  /* margin-right: 4px; */
}
.edit-btn {
  float: right;
  /* margin-right: 4px; */
}
.reply-container {
  padding: 10px;
  margin-top: 10px;
  background-color: #f2f2f2;
}
.comment-submit-foot {
  margin-bottom: 10px;
  overflow: auto;
}
.comment-submit-btn {
  margin-top: 10px;
  float: right;
}
</style>