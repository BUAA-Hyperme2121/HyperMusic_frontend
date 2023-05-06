<template>
  <div class="follow-page">
    <div class="title">关注列表</div>
    <div class="follow-list">
      <FollowItem></FollowItem>
      
      <FollowItem></FollowItem>
    </div>
  </div>
</template>

<script>
import FollowItem from "../../components/FollowItem.vue";
export default {
  components: {
    FollowItem,
  },
};
</script>

<style scoped>
.title {
  font-family: "Courier New", Courier, monospace;
  color: #666;
  font-size: 15px;
  font-weight: bold;

  margin-bottom: 20px;
}
</style>