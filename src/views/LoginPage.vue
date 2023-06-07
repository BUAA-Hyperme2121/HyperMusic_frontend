<template>
  <div class="login-page">
    <div class="container">
      <div class="typed-out">HyperMusic</div>
    </div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-position="top"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="login" class="btn-primary">
      登录
    </el-button>
    <router-link to="/register" class="register-link"
      >没有账号？去注册</router-link
    >
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // 处理登录逻辑
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/user/login/",
            data: qs.stringify({
              username: this.loginForm.username,
              password: this.loginForm.password,
            }),
          })
            .then((res) => {
              if (res.data.result == 1) {
                // 登录成功
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                console.log(res.data);
                // 保存登录信息(用户信息、token、状态码及msg)
                localStorage.setItem("loginInfo", JSON.stringify(res.data));
                // Vuex中保存用户信息
                this.$store.state.userInfo = JSON.parse(
                  localStorage.getItem("loginInfo")
                ).user;
                // 跳转到首页
                this.$router.push("/homepage");
              } else {
                // 登录失败
                this.$message({
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: "服务器开摆了~(￣▽￣)~*",
                type: "error",
              });
            });
        } else {
          this.$message({
            message: "请检查输入是否正确",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #fff;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px auto;
}

.btn-primary {
  display: block;
  width: 30%;
  text-align: center;
  background-color: #0366d6;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  padding: 15px 20px;
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #044b9c;
}
.register-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #0366d6;
  text-decoration: none;
  transition: color 0.3s;
}
.register-link:hover {
  color: #044b9c;
}

.container {
  display: block;
  text-align: center;
  margin-left: 100px;
  margin-right: 100px; 
}
.typed-out {
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  overflow: hidden;
  border-right: 0.15em solid orange;
  white-space: nowrap;
  font-size: 35px;
  width: 0;
  animation: typing 2s steps(20, end) forwards, blink 1.5s infinite;
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink {
  from {
    border-color: transparent;
  }
  to {
    border-color: black;
  }
}
</style>