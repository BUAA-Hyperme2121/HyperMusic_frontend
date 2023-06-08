<template>
  <div>
    <el-row class="top-nav">
      <!-- logo -->
      <el-col :span="5" class="logo">
        <i style="font-size: 20px" class="icon iconfont icon-yinle"></i>
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
          @select="handleSelect"
        >
          <el-menu-item index="1">音乐馆</el-menu-item>
          <el-menu-item index="2">我的音乐</el-menu-item>
          <el-menu-item index="3">关注</el-menu-item>
        </el-menu>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="6" class="search-box">
        <el-input
          placeholder="搜索音乐、歌手、专辑"
          prefix-icon="el-icon-search"
          size="small"
          class="search-input"
          @keyup.enter.native="goSearch()"
          v-model="keywords"
        ></el-input>
      </el-col>

      <!-- github仓库链接 -->
      <a
        href="https://github.com/BUAA-Hyperme2121/HyperMusic_frontend"
        class="github-link"
        style="margin-left: 50px"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>

      <!-- 消息中心 -->
      <span class="message-center" @click="goMessage" style="margin-left: 40px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
          />
        </svg>
      </span>

      <el-col :span="3">
        <!-- 登录注册 -->
        <div
          class="nav-right"
          v-if="Object.keys($store.state.userInfo).length == 0"
        >
          <router-link to="/login" class="login-link">登录</router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link to="/register" class="register-link">注册</router-link>
        </div>
        <!-- 用户信息 -->
        <div
          class="nav-right"
          v-if="!Object.keys($store.state.userInfo).length == 0"
        >
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="user-image" style="border-radius: 50%">
              <el-avatar
                shape="square"
                fit="fill"
                :src="$store.state.userInfo.avatar_path"
                style="height: 100%; width: 100%"
                @click.native="goUserHome"
              ></el-avatar>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="upload">上传歌曲</el-dropdown-item>
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
      keywords: "",
    };
  },
  methods: {
    //点击logo，转到首页
    goHomePage() {
      // 防止重复跳转飘红
      if (this.$route.path !== "/homepage") {
        this.$router.push({
          path: "/homepage",
        });
      }
    },
    //点击头像，转到个人主页
    goUserHome() {
      this.$router.push({
        path: "/user/home",
        query: {
          user_id: this.$store.state.userInfo.id,
        },
      });
    },
    goMessage() {
      // 防止重复跳转飘红
      if (this.$route.path !== "/user/message") {
        this.$router.push({
          path: "/user/message",
        });
      }
    },
    //点击导航栏，转到对应页面
    handleSelect(index) {
      if (index === "1") {
        //转到音乐馆
        if (this.$route.path !== "/homepage") {
          this.$router.push("/homepage");
        }
      } else if (index === "2") {
        //转到我的音乐
        if (this.$route.path !== "/user/music") {
          this.$router.push("/user/music");
        }
      } else if (index === "3") {
        //直接转到关注，如果未登录则提示登录，游客不可以通过点击导航栏进入关注页面
        let loginInfo = localStorage.getItem("loginInfo");
        if (loginInfo === null) {
          this.$message({
            message: "请先登录",
            type: "warning",
          });
          return;
        }
        if (this.$route.path !== "/social") {
          this.$router.push("/social");
        }
      }
    },
    //点击下拉菜单，处理命令
    handleCommand(command) {
      if (command === "logout") {
        //处理退出登录的逻辑
        //清除信息
        this.isLogin = false;
        localStorage.clear();
        this.$store.state.userInfo = {};
        //跳转到主页
        this.$router.push("/homepage");
        //提示退出成功
        this.$message({
          message: "记得回来Oh~",
          type: "success",
        });
      } else if (command === "setting") {
        //转到设置页面
        if (this.$route.path !== "/user/setting") {
          this.$router.push("/user/setting");
        }
      } else if (command === "upload") {
        //转到上传歌曲页面
        if (this.$route.path !== "/creator") {
          this.$router.push("/creator");
        }
      }
    },
    //搜索内容
    goSearch() {
      this.$router.push({
        path: "/search",
        query: { keywords: this.keywords },
      });
      this.$store.commit("setSearchRender", false);
    },
  },

  mounted() {
    //获取登录信息（发请求重新获取个人信息？？）
    if (localStorage.getItem("loginInfo") !== null) {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "get",
        url: "/page/get_user_info/",
        params: {
          JWT: jwt,
          user_id: JSON.parse(localStorage.getItem("loginInfo")).user.id,
        },
      }).then((res) => {
        // 获取成功
        if (res.data.result == 1) {
          this.$store.state.userInfo = res.data.user_info;
        }
        // 获取失败
        else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    }
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

.github-link {
  width: 30px;
  height: 30px;
  margin-top: 18px;
  margin-left: 20px;
  color: #fff;
  text-decoration: none;
}

.message-center {
  width: 30px;
  height: 30px;
  margin-top: 18px;
  margin-left: 20px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
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
  border-radius: 5%;
  height: 40px;
  width: 40px;
  overflow: hidden;
  background-color: #999;
  cursor: pointer;
}
</style>



