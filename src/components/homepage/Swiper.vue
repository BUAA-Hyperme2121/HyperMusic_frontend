<template>
    <div class="outer">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" >
                    <div class="image-inner" @click="goPlayList(29)">
                        <img src="../../assets/img/swiper/swiper1.jpg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper1-2.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-slide" >
                    <div class="image-inner" @click="goPlayList(30)">
                        <img src="../../assets/img/swiper/swiper2.jpg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper2-2.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-slide" >
                    <div class="image-inner" @click="goPlayList(31)">
                        <img src="../../assets/img/swiper/swiper3.jpeg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper3-2.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-slide" >
                    <div class="image-inner" @click="goPlayList(32)">
                        <img src="../../assets/img/swiper/swiper4.jpeg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper4-2.jpg" alt="">
                    </div>
                </div>
            </div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev prev"></div>
            <div class="swiper-button-next next"></div>
        </div>
        <!-- 下载客户端区域 -->
        <div class="flag">
            <a
                href="https://github.com/BUAA-Hyperme2121/HyperMusic_frontend"
                class="github-link"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                >
                <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
                </svg>
            </a>
            <div class="welcome">
                <p>欢迎访问</p>
                <p>HyperMusic-github仓库</p>
            </div>
        </div>
    </div>
</template>
<script>
import 'swiper/css/swiper.css';
import Swiper from "swiper"
export default{
    mounted(){
        new Swiper('.swiper', {
            autoplay: true,
            loop: true, 
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    },
    methods:{
        goPlayList(id){
            this.$router.push({path: `/playlist/${id}`});
        }
    }
}         
</script>
<style scoped>
.outer {
    width: 100%;
    height: 400px;
    position:relative;
}
 
.swiper {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
}
 
.swiper-slide {
    position: relative;
    width: 100%;
    height: 400px;
}
 
.swiper-wrapper .image-outer>img {
    width: 100%;
    height: 400px;
}
 
.image-inner {
    width: 59%;
    height: 400px;
    position: absolute;
    left: 13%;
}
 
.swiper-wrapper .image-inner>img {
    width: 100%;
    height: 400px;
}
 
.prev {
    position: absolute;
    color:grey;
    left: 10%;
    top: 50%;
    display: block;
    width: 37px;
    height: 63px;
    margin-top: -31px;
    background-position: 0 -360px;
}
 
 
.next {
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -38px;
    width: 37px;
    height: 63px;
    right: 9%;
    color: grey;
    background-position: 0 -508px;
}
 
.swiper-pagination{
    width: 730px;
    height: 20px;
    /* background-color: red; */
}
.flag {
    position: absolute;
    top: 0px;
    right: 13%;
    width: 15%;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;

}
 
.flag .welcome {
    margin: 15% 20%;
    color: #8d8d8d;
    text-align: center;
    font-size: 12px;
}
.github-link {
  width: 30px;
  height: 30px;
  margin-top: 18px;
  margin-left: 20px;
  color: #fff;
  text-decoration: none;
}
.github-link svg {
    margin-left: 20px;
    margin-top: 100px;
    width: 150px;
    height: 150px;
}
</style>