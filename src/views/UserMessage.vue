<template>
  <div class="user-message">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu
          :default-active="1"
          class="el-menu-vertical-demo"
          @select="handleMenuSelect"
          :router="true"
        >
          <!-- 我的评论 -->
          <el-menu-item index="/user/message/comment"
            ><i class="el-icon-star-off"></i>
            <span>我的评论</span>
          </el-menu-item>

          <!-- 通知(管理员告知歌曲、歌单被下架或者管理员返回投诉的审核结果) 
              发起者、接受者、对象（歌曲）、内容、时间、状态（已读、未读）
            -->
          <el-menu-item index="/user/message/notice"
            ><i class="el-icon-star-off"></i>
            <span>通知</span>
          </el-menu-item>
          <!-- 审核 -->
          <el-menu-item index="/user/message/exam"
            ><i class="el-icon-star-off"></i>
            <span>审核(管理员)</span>
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
