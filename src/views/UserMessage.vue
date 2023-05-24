<template>
  <div class="user-message">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu :default-active="1" @select="handleMenuSelect" :router="true">
          <!-- 我的评论 -->
          <el-menu-item index="/user/message/comment"
            ><i class="el-icon-s-comment"></i>
            <span>我的评论</span>
          </el-menu-item>
          <!-- 回复我的 -->
          <el-menu-item index="/user/message/reply"
            ><i class="el-icon-s-promotion"></i>
            <span>回复我的</span>
          </el-menu-item>
          <!-- 被点赞、被关注、被喜欢（收藏）、被投诉、其余系统通知（不需要关联到实体，故不做区分）
              部分通知内容较为简短，直接展示内容即可，不需要额外设置对应的detail页面-->
          <el-menu-item index="/user/message/notice"
            ><i class="el-icon-message-solid"></i>
            <span>通知</span>
          </el-menu-item>
          <!-- 投诉进度 -->
          <el-menu-item index="/user/message/complaint"
            ><i class="el-icon-s-flag"></i>
            <span>投诉进度(用步骤条?时间线?</span>
          </el-menu-item>
          <!-- 审核，管理员可见-->
          <el-menu-item
            index="/user/message/exam"
            v-show="$store.state.userInfo.isAdmin"
            ><i class="el-icon-s-custom"></i>
            <span>审核</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-message {
  display: block;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-left: 10%;
  margin-right: 10%;
  padding: 20px;
}
</style>
