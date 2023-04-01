<template>
  <div class="top-nav">
    <div class="logo">Hypermusic</div>
    <el-menu
      class="nav-menu"
      mode="horizontal"
      background-color="#242424"
      text-color="#ccc"
      active-text-color="#fff"
      :router="true"
    >
      <el-menu-item index="/homepage" >音乐馆</el-menu-item>
      <el-menu-item index="/user/music">我的音乐</el-menu-item>
      <el-menu-item index="/social">关注</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.top-nav {
  background-color: #242424;
  display: flex;
}
.logo {
  width: 200px;
  height: 58px;
}
.nav-menu {
  justify-content: space-between;
  align-items: center;
}
</style>
