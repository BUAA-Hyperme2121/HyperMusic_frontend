<template>
  <div id="app">
    <TopNav />
    <router-view/>
    <!-- <Audio /> -->
    <Aside />
    <PlayBar />
  </div>
</template>

<script>
import Audio from './components/Audio.vue'
import Aside from './components/Aside.vue'
import TopNav from './components/TopNav.vue'
import PlayBar from './components/PlayBar.vue'
export default {
  name: 'App',
  components: {
    TopNav,
    PlayBar,
    Audio,
    Aside,
  },
}

    
    
    

</script>

<style>

</style>
