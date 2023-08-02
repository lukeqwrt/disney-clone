<template>
  <div v-if="imagesFilter">
    <div class="movies flex">
          <swiper
              :spaceBetween="1"
              :grabCursor="true"
              :slidesPerView="genreid == 35 || genreid == 16 ? 2 : 2"
              :slidesPerGroup="genreid == 35 || genreid == 16 ? 2 : 2"
              :grid="{
                rows: genreid == 35 || genreid == 16 ? 1 : 2
              }"
              :loop="false"
              :navigation="true"
                :breakpoints="{
                  575: {
                    spaceBetween:1,
                    slidesPerView:genreid == 35 || genreid == 16 ? 3 : 3,
                    slidesPerGroup:genreid == 35 || genreid == 16 ? 3 : 3,
                    grid: {
                      rows:genreid == 35 || genreid == 16 ? 1 : 2
                    }
                  },
                  818:{
                    spaceBetween:10,
                    slidesPerView:3,
                    slidesPerGroup:3,
                    grid: {
                      rows:genreid == 35 || genreid == 16 ? 1 : 2
                    }
                  },
                  990: {
                    spaceBetween:15,
                    slidesPerView:4,
                    slidesPerGroup:4,
                    grid: {
                      rows:1
                    }
                  },
                  1200: {
                    spaceBetween:19,
                    slidesPerView:4,
                    slidesPerGroup:4,
                    grid: {
                      rows:1
                    }
                  }
                }"
              :modules="modules"
              class="mySwiper"
              :class="genreid == 35 || genreid == 16 ? 'full' : 'setheight'"
            > 
              <swiper-slide v-for="genreImage in images" :key="genreImage" >
                    <img @click="handleShowsClick(genreImage)" :class="genreid !== 35 && genreid !== 16 ? 'shadow':''" :src="genreid == 35 || genreid == 16 ? genreImage.imgPoster : genreImage.imgSrc " alt="wala">
                    <span v-if="genreid !== 35 && genreid !== 16" class="title text-white absolute pointer-events-none text-left">{{ genreImage.title }}</span>
               
              </swiper-slide>
                  
            </swiper>
      </div>
  </div>
    <div v-else>
      <div class="loading h-[200px] w-full flex justify-center items-center">
        <div class="spinner"></div>
      </div>
    </div>
</template>

<script>
  // import router
  import { useRouter } from 'vue-router'

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Grid, Navigation } from 'swiper/modules';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/grid';
  import 'swiper/css/navigation';
export default {
    components:{ Swiper, SwiperSlide},
    props:['genreid'],
    data(){
        return{
            router: useRouter(),
            images: null,
            imagesFilter:null,
            modules: [Grid, Navigation],
            isComedy: false
        }
    },
    methods: {
      getByGenre() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=26617760514df61b0f12c1c0143ce722&with_genres=${this.genreid}`)
        .then((res) => res.json())
        .then(data => {
          this.imagesFilter = data.results.filter((api) => {
            api.backdrop_path !== null
            return api.backdrop_path
          })
          this.images = this.imagesFilter.map((api) => ({
            id: api.id,
            imgSrc: `https://image.tmdb.org/t/p/original/${api.backdrop_path}`,
            imgPoster: `https://image.tmdb.org/t/p/w500/${api.poster_path}`,
            title: api.title,
            overview: api.overview,
            titlename:api.name,
            poster: api.poster_path
          }))
        })
      },
      handleShowsClick(show){
        this.router.push({ name:'details', params: { name: show.title, id: show.id }})
      }
    },
    computed:{
     
    },
    mounted() {
      this.getByGenre()
    }

}
</script>

<style scoped>
.movies{

  position: relative;
}
  .swiper {
    width: 100%;
    height: 100%;
    padding: 0 80px;
    transform: translate(0,0);
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
  
    border-radius: 0.590rem;
   /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc((100% - 30px) / 2) !important;
    padding-top:20px;
    padding-bottom: 57px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-slide img:hover{
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 30px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    
    transform: scale(1.05);
    /* border: 2px solid rgba(249, 249,249, 0.8); */
  }
  .swiper-slide  .title{
    opacity: 0;
    visibility: hidden;
    bottom: 70px;
    transform: translate(-20px,0);
    left: 10px;
    transition: 0.4s ease-in-out;
  }
  .swiper-slide img:hover + .title{
    transform: translate(0px,0);
    opacity: 1;
    visibility: visible;
  }
  .swiper-slide img.shadow:hover {
    /* filter: brightness(50%); */

  }
  @keyframes rotate {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }

  .spinner {
    animation: rotate 1s linear infinite;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAgMjAwLDIwMCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJyaW5nIj48cGF0aCBkPSJNMjAwLDEwMEExMDAsMTAwLDAsMSwxLDE5Ny44MSw3OS4yMUwxODguMDMsODEuMjlBOTAsOTAsMCwxLDAsMTkwLDEwMHoiLz48L2NsaXBQYXRoPjxmaWx0ZXIgaWQ9ImJsdXIiIHg9IjAiIHk9IjAiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3RkRGV2aWF0aW9uPSIzIiAvPjwvZmlsdGVyPjxwYXRoIGlkPSJwIiBkPSJNMjUwLDEwMEExNTAsMTUwLDAsMCwxLDI0Ni43MiwxMzEuMTlMMTAwLDEwMEEwLDAsMCwwLDAsMTAwLDEwMHoiIGZpbGw9ImN5YW4iLz48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI3JpbmcpIj48ZyBmaWx0ZXI9InVybCgjYmx1cikiIHRyYW5zZm9ybT0icm90YXRlKC02IDEwMCAxMDApIj48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9IjAiIHRyYW5zZm9ybT0icm90YXRlKDAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjQgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4xIiB0cmFuc2Zvcm09InJvdGF0ZSgzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE0IiB0cmFuc2Zvcm09InJvdGF0ZSg0OCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE3IiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjIiIHRyYW5zZm9ybT0icm90YXRlKDcyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjQiIHRyYW5zZm9ybT0icm90YXRlKDg0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKDk2IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMzEiIHRyYW5zZm9ybT0icm90YXRlKDEwOCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjM0IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4zOCIgdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNDEiIHRyYW5zZm9ybT0icm90YXRlKDE0NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii40OCIgdHJhbnNmb3JtPSJyb3RhdGUoMTY4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNTIiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjU1IiB0cmFuc2Zvcm09InJvdGF0ZSgxOTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii41OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjA0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNjIiIHRyYW5zZm9ybT0icm90YXRlKDIxNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjY2IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjggMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii42OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjQwIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjUyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNzIiIHRyYW5zZm9ybT0icm90YXRlKDI2NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjc2IiB0cmFuc2Zvcm09InJvdGF0ZSgyNzYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii43OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjg4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuODMiIHRyYW5zZm9ybT0icm90YXRlKDMwMCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjg2IiB0cmFuc2Zvcm09InJvdGF0ZSgzMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii45MyIgdHJhbnNmb3JtPSJyb3RhdGUoMzI0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuOTciIHRyYW5zZm9ybT0icm90YXRlKDMzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoMzQ4IDEwMCAxMDApIi8+PC9nPjwvZz48L3N2Zz4=') no-repeat;
    height: 50px;
    width: 50px;
  }

  @media screen and (max-width: 1200px) {
   .swiper {
    padding: 0 50px;
   }
   .swiper-slide  .title{
    font-size: 15px;
   }
   .swiper-slide .title{
    left: 10px;
   }
   .swiper-slide img:hover + .title{
      left: 10px;
      opacity: 1;
      visibility: visible;
    }
  }
  @media screen and (max-width: 989px) {
   .swiper {
      padding: 0 40px;
   }
   .swiper-slide {
      padding-bottom: 50px;
    }
    .swiper {
      padding: 0 15px;
      height: 370px;
    }
    .swiper-slide {
      padding:10px 2px !important;
    }
    .swiper.full {
      height:100%;
      padding-bottom: 20px;
    }
    .swiper-slide  .title{
      opacity: 0;
      
      visibility: hidden;
      bottom: 20px;
      transition: 0.4s ease-in-out;
    }
  }
  @media screen and (max-width: 768px) {
    .swiper {
      padding: 0 20px;
    }
    .swiper {
      padding: 0 15px;
      height: 300px;
    }
    .sample-slider .swiper-slide{
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc((100% - 30px)/2)!important;
    }
    .swiper-slide img{
      display: block;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }
  /* 639 */
  @media screen and (max-width: 575px) {
    .swiper {
      padding: 0 15px;
      height: 350px;
    }
    .swiper-slide {
      padding:5px 2px !important;
    }
    .swiper-slide img{
      height: 100%;
      width: 100%;
    }
    .movies{
      margin-top: 15px;
    }
  }
  @media screen and (max-width: 490px) {
    .swiper {
      padding: 0 15px;
      height: 300px;
    }

  }
</style>