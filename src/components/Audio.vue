<template>
    <div class="song-audio">
      <audio :src='url' 
        controls="controls" ref="player" preload="true" @canplay="startPlay" @timeupdate="timeupdate" @ended="ended">
      </audio>
    </div>
  </template>
  
<script>
import { mapGetters } from 'vuex'
import { playSong } from '@/api/api'
export default {
  computed: {
    ...mapGetters([
      'id', // 音乐id
      'url', // 音乐链接
      'listOfSongs', // 存放的音乐
      'isPlay', // 播放状态
      'volume', // 音量
      'curTime', // 当前音乐的播放位置
      'changeTime', // 指定播放时刻
      'autoNext' // 用于触发自动播放下一首
    ])
  },
  watch: {
    // 监听播放还是暂停
    isPlay () {
      this.togglePlay()
    },
    // 跳到指定时刻播放
    changeTime () {
      let player = this.$refs.player
      player.currentTime = this.changeTime
    },
    volume (val) {
      this.$refs.player.volume = val
    }
  },
  methods: {
    // 开始/暂停
    togglePlay () {
      let player = this.$refs.player
      if (this.isPlay) {
          player.play()
      } else {
          player.pause()
      }
    },
    // 获取歌曲链接后准备播放
    startPlay () {
      let player = this.$refs.player
      //  记录音乐时长
      this.$store.commit('setDuration', player.duration)
      if(this.isPlay){
          player.play()
          if(localStorage.getItem('loginInfo')!=null){
            var formData = new FormData()
            formData.append('music_id',this.id)
            formData.append('JWT',JSON.parse(localStorage.getItem("loginInfo")).JWT)
            playSong(formData)
                .then(res => {
                    
                })
                .catch(err => {
                    console.log(err)
                })
          }
      }
    },
    // 音乐播放时记录音乐的播放位置
    timeupdate () {
      let player = this.$refs.player
      this.$store.commit('setCurTime', player.currentTime)
    },
    // 音乐播放结束时触发
    ended () {
      this.$store.commit('setIsPlay', false)
      this.$store.commit('setCurTime', 0)
      this.$store.commit('setAutoNext', !this.autoNext)
    }
  }
}
</script>
  <style scoped>
    .song-audio{
      display: none;
        position: fixed;
        left: 0;
        top: 200px;
    }
  </style>
