<template>
  <div class="reply-item">
    <!-- 回复者头像 -->
    <div class="replyer-avatar">
      <img src="../assets/avatar.png" alt="头像" />
    </div>
    <!-- 回复-->
    <div class="reply-right">
      <div class="reply-right-top">
        <!-- 回复者昵称 -->
        <span class="replyer-name">
          <a href="" style="color: cornflowerblue">shyJyt</a>
        </span>
        <!-- 回复时间 -->
        <span class="reply-time">
          2023年4月13日&nbsp;
          <i class="el-icon-time"></i>
        </span>
      </div>

      <!-- 回复内容 -->
      <div class="reply-content">
        <span>回复我：</span>
        <span>是这样的</span>
      </div>

      <div class="reply-right-foot">
        <!-- 原评论内容 -->
        <span style="font-size:10px;color:#999">我的评论：好听捏</span>
        <!-- 回复按钮 -->
        <span class="reply-btn">
          <i class="el-icon-chat-line-round"></i>
          <span>回复</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.reply-item {
  display: flex;
  margin: 10px 0;
  height: 100px;
}
.replyer-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.replyer-avatar img {
  width: 100%;
  height: 100%;
}
.reply-right {
  width: 100%;
  background-color: #f2f2f2;
}
.reply-right-top {
  margin-bottom: 20px;
}
.replyer-name {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
}
.reply-time {
  float: right;
  margin-right: 10px;
}
.reply-content {
  margin-left: 10px;
}
.reply-right-foot {
  width: 100%;
  margin-top: 15px;
  margin-left: 10px;
}
.reply-btn {
  margin-right: 20px;
  float: right;
  color: cornflowerblue;
}
</style>