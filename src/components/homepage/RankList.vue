<template>
   <div class="rank-list">
    <p style="color:rgb(212, 3, 3);font-size:18px;font-weight:700;">热搜榜</p>
        <div>
            <el-table :data='rankList' style="width: 100%" :show-header="false" stripe :row-style="{height:'30px'}" :cell-style="{padding:'0px'}">
                <el-table-column label="空白" width="20px">
                </el-table-column>
                <el-table-column label="序号" width="60px">
                    <template slot-scope="scope">
                        <p style="color: red; font-weight: 600;">{{ scope.$index + 1 }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="歌曲名称" >
                    <template slot-scope="scope">
                        <p style="cursor: pointer;" @click="goSong(scope.row)">{{ scope.row.music_name}}</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width:100%;text-align: right;">
            <router-link style="text-align:right;font-size:10px;color: black;text-decoration:none;" to="/homepage/toplist">查看更多></router-link>
        </div>
   </div> 
</template>
<script>
export default{
    name: "RankList",
    props: ['rankList'],
    methods: {
        goSong(item){
            this.$router.push({path: `/song/${item.id}`});
        }
    }
}
</script>

<style scoped>
.rank-list {
    width: 100%;
    height: auto;
    background-color: white;
    text-align: center;
    
}
.rank-style-one {
    text-align: left;
    width: 100%;
    height:30px;
    line-height: 30px;
    background-color: rgb(248, 248, 248);
    overflow: hidden;
}
.rank-style-two {
    text-align: left;
    width: 100%;
    height:30px;
    line-height: 30px;
    background-color: white;
    overflow: hidden;
}
</style>