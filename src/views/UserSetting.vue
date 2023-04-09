<template>
  <div class="personal-info">
    <!-- 借助el-row和el-col布局 -->
    <el-row>
      <el-col :span="6">
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
              <el-form-item label="出生日期">
                <el-date-picker v-model="basic.birth"></el-date-picker>
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

              <!-- 保存按钮 -->
              <el-button type="primary">保存</el-button>
            </div>
          </div>
        </el-form>
        <!-- 绑定设置 -->
        <div v-show="activeTab === 'bind'" class="form">
          <h2>邮箱绑定</h2>
          <span>当前邮箱为:  2873704761@qq.com</span>
          <el-button
            type="text"
            icon="el-icon-edit"
            style="margin-left: 20px"
            ></el-button
          >
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
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>