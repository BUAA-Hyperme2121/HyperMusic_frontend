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
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="title"
          label="标题"
          width="200"
        ></el-table-column>

        <el-table-column
          prop="owner_name"
          label="投诉对象"
          width="180"
        ></el-table-column>

        <el-table-column
          prop="create_date"
          label="发起时间"
          width="160"
          sortable
        >
          <template slot-scope="scope">
            {{
              scope.row.create_date.slice(0, 10) +
              " " +
              scope.row.create_date.slice(11, 19)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="80">
          <template slot-scope="scope">
            {{ scope.row.state == 1 ? "待审核" : "已审核" }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //投诉列表
      complaintList: [],
    };
  },
  methods: {
    //根据状态显示不同的颜色
    tableRowClassName({ row }) {
      if (row.state == 1) {
        return "warning-row";
      } else if (row.state == 2) {
        if (row.result == 1) {
          return "success-row";
        } else {
          return "danger-row";
        }
      }
      return "";
    },
    //点击行跳转到详情页
    handleRowClick(row) {
      this.$router.push({
        path: "/user/message/complaint-detail",
        query: {
          id: row.id,
        },
      });
    },
  },
  mounted() {
    //获取发起的投诉列表
    let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    this.$axios({
      method: "get",
      url: "/message/list_user_complain/",
      params: {
        JWT: jwt,
      },
    }).then((res) => {
      if (res.data.errno == 0) {
        this.complaintList = res.data.music_complain_list;
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
.el-table .success-row {
  background: #f0f9eb;
}
.el-table .warning-row {
  background: #fffbe6;
}
.el-table .danger-row {
  background: #fef0f0;
}
</style>