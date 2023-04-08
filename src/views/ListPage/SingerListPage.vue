<template>
  <div class="singer-page">
    <h2 class="singer-count">歌手数量：{{ singers.length }}</h2>
    <ul class="singer-list">
      <li v-for="singer in singers" :key="singer.id" class="singer-item">
        <img :src="singer.avatar" class="singer-avatar" alt="" />
        <div class="singer-info">
          <h3 class="singer-name">{{ singer.name }}</h3>
          <p class="singer-album-count">专辑数量：{{ singer.albums }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["id"],
  created() {
    // 通过 this.id 获取参数 id
    console.log(this.id); // 输出 123
    // 可以在这里根据 id 获取对应的歌单数据等操作
  },
  data() {
    return {
      singers: [
        {
          id: 1,
          name: "Taylor Swift",
          avatar: "https://picsum.photos/id/1005/200/200",
          albums: 9,
        },
        {
          id: 2,
          name: "Adele",
          avatar: "https://picsum.photos/id/1011/200/200",
          albums: 3,
        },
        {
          id: 3,
          name: "Ed Sheeran",
          avatar: "https://picsum.photos/id/1012/200/200",
          albums: 6,
        },
      ],
    };
  },
};
</script>

<style>
.singer-count {
  margin-bottom: 20px;
}

.singer-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.singer-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.singer-avatar {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 50%;
}

.singer-name {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.singer-album-count {
  margin: 0;
  font-size: 16px;
  color: #666;
}
</style>
