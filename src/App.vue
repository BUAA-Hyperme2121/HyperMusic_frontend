<template>
  <div id="app">
    <TopNav />
    <router-view />
    <PlayBar />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import PlayBar from './components/PlayBar.vue'
export default {
  name: 'App',
  components: {
    TopNav,
    PlayBar,
  }
}
</script>

<style>
#app {
  
}
</style>
