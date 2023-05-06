<template>
  <div>
    <el-row class="top-nav">
      <!-- logo -->
      <el-col :span="5" class="logo">
        <span @click="goHomePage"> HyperMusic </span>
      </el-col>
      <!-- 主要分区 -->
      <el-col :span="14">
        <el-menu
          class="nav-menu"
          mode="horizontal"
          background-color="#242424"
          text-color="#ccc"
          active-text-color="#fff"
          :router="true"
        >
          <el-menu-item index="/homepage">音乐馆</el-menu-item>
          <el-menu-item index="/user/music">我的音乐</el-menu-item>
          <el-menu-item index="/social">关注</el-menu-item>
        </el-menu>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="6" class="search-box">
        <el-input
          placeholder="搜索音乐、歌手、专辑"
          prefix-icon="el-icon-search"
          size="small"
          class="search-input"
        ></el-input>
      </el-col>

      <el-col :span="4">
        <!-- 登录注册 -->
        <div class="nav-right" v-if="!isLogin">
          <router-link to="/login" class="login-link">登录</router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link to="/register" class="register-link">注册</router-link>
        </div>
        <!-- 用户信息 -->
        <div class="nav-right" v-if="isLogin">
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="user-image">
              <img src="../assets/avatar.png" @click="goUserHome" />
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="msg">消息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取登录状态
      isLogin: false,
      
    };
  },
  methods: {
    //点击logo，转到首页
    goHomePage() {
      // 防止重复跳转飘红
      if (this.$route.path !== "/homepage") {
        this.$router.push("/homepage");
      }
    },
    //点击头像，转到个人主页
    goUserHome() {
      // 防止重复跳转飘红
      if (this.$route.path !== "/user/home") {
        this.$router.push("/user/home");
      }
    },
    handleCommand(command) {
      if (command === "logout") {
        //处理退出登录的逻辑
      } else if (command === "msg") {
        //转到消息页面
        if (this.$route.path !== "/user/message") {
          this.$router.push("/user/message");
        }
      } else if (command === "setting") {
        //转到设置页面
        if (this.$route.path !== "/user/setting") {
          this.$router.push("/user/setting");
        }
      }
    },
  },
  mounted() {
    // localStorage获取登录状态
    this.isLogin = JSON.parse(localStorage.getItem("isLogin"));
  },
};
</script>

<style scoped>
.top-nav {
  background-color: #242424;
  display: flex;
  height: 60px;
}
.logo {
  font-size: 20px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
/* .logo image{
  max-width: 50px;
  margin-right: 10px;
} */

.search-box {
  margin-top: 14px;
}

.nav-right {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.login-link {
  text-decoration: none;
  color: #ccc;
}

.register-link {
  text-decoration: none;
  color: #ccc;
}

.user-image {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #999;
  cursor: pointer;
}

.user-image img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>



