<template>
  <div class="fan-item">
    <!-- 粉丝头像 -->
    <div class="fan-avatar">
      <img src="../assets/avatar.png" alt="" />
    </div>
    <!-- 粉丝信息 -->
    <div class="fan-info">
      <!-- 粉丝昵称 -->
      <div class="fan-name">shyJyt</div>
      <!-- 粉丝签名 -->
      <div class="fan-sign">这个人很懒，什么都没留下</div>
    </div>
    <!-- 关注状态 -->
    <div class="status">
      <el-button type="primary" size="mini">关注</el-button>
       <!-- <el-button type="info" plain size="mini">取关</el-button> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.fan-item {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
}
.fan-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.fan-avatar img {
  width: 100%;
  height: 100%;
}
.fan-info {
    margin-right: 10px;
}
.fan-sign {
  font-size: 12px;
  color: #999;
}
</style>