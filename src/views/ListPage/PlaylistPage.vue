<template>
  <div class="fronthead-container">
    <el-row :gutter="20">
      <!-- 歌单封面 -->
      <el-col :span="6">
        <div class="fronthead-cover">
          <img :src="playlistData.cover" alt="album cover" />
          <div class="fronthead-play-btn">
            <el-button type="primary" icon="el-icon-play">播放全部</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 歌单名称、操作按钮 -->
        <div class="fronthead-header">
          <div class="fronthead-title font-title" style="padding-top: 30px;">{{ playlistData.name }}{{ id }}</div>
          <div class="fronthead-actions">
            <el-button type="default" icon="el-icon-folder-add">收藏</el-button>
            <el-button type="default" icon="el-icon-plus">添加歌曲</el-button>
            <el-button type="default" icon="el-icon-share">分享</el-button>
            <el-button type="default" icon="el-icon-chat-dot-square"
              >评论</el-button
            >
            <el-button type="default" icon="el-icon-download">下载</el-button>
          </div>
        </div>
        <!-- 歌单简介 -->
        <div class="fronthead-description font-description">{{ playlistData.description }}</div>
      </el-col>
    </el-row>
    <!-- 歌曲列表 -->
    <h2>歌曲列表</h2>
    <SonglistComponent :songlist="playlistData" />
  </div>
</template>

<script>
import SonglistComponent from '@/components/PageComponent/SonglistComponent.vue';
export default {
  name: "PlaylistPage",
  props: ["id"],
  components: {
    SonglistComponent,
  },
  created() {
    // 通过 this.id 获取参数 id
    console.log(this.id); // 输出 123
    // 可以在这里根据 id 获取对应的歌单数据等操作
  },
  data() {
    return {
      playlistData: {
        name: "我的私人歌单",
        cover:
          "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        description: "这是我的私人歌单，收录了很多好听的歌曲。",
        songs: [
          {
            id: 1,
            songId: 101,
            name: "自由飞翔",
            duration: "03:58",
            singer: "张学友",
            singerId: 101,
            album: "自由飞翔",
            albumId: 201,
          },
          {
            id: 2,
            songId: 102,
            name: "夜空中最亮的星",
            duration: "04:08",
            singer: "逃跑计划",
            singerId: 102,
            album: "世界",
            albumId: 202,
          },
          {
            id: 3,
            songId: 103,
            name: "青花瓷",
            duration: "04:31",
            singer: "周杰伦",
            singerId: 103,
            album: "我很忙",
            albumId: 203,
          },
          {
            id: 4,
            songId: 104,
            name: "岁月神偷",
            duration: "04:46",
            singer: "金玟岐",
            singerId: 104,
            album: "岁月神偷",
            albumId: 204,
          },
          {
            id: 5,
            songId: 105,
            name: "千千阙歌",
            duration: "05:25",
            singer: "陈慧娴",
            singerId: 105,
            album: "千千阙歌",
            albumId: 205,
          },
          {
            id: 6,
            songId: 106,
            name: "追光者",
            duration: "03:58",
            singer: "岑宁儿",
            singerId: 106,
            album: "追光者",
            albumId: 206,
          },
          {
            id: 7,
            songId: 107,
            name: "你的答案",
            duration: "04:02",
            singer: "阿冗",
            singerId: 107,
            album: "你的答案",
            albumId: 207,
          },
          {
            id: 8,
            songId: 108,
            name: "演员",
            duration: "04:05",
            singer: "薛之谦",
            singerId: 108,
            album: "初学者",
            albumId: 208,
          },
          {
            id: 9,
            songId: 109,
            name: "烟火里的尘埃",
            duration: "03:52",
            singer: "华晨宇",
            singerId: 109,
            album: "烟火里的尘埃",
            albumId: 209,
          },
          {
            id: 10,
            songId: 110,
            name: "说谎",
            duration: "03:54",
            singer: "林宥嘉",
            singerId: 110,
            album: "说谎",
            albumId: 210,
          },
          {
            id: 1,
            songId: 101,
            name: "自由飞翔",
            duration: "03:58",
            singer: "张学友",
            singerId: 101,
            album: "自由飞翔",
            albumId: 201,
          },
          {
            id: 2,
            songId: 102,
            name: "夜空中最亮的星",
            duration: "04:08",
            singer: "逃跑计划",
            singerId: 102,
            album: "世界",
            albumId: 202,
          },
          {
            id: 3,
            songId: 103,
            name: "青花瓷",
            duration: "04:31",
            singer: "周杰伦",
            singerId: 103,
            album: "我很忙",
            albumId: 203,
          },
          {
            id: 4,
            songId: 104,
            name: "岁月神偷",
            duration: "04:46",
            singer: "金玟岐",
            singerId: 104,
            album: "岁月神偷",
            albumId: 204,
          },
          {
            id: 5,
            songId: 105,
            name: "千千阙歌",
            duration: "05:25",
            singer: "陈慧娴",
            singerId: 105,
            album: "千千阙歌",
            albumId: 205,
          },
          {
            id: 6,
            songId: 106,
            name: "追光者",
            duration: "03:58",
            singer: "岑宁儿",
            singerId: 106,
            album: "追光者",
            albumId: 206,
          },
          {
            id: 7,
            songId: 107,
            name: "你的答案",
            duration: "04:02",
            singer: "阿冗",
            singerId: 107,
            album: "你的答案",
            albumId: 207,
          },
          {
            id: 8,
            songId: 108,
            name: "演员",
            duration: "04:05",
            singer: "薛之谦",
            singerId: 108,
            album: "初学者",
            albumId: 208,
          },
          {
            id: 9,
            songId: 109,
            name: "烟火里的尘埃",
            duration: "03:52",
            singer: "华晨宇",
            singerId: 109,
            album: "烟火里的尘埃",
            albumId: 209,
          },
          {
            id: 10,
            songId: 110,
            name: "说谎",
            duration: "03:54",
            singer: "林宥嘉",
            singerId: 110,
            album: "说谎",
            albumId: 210,
          },
          // 其他歌曲数据...
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>
