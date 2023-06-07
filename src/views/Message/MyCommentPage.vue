<template>
  <div class="my-comment-page">
    <div class="title">我的评论</div>
    <!-- 我的评论列表 -->
    <div class="my-comment-list" v-if="refresh">
      <CommentItem
        v-for="item in commentList"
        :key="item.id"
        :commentInfo="item"
        @changeLikeStatus="changeLikeStatus"
        @subLikeCnt="subLikeCnt"
        @addLikeCnt="addLikeCnt"
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
      refresh: true,
    };
  },
  methods: {
    //更新评论列表
    refreshing() {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
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
          this.commentList = res.data.music_comment_list;
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