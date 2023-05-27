<template>
    <div class="outer">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="image-inner">
                        <img src="../../assets/img/swiper/swiper1.jpg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper1-2.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="image-inner">
                        <img src="../../assets/img/swiper/swiper2.jpg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper2-2.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="image-inner">
                        <img src="../../assets/img/swiper/swiper3.jpg" alt="">
                    </div>
                    <div class="image-outer">
                        <img src="../../assets/img/swiper/swiper3-2.jpg" alt="">
                    </div>
                </div>
            </div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev prev"></div>
            <div class="swiper-button-next next"></div>
        </div>
        <!-- 下载客户端区域 -->
        <div class="download-app">
            <img  style="margin-left:25%;margin-top:40%; width: 50%;" src="../../assets/hypermusic_github.jpg" alt="">
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
    }
}         
</script>
<style>
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
.download-app {
    position: absolute;
    top: 0px;
    right: 13%;
    width: 15%;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.86);
    z-index: 20;

}
 
.download-app .welcome {
    margin: 15% 20%;
    color: #8d8d8d;
    text-align: center;
    font-size: 12px;
}
</style>