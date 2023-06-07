<template>
  <div>
    <div class="title">投诉详情</div>
    <h2>{{ examInfo.title }}</h2>
    <div>
      <span class="acter-name">
        <a href="" style="color: cornflowerblue">{{ examInfo.poster_name }}</a>
      </span>

      <span>{{ examInfo.create_date }}</span>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <!-- 举报原因 -->
      <div class="detail-reason">{{ examInfo.content }}</div>
      <!-- 要举报的链接 -->
      <div class="act-src">
        <!-- 封面 -->
        <div class="src-img">
          <el-avatar
            shape="square"
            fit="fill"
            :src="examInfo.object_cover_path"
            style="height: 100%; width: 100%"
          ></el-avatar>
        </div>
        <div class="src-info">
          <!-- 歌名 -->
          <div class="src-name">{{ examInfo.object_name }}</div>
          <!-- 歌手 -->
          <el-link type="info" class="src-owner">{{
            examInfo.object_owner_name
          }}</el-link>
        </div>
      </div>
    </div>

    <!-- 审核表单 -->
    <div class="exam-form" v-show="examInfo.state == 1">
      <el-select v-model="pass" placeholder="是否通过" class="select-pass">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>

      <el-select
        v-model="reason"
        placeholder="拒绝原因"
        v-show="pass == 2"
        class="select-reason"
      >
        <el-option
          v-for="item in reason_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>

      <el-button @click.native="finishExam">完成审核</el-button>
    </div>

    <!-- 审核结果 -->
    <div v-show="examInfo.state == 2">
      <!-- 审核时间 -->
      <div class="exam-time">
        <span>审核时间：</span>
        <span>{{ examInfo.audit_time }}</span>
      </div>
      <!-- 审核结果 -->
      <div class="exam-result">
        <span>审核结果：</span>
        <span>{{ examInfo.result == 1 ? "通过" : "拒绝" }}</span>
      </div>
      <!-- 审核原因 -->
      <div class="exam-reason">
        <span>审核原因：</span>
        <span>{{ examInfo.reason }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      examInfo: {},
      pass: "",
      options: [
        {
          value: "1",
          label: "通过",
        },
        {
          value: "2",
          label: "拒绝",
        },
      ],
      reason: "",
      reason_options: [
        {
          value: "原因1",
          label: "原因1",
        },
        {
          value: "原因2",
          label: "原因2",
        },
      ],
    };
  },
  methods: {
    finishExam() {
      //验证审核表单
      if (this.pass == "") {
        this.$message.error("请选择是否通过");
        return;
      }
      if (this.pass == 2 && this.reason == "") {
        this.$message.error("请选择拒绝原因");
        return;
      }
      console.log(this.pass);
      console.log(this.reason);
      console.log(this.$route.query.id);
      this.$axios({
        method: "post",
        url: "/message/audit/",
        data: qs.stringify({
          complain_id: this.$route.query.id,
          result: this.pass,
          reason: this.reason,
          JWT: JSON.parse(localStorage.getItem("loginInfo")).JWT,
        }),
      }).then((res) => {
        if (res.data.result == 1) {
          this.$message.success("审核成功");
          this.$router.push("/message/exam");
        } else {
          this.$message.error(res.data.message);
        }
      });
      //若通过，删除歌曲/取消分享歌单
      //并向用户发送消息（投诉和被投诉的都发？）
    },
  },
  mounted() {
    // 获取举报详情
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
        this.examInfo = res.data.complain;
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
.exam-form {
  margin-top: 10px;
  margin-bottom: 10px;
}
.select-pass {
  margin-right: 20px;
}
.select-reason {
  margin-right: 20px;
}
</style>