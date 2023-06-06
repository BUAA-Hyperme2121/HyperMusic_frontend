<template>
  <div class="singer-page">
    <h2 class="singer-count">关注用户数量：{{ user.follow_num }}</h2>
    <ul class="singer-list">
      <li v-for="(singer, index) in this.follow_list" :key="singer._id" class="singer-item">
        <img :src="singer.avatar_path" class="singer-avatar" alt="" />
        <div class="singer-info">
          <router-link class="songlist-table-link" :to="'/singer/' + singer.id">
            <h3 class="singer-name" @click="jumpToUser(index)">{{ singer.username }}</h3>
          </router-link>
          <i  @click="unfollow(index)">取消关注</i>

          <p class="singer-album-count">上传数量：{{ singer.post_num }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  created() {
    // 通过 this.id 获取参数 id
    console.log(this.id); // 输出 123
    // 可以在这里根据 id 获取对应的歌单数据等操作
  },
  data() {
    return {
      follow_list: [],
      user: [],
    };
  },
  mounted() {
    this.fetchFollowing();
  },
  methods: {
    fetchFollowing() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      console.log(jwt);
      this.axios.get("/user/get_follow_list/", {
        params: {
          JWT: jwt,
          user_id: "0",
        }
      })
        .then((res) => {
          console.log(res.data);
          this.user = res.data.user;
          this.follow_list = res.data.follow_list;
        })
        .catch(
          (err) => {
            this.$message("获取我的音乐失败！");
            console.log(err);
          }
        )
    }
  }
};
</script>

<style>
.singer-count {
  margin-bottom: 20px;
}

.singer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.singer-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.singer-avatar {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 50%;
}

.singer-name {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.singer-album-count {
  margin: 0;
  font-size: 16px;
  color: #666;
}
</style>
