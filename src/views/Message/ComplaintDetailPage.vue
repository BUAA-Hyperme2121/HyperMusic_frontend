<template>
  <div>
    <!-- 投诉进度 -->
    <div class="progress">
      <el-steps :active="complainInfo.state" finish-status="success">
        <el-step title="发起审核" :description="complainInfo.create_date"></el-step>
        <el-step title="审核完成" :description="complainInfo.audit_time"></el-step>
      </el-steps>
    </div>
    <!-- 投诉详情 -->
    <div class="title">投诉详情</div>
    <h2>{{ complainInfo.title }}</h2>
    <div>
      <span class="acter-name">
        <a href="" style="color: cornflowerblue">{{
          complainInfo.poster_name
        }}</a>
      </span>

      <span>{{ complainInfo.create_date }}</span>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <!-- 举报原因 -->
      <div class="detail-reason">{{ complainInfo.content }}</div>
      <!-- 要举报的链接 -->
      <div class="act-src">
        <!-- 封面 -->
        <div class="src-img">
          <el-avatar
            shape="square"
            fit="fill"
            :src="complainInfo.cover_path"
            style="height: 100%; width: 100%"
          ></el-avatar>
        </div>
        <div class="src-info">
          <!-- 歌名 -->
          <div class="src-name">{{ complainInfo.name }}</div>
          <!-- 歌手 -->
          <el-link
            type="info"
            class="src-owner"
            v-show="complainInfo.type == 1"
            >{{ complainInfo.singer_name }}</el-link
          >
          <!-- 歌单 -->
          <el-link
            type="info"
            class="src-owner"
            v-show="complainInfo.type == 2"
            >{{ complainInfo.creator_name }}</el-link
          >
        </div>
      </div>
    </div>

    <!-- 审核结果 -->
    <div>
      <div class="title">审核结果</div>
      <!-- 审核完成 -->
      <div class="complain-result" v-show="complainInfo.state == 2">
        <!-- 审核时间 -->
        <div class="exam-time">
          <span>审核时间：</span>
          <span>{{ complainInfo.audit_time }}</span>
        </div>
        <!-- 审核结果 -->
        <div class="exam-result">
          <span>审核结果：</span>
          <span>{{ complainInfo.result == 1 ? "通过" : "拒绝" }}</span>
        </div>
        <!-- 审核原因 -->
        <div class="exam-reason">
          <span>审核原因：</span>
          <span>{{ complainInfo.reason }}</span>
        </div>
      </div>
      <!-- 审核中 -->
      <div class="complain-result" v-show="complainInfo.state == 1">
        知道你很急(╯▔皿▔)╯，但是还在审核中，请耐心等待~(￣▽￣)~*
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      complainInfo: {},
    };
  },
  methods: {
    // 获取投诉详情
    getComplainInfo() {
      let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
      this.$axios({
        method: "get",
        url: "/message/get_complain_detail/",
        params: {
          complain_id: this.$route.query.id,
          JWT: jwt,
        },
      }).then((res) => {
        if (res.data.result == 1) {
          this.complainInfo = res.data.complain_info;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
  },
  mounted() {
    this.getComplainInfo();
  },
};
</script>

<style scoped>
.title {
  font-family: "Courier New", Courier, monospace;
  color: black;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #c20c0c;
}

.acter-name {
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}
.act-time {
  color: #999;
  font-size: 8px;
  margin-bottom: 10px;
}
.detail {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fafafa;
  border-radius: 15px;
}
.act-src {
  padding: 10px;
  display: flex;
  background-color: #f2f2f2;
}
.src-img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
}
.src-img img {
  width: 100%;
  height: 100%;
}
.src-name {
  font-size: 14px;
}
.src-owner {
  font-size: 10px;
}
</style>