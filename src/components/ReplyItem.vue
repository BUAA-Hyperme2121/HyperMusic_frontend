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

      <div v-show="replyInfo.fa_id != null" class="fa-content">
        <!-- 三级及以上评论显示父评论内容 -->
        <span style="font-size: 10px; color: #999"
          >{{ replyInfo.fa_username }}:{{ replyInfo.fa_content }}</span
        >
      </div>

      <div class="reply-item-right-foot">
        <!-- 评论时间 -->
        <span class="reply-time">{{ replyInfo.create_date }}</span>
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
        <!-- 点赞按钮 -->
        <el-button
          type="text"
          icon="el-icon-caret-top"
          size="mini"
          class="like-btn"
          @click="addlike"
          v-if="!replyInfo.is_liked"
        >
          <span>点赞({{ replyInfo.like_num }})</span>
        </el-button>
        <!-- 取消点赞按钮 -->
        <el-button
          type="text"
          icon="el-icon-caret-top"
          size="mini"
          class="like-btn"
          @click="cancelLike"
          v-if="replyInfo.is_liked"
        >
          <span>取消点赞({{ replyInfo.like_num }})</span>
        </el-button>
      </div>

      <!-- 只展示输入框 -->
      <div v-show="showReply" class="reply-container">
        <!-- 发表回复 -->
        <div class="comment-submit">
          <div class="comment-submit-top">
            <!-- 回复输入框 -->
            <el-input
              type="textarea"
              maxlength="50"
              show-word-limit
              :rows="2"
              placeholder="回复"
              v-model="reply_content"
              class="comment-input"
            ></el-input>
          </div>
          <div class="comment-submit-foot">
            <el-button
              type="primary"
              @click="submitReply"
              class="comment-submit-btn"
              size="mini"
              >发送</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  props: ["replyInfo"],
  data() {
    return {
      showReply: false,
      reply_content: "",
    };
  },
  methods: {
    changeShowReply() {
      //展开或收起回复输入框
      this.showReply = !this.showReply;
    },
    //回复回复
    submitReply() {
      //判断是否登录
      if (localStorage.getItem("loginInfo") == null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      //判断回复内容是否为空
      if (this.reply_content.trim() == "") {
        this.$message({
          message: "回复内容不能为空",
          type: "warning",
        });
        return;
      }
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        path: "/message/cre_reply",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          root_id: this.replyInfo.root_id,
          fa_id: this.replyInfo.id,
          isLevel2: false,
          content: this.reply_content,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "回复成功",
              type: "success",
            });
            //清空回复内容
            this.reply_content = "";
            // //更新回复列表
            // let replyObj = res.data.replyObj;
            // this.replyList.unshift(replyObj);
            this.$emit("updateReplyList");
            //向回复的所有者发送消息
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点赞回复
    addlike() {
      //判断是否登录
      if (localStorage.getItem("loginInfo") == null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        path: "/message/like",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          type: 5, //类型为回复
          object_id: this.replyInfo.id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "点赞成功",
              type: "success",
            });
            // // 更新点赞数
            // this.$emit("addLikeCnt", this.commentInfo.id);
            // // 修改点赞状态
            // this.$emit("changeLikeStatus", this.commentInfo.id);
            this.$emit("updateReplyList");
            // 向被点赞用户发送消息
            this.$axios({
              methods: "post",
              url: "/message/send_message",
              data: qs.stringify({
                receiver_id: this.replyInfo.poster_id,
                content: "点赞了你的评论",
                poster_id: this.$store.state.userInfo.id,
                object_id: this.replyInfo.id,
                type: 4,
                message_type: 2,
              }),
            });
          } else {
            this.$message({
              message: this.res.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //取消点赞回复
    cancelLike() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        path: "/message/cancel_like",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          type: 5,
          obj_id: this.replyInfo.id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "取消点赞成功",
              type: "success",
            });
            this.$emit("updateCommentList");
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
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