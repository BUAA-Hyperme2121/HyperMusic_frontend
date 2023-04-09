<template>
  <div class="container">
    <h1>Sign up</h1>

    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" placeholder="Enter your username" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email" placeholder="Enter your email" required>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" placeholder="Enter your password" required>
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input v-model="confirmPassword" id="confirm-password" type="password" placeholder="Confirm your password" required>
      </div>

      <div class="form-group">
        <label for="email-code">Email verification code</label>

        <div class="input-group">
          <input v-model="emailCode" id="email-code" type="text" placeholder="Enter verification code" required>
          <button type="button" class="btn-get-code" :disabled="isCountdown" @click="sendEmailCode">
            <template v-if="isCountdown">{{ countDownSeconds }}s</template>
            <template v-else>Get code</template>
          </button>
        </div>
      </div>

      <!-- 注册按钮 -->
      <el-button>
        <span>Sign up</span>
      </el-button>
    </form>

    <div class="redirect">
      <span>Already have an account?</span>
      <router-link to="/login">去登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailCode: '',
      isCountdown: false,
      countDownSeconds: 60,
      emailCodeTimer: null,
    }
  },

  methods: {
    submit() {
      // 提交表单代码
    },

    sendEmailCode() {
      // 发送邮件验证码代码

      // 设置倒计时
      this.isCountdown = true;
      this.countDownSeconds = 60;
      clearInterval(this.emailCodeTimer);
      this.emailCodeTimer = setInterval(() => {
        if (this.countDownSeconds > 0) {
          this.countDownSeconds--;
        } else {
          this.isCountdown = false;
          clearInterval(this.emailCodeTimer);
        }
      }, 1000);
    },
  },

  watch: {
    emailCode() {
      // 在此处执行验证邮件验证码的代码
    },
  },
}
</script>

<style>
.container {
  max-width: 400px;
  margin: 30px auto;
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 20px #eaeaea;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  
}

label {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #666;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 14px;
  color: #999;
  width: 70%;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #28a745;
}

.input-group {
  display: flex;
  align-items: center;
}

.btn-get-code {
  margin-left: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  color: #28a745;
  background-color: #fff;
  border: 1px solid #28a745;
  cursor: pointer;
}

.btn-get-code:hover {
  background-color: #28a745;
  color: #fff;
}

.btn-get-code:disabled {
  color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.redirect {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.redirect span {
  margin-right: 10px;
}
</style>