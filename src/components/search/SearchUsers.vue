<template>
    <div class="users-list">
            <el-table :data="data" style="width: 100%;font-size: 10px;" :show-header="false" stripe >
                <el-table-column label="用户头像" width="80px">
                    <template slot-scope="scope">
                        <el-image style="width: 60px;height: 60px;" :src="scope.row.headPortrait"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="用户昵称" width="400px"></el-table-column>
                <el-table-column label="关注" width="100px">
                    <template slot-scope="scope">
                        <el-button size="small">
                            <i class="el-icon-plus" style="color:rgb(212, 3, 3);font-weight: 800;"></i> 关注
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="歌单数量" >
                    <template slot-scope="scope">
                        歌单：{{ scope.row.playLists }}
                    </template>
                </el-table-column>
                <el-table-column label="粉丝量" >
                    <template slot-scope="scope">
                        粉丝：{{ scope.row.followers }}
                    </template>
                </el-table-column>
            </el-table>
            <div class="users-pagination">
                <el-pagination class="button" @current-change="changeCurrentPage" background layout="total,prev,pager,next" 
                :current-page="currentPage" :page-size="pageSize" :total="UsersRes.length">
                </el-pagination>
            </div>
    </div> 
</template>

<script>
export default{
    props: ['UsersRes'],
    data(){
        return{
            currentPage:1,
            pageSize:  3,
        }
    },
    computed:{   //获取当前页面的歌单数据
        data(){
        return this.UsersRes.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    methods:{
        changeCurrentPage(val){     //改变当前页
            this.currentPage=val;
        },
    }
}
</script>


<style>

.users-list {
    margin:auto;
    width: 80%;
    min-height:200px;
}
.users-pagination {
  width: 100%;
  text-align: center;
}
.users-pagination > .button{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>