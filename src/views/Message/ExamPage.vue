<template>
  <div class="exam-page">
    <div class="title">审核列表</div>
    <div>
      <el-table
        :data="examList"
        style="width: 100%"
        height="400"
        :default-sort="{ prop: 'time', order: 'descending' }"
        @row-click="handleRowClick"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="title"
          label="标题"
          width="250"
        ></el-table-column>

        <el-table-column
          prop="poster_name"
          label="发起人"
          width="180"
        ></el-table-column>

        <el-table-column prop="create_date" label="时间" width="180" sortable>
          <template slot-scope="scope">
            {{
              scope.row.create_date.slice(0, 10) +
              " " +
              scope.row.create_date.slice(11, 19)
            }}
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="状态"
          width="80"
          :filters="[
            { text: '待审核', value: 1 },
            { text: '已审核', value: 2 },
          ]"
          :filter-method="filterState"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state == 1 ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.state == 1 ? "待审核" : "已审核" }}</el-tag
            >
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
      //审核列表
      examList: [],
    };
  },
  methods: {
    filterState(value, row) {
      return row.state === value;
    },
    handleRowClick(row) {
      this.$router.push({
        path: "/user/message/exam-detail",
        query: {
          id: row.id,
        },
      });
    },
  },
  mounted() {
    //获取审核列表
    let jwt = JSON.parse(localStorage.getItem("loginInfo")).JWT;
    this.$axios({
      method: "get",
      url: "/message/list_complain/",
      params: {
        JWT: jwt,
      },
    }).then((res) => {
      if (res.data.result == 1) {
        this.examList = res.data.music_complain_list;
      } else {
        this.$message({
          type: "error",
          message: res.data.message,
        });
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
</style>