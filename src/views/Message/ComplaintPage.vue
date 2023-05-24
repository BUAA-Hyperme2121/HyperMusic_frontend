<template>
  <!-- 展示当前用户发起的投诉列表 -->
  <div class="complaint-page">
    <div class="title">投诉列表</div>
    <div>
      <el-table
        :data="complaintList"
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
          prop="title"
          label="标题"
          width="200"
        ></el-table-column>

        <el-table-column
          prop="user"
          label="投诉对象"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //投诉列表
      complaintList: [
        {
          id: 1,
          title: "标题1",
          user: "用户1",
          time: "2020-12-12 12:12:12",
          status: "待审核",
        },
        {
          id: 2,
          title: "标题2",
          user: "用户2",
          time: "2020-12-12 12:12:12",
          status: "已审核",
        },
        {
          id: 3,
          title: "标题1",
          user: "用户1",
          time: "2020-12-12 12:12:12",
          status: "待审核",
        },
        {
          id: 4,
          title: "标题2",
          user: "用户2",
          time: "2020-12-12 12:12:12",
          status: "已审核",
        },
        {
          id: 5,
          title: "标题1",
          user: "用户1",
          time: "2020-12-12 12:12:12",
          status: "待审核",
        },
        {
          id: 6,
          title: "标题2",
          user: "用户2",
          time: "2020-12-12 12:12:12",
          status: "已审核",
        },
      ],
    };
  },
  methods: {
    handleRowClick(row) {
      this.$router.push({
        path: "/user/message/complaint-detail",
        query: {
          id: row.id,
        },
      });
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
</style>