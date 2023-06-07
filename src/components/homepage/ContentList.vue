<template>
    <div class="content-list">
        <ul class="content">
            <li class="content-item" v-for="(item,index) in contentList" :key="index">
                <div class="item-outline" @click="goSpecific(item,item.type)">
                    <img class="item-img" :src="item.cover_path" >
                </div>
                <div class="mask" @click="goSpecific(item)">
                    <i class="icon iconfont icon-bofang1"></i>
                </div>
                <p v-if="type==1" class="item-name">{{item.music_name}}</p>
                <p v-if="type!=1" class="item-name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'content-list',
    props: ['contentList','type'],
    methods: {
        //前往特定的歌曲、歌单、歌手页面
        goSpecific(item){
            if(this.type==1){
                this.$router.push({path: `/song/${item.id}`});
            }else if(this.type==2){
                this.$router.push({path: `/playlist/${item.id}`});
            }else if(this.type==3){
                this.$router.push({path: `/singer/${item.id}`});
            }else{
                //无法识别的类型
            }
        }
    }
}
</script>
<style scoped>
.content-list {
    min-height: 100px;
    width: 100%;
}
.content {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    padding:0;
}

.content-item {
    width: 18%;
    margin: 20px 1%;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    
}
.item-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    box-orient: vertical;
    line-clamp: 2;
    margin: 10px 8px;
    height: 20px;
}

.item-img {
    position: absolute;
    width: 100%;
    height: 82%;
    top: 0;
    bottom: 0;
    transition: all 0.4s ease;
}

.item-outline {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    overflow: hidden;
}

.mask {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    background-color: rgba(52, 47, 41, 0.4);
    transition: all 0.3s ease-in-out;
    opacity: 0;
}
.mask:hover {
    opacity: 1;
    cursor: pointer;
}
.mask > .icon {
    position: absolute;
    top: 37%;
    left: 38%;
}

.icon {
    width: 3em;
    height: 3em;
    font-size: 3em;
    color: rgba(240, 240, 240, 1);
    fill: currentColor;
    overflow: hidden;
    position: relative;
}
</style>