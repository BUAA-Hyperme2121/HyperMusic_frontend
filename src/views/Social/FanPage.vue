<template>
  <div class="fan-page">
    <div class="title">粉丝列表</div>
    <div class="fan-list">
      <FanItem
        v-for="fan in fanList"
        :fanInfo="fan"
        :key="fan.id"
        @updateFanList="updateFanList"
      ></FanItem>
    </div>
  </div>
</template>

<script>
import FanItem from "../../components/FanItem.vue";
export default {
  components: {
    FanItem,
  },
  data() {
    return {
      user_id: 0, //被观察者的id
      fanList: [],
    };
  },
  methods: {
    //更新粉丝列表
    updateFanList() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "post",
        url: "/user/get_fan_list/",
        data: JSON.stringify({
          JWT: jwt,
          user_id: this.user_id,
        }),
      }).then((res) => {
        this.fanList = res.data;
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
    //获取指定用户的粉丝列表
    this.$axios({
      method: "post",
      url: "/user/get_fan_list/",
      data: JSON.stringify({
        JWT: jwt,
        user_id: this.user_id,
      }),
    }).then((res) => {
      this.fanList = res.data.fan_list;
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