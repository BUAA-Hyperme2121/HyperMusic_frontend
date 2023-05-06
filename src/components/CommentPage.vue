<template>
  <div class="comment-page">
    <div class="title">评论</div>
    <!-- 发表评论 -->
    <div class="comment-submit">
      <div class="comment-submit-top">
        <!-- 用户头像 -->
        <div class="user-avatar">
          <img src="../assets/avatar.png" alt="" />
        </div>
        <!-- 评论输入框 -->
        <el-input
          type="textarea"
          maxlength="50"
          show-word-limit
          :rows="3"
          placeholder="请输入评论"
          v-model="comment"
          class="comment-input"
        ></el-input>
      </div>
      <div class="comment-submit-foot">
        <el-button
          type="primary"
          @click="submitComment"
          class="comment-submit-btn"
          size="small"
          >发表</el-button
        >
      </div>
    </div>

    <div class="title2">精彩评论</div>
    <!-- 评论列表 -->
    <div class="comment-list">
      <CommentItem v-for="item in commentList" :key="item.id" :comment="item" />
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";

export default {
  name: "CommentPage",
  components: {
    CommentItem,
  },
  data() {
    return {
      comment: "",
      commentList: [],
    };
  },
  methods: {
    submitComment() {
      if (!this.comment.trim()) return alert("输入不能为空");
      const commentObj = {
        id: 1,
        content: this.comment,
        time: new Date().toLocaleString(),
        likeCnt: 0,
      };
      this.commentList.unshift(commentObj);
    },
  },
};
</script>

<style scoped>
.comment-page {
  background-color: #fff;
}
.title {
  font-family: "Courier New", Courier, monospace;
  color: #666;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #c20c0c;
}
.comment-submit {
  margin-top: 20px;
  margin-bottom: 20px;
}
.comment-list {
  margin-top: 20px;
  width: 100%;
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
.comment-submit-top {
  display: flex;
}
.comment-submit-foot {
  margin-bottom: 10px;
  overflow: auto;
}
.comment-submit-btn {
  margin-top: 10px;
  float: right;
}
.title2 {
  font-family: "Courier New", Courier, monospace;
  color: #666;
  font-size: 12px;
  font-weight: bold;
  border-bottom: 1px solid;
  margin-top: 20px;
}
</style>