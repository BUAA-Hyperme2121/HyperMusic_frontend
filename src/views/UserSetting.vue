<template>
  <div class="personal-info">
    <!-- 借助el-row和el-col布局 -->
    <el-row>
      <el-col :span="4">
        <!-- 侧边栏导航，根据被选中的Tab显示右边的内容 -->
        <el-menu default-active="basic" class="menu" @select="handleSelect">
          <el-menu-item index="basic" class="menu-item">基本设置</el-menu-item>
          <el-menu-item index="bind" class="menu-item">绑定设置</el-menu-item>
          <el-menu-item index="privacy" class="menu-item"
            >隐私设置</el-menu-item
          >
        </el-menu>
      </el-col>

      <el-col :span="18">
        <!-- 基本设置 -->
        <el-form v-show="activeTab === 'basic'" class="form">
          <div>
            <h2>基本设置</h2>
          </div>
          <div style="display: flex">
            <div style="margin-right: 50px">
              <el-form-item label="用户名">
                <el-input v-model="basic.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="basic.gender">
                  <el-radio label="male">男</el-radio>
                  <el-radio label="female">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="所在地">
                <el-cascader></el-cascader>
              </el-form-item>
            </div>
            <div>
              <!-- 更换头像 -->
              <el-form-item label="头像 (.jpg格式,大小不超过2M)">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input
                  v-model="userIntro"
                  type="textarea"
                  autosize="true"
                  placeholder="请输入个人简介(最多50字)"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 保存按钮 -->
          <el-button type="primary">保存</el-button>
        </el-form>
        <!-- 绑定设置 -->
        <div v-show="activeTab === 'bind'" class="form">
          <h2>邮箱绑定</h2>
          <span>当前邮箱为: 2873704761@qq.com</span>
          <!-- 更换邮箱按钮 -->
          <el-button
            type="text"
            icon="el-icon-edit"
            style="margin-left: 20px"
            @click="dialogVisible = true"
          ></el-button>

          <!-- 弹出对话框 -->
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <div>
              <label for="email">Email</label>
            </div>
            <div>
              <input
                v-model="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div><label for="email-code">Email verification code</label></div>
            <div class="input-group">
              <input
                v-model="emailCode"
                id="email-code"
                type="text"
                placeholder="Enter verification code"
                required
              />
              <button
                type="button"
                class="btn-get-code"
                :disabled="isCountdown"
                @click="sendEmailCode"
              >
                <template v-if="isCountdown">{{ countDownSeconds }}s</template>
                <template v-else>Get code</template>
              </button>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
        <!-- 隐私设置 -->
        <el-form v-show="activeTab === 'privacy'" class="form">
          <h2>隐私设置</h2>
          <el-form-item label="展示听歌排行">
            <el-switch v-model="privacy.encrypt"></el-switch>
          </el-form-item>
          <el-form-item label="展示最近动态">
            <el-switch v-model="privacy.hide"></el-switch>
          </el-form-item>
          <el-form-item label="展示最近播放">
            <el-switch v-model="privacy.hide"></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      userIntro: "",
      activeTab: "basic",
      basic: {
        name: "",
        gender: "",
        birth: "",
      },
      bind: {
        phone: "",
        email: "",
      },
      privacy: {
        encrypt: true,
        hide: true,
      },
    };
  },
  methods: {
    handleSelect(index) {
      this.activeTab = index;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.personal-info {
  margin: 20px;
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
.form {
  padding: 20px;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>