<template>
  <div class="notice-page">
    <div class="title">通知列表</div>
    <el-table
        :data="noticeList"
        style="width: 100%"
        height="400"
        :default-sort="{ prop: 'time', order: 'descending' }"
        @row-click="handleRowClick"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="content"
          label="内容"
          width="200"
        ></el-table-column>

        <el-table-column
          prop="from"
          label="来自"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="160"
          sortable
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80"
        ></el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleRowClick(row) {
      this.$router.push({
        path: "/notice/detail",
        query: {
          id: row.id,
        },
      });
      row.status = "已读";
    },
  },
  data() {
    return {
      //通知列表
      noticeList: [
        {
          id: 1,
          content: "这是通知1",
          from: "管理员1",
          time: "2020-12-12 12:12:12",
          status: "已读",
        },
        {
          id: 2,
          content: "这是通知2",
          from: "管理员2",
          time: "2020-12-12 12:12:12",
          status: "已读",
        },
        {
          id: 3,
          content: "这是通知3",
          from: "管理员3",
          time: "2020-12-12 12:12:12",
          status: "未读",
        }
      ],
    }
  },
}
</script>

<style scoped>
.title {
  font-family: "Courier New", Courier, monospace;
  color: black;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #c20c0c;
}
</style>