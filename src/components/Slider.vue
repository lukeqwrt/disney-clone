<template>
  <section class="slider">
    <div v-if="trending.length">
      <swiper
        :loop="true"  
        :slidesPerView="'auto'"
        :centeredSlides="true"
        :spaceBetween="8"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :breakpoints="{
          640: {
            spaceBetween:15
          }
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="trend in filterSlider" :key="trend" class="relative">
            <img @click="handleSliderClick(trend)" :src="trend.backdrop" alt="asas"  class="object-cover object-let-top">
            <h3 class="title absolute text-white text-3xl font-bold pointer-events-none">
              <span v-if="trend.title">{{ trend.title }}</span>
              <span v-else>{{ trend.titlename }}</span>
            </h3>
        </swiper-slide>
      </swiper>
    </div>
    <div v-else> 
      <div class="flex justify-center items-center">
        <div class="spinner"></div>
      </div>
    </div>
  </section>


</template>

<script>
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// import router
import { useRouter } from 'vue-router'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/swiper.css';
export default {
    components: { Swiper, SwiperSlide},
    data(){
        return{
            router: useRouter(),
            modules:[Autoplay, Pagination, Navigation],
            trending: [],
            filterSlider: null
        }
    },
    methods: {
        getTrendingShow() {
            fetch('https://api.themoviedb.org/3/trending/all/day?api_key=26617760514df61b0f12c1c0143ce722')
            .then((res) => res.json())
            .then(data => {
                this.trending = data.results.map((trend) => ({
                id: trend.id,
                backdrop: `https://image.tmdb.org/t/p/original/${trend.backdrop_path}`,
                title: trend.title,
                overview: trend.overview,
                poster: `https://image.tmdb.org/t/p/original/${trend.poster_path}`,
                titlename:trend.name,
                poster: trend.poster_path,
                type: trend.media_type
              }))
              this.filterSlider = this.trending.filter((res) => {
                return res.type == 'movie'
              })
            })
        }, 
        handleSliderClick(data){
          this.router.push({ name: 'details', params: { name: data.title, id: data.id }})
        }
    },
    mounted() {
        this.getTrendingShow()
    }
}
</script>

<style scoped>
  .spinner {
    animation: rotate 1s linear infinite;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAgMjAwLDIwMCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJyaW5nIj48cGF0aCBkPSJNMjAwLDEwMEExMDAsMTAwLDAsMSwxLDE5Ny44MSw3OS4yMUwxODguMDMsODEuMjlBOTAsOTAsMCwxLDAsMTkwLDEwMHoiLz48L2NsaXBQYXRoPjxmaWx0ZXIgaWQ9ImJsdXIiIHg9IjAiIHk9IjAiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3RkRGV2aWF0aW9uPSIzIiAvPjwvZmlsdGVyPjxwYXRoIGlkPSJwIiBkPSJNMjUwLDEwMEExNTAsMTUwLDAsMCwxLDI0Ni43MiwxMzEuMTlMMTAwLDEwMEEwLDAsMCwwLDAsMTAwLDEwMHoiIGZpbGw9ImN5YW4iLz48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI3JpbmcpIj48ZyBmaWx0ZXI9InVybCgjYmx1cikiIHRyYW5zZm9ybT0icm90YXRlKC02IDEwMCAxMDApIj48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9IjAiIHRyYW5zZm9ybT0icm90YXRlKDAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjQgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4xIiB0cmFuc2Zvcm09InJvdGF0ZSgzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE0IiB0cmFuc2Zvcm09InJvdGF0ZSg0OCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE3IiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjIiIHRyYW5zZm9ybT0icm90YXRlKDcyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjQiIHRyYW5zZm9ybT0icm90YXRlKDg0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKDk2IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMzEiIHRyYW5zZm9ybT0icm90YXRlKDEwOCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjM0IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4zOCIgdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNDEiIHRyYW5zZm9ybT0icm90YXRlKDE0NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii40OCIgdHJhbnNmb3JtPSJyb3RhdGUoMTY4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNTIiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjU1IiB0cmFuc2Zvcm09InJvdGF0ZSgxOTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii41OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjA0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNjIiIHRyYW5zZm9ybT0icm90YXRlKDIxNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjY2IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjggMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii42OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjQwIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjUyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNzIiIHRyYW5zZm9ybT0icm90YXRlKDI2NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjc2IiB0cmFuc2Zvcm09InJvdGF0ZSgyNzYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii43OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjg4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuODMiIHRyYW5zZm9ybT0icm90YXRlKDMwMCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjg2IiB0cmFuc2Zvcm09InJvdGF0ZSgzMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii45MyIgdHJhbnNmb3JtPSJyb3RhdGUoMzI0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuOTciIHRyYW5zZm9ybT0icm90YXRlKDMzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoMzQ4IDEwMCAxMDApIi8+PC9nPjwvZz48L3N2Zz4=') no-repeat;
    height: 50px;
    width: 50px;
  }
  .spinner {
    animation: rotate 1s linear infinite;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAgMjAwLDIwMCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJyaW5nIj48cGF0aCBkPSJNMjAwLDEwMEExMDAsMTAwLDAsMSwxLDE5Ny44MSw3OS4yMUwxODguMDMsODEuMjlBOTAsOTAsMCwxLDAsMTkwLDEwMHoiLz48L2NsaXBQYXRoPjxmaWx0ZXIgaWQ9ImJsdXIiIHg9IjAiIHk9IjAiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3RkRGV2aWF0aW9uPSIzIiAvPjwvZmlsdGVyPjxwYXRoIGlkPSJwIiBkPSJNMjUwLDEwMEExNTAsMTUwLDAsMCwxLDI0Ni43MiwxMzEuMTlMMTAwLDEwMEEwLDAsMCwwLDAsMTAwLDEwMHoiIGZpbGw9ImN5YW4iLz48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI3JpbmcpIj48ZyBmaWx0ZXI9InVybCgjYmx1cikiIHRyYW5zZm9ybT0icm90YXRlKC02IDEwMCAxMDApIj48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9IjAiIHRyYW5zZm9ybT0icm90YXRlKDAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjQgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4xIiB0cmFuc2Zvcm09InJvdGF0ZSgzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE0IiB0cmFuc2Zvcm09InJvdGF0ZSg0OCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE3IiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjIiIHRyYW5zZm9ybT0icm90YXRlKDcyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjQiIHRyYW5zZm9ybT0icm90YXRlKDg0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKDk2IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMzEiIHRyYW5zZm9ybT0icm90YXRlKDEwOCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjM0IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4zOCIgdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNDEiIHRyYW5zZm9ybT0icm90YXRlKDE0NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii40OCIgdHJhbnNmb3JtPSJyb3RhdGUoMTY4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNTIiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjU1IiB0cmFuc2Zvcm09InJvdGF0ZSgxOTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii41OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjA0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNjIiIHRyYW5zZm9ybT0icm90YXRlKDIxNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjY2IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjggMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii42OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjQwIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjUyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNzIiIHRyYW5zZm9ybT0icm90YXRlKDI2NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjc2IiB0cmFuc2Zvcm09InJvdGF0ZSgyNzYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii43OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjg4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuODMiIHRyYW5zZm9ybT0icm90YXRlKDMwMCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjg2IiB0cmFuc2Zvcm09InJvdGF0ZSgzMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii45MyIgdHJhbnNmb3JtPSJyb3RhdGUoMzI0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuOTciIHRyYW5zZm9ybT0icm90YXRlKDMzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoMzQ4IDEwMCAxMDApIi8+PC9nPjwvZz48L3N2Zz4=') no-repeat;
    height: 50px;
    width: 50px;
  }
  @keyframes rotate {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
</style>