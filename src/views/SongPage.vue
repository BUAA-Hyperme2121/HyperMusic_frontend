<template>
  <div class="song-page">
    <div
      class="background"
      :style="{ backgroundImage: `url(${song.cover_path})` }"
    ></div>
    <el-container class="fronthead-container">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1" style="position: sticky; top: 0px">
          <div class="fronthead-cover-big">
            <img :src="song.cover_path" alt="album cover" />
            <div class="fronthead-play-btn"></div>
          </div>
          <!--name, description-->
          <div class="fronthead-header">
            <div class="fronthead-title font-title" style="color: white">
              {{ song.music_name }}
            </div>
            <div class="font-description">歌手：{{ song.singer_name }}</div>
            <div class="font-description" style="padding-bottom: 20px">
              播放量：{{ song.listen_nums }}
            </div>
            <div class="fronthead-actions">
              <el-button type="default" icon="el-icon-folder-add" size="small"
                >关注</el-button
              >
              <el-button type="default" icon="el-icon-share" size="small"
                >分享</el-button
              >
              <el-button
                type="default"
                icon="el-icon-chat-dot-square"
                size="small"
                >评论</el-button
              >
              <el-button type="default" icon="el-icon-view" size="small"
                >关注</el-button
              >
            </div>
            <div class="fronthead-description font-description">
              {{ song.description }}
            </div>
          </div>
        </el-col>
        <el-col :span="15" :offset="1" class="lyrics-container">
          <pre class="lyrics">{{ song.lyrics }}</pre>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<style scoped>
.song-page {
  height: 100vh;
  width: 100vw;
}
::-webkit-scrollbar {
  display: none;
}
.background {
  height: 110vh;
  width: 100%;
  transform: scale(1.09);
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(70%);
  z-index: -1;
}

.song-cover {
  height: 100%;
  width: 100%;
  border-radius: 4px;
}

.lyrics-container {
  height: 80vh; 
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* overflow-y: scroll; */
}

.lyrics {
  overflow:auto;
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 2;
  text-align: center;
  color: antiquewhite;
}
</style>

<script>
export default {
  name: "SongPage",
  data() {
    return {
      song: {
        id: "1",
        singer_id: "1",
        singer_name: "Taylor Swift",
        music_path: "/music/love_story.mp3",
        cover_path:
          "https://img.zcool.cn/community/01fd635e875573a801216518e19acd.png@2o.png",
        music_name: "Love Story",
        lyrics_path: "/lyrics/love_story.lrc",
        listen_nums: "1000000",
        description:
          "Love Story is a song by American singer-songwriter Taylor Swift. It was released on September 12, 2008.",
        labels: ["country", "pop"],
        lyrics: `[length:04:09.34]
[re:www.megalobiz.com/lrc/maker]
[ve:v1.2.3]
[00:04.07]You're the light, you're the night
[00:07.56]You're the color of my blood
[00:08.81]You're the cure, you're the pain
[00:09.56]You're the only thing I wanna touch
[00:09.81]Never knew that it could mean so much, so much
[00:09.81]You're the fear, I don't care
[00:10.07]Cause I've never been so high
[00:10.32]Follow me to the dark
[00:10.57]Let me take you past our satellites
[00:10.57]You can see the world you brought to life, to life
[00:10.84]So love me like you do, love me like you do
[00:11.06]Love me like you do, love me like you do
[00:11.31]Touch me like you do, touch me like you do
[00:11.56]What are you waiting for?
[00:11.56]
[00:11.81]Fading in, fading out
[00:13.31]On the edge of paradise
[00:13.56]Every inch of your skin is a holy grail I've got to find
[00:13.56]Only you can set my heart on fire, on fire
[00:13.81]Yeah, I'll let you set the pace
[00:14.06]Cause I'm not thinking straight
[00:14.32]My head spinning around I can't see clear no more
[00:14.56]What are you waiting for?
[00:14.56]Love me like you do, love me like you do
[00:15.82]Love me like you do, love me like you do
[00:16.08]Touch me like you do, touch me like you do
[00:16.31]What are you waiting for?
[00:16.56]Yeah, I'll let you set the pace
[00:16.82]Cause I'm not thinking straight
[00:17.07]My head spinning around I can't see clear no more
[00:17.07]What are you waiting for?
[00:18.56]Love me like you do, love me like you do
[00:18.56]Love me like you do, love me like you do
[00:19.07]Touch me like you do, touch me like you do
[00:19.31]What are you waiting for?
        `,
      },
    };
  },
  computed: {},
  methods: {},
};
</script>
