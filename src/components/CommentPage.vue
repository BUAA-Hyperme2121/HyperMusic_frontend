<template>
  <div class="comment-page">
    <div class="title">评论</div>
    <!-- 发表评论，游客看不见这个输入框-->
    <div
      class="comment-submit"
      v-show="!Object.keys($store.state.userInfo).length == 0"
    >
      <div class="comment-submit-top">
        <!-- 用户头像 -->
        <div class="user-avatar">
          <el-avatar
            shape="square"
            fit="fill"
            :src="$store.state.userInfo.avatar_path"
            style="height: 100%; width: 100%"
          ></el-avatar>
        </div>
        <!-- 评论输入框 v-model="comment_content"-->
        <input
          type="textarea"
          v-bind:value="this.comment_content"
          v-on:input="changeName"
          class="comment-input"/>
      </div>
      <!-- 发表按钮  -->
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

    <div class="title2">
      <span>精彩评论({{ commentList.length }})</span>
      <el-dropdown
        style="float: right"
        trigger="click"
        size="mini"
        @command="handleSort"
      >
        <span class="el-dropdown-link">
          排序<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="最热">最热</el-dropdown-item>
          <el-dropdown-item command="最新">最新</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 评论列表，全部都是一级评论 -->
    <div class="comment-list">
      <CommentItem
        v-for="item in commentList"
        :key="item.id"
        :commentInfo="item"
        @updateCommentList="updateCommentList"
        @changeLikeStatus="changeLikeStatus"
        @subLikeCnt="subLikeCnt"
        @addLikeCnt="addLikeCnt"
      />
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import qs from "qs";
export default {
  name: "CommentPage",
  components: {
    CommentItem,
  },
  //传入的歌曲/歌单id，type为1表示歌曲，为2表示歌单,owner_id为歌曲上传者/歌单创建者id
  props: ["object_id", "type", "owner_id"],
  data() {
    return {
      comment_content: "", //评论内容
      commentList: [],
    };
  },
  methods: {
    changeName: function (e) {
            this.comment_content = e.target.value;
        },
    //对评论排序
    handleSort(command) {
      if (command == "最热") {
        this.commentList.sort((a, b) => {
          return b.like_num - a.like_num;
        });
      } else if (command == "最新") {
        this.commentList.sort((a, b) => {
          return new Date(b.create_time) - new Date(a.create_time);
        });
      }
    },
    //发表评论
    submitComment() {
      //判断是否登录
      if (localStorage.getItem("loginInfo") == null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      //判断评论是否为空
      if (this.comment_content.trim() == "") {
        this.$message({
          message: "评论不能为空噢",
          type: "warning",
        });
        return;
      }
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        url: "/message/cre_comment/",
        method: "post",
        data: qs.stringify({
          object_id: this.object_id,
          type: this.type,
          content: this.comment_content,
          JWT: jwt,
        }),
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.$message({
              message: res.data.message,
              type: "success",
            });
            //清空输入框
            this.comment = "";
            
            this.updateCommentList();
            //向歌曲/歌单拥有者发送消息
            // this.$axios({
            //   url: "/message/send_message/",
            //   methods: "post",
            //   data: qs.stringify({
            //     receiver_id: this.owner_id,
            //     poster_id: this.$store.state.userInfo.id,
            //     content: "评论了你的歌曲/歌单",
            //     type: this.type,
            //     object_id: this.object_id,
            //     message_type: 1,
            //   }),
            // });
          } else {
            this.$message({
              message: res.data.message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器？寄！",
            type: "error",
          });
        });
    },

    addLikeCnt(comment_id) {
      for (let i = 0; i < this.commentList.length; i++) {
        if (this.commentList[i].id == comment_id) {
          this.commentList[i].like_num += 1;
          break;
        }
      }
    },
    subLikeCnt(comment_id) {
      for (let i = 0; i < this.commentList.length; i++) {
        if (this.commentList[i].id == comment_id) {
          this.commentList[i].like_num -= 1;
          break;
        }
      }
    },
    changeLikeStatus(comment_id) {
      for (let i = 0; i < this.commentList.length; i++) {
        if (this.commentList[i].id == comment_id) {
          this.commentList[i].is_liked = !this.commentList[i].is_liked;
          break;
        }
      }
    },

    //更新评论列表
    updateCommentList() {
      //检查是否登录
      let jwt = null;
      if (localStorage.getItem("loginInfo") == null) {
        jwt = "-1";
      } else {
        jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      }
      this.$axios({
        url: "/message/list_object_comment/",
        methods: "get",
        params: {
          object_id: this.object_id,
          type: this.type,
          JWT: jwt,
        },
      })
        .then((res) => {
          if (res.data.result == 1) {
            this.commentList = res.data.list_music_comment;
          } else {
            this.$message({
              message: res.data.message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器？寄！",
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.updateCommentList();
  },
};
</script>

<style>
.comment-page {
  background-color: transparent;
}
.title {
  font-family: "Courier New", Courier, monospace;
  color: #FFF;
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
  color: #FFF;
  font-size: 12px;
  font-weight: bold;
  border-bottom: 1px solid;
  margin-top: 20px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown {
  font-size: 12px;
}
</style>