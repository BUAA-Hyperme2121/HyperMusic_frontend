<template>
  <div class="follow-item">
    <!-- 关注用户头像 -->
    <div class="follow-avatar">
      <img src="../assets/avatar.png" alt="" />
    </div>
    <!-- 关注用户信息 -->
    <div class="follow-info">
      <!-- 关注用户昵称 -->
      <div class="follow-name">shyJyt</div>
      <!-- 关注用户签名 -->
      <div class="follow-sign">这个人很懒，什么都没留下</div>
    </div>
    <!-- 关注状态 -->
    <div class="status">
      <!-- <el-button type="primary" size="mini">关注</el-button> -->
       <el-button type="info" plain size="mini">取关</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.follow-item {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
}
.follow-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.follow-avatar img {
  width: 100%;
  height: 100%;
}
.follow-info {
    margin-right: 10px;
}
.follow-sign {
  font-size: 12px;
  color: #999;
}
</style>