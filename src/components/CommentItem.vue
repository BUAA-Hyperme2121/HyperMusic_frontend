<template>
  <div class="comment-item">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <img src="../assets/avatar.png" alt="" />
    </div>
    <div class="comment-item-right">
      <!-- 用户名和评论内容 -->
      <div class="comment-item-right-top">
        <span class="user-name">shyJyt :</span>
        <span class="comment-content">{{ comment.content }}</span>
      </div>

      <div class="comment-item-right-foot">
        <!-- 评论时间 -->
        <span class="comment-time">{{ comment.time }}</span>
        <!-- 点赞数 -->
        <el-button
          type="text"
          icon="el-icon-thumb"
          size="mini"
          class="like-btn"
          @click.once="like"
        >
          <span>点赞({{ comment.likeCnt }})</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
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
.user-avatar img {
  width: 100%;
  height: 100%;
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
}
.comment-time {
  color: #999;
  font-size: 8px;
}
.like-btn {
  float: right;
}
</style>