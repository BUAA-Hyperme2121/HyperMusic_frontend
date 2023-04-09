<template>
    <div class="carousel">
        <el-carousel :interval="3000"  height="450px" >
            <el-carousel-item v-for="(item,index) in carouselList" :key="index">
                <img :src="item.picImg">
            </el-carousel-item>
        </el-carousel>    
    </div>
</template>
<script>
import {carouselList} from "../assets/data/carousel";
export default{
    name: "carousel",
    data(){
        return {
            carouselList: []
        }
    },
    created (){
        this.carouselList = carouselList;
    }
}
</script>

<style>

.carousel {
    width: 80%;
    margin: auto;
}
.carousel img {
    width: 100%;
    height: inherit;
}
</style>