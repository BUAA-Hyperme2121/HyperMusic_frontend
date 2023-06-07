<template>
  <div class="notice-item">
    <!-- 消息发布者头像 -->
    <div class="notice-item-avatar">
      <el-avatar
        shape="square"
        fit="fill"
        :src="noticeInfo.poster_avatar_path"
        style="height: 100%; width: 100%"
      ></el-avatar>
    </div>
    <!-- 消息内容 -->
    <div class="notice-item-content">
      <!-- 基本信息 -->
      <div>
        <!-- 消息发布者昵称 -->
        <span class="notice-item-username">
          <a href="" style="color: cornflowerblue">{{
            noticeInfo.poster_name
          }}</a>
        </span>
        <!-- 消息内容 -->
        <span class="notice-item-text">{{ noticeInfo.content }}</span>
      </div>
      <!-- 评论、回复的具体信息 -->
      <div v-if="noticeInfo.message_type == 1 || noticeInfo.message_type == 6">
        <!-- 评论 -->
        <CommentItemReadOnly :commentInfo="noticeInfo.comment_info" />
        <!-- 回复 -->
        <ReplyItemReadOnly :replyInfo="noticeInfo.reply_info" />
      </div>
      <!-- 点赞的具体信息 -->
      <div v-if="noticeInfo.message_type == 2">
        <!-- 评论 -->
        <CommentItemReadOnly :commentInfo="noticeInfo.like_info" />
        <!-- 回复 -->
        <ReplyItemReadOnly :replyInfo="noticeInfo.like_info" />
        <!-- 动态 -->
        <ActivityItemReadOnly :activityInfo="noticeInfo.like_info" />
      </div>
    </div>
    <!-- 消息发布时间 -->
    <div class="notice-item-time">
      <span>{{ noticeInfo.create_date }}</span>
    </div>
  </div>
</template>

<script>
import ReplyItemReadOnly from "./ReplyItemReadOnly.vue";
import CommentItemReadOnly from "./CommentItemReadOnly.vue";
import ActivityItemReadOnly from "./ActivityItemReadOnly.vue";

export default {
  name: "NoticeItem",
  components: {
    ReplyItemReadOnly,
    CommentItemReadOnly,
    ActivityItemReadOnly,
  },
  props: ["noticeInfo"],
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
.notice-item {
  display: flex;
  margin-bottom: 20px;
}
.notice-item-avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.notice-item-username {
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}
</style>