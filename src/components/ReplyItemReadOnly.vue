<template>
  <div class="reply-item">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="replyInfo.avatar_path"
        style="height: 100%; width: 100%"
      ></el-avatar>
    </div>
    <div class="reply-item-right">
      <!-- 用户名和回复内容 -->
      <div class="reply-item-right-top">
        <span class="replyer-name">{{ replyInfo.replyer_name }} :</span>
        <span class="reply-content">{{ replyInfo.content }}</span>
      </div>
      <!-- 回复消息均要显示父评论内容 -->
      <div class="fa-content">
        <span style="font-size: 10px; color: #999"
          >{{ replyInfo.fa_username }}:{{ replyInfo.fa_content }}</span
        >
      </div>

      <div class="reply-item-right-foot">
        <!-- 评论时间 -->
        <span class="reply-time">{{ replyInfo.create_date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["replyInfo"],
};
</script>


<style scoped>
.reply-item {
  display: flex;
  margin-bottom: 20px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
.replyer-name {
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
}
.reply-item-right {
  width: 100%;
}
.reply-item-right-foot {
  margin-top: 10px;
}
.reply-time {
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
.reply-container {
  padding: 10px;
  margin-top: 10px;
  background-color: #f2f2f2;
}
.reply-submit-foot {
  margin-bottom: 10px;
  overflow: auto;
}
.reply-submit-btn {
  margin-top: 10px;
  float: right;
}
.fa-content {
  margin-top: 10px;
  padding: 10px;
  background-color: #f4f4f4;
  border: #999 solid 1px;
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