<template>
  <div class="my-comment-page">
    <div class="title">我的评论</div>
    <!-- 我的评论列表 -->
    <div class="my-comment-list">
      <CommentItem
        v-for="item in commentList"
        :key="item.id"
        :commentInfo="item"
      />
    </div>
  </div>
</template>

<script>
// 引入commentItem组件
import CommentItem from "/src/components/CommentItem.vue";
export default {
  components: {
    CommentItem,
  },
  data() {
    return {
      //评论列表
      commentList: [],
    };
  },
  mounted() {
    // 获取评论列表
    let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    this.$axios({
      method: "get",
      url: "/message/list_user_comment/",
      params: {
        user_id: this.$store.state.userInfo.id,
        JWT: jwt,
      },
    })
      .then((res) => {
        if (res.data.result == 1) {
          this.commentList = res.data.comments;
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.$message({
          message: "服务器开摆了！！芜湖",
          type: "error",
        });
      });
  },
};
</script>

<style scoped>
.title {
  font-family: "Courier New", Courier, monospace;
  color: black;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #c20c0c;
}
.my-comment-list {
  margin-top: 20px;
  width: 100%;
}
</style>