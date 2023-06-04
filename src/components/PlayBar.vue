<template>
    <div class="play-bar" :class="{show:!toggle}">
        <div @click="toggle=!toggle" class="item-up" :class="{turn:toggle}">
            <el-tooltip content="是否隐藏" placement="top" >
                <i class="el-icon-top"></i>
            </el-tooltip>
        </div>
        <div class="kongjian">
            <div class="item" @click="prev">
                <el-tooltip content="播放上一首" placement="top" >
                    <i class="el-icon-d-arrow-left"></i>
                </el-tooltip>
            </div>
            <div class="item" @click="togglePlay">
                <el-tooltip content="播放/暂停" placement="top" >
                    <i style="line-height: 50px; text-align: center; font-size: 20px;" :class="{'iconfont icon-24gf-play': !isPlay,'iconfont icon-24gf-pause2': isPlay}"></i>
                </el-tooltip>
            </div>
            <div class="item" @click="next">
                <el-tooltip content="播放下一首" placement="top" >
                    <i class="el-icon-d-arrow-right"></i>
                </el-tooltip>
            </div>
            <div class="item">
                <img class="item-img" :src=picUrl alt="">
            </div>
            <div class="item" style="width: 120px;">
                <div class="item-song-title" style="width: 120px;">{{ this.title }}</div>
            </div>
            <div class="playing-speed"  @mouseup="mouseup" @mousemove="mousemove">
                <div class="current-time">{{nowTime}}</div>
                <div class="progress-box">
                    <div ref="progress" class="progress" >
                        <div ref="bg" class="bg" @click="updatemove">
                            <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
                        </div>
                        <div ref="idot" class="idot" :style="{left: curLength+'%'}" @mousedown="mousedown"></div>
                    </div>
                </div>
                <div class="left-time">{{songTime}}</div>
            </div>
            <div class="item item-volume">
                <el-tooltip content="音量" placement="top" >
                    <i class="el-icon-mic"></i>
                </el-tooltip>
                <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
            </div>
            <div class="item" @click="addToLikes()">
                <el-tooltip content="喜欢" placement="top">
                    <i style="font-size: 23px;" class="iconfont icon-xihuan"></i>
                </el-tooltip>
            </div>
            <div class="item" @click="download">
                <el-tooltip content="下载" placement="top" >
                    <i class="el-icon-download"></i>
                </el-tooltip>
            </div>
            <div class="item" @click="changeAside">
                <el-tooltip content="播放列表" placement="top" >
                    <i class="el-icon-s-fold"></i>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {setLikes} from '../api/api';
export default {
    data (){
        return {
            toggle: true,    //隐藏播放条
            volume: 100,      //音量
            nowTime: '00:00', //当前时间
            songTime: '00:00', //总时间
            curLength: 0,          //进度条位置
            progressLength: 0,     //进度条总长度
            mouseStartX: 0,       //拖拽开始位置
            tag: false,          //拖拽开始结束的标志
        }
    },
    computed:{
        ...mapGetters([
            'isPlay', 
            'id', 
            'url',
            'title', 
            'artist', 
            'picUrl', 
            'curTime', 
            'duration', 
            'listOfSongs', 
            'autoNext', 
            'showAside', 
        ])
    },
    watch:{
        volume(){
            this.$store.commit('setVolume',this.volume / 100)
        },
        curTime(){
            this.nowTime=this.formatSeconds(this.curTime);
            this.songTime=this.formatSeconds(this.duration);
            this.curLength=(this.curTime/this.duration)*100
        },
        autoNext(){
            this.next();
        }
    },
    mounted(){
        this.progressLength=this.$refs.progress.getBoundingClientRect().width;

        document.querySelector('.item-volume').addEventListener('click',function(e){
            document.querySelector('.volume').classList.add('show-volume');
            e.stopPropagation();
        },false);
        document.querySelector('.volume').addEventListener('click',function(e){
            e.stopPropagation();
        },false);
        document.addEventListener('click',function(){
            document.querySelector('.volume').classList.remove('show-volume');
        },false);
    },
    methods: {
        togglePlay(){
            if(this.isPlay){
                this.$store.commit('setIsPlay',false);
            }else{
                this.$store.commit('setIsPlay',true);
            }
        },
        //解析获得的歌曲时间
        formatSeconds(value){
            let theTime = parseInt(value);
            let result = '';
            let hour = parseInt(theTime/3600);
            let minute = parseInt((theTime/60)%60);
            let second = parseInt((theTime)%60);
            if(hour>0){
                if(hour <10){
                    result += '0'+hour+":"
                }else{
                    result += hour+":"
                }
            }
            if(minute>0){
                if(minute<10){
                    result += '0'+minute+":"
                }else{
                    result += minute+":"
                }
            }else{
                result += "00:"
            }
            if(second>0){
                if(second<10){
                    result += '0'+second
                }else{
                    result += second
                }
            }else{
                result += "00"
            }
            return result;
        },
        mousedown(e){
            this.mouseStartX = e.clientX;
            this.tag=true;
        },
        mouseup(){
            this.tag=false;
        },
        mousemove(e){
            if (!this.duration) {
                return false
            }
            if (this.tag) {
                let movementX = e.clientX - this.mouseStartX
                let curLength = this.$refs.curProgress.getBoundingClientRect().width
            
                this.progressLength = this.$refs.progress.getBoundingClientRect().width
                let newPercent = ((curLength + movementX) / this.progressLength) * 100
                if (newPercent > 100) {
                newPercent = 100
                }
                this.curLength = newPercent
                this.mouseStartX = e.clientX
                this.changeTime(newPercent)
            }
        },
        changeTime(percent){
            let newCurTime = (percent*0.01)*this.duration;
            this.$store.commit('setChangeTime',newCurTime);
        },
        updatemove (e) {
            if (!this.tag) {
                let curLength = this.$refs.bg.offsetLeft
                this.progressLength = this.$refs.progress.getBoundingClientRect().width
                let newPercent = ((e.clientX - curLength) / this.progressLength) * 100
                if (newPercent < 0) {
                newPercent = 0
                } else if (newPercent > 100) {
                newPercent = 100
                }
                this.curLength = newPercent
                this.changeTime(newPercent)
            }
        },
        download(){
            this.$message({
                message: '文件正在下载，请您耐心等待！',
                type: 'warning'
            });
            let path = this.url; 
            const xhr = new XMLHttpRequest();
            xhr.open('get', path);
            xhr.responseType = 'blob';
            xhr.send()
            xhr.progress = function() {
                console.log(this);
            }
            var title=this.title;
            xhr.onload = function() {
                if (this.status === 200 || this.status === 304) {
                    const url = URL.createObjectURL(this.response);
                    let a = document.createElement("a");
                    a.href = url;
                    a.download = title;
                    document.body.appendChild(a)
                    a.click();
                    document.body.removeChild(a)
                }
            }
        },
        changeAside(){
            if(this.showAside==true){
                this.$store.commit('setShowAside',false);
                console.log(this.showAside);
            }else{
                this.$store.commit('setShowAside',true);
                console.log(this.showAside);
            }
        },
        prev(){
            var index = -1;
            var length = this.listOfSongs.length;
            if(this.listOfSongs.length==0){
                return ;
            }
            for(var i=0;i<length;i++){
                if(this.id==this.listOfSongs[i].id){
                    index=i;
                }
            }
            if(index==-1){
                return ;
            }else if(index==0){
                this.toplay(this.listOfSongs.length-1)
            }else{
                this.toplay(index-1)
            }
        },
        next(){
            var index = -1;
            var length = this.listOfSongs.length;
            if(this.listOfSongs.length==0){
                return;
            }
            for(var i=0;i<length;i++){
                if(this.id==this.listOfSongs[i].id){
                    index=i;
                }
            }
            if(index==-1){
                this.toplay(0)
            }else if(index==this.listOfSongs.length-1){
                this.toplay(0)
            }else{
                this.toplay(index+1)
            }
        },
        toplay: function(index) {
            this.$store.commit('setIsPlay', true)
            this.$store.commit('setId', this.listOfSongs[index].id);
            this.$store.commit('setPicUrl',this.listOfSongs[index].cover_path);
            this.$store.commit('setUrl', this.listOfSongs[index].music_path);
            this.$store.commit('setTitle', this.listOfSongs[index].name)
        },
        addToLikes(){
            if(localStorage.getItem('loginInfo')!=null&&this.id!=null){
                var formData = new FormData();
                formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
                formData.append('music_id',this.id)
                setLikes(formData)
                .then(res => {
                    //根据res进行区分
                    if(res.data.flag==2){
                        this.$message.success("成功添加到喜欢的音乐")
                    }else{
                        this.$message.success("取消喜欢")
                    }
                })
                .catch(err => {
                    this.$message.error("添加失败")
                })
            }else if(this.id==null){
                this.$message.error("请先选择歌曲")
            }else{
                this.$message.error("请先登录")
            }
        },
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
    z-index: 999;
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
.item {
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
.item .volume {
    position: absolute;
    top: -105px;
    right: 22px;
    height: 100px;
    display: none;
}
.item .show-volume {
    display: block ;
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
          height: 50px;
          line-height: 50px;
          font-size: 8px;
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