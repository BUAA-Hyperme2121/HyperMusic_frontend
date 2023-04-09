<template>
   <div>
        <div class="search">
            <input type="text" placeholder="搜索你喜欢的音乐" @keyup.enter="goSearch()" v-model="keywords">
            <div class="search-button" @click="goSearch()">
                <i class="icon iconfont icon-sousuo"></i>
            </div>
        </div>
   </div> 
  </template>
<script>
    export default{
    data(){
        return {
            keywords,
        }
    },
    methods: {
        goSearch(){
            this.$router.push({path:'/search',query:{keywords:this.keywords}})
        }
    },
}


</script>
<style>
.search{
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: center;
    margin: 20px;
}
.search input{
    display: inline-block;
    height: 38px;
    width: 25%;
    border-radius: 3px;
    vertical-align: middle;
}
.search .search-button{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    background-color: rgb(239, 239, 239);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
    text-align: center;
    vertical-align: middle;

}
.search .icon{
    font-size: 22px;
    font-weight: 600;
    color:grey;
}
.search .icon:hover{
    color:black;
    cursor: pointer;
}


</style>