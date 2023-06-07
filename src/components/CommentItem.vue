<template>
  <div class="comment-item">
    <!-- 用户头像 -->
    <div class="user-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="commentInfo.poster_avatar_path"
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
        <span class="comment-time">{{
          commentInfo.create_date.slice(0, 10) +
          " " +
          commentInfo.create_date.slice(11, 19)
        }}</span>
        <!-- 展开回复 -->
        <el-button
          type="text"
          size="mini"
          class="reply-btn"
          @click.native="changeShowReply"
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
          @click.native="addlike"
          v-if="!commentInfo.is_liked"
        >
          <span>点赞({{ commentInfo.like_num }})</span>
        </el-button>
        <!-- 取消点赞按钮 -->
        <el-button
          type="text"
          icon="el-icon-caret-top"
          size="mini"
          class="like-btn"
          @click.native="cancelLike"
          v-if="commentInfo.is_liked"
        >
          <span>取消点赞({{ commentInfo.like_num }})</span>
        </el-button>
        <!-- 删除按钮 -->
        <el-button
          type="text"
          size="mini"
          class="delete-btn"
          @click.native="deleteComment"
          icon="el-icon-delete"
          v-if="commentInfo.poster_id == $store.state.userInfo.id"
        >
          <span>删除</span>
        </el-button>
        <!-- 编辑按钮 -->
        <el-button
          type="text"
          size="mini"
          class="edit-btn"
          @click.native="changeShowModify"
          icon="el-icon-edit"
          v-if="commentInfo.poster_id == $store.state.userInfo.id"
        >
          <span>编辑</span>
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
              v-model="reply_content"
              class="comment-input"
            ></el-input>
          </div>
          <div class="comment-submit-foot">
            <el-button
              type="primary"
              @click.native="submitReply"
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
            @updateReplyList="updateReplyList"
          />
        </div>
      </div>

      <!-- 修改评论 -->
      <div v-show="showModify" class="reply-container">
        <!-- 修改评论 -->
        <div class="comment-submit">
          <div class="comment-submit-top">
            <!-- 输入框 -->
            <el-input
              type="textarea"
              maxlength="50"
              show-word-limit
              :rows="3"
              placeholder="修改评论"
              v-model="new_comment"
              class="comment-input"
            ></el-input>
          </div>
          <div class="comment-submit-foot">
            <el-button
              type="primary"
              @click.native="modifyComment"
              class="comment-submit-btn"
              size="small"
              >修改</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import ReplyItem from "./ReplyItem.vue";
export default {
  components: {
    ReplyItem,
  },
  props: ["commentInfo"],
  methods: {
    //更新回复列表
    updateReplyList() {
      let jwt = null;
      if (localStorage.getItem("loginInfo") != null) {
        jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      } else {
        jwt = "-1";
      }
      this.$axios({
        url: "/message/get_reply/",
        method: "get",
        params: {
          JWT: jwt,
          root_id: this.commentInfo.id,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.replyList = res.data.replys;
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
    changeShowReply() {
      //第一次点击展开回复时，向后端请求回复列表
      if (this.showReply == false && this.replyList.length == 0) {
        this.updateReplyList();
      }
      //展开或收起回复
      this.showReply = !this.showReply;
    },

    //展开或收起修改评论
    changeShowModify() {
      this.showModify = !this.showModify;
    },

    //回复评论
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
        url: "/message/cre_reply/",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          root_id: this.commentInfo.id,
          fa_id: -1,
          isLevel2: 1,
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
            this.updateReplyList();
            //向一级评论所有者发送消息
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
    //点赞评论
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
        url: "/message/like/",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          type: 2, //类型为评论
          object_id: this.commentInfo.id,
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
            this.$emit("updateCommentList");
            // 向被点赞用户发送消息
            // this.$axios({
            //   methods: "post",
            //   url: "/message/send_message",
            //   data: qs.stringify({
            //     receiver_id: this.commentInfo.poster_id,
            //     content: "点赞了你的评论",
            //     poster_id: this.$store.state.userInfo.id,
            //     object_id: this.commentInfo.id,
            //     type: 4,
            //     message_type: 2,
            //   }),
            // });
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
    //取消点赞评论
    cancelLike() {
      // 取消点赞该评论
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        url: "/message/cancel_like/",
        method: "post",
        data: qs.stringify({
          JWT: jwt,
          type: 2,
          obj_id: this.commentInfo.id,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: "取消点赞成功",
              type: "success",
            });
            // // 更新点赞数
            // this.$emit("subLikeCnt", this.commentInfo.id);
            // // 修改点赞状态
            // this.$emit("changeLikeStatus", this.commentInfo.id);
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
    //发布者删除评论
    deleteComment() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        url: "/message/del_comment/",
        method: "get",
        params: {
          JWT: jwt,
          comment_id: this.commentInfo.id,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
            // 更新评论列表
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
    //编辑评论
    modifyComment(){
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        url: "/message/modify_comment/",
        method: "get",
        params: {
          JWT: jwt,
          comment_id: this.commentInfo.id,
          content: this.new_comment,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
            // 关闭编辑框
            this.showModify = false;
            // 强制刷新页面
            location.reload(true);
            // this.$emit("refreshing");
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
    }
  },
  data() {
    return {
      showReply: false,
      showModify: false,
      reply_content: "",
      new_comment: "",

      replyList: [],
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