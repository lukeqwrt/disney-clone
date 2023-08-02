<template>
  <div class="production-container pt-10 pb-7">
    <div class="prod-box" v-for="prod in production" :key="prod">
        <img :src="prod.prodImg" alt="">
        <video :src="prod.video" autoplay="true" loop="true" playsinline="true" type="video/mp4" muted="true">
        </video>
    </div>
  </div>
</template>

<script>
import disney from '../assets/images/viewers-disney.png'
import pixar from '../assets/images/viewers-pixar.png'
import marvel from '../assets/images/viewers-marvel.png'
import starwars from '../assets/images/viewers-starwars.png'
import national from '../assets/images/viewers-national.png'

import vidDisney from '../assets/videos/1564674844-disney.mp4'
import vidpixar from '../assets/videos/1564676714-pixar.mp4'
import vidmarvel from '../assets/videos/1564676115-marvel.mp4'
import vidstarwars from '../assets/videos/1608229455-star-wars.mp4'
import vidnational from '../assets/videos/1564676296-national-geographic.mp4'
export default {
    data() {
        return {
            production:[
                { prodImg: disney, video: vidDisney },
                { prodImg: pixar, video: vidpixar },
                { prodImg: marvel, video: vidmarvel },
                { prodImg: starwars, video: vidstarwars},
                { prodImg: national, video: vidnational},
            ]
        }
    }
}
</script>

<style scoped>
    .production-container{
        display: flex;
        gap: 20px;
        /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
        width: 90%;
        margin: 0 auto;
        
    }
    .production-container .prod-box{
        width: 100%;
        height: 100%;
        position: relative;
        /* background: #22202A; */
        border: 3px solid rgba(249, 249,249, 0.1);
        border-radius: 10px;
        cursor: pointer;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        overflow: hidden;
        transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    }
    .production-container .prod-box:hover{
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border: 3px solid rgba(249, 249,249, 0.8);
    }
    .production-container .prod-box img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .production-container .prod-box video{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
    }
    @media screen and (max-width: 990px) {
        .production-container{
            display: flex;
            gap: 15px;
            /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
            width: 90%;
            margin: 0 auto;
        
        }
    }
    @media screen and (max-width: 639px) {
        .production-container{
            display: flex;
            gap: 15px;
            /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
            width: 90%;
            margin: 0 auto;
            
        }
    }
    @media screen and (max-width: 576px) {
        .production-container{
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
     
    }
</style>