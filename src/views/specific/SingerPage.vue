<template>
    <div class="fronthead-container">
      <el-row :gutter="20">
        <!-- 专辑封面 -->
        <el-col :span="6" :offset="1" style="position: sticky; top: 0px">
          <div class="fronthead-cover-big">
            <img :src="albumData.cover" alt="album cover" @click="playAll" />
            <div class="fronthead-play-btn">
              <el-button type="primary" icon="el-icon-play" @click="showDialog"
                >播放全部热门</el-button
              >
            </div>
          </div>
          <!-- 专辑名称、操作按钮 -->
          <div class="fronthead-header">
            <div class="fronthead-title font-title">
              {{ albumData.name }}{{ id }}
            </div>
            <!-- <div class="font-description">歌手：{{ albumData.singer }}</div> -->
            <!-- <div class="font-description" style="padding-bottom: 20px">
              发行日期：{{ albumData.date }}
            </div> -->
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
              <!-- <el-button type="default" icon="el-icon-download" size="small"
                >下载</el-button
              > -->
            </div>
          </div>
          <!-- 专辑简介 -->
          <div class="fronthead-description font-description">
            {{ albumData.description }}
          </div>
        </el-col>
        <el-col :span="15" :offset="1">
          <!-- 歌曲列表 -->
          <h2>歌曲列表</h2>
          <SonglistComponent :songlist="albumData"  :noSinger="true"/>
          <AlbumlistComponent/>
        </el-col>
      </el-row>
      <div class="dialog-mask" v-show="dialogVisible" @click="closeDialog"></div>
      <transition name="dialog-slide" appear>
        <div class="dialog-container" v-show="dialogVisible" key="0">
          <div class="dialog-header">
            <span>弹窗标题</span>
            <i class="el-icon-close" @click="closeDialog"></i>
          </div>
          <div class="dialog-body">弹窗内容</div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import SonglistComponent from "@/components/PageComponent/SonglistComponent.vue";
  import AlbumlistComponent from "@/components/PageComponent/AlbumlistComponent.vue";
  export default {
    name: "PlaylistPage",
    props: ["id"],
    components: {
      SonglistComponent,
      AlbumlistComponent,
    },
    methods: {
      playAll() {
        console.log("play all!");
      },
      showDialog() {
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
    },
    data() {
      return {
        dialogVisible: false,
        albumData: {
          name: "李荣浩",
          singer: "AAA",
          date: "2022/02/02",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
          description:
            "李荣浩（Ronghao Li），1985年7月11日出生于安徽省蚌埠市，中国内地流行乐男歌手、词曲创作人、音乐制作人、演员。 2010年，发行首张个人音乐EP《小黄》。2013年，发行个人首张音乐专辑《模特》，凭该专辑成为首位获得台湾金曲奖“最佳新人奖”的中国大陆歌手。2014年，发行个人同名音乐专辑《李荣浩》，凭该专辑获得中国TOP排行榜内地年度最佳男歌手奖。2016年，发行个人音乐专辑《有理想》，随后，举行的23场“有理想”世界巡演获得第21届华语榜中榜亚洲影响力最佳演唱会奖。2017年，发行个人音乐专辑《嗯》，凭该专辑获得第22届全球华语榜中榜亚洲影响力最佳男歌手奖；同年，他的个人巡演首次登陆香港红磡体育馆和台北小巨蛋体育馆。2018年，发行个人音乐专辑《耳朵》，凭该专辑提名第30届台湾金曲奖最佳国语男歌手奖。2019年，担任浙江卫视歌唱选秀节目《中国好声音》的导师；同年，获得Mnet亚洲音乐大奖亚洲最佳艺人奖。2020年，发行音乐专辑《麻雀》。2021年，发行专辑《不遗憾》。",
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
  /* 页面遮罩 */
  /* 页面遮罩样式 */
  .dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  
  /* 弹窗容器 */
  .dialog-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 101;
  }
  
  /* 弹窗标题栏 */
  .dialog-header {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: #f5f7fa;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  /* 弹窗内容 */
  .dialog-body {
    padding: 20px;
  }
  
  /* 弹窗滑入滑出动画 */
  .dialog-container-enter-active,
  .dialog-container-leave-active {
      transition: transform all 1s ;
  }
  
  .dialog-container-enter,
  .dialog-container-leave-to {
    transform: translateY(-100%);
  }
  
  .dialog-container-enter-to,
  .dialog-container-leave {
    transform: translateY(0);
  }
  </style>
  