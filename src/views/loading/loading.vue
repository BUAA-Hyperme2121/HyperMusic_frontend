<template>
    <div v-if="show">
      <van-overlay class="box" :show="true">
        <div class="wrapper" @click.stop>
          <van-loading class="block" size="50" />
        </div>
      </van-overlay>
    </div>
  </template>
  <script>
  export default {
    name: "Loading",
    props: {
      show: Boolean,
    },
  };
  </script>
  
  <style  scoped>
  .box {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
      .block {
        color: #6a72fe;
      }

  </style>