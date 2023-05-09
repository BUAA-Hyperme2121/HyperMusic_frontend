<template>
  <div>
    <h2 v-if="this.isAlbumlist">Album</h2>
    <h2 v-else>Playlist</h2>
    <div class="song-list-container">
      <div
        class="song-list"
        v-for="song in songs"
        :key="song.id"
        @click="goToPlaylist(song.id)"
      >
        <div class="song-cover">
          <img :src="song.cover" alt="song cover" />
        </div>
        <div class="song-name">{{ song.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: {
    isAlbumlist: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goToPlaylist(id) {
      if (this.isAlbumlist) {
        this.$router.push({ name: "Playlist", params: { id: id } });
      } else {
        this.$router.push({ name: "AlbumPage", params: { id: id } });
      }
    },
  },
  data() {
    return {
      songs: [
        {
          id: 1,
          name: "My Favorite Songs",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 2,
          name: "Rock Classics",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 3,
          name: "Hip Hop Hits",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 1,
          name: "My Favorite Songs",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 2,
          name: "Rock Classics",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 3,
          name: "Hip Hop Hits",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 1,
          name: "My Favorite Songs",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 2,
          name: "Rock Classics",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
        {
          id: 3,
          name: "Hip Hop Hits",
          cover:
            "https://img.51miz.com/Element/00/59/30/57/00d5b623_E593057_2ffbe2c2.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.song-list-container {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
}

.song-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 200px;
  height: 200px;
  /* background-color: #f5f5f5; */
  border-radius: 5px;
  /* box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); */
  cursor: pointer;
}

.song-cover {
  width: 150px;
  height: 150px;
  margin-top: 20px;
}

.song-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.song-name {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
