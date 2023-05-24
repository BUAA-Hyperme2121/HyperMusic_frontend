<template>
    <div class="container">
      <div class="content">
        <div class="background"></div>
        <div class="left">
          <div class="vinyl">
            <div class="record"></div>
            <img class="cover" :src="songlist[currentIndex].cover" alt="Cover">
          </div>
          <div class="title">{{ songlist[currentIndex].name }}</div>
        </div>
        <div class="right">
          <div class="lyrics">
            <div class="lyrics-inner" ref="lyricsInner">
              <p v-for="(line, index) in songlist[currentIndex].lyrics" :key="index">{{ line }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MusicPlayer",
    data() {
      return {
        songlist: [
          {
            name: "Song 1",
            cover: "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            lyrics: ["Line 1", "Line 2", "Line 3"]
          },
          {
            name: "Song 2",
            cover: "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            lyrics: ["Line 1", "Line 2", "Line 3"]
          },
          {
            name: "Song 3",
            cover: "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
            lyrics: ["Line 1", "Line 2", "Line 3"]
          }
        ],
        currentIndex: 0
      };
    },
    mounted() {
      // 滚动歌词
      this.$nextTick(() => {
        const lyricsInner = this.$refs.lyricsInner;
        const lyricsHeight = lyricsInner.clientHeight;
        let top = 0;
        let index = 0;
        const lines = lyricsInner.querySelectorAll("p");
        const timer = setInterval(() => {
          if (index === lines.length) {
            clearInterval(timer);
            return;
          }
          const line = lines[index];
          const lineHeight = line.clientHeight;
          if (top + lineHeight > lyricsHeight / 2) {
            lyricsInner.style.transform = `translateY(-${top}px)`;
          }
          top += lineHeight;
          index++;
        }, 1000);
      });
    }
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg");
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
  }
  
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    width: 80%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100%;
    padding: 32px;
  }
  
  .vinyl {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .record {
    position: absolute;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-color: #fff;
    border: 8px solid #000;
    animation: rotate 10s linear infinite;
  }
  
  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
    text-align: center;
  }
  
  .right {
    flex: 1;
    height: 100%;
    overflow: hidden;
    /* padding: 32px; */
  }
  
  .lyrics {
    height: 100%;
    overflow-y: scroll;
    align-items: center;
    justify-content: center;
  }
  
  .lyrics-inner {
    position: relative;
    width: 100%;
    padding-top: 50vh;
    transform: translateY(-50%);
  }
  
  .lyrics p {
    font-size: 20px;
    margin: 8px 0;
    text-align: center;
    color: #222;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>