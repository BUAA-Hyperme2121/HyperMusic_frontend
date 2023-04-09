<template>
  <div class="login">
    <!-- 标题 -->
    <div class="login-header">
      <img src="../assets/avatar.png" alt="HyperMusic" />
      <h1>加入 HyperMusic</h1>
    </div>
    <!-- 登录表单 -->
    <div class="login-form">
      <form>
        <div class="form-group">
          <label for="username">用户名或邮箱</label>
          <input type="text" id="username" name="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
          />
        </div>
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <button
            class="btn-primary"
            type="submit"
            @click.prevent="handleSubmit"
          >
            登录
          </button>
        </div>
        <div>
          <router-link class="register-link" to="/register"
            >没有账号？</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      // todo: 处理登录逻辑
      console.log("login submitted");
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f6f8fa;
}
.login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.login-header img {
  max-width: 50px;
  margin-right: 10px;
}
.login-header h1 {
  font-size: 24px;
  font-weight: 400;
}
.login-form {
  background-color: #fff;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #d1d5da;
  padding: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}
.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus {
  border-color: #0366d6;
}
.btn-primary {
  display: block;
  width: 30%;
  background-color: #0366d6;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  padding: 15px 20px;
  margin-top: 20px;
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
</style>