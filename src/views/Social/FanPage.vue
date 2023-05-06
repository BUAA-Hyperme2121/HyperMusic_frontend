<template>
  <div class="fan-page">
    <div class="title">粉丝列表</div>
    <div class="fan-list">
      <FanItem></FanItem>
      
      <FanItem></FanItem>
    </div>
  </div>
</template>

<script>
import FanItem from "../../components/FanItem.vue";
export default {
  components: {
    FanItem,
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