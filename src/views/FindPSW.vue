<template>
  <div class="find-page">
    <div class="container">
      <div class="typed-out">\ Find Your Way /</div>
    </div>
    <!-- 找回密码表单 -->
    <el-form
      :model="findForm"
      :rules="rules"
      ref="findForm"
      label-position="top"
      status-icon
      size="mini"
    >
      <el-form-item label="新密码" prop="password_1">
        <el-input
          v-model="findForm.password_1"
          placeholder="6~16位"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="password_2">
        <el-input
          v-model="findForm.password_2"
          placeholder="请再次输入新密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="findForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <!-- 邮箱验证码 -->
      <el-form-item label="邮箱验证码" prop="sms_code">
        <div style="display: flex">
          <el-input
            v-model="findForm.sms_code"
            placeholder="请输入邮箱验证码"
            style="margin-right: 20px"
          ></el-input>
          <!-- 获取邮箱验证码 -->
          <el-button
            type="primary"
            size="mini"
            @click="postEmailCode"
            :disabled="canPostCode"
            >{{ btnText }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <!-- 确认按钮 -->
    <el-button type="primary" @click="find('findForm')" class="find-btn"
      >确认</el-button
    >
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      // 获取邮箱验证码按钮文本
      btnText: "获取邮箱验证码",
      // 是否可以点击获取邮箱验证码按钮
      canPostCode: false,
      // 注册表单
      findForm: {
        password_1: "",
        password_2: "",
        email: "",
        sms_code: "",
      },
      rules: {
        password_1: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        password_2: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!this.isSamePassword()) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!this.isEmail(value)) {
                callback(new Error("请输入正确的邮箱地址"));
              } else {
                callback();
              }
            },
            trigger: ["blur", "change"],
          },
        ],
        sms_code: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "请输入6位邮箱验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    find(formName) {
      // 处理找回逻辑
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.$axios({
            method: "post",
            url: "/user/find_password/",
            data: qs.stringify({
              new_password: this.findForm.password_1,
              new_password2: this.findForm.password_2,
              email: this.findForm.email,
              sms_code: this.findForm.sms_code,
            }),
          })
            .then((res) => {
              // 找回成功
              if (res.data.result == 1) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                });
                // 跳转到登录页面
                this.$router.push("/login");
              } else {
                // 找回失败
                this.$message({
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              // 服务器错误
              console.log(err);
              this.$message({
                message: "服务器开摆了~(￣▽￣)~*",
                type: "error",
              });
            });
        } else {
          // 表单验证失败
          this.$message({
            message: "请检查输入是否正确",
            type: "error",
          });
        }
      });
    },
    // 邮箱合法性验证
    isEmail(email) {
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return reg.test(email);
    },
    //两次输入密码是否相同
    isSamePassword() {
      return this.findForm.password_1 === this.findForm.password_2;
    },
    //发送邮箱验证码
    postEmailCode() {
      // 处理发送邮箱验证码逻辑
      this.$axios({
        method: "post",
        url: "/message/send_email_find_password/",
        data: qs.stringify({
          email: this.findForm.email,
        }),
      })
        .then((res) => {
          // 发送成功
          if (res.data.result == 1) {
            this.$message({
              message: "验证码发送成功",
              type: "success",
            });
          } else {
            // 发送失败
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        })
        // 服务器错误
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "服务器开摆了~(￣▽￣)~*",
            type: "error",
          });
        });

      // 禁用获取验证码按钮
      this.canPostCode = true;
      // 获取验证码按钮倒计时
      let count = 60;
      this.btnText = count + "s后重新获取";
      let timer = setInterval(() => {
        if (count > 0) {
          count--;
          this.btnText = count + "s后重新获取";
        } else {
          clearInterval(timer);
          this.btnText = "获取邮箱验证码";
          this.canPostCode = false;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.find-page {
  background-color: #fff;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 350px;
  margin: 20px auto;
}
.find-page h1 {
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.find-btn {
  margin: 0 auto;
  display: block;
}
.to-login {
  text-align: center;
  margin-top: 20px;
}
.login-link {
  font-size: 14px;
  color: #0366d6;
  text-decoration: none;
  transition: color 0.3s;
}
.login-link:hover {
  color: #044b9c;
}
.container {
  display: block;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}
.typed-out {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  overflow: hidden;
  /* border-right: 0.15em solid orange; */
  white-space: nowrap;
  font-size: 35px;
  width: 0;
  animation: typing 2s steps(20, end) forwards;
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