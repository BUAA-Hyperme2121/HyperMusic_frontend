<template>
  <div>
    <!-- 投诉进度 -->
    <div class="progress">
      <el-steps :active="2" finish-status="success">
        <el-step title="发起审核" description="2020-12-12 12:12:12"></el-step>
        <el-step title="审核完成" description="2020-12-12 12:12:12"></el-step>
      </el-steps>
    </div>
    <!-- 投诉详情 -->
    <div>
      <h2>请求下架xx歌曲</h2>
      <span class="acter-name">
        <a href="" style="color: cornflowerblue">shyJyt</a>
      </span>

      <span>2020-12-12 12:12:12</span>
    </div>
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
    <!-- 审核结果 -->
    <div>
      <div class="title">审核结果</div>
      <div class="exam-result">
        <div class="exam-result-item">
          <span class="exam-result-item-title">审核结果：</span>
          <span class="exam-result-item-content">通过</span>
        </div>
        <div class="exam-result-item">
          <span class="exam-result-item-title">审核人：</span>
          <span class="exam-result-item-content">shyJyt</span>
        </div>
        <div class="exam-result-item">
          <span class="exam-result-item-title">审核时间：</span>
          <span class="exam-result-item-content">2020-12-12 12:12:12</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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