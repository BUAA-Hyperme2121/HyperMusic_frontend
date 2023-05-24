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
        <span class="comment-content">{{ commentInfo.content }}</span>
      </div>

      <div class="comment-item-right-foot">
        <!-- 评论时间 -->
        <span class="comment-time">{{ commentInfo.time }}</span>
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
          <span>点赞({{ commentInfo.likeCnt }})</span>
        </el-button>
      </div>

      <!-- 该一级评论附带的所有回复 -->
      <div v-show="showReply" class="reply-container">
        <!-- 发表回复 -->
        <div class="comment-submit">
          <div class="comment-submit-top">
            <!-- 回复输入框 -->
            <el-input
              type="textarea"
              maxlength="50"
              show-word-limit
              :rows="3"
              placeholder="回复"
              v-model="comment"
              class="comment-input"
            ></el-input>
          </div>
          <div class="comment-submit-foot">
            <el-button
              type="primary"
              @click="submitReply"
              class="comment-submit-btn"
              size="small"
              >发送</el-button
            >
          </div>
        </div>
        <!-- 回复列表 二级回复及以上-->
        <div>
          <ReplyItem
            v-for="replyInfo in replyList"
            :replyInfo="replyInfo"
            :key="replyInfo.reply_id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyItem from "./ReplyItem.vue";
export default {
  components: {
    ReplyItem,
  },
  props: ["commentInfo"],
  methods: {
    changeShowReply() {
      this.showReply = !this.showReply;
    },
  },
  data() {
    return {
      showReply: false,
      replyList: [
        {
          reply_id: 1,
          replyer_name: "shyJyt",
          replyer_avatarUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          reply_time: "2021-01-01 12:00:00",
          reply_content: "是这样的",
          isLevel2: true,
        },
        {
          reply_id: 2,
          replyer_name: "shyJyt",
          replyer_avatarUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          reply_time: "2021-01-01 12:00:00",
          reply_content: "你说得对",
          isLevel2: false,
          fa_username: "shyJyt",
          fa_reply_content: "是这样的",
        }
      ],
    };
  },
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
.comment-submit-foot {
  margin-bottom: 10px;
  overflow: auto;
}
.comment-submit-btn {
  margin-top: 10px;
  float: right;
}
</style>