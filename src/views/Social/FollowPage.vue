<template>
  <div class="follow-page">
    <div class="title">关注列表</div>
    <div class="follow-list">
      <FollowItem
        v-for="follow in followList"
        :followInfo="follow"
        :key="follow.id"
        @updateFollowList="updateFollowList"
      ></FollowItem>
    </div>
  </div>
</template>

<script>
import FollowItem from "../../components/FollowItem.vue";
export default {
  components: {
    FollowItem,
  },
  data() {
    return {
      user_id: 0, //被观察者的id
      followList: [],
    };
  },
  methods: {
    //更新关注列表
    updateFollowList() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "get",
        url: "/user/get_follow_list/",
        params: {
          JWT: jwt,
          user_id: this.user_id,
        },
      }).then((res) => {
        if (res.data.result == 1) {
          this.followList = res.data.follow_list;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
  mounted() {
    this.user_id = this.$route.query.user_id;
    let loginInfo = localStorage.getItem("loginInfo");
    //传jwt是为了判断是否关注，如果游客访问，后端会把is_follow赋值为false
    let jwt = null;
    // 如果是游客访问
    if (loginInfo == null) {
      jwt = "-1";
      // 如果是登录用户访问
    } else {
      jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    }
    //获取指定用户的关注列表
    this.$axios({
      method: "get",
      url: "user/get_follow_list/",
      params: {
        JWT: jwt,
        user_id: this.user_id,
      },
    }).then((res) => {
      if (res.data.result == 1) {
        this.followList = res.data.follow_list;
      } else {
        this.$message.error(res.data.message);
      }
    });
  },
};
</script>

<style scoped>
.title {
  font-family: "Courier New", Courier, monospace;
  color: #666;
  font-size: 15px;
  font-weight: bold;

  margin-bottom: 20px;
}
</style>