<template>
    <div class="users-list">
            <el-table :data="data" style="width: 100%;font-size: 10px;" :show-header="false" stripe >
                <el-table-column label="用户头像" width="80px">
                    <template slot-scope="scope">
                        <el-image style="width: 60px;height: 60px; cursor: pointer;" :src="scope.row.avatar_path" @click="goUser(scope.row)"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="用户昵称" width="400px">
                    <template slot-scope="scope">
                        <p style="cursor: pointer;" @click="goUser(scope.row)">{{ scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="关注" width="100px">
                    <template slot-scope="scope">
                        <el-button size="small" @click="follow(scope.row)">
                            <i class="el-icon-plus" style="color:rgb(212, 3, 3);font-weight: 800;"></i> 关注
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="关注" >
                    <template slot-scope="scope">
                        关注：{{ scope.row.follow_num}}
                    </template>
                </el-table-column>
                <el-table-column label="粉丝量" >
                    <template slot-scope="scope">
                        粉丝：{{ scope.row.fan_num}}
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
import { UsersRes } from '@/assets/data/searchRes';
import { getUserRes } from '@/api/api';
export default{
    data(){
        return{
            UsersRes: [],
            currentPage:1,
            pageSize:  10,
        }
    },
    computed:{   //获取当前页面的歌单数据
        data(){
        return this.UsersRes.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    },
    mounted(){
        this.UsersRes=UsersRes
        //this.getUsersRes()
    },
    methods:{
        changeCurrentPage(val){     //改变当前页
            this.currentPage=val;
        },
        goUser(row){
            this.$router.push({path: `/user/home`,query:{user_id:row.id}});
        },
        getUsersRes(){
            getUserRes(this.$route.query.keywords)
                .then(res => {
                    this.UsersRes=res.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        follow(row){
            if(localStorage.getItem('loginInfo')!=null){
                var formData = new FormData();
                formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('follow_user_id',row.id)
                setLikes(formData)
                .then(res => {
                    if(res.status==200){
                        this.$message.success("关注成功")
                    }else{
                        this.$message.success("取消关注")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                this.$message.error("请先登录")
            }
        }
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