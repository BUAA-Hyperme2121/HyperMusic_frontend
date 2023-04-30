<template>
    <div class="play-bar" :class="{show:!toggle}">
        <div @click="toggle=!toggle" class="item-up" :class="{turn:toggle}">
            <el-tooltip content="是否隐藏" placement="top" >
                <i class="el-icon-top"></i>
            </el-tooltip>
        </div>
        <div class="kongjian">
            <div class="item" @click="">
                <el-tooltip content="播放上一首" placement="top" >
                    <i class="el-icon-d-arrow-left"></i>
                </el-tooltip>
            </div>
            <div class="item" @click="togglePlay">
                <el-tooltip content="播放/暂停" placement="top" >
                    <i class="el-icon-caret-right"></i>
                </el-tooltip>
            </div>
            <div class="item" @click="">
                <el-tooltip content="播放下一首" placement="top" >
                    <i class="el-icon-d-arrow-right"></i>
                </el-tooltip>
            </div>
            <div class="item">
                <img class="item-img" src="../assets/img/homepageTest/icon.jpg" alt="">
            </div>
            <div class="playing-speed">
                <div class="current-time">{{nowTime}}</div>
                <div class="progress-box">
                    <div ref="progress" class="progress">
                        <div ref="bg" class="bg">
                            <div ref="curProgress" class="cur-progress" :style="{width:'30%'}"></div>
                        </div>
                        <div ref="idot" class="idot" :style="{left: '30%'}"></div>
                    </div>
                </div>
                <div class="left-time">{{songTime}}</div>
            </div>
            <div class="item item-volume">
                    <el-tooltip content="音量" placement="top" >
                        <i class="el-icon-mic"></i>
                    </el-tooltip>
            </div>
            <div class="item item-volume">
                    <el-tooltip content="收藏" placement="top" >
                        <i class="el-icon-star-on"></i>
                    </el-tooltip>
            </div>
            <div class="item item-volume">
                    <el-tooltip content="下载" placement="top" >
                        <i class="el-icon-download"></i>
                    </el-tooltip>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    data (){
        return {
            toggle: true,    //隐藏
            volume: 50,      //音量
            nowTime: '00:00', //当前时间
            songTime: '03:41' //总时间
        }
    },
    methods: {
        togglePlay(){
            if(this.isPlay){

            }else{

            }
        }
    }
}
</script>
<style scoped>
.play-bar{
    position:fixed;
    width:100%;
    bottom:0;
    transition: all 0.5s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.kongjian {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    height: 60px;
    width: 100%;
    min-width: 1000px;
    background-color: rgba(0, 0, 0, 0.76);
    color: white;
    
}
.item-up {
    position: absolute;
    bottom: 60px;
    left: 20px;
    cursor: pointer;
}
.kongjian .item {
    position: relative;
    width: 80px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
}
.item .icon.active {
    color: red !important;
}
.item .show-volume {
    display: block;
}
.item .volume {
    position: absolute;
    display: none;
    height: 100px;
    top: -110px;
    right: 22px;
}
.item-img {
    width: 50px;
    height: 50px;
    border-radius: 20%;
      
}
.item-img img {
    width: 100%;
}


.playing-speed {
    height: 50px;
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playing-speed .current-time,.left-time {
    width: 70px;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    top: -10px;
}
.playing-speed .progress-box {
        flex: 1;
}
.progress {
          width: 100%;
          background: #ffb1b1;
          height: 6px;
}
.progress .bg {
    height: 100%;
}
.bg .cur-progress{
        height: 100%;
        background: #fc3030;
}
.progress .idot {
    width: 12px;
    height: 12px;
    position: relative;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    top: -10px;
    vertical-align: middle;
}
.item-song-title {
          justify-content: space-between;
          height: 20px;
          line-height: 10px;
}
.turn {
  transform: rotate(180deg);
}

.show {
  bottom: -60px;
}

.icon {
    width: 1.2em;
    color: white;
}
</style>