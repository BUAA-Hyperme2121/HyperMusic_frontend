<template>
  <div class="reply-item">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <img src="../assets/avatar.png" alt="" />
    </div>
    <div class="reply-item-right">
      <!-- 用户名和回复内容 -->
      <div class="reply-item-right-top">
        <span class="user-name">{{ replyInfo.replyer_name }} :</span>
        <span class="reply-content">{{ replyInfo.reply_content }}</span>
      </div>

      <div v-show="!replyInfo.isLevel2" class="fa-content">
        <!-- 三级及以上评论显示父评论内容 -->
        <span style="font-size: 10px; color: #999"
          >{{ replyInfo.fa_username }}:{{ replyInfo.fa_reply_content }}</span
        >
      </div>

      <div class="reply-item-right-foot">
        <!-- 评论时间 -->
        <span class="reply-time">{{ replyInfo.reply_time }}</span>
        <!-- 展开回复 -->
        <el-button
          type="text"
          size="mini"
          class="reply-btn"
          @click="changeShowReply"
          icon="el-icon-chat-line-round"
        >
          <span>回复</span>
        </el-button>
        <!-- 点赞数 -->
        <el-button
          type="text"
          icon="el-icon-caret-top"
          size="mini"
          class="like-btn"
          @click="like"
        >
          <span>点赞({{ replyInfo.likeCnt }})</span>
        </el-button>
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
.fa-content{
  margin-top: 10px;
  padding: 10px;
  background-color: #f4f4f4;
  border: #999 solid 1px;
}
</style>