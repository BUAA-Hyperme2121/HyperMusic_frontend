<template>
  <div class="user-setting">
    <!-- 借助el-row和el-col布局 -->
    <el-row>
      <el-col :span="4">
        <!-- 侧边栏导航，根据被选中的Tab显示右边的内容 -->
        <el-menu default-active="basic" class="menu" @select="handleSelect">
          <el-menu-item index="basic" class="menu-item">基本设置</el-menu-item>
          <el-menu-item index="bind" class="menu-item">账号设置</el-menu-item>
          <el-menu-item index="personalize" class="menu-item"
            >个性设置</el-menu-item
          >
        </el-menu>
      </el-col>

      <el-col :span="18">
        <!-- 基本设置 -->
        <el-form
          v-show="activeTab === 'basic'"
          class="right-content"
          :model="basicForm"
          :rules="rules"
          ref="basicForm"
        >
          <div>
            <h2>基本设置</h2>
          </div>

          <div style="display: flex">
            <!-- 左边的表单 -->
            <div style="margin-right: 50px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="basicForm.username"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="basicForm.gender">
                  <!-- 单选框的label代表的是选中后的值 -->
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                  <el-radio label="未知">未知</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="所在地">
                <el-cascader
                  v-model="basicForm.location"
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input
                  v-model="basicForm.introduction"
                  type="textarea"
                  autosize="true"
                  placeholder="请输入个人简介(最多50字)"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 更换头像 -->
            <div class="update-avatar">
              <div>
                <label class="el-form-item__label">
                  头像 (.jpg格式,大小不超过1M)</label
                >
              </div>
              <!-- 原来的头像 -->
              <el-avatar
                shape="square"
                fit="fill"
                :src="$store.state.userInfo.avatar_path"
                v-show="!basicForm.avatar"
                style="height: 100px; width: 100px; margin: 15px 0"
              ></el-avatar>
              <el-upload
                list-type="picture-card"
                :auto-upload="false"
                :class="{ 'none-up': uploadDisabled }"
                accept="image/jpeg,image/jpg"
                :limit="1"
                action=""
                :on-change="handleLimit"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <!-- 保存按钮 -->
          <el-button type="primary" @click.native="updateUserInfo"
            >保存</el-button
          >
        </el-form>
        <!-- 账号设置 -->
        <div v-show="activeTab === 'bind'" class="right-content">
          <span>
            <i class="el-icon-s-promotion"></i>
            {{ $store.state.userInfo.email }}
          </span>
          <!-- 更换邮箱按钮 -->
          <el-button
            icon="el-icon-edit"
            style="margin-left: 20px"
            @click="updateEmailDialogVisible = true"
            >更换邮箱</el-button
          >
          <!-- 更换邮箱弹窗 -->
          <el-dialog
            title="更换邮箱"
            :visible.sync="updateEmailDialogVisible"
            width="30%"
            :close-on-click-modal="false"
          >
            <!-- 更换邮箱表单 -->
            <el-form
              :model="updateEmailForm"
              :rules="rules"
              ref="updateEmailForm"
              label-position="top"
              status-icon
              size="mini"
            >
              <el-form-item label="新的邮箱" prop="newEmail">
                <el-input
                  v-model="updateEmailForm.newEmail"
                  placeholder="请输入新的邮箱"
                ></el-input>
              </el-form-item>
              <!-- 邮箱验证码 -->
              <el-form-item label="邮箱验证码" prop="emailCode">
                <div style="display: flex">
                  <el-input
                    v-model="updateEmailForm.emailCode"
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
            <span slot="footer" class="dialog-footer">
              <el-button @click="updateEmailDialogVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="updateEmail">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 更换密码按钮 -->
          <el-button
            icon="el-icon-edit"
            style="margin-left: 20px"
            @click="updatePasswordDialogVisible = true"
            >更换密码</el-button
          >
          <!-- 更换密码弹窗 -->
          <el-dialog
            title="更换密码"
            :visible.sync="updatePasswordDialogVisible"
            width="30%"
            :close-on-click-modal="false"
          >
            <!-- 更换密码表单 -->
            <el-form
              :model="updatePasswordForm"
              :rules="rules"
              ref="updatePasswordForm"
              label-position="top"
              status-icon
              size="mini"
            >
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input
                  v-model="updatePasswordForm.oldPassword"
                  placeholder="请输入旧密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  v-model="updatePasswordForm.newPassword"
                  placeholder="请输入新密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  v-model="updatePasswordForm.confirmPassword"
                  placeholder="请再次输入新密码"
                  type="password"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="updatePasswordDialogVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="updatePassword"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
        <!-- 个性设置 -->
        <el-form
          v-show="activeTab === 'personalize'"
          class="right-content"
          :model="personalizeForm"
          :rules="rules"
          ref="personalizeForm"
        >
          <h2>个性设置</h2>
          <!-- 选择最近播放记录数量 -->
          <el-form-item label="最近播放记录数量">
            <el-select
              v-model="personalizeForm.maxHistoryNum"
              size="mini"
              style="width: 80px"
            >
              <el-option
                @click.native="selectMaxHistoryNum(item)"
                v-for="item in maxHistoryNumList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 保存按钮 -->
          <el-button type="primary" @click.native="updatePersonalizeInfo"
            >保存</el-button
          >
        </el-form>
      </el-col>
    </el-row>
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
      // 是否正在更换邮箱，控制弹窗的出现
      updateEmailDialogVisible: false,
      // 是否正在更换密码，控制弹窗的出现
      updatePasswordDialogVisible: false,
      // 选中的设置页
      activeTab: "basic",

      // 可选的地址列表
      options: [
        {
          value: "符文大陆",
          label: "符文大陆",
        },
        {
          value: "B612",
          label: "B612",
        },
        {
          value: "火星",
          label: "火星",
        },
        {
          value: "夜之城",
          label: "夜之城",
        },
        {
          value: "提瓦特",
          label: "提瓦特",
        },
        {
          value: "暂无",
          label: "暂无",
        },
      ],
      // 基础设置表单
      basicForm: {
        username: this.$store.state.userInfo.username,
        gender: this.$store.state.userInfo.gender,
        avatar: null,
        location: this.$store.state.userInfo.location,
        introduction: this.$store.state.userInfo.introduction,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        newEmail: [
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
        emailCode: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "请输入6位邮箱验证码",
            trigger: "blur",
          },
        ],
      },
      // 更换邮箱表单
      updateEmailForm: {
        newEmail: "",
        emailCode: "",
      },
      // 更换密码表单
      updatePasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      // 个性设置表单
      personalizeForm: {
        maxHistoryNum: this.$store.state.userInfo.history_record,
      },
      maxHistoryNumList: [10, 20, 50],
    };
  },
  methods: {
    //选择最近播放记录数量
    selectMaxHistoryNum(item) {
      this.personalizeForm.maxHistoryNum = item;
    },
    //选择设置页
    handleSelect(index) {
      this.activeTab = index;
    },
    //大小检验
    // checkSize(file) {
    //   const isLt1M = file.size / 1024 / 1024 < 1;
    //   return isLt1M;
    // },

    handleLimit(file, fileList) {
      if (fileList.length >= 1) {
        console.log("handleLimit");
        this.uploadDisabled = true;
        this.$set(this, "uploadDisabled", true);
        this.onCoverChange(file.raw);
        this.$forceUpdate();
      }
    },
    handleRemove() {
      this.uploadDisabled = false;
      this.$set(this, "uploadDisabled", false);
      this.basicForm.avatar = "";
      this.$forceUpdate();
    },
    onCoverChange(file) {
      this.basicForm.avatar = file;
    },

    //更新用户信息
    updateUserInfo() {
      this.$refs["basicForm"].validate((valid) => {
        if (valid) {
          let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
          var formData = new FormData();
          formData.append("JWT", jwt);
          formData.append("username", this.basicForm.username);
          formData.append("gender", this.basicForm.gender);
          formData.append("location", this.basicForm.location);
          formData.append("introduction", this.basicForm.introduction);
          formData.append("avatar", this.basicForm.avatar);
          // console.log(formData);
          this.$axios({
            method: "post",
            url: "/user/change_info/",
            data: formData,
          })
            .then((res) => {
              if (res.data.result == 1) {
                this.$message({
                  message: "更新成功",
                  type: "success",
                });
                //更新vuex和localStorage中的用户信息
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: "服务器出了点问题(⊙o⊙)？",
                type: "error",
              });
            });
        }
      });
    },
    // 邮箱合法性验证
    isEmail(email) {
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return reg.test(email);
    },
    //发送邮箱验证码
    postEmailCode() {
      // 处理发送邮箱验证码逻辑
      this.$axios({
        method: "post",
        url: "/postEmailCode",
        data: JSON.stringify({
          email: this.updateEmailForm.email,
        }),
      })
        .then((res) => {
          // 发送成功
          if (res.data.code === 200) {
            this.$message({
              message: "验证码发送成功",
              type: "success",
            });
          } else {
            // 发送失败
            this.$message({
              message: "验证码发送失败",
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
    //更新邮箱
    updateEmail() {
      this.$refs["updateEmailForm"].validate((valid) => {
        if (valid) {
          this.$axios({
            methods: "post",
            url: "/user/update_email",
            data: JSON.stringify(this.updateEmailForm),
          })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  message: "更新成功",
                  type: "success",
                });
                //更新vuex和localStorage中的用户邮箱

                //清空表单
                this.updateEmailForm.newEmail = "";
                this.updateEmailForm.emailCode = "";
                //关闭对话框
                this.updateEmailDialogVisible = false;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: "出了点问题(⊙o⊙)？",
                type: "error",
              });
            });
        }
      });
    },
    //更新个性化设置(目前只调用了更新最大历史记录数)
    updatePersonalizeInfo() {
      this.$refs["personalizeForm"].validate((valid) => {
        if (valid) {
          let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
          this.$axios({
            method: "post",
            url: "/user/set_history_record/",
            data: qs.stringify({
              JWT: jwt,
              history_record: this.personalizeForm.maxHistoryNum,
            }),
          })
            .then((res) => {
              if (res.data.result == 1) {
                this.$message({
                  message: "更新成功",
                  type: "success",
                });
                //更新vuex和localStorage中的用户个性化设置
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: "出了点问题(⊙o⊙)？",
                type: "error",
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.user-setting {
  background-color: #fff;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 8px;
}
.menu {
  border-right: 1px solid #ccc;
  height: 400px;
}
.menu-item {
  height: 100px;
  line-height: 100px;
  font-size: 20px;
}
.right-content {
  padding: 20px;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>