<template>
  <div>
    <div class="title">投诉详情</div>
    <h2>请求下架xx歌曲</h2>
    <div>
      <span class="acter-name">
        <a href="" style="color: cornflowerblue">shyJyt</a>
      </span>

      <span>2020-12-12 12:12:12</span>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <!-- 举报原因 -->
      <div class="detail-reason">含有色情暴力信息</div>
      <!-- 要举报的链接 -->
      <div class="act-src">
        <!-- 封面 -->
        <div class="src-img">
          <img src="../../assets/avatar.png" alt="" />
        </div>
        <div class="src-info">
          <!-- 歌名 -->
          <div class="src-name">歌名</div>
          <!-- 歌手/歌单所有者 -->
          <el-link type="info" class="src-owner">演唱者或歌单拥有者</el-link>
        </div>
      </div>
    </div>

    <!-- 审核 -->
    <div class="exam-form" v-show="!isExamed">
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
        v-show="pass == 0"
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

      <el-button @click="finishExam">完成审核</el-button>
    </div>
    <div v-show="isExamed">
      <i class="el-icon-check">已审核</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExamed: false,
      pass: "",
      options: [
        {
          value: "1",
          label: "通过",
        },
        {
          value: "0",
          label: "拒绝",
        },
      ],
      reason: "",
      reason_options: [
        {
          value: "1",
          label: "原因1",
        },
        {
          value: "2",
          label: "原因2",
        },
      ],
    };
  },
  methods: {
    finishExam() {
      this.isExamed = true;
    },
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