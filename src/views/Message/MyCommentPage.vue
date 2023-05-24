<template>
  <div class="my-comment-page">
    <div class="title">我的评论</div>
    <!-- 我的评论列表 -->
    <div class="my-comment-list">
      <CommentItem v-for="item in commentList" :key="item.id" :commentInfo="item" />
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
      commentList: [
        {
          id: 1,
          content: "测试长文本测试长文本测试长文本测试长文本测试长文本测试长文本测试长文本测试长文本",
          time: new Date().toLocaleString(),
          likeCnt: 0,
        },
        {
          id: 2,
          content: "这是我的评论2",
          time: new Date().toLocaleString(),
          likeCnt: 0,
        },
        {
          id: 3,
          content: "这是我的评论3",
          time: new Date().toLocaleString(),
          likeCnt: 0,
        }
      ],
    };
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