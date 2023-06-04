<template>
  <div class="replytome-page">
    <div class="title">回复列表</div>
    <!-- 回复列表 -->
    <div class="replytome-list">
      <NoticeItem
        v-for="item in noticeList"
        :key="item.id"
        :noticeInfo="item"
      />
    </div>
  </div>
</template>

<script>
import NoticeItem from "/src/components/NoticeItem.vue";
export default {
  components: {
    NoticeItem,
  },
  mounted() {
    this.$axios({
      url: "/message/get_user_reply/",
      method: "get",
      params: {
        JWT: JSON.parse(localStorage.getItem("loginInfo")).JWT,
      },
    }).then((res) => {
      if (res.data.result == 1) {
        this.noticeList = res.data.messages;
      } else {
        this.$message({
          message: res.data.message,
          type: "error",
        });
      }
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
</style>