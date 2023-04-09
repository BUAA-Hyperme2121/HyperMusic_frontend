<template>
  <div>
    <div class="background-div">
      <SelectNav />
      <router-view />
    </div>
  </div>
</template>

<script>
import SelectNav from "../components/SelectNav.vue";
export default {
  name: 'home',
  components:{
    SelectNav,
  },
  methods:{

  }
}
</script>

<style>

.background-div {
  width: 100%;
  height: 100%;
  background-color: rgb(248, 248, 248);
  padding-bottom: 100px;
}
</style>