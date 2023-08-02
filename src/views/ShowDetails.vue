<template>
  <div class="backdrop">
    <div v-if="movieDetails" >
      <img class="bg" :src="movieDetails.background" alt="">
    <div class="content-container">
      <div class="content">
          <img v-if="movieDetails" :src="movieDetails.poster" alt="">
 
        <div v-else>
           <div class="spinner"></div>
       </div>

        <div class="text">
          <div class="buttons">
            <button class="play">Play</button>
            <button class="trailer">
              <i class="fa-solid fa-play"></i>
              Trailer
            </button>
          </div>
          <h3>{{ movieDetails.title }}</h3>
          <span class="flex gap-3">{{ movieDetails.release }} • 
            <div class="genres flex gap-3" v-for="genre in movieDetails.genres" :key="genre">
              {{ genre.name }}

            </div>
          </span>
          <p>{{ movieDetails.overview }}</p>
        </div>
      </div>
    </div>
    </div>
   <div v-else>
      <div class="spinner"></div>
   </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/UserAuth'

export default {
    props: ['name', 'id'],
    data() {
      return {
        userStore: useUserStore(),
        movieDetails: null
      }
    },
    methods: {
      getSingleShow(){
        fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=26617760514df61b0f12c1c0143ce722`)
        .then((data) => data.json())
        .then((res) => this.movieDetails = ({
          background: `https://image.tmdb.org/t/p/original/${res.backdrop_path}` ,
          original_title: res.original_title,
          title: res.title,
          overview: res.overview,
          poster: `https://image.tmdb.org/t/p/original/${res.poster_path}`,  
          release:res.release_date,
          genres: res.genres
        }))
      }
    },
    mounted() {
      this.getSingleShow()
    }
}
</script>

<style scoped>
.backdrop{
  position: relative;
  height: 90.09vh;
  overflow-y: hidden;

}
.backdrop .bg{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;

}
.backdrop .content-container{
  position: absolute;
  top: 0;
  left:0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
}
.backdrop .content-container .content{
  display: flex;
  gap: 50px;
  margin-left: 100px;
  width: 100%;
  max-width: 1000px;
  color: #fff;
}
.backdrop .content-container .content .text{
  align-self: flex-end;
}
.backdrop .content-container .content h3{
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 10px;
  font-family: 'Inter', sans-serif;
}
.backdrop .content-container .content img{
  height: auto;
  width: 300px;
}
.backdrop .content-container .content .text span{
  margin-bottom: 20px;
}
.buttons{
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.buttons button{
  height: 50px;
  width: 140px;
  outline: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 20px;
  transition: 0.3s ease;
  cursor: pointer;
}
.buttons button.trailer{
  background: rgba(0,0,0,0.5);
  border: 2px solid #fff;
  color: #fff;

}
.buttons button.trailer i{
  margin-right: 10px;
}
.buttons button.trailer:hover{
  transform: scale(1.05);
}
.buttons button.play{
  background: #fff;
  color: #000;
}
.buttons button.play:hover{
  background: rgba(0,0,0,0.5);
  color: #fff;
}
@keyframes rotate {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    animation: rotate 1s linear infinite;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAgMjAwLDIwMCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJyaW5nIj48cGF0aCBkPSJNMjAwLDEwMEExMDAsMTAwLDAsMSwxLDE5Ny44MSw3OS4yMUwxODguMDMsODEuMjlBOTAsOTAsMCwxLDAsMTkwLDEwMHoiLz48L2NsaXBQYXRoPjxmaWx0ZXIgaWQ9ImJsdXIiIHg9IjAiIHk9IjAiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3RkRGV2aWF0aW9uPSIzIiAvPjwvZmlsdGVyPjxwYXRoIGlkPSJwIiBkPSJNMjUwLDEwMEExNTAsMTUwLDAsMCwxLDI0Ni43MiwxMzEuMTlMMTAwLDEwMEEwLDAsMCwwLDAsMTAwLDEwMHoiIGZpbGw9ImN5YW4iLz48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI3JpbmcpIj48ZyBmaWx0ZXI9InVybCgjYmx1cikiIHRyYW5zZm9ybT0icm90YXRlKC02IDEwMCAxMDApIj48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9IjAiIHRyYW5zZm9ybT0icm90YXRlKDAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wMyIgdHJhbnNmb3JtPSJyb3RhdGUoMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4wNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjQgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4xIiB0cmFuc2Zvcm09InJvdGF0ZSgzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE0IiB0cmFuc2Zvcm09InJvdGF0ZSg0OCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjE3IiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjIiIHRyYW5zZm9ybT0icm90YXRlKDcyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjQiIHRyYW5zZm9ybT0icm90YXRlKDg0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKDk2IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuMzEiIHRyYW5zZm9ybT0icm90YXRlKDEwOCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjM0IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii4zOCIgdHJhbnNmb3JtPSJyb3RhdGUoMTMyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNDEiIHRyYW5zZm9ybT0icm90YXRlKDE0NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii40OCIgdHJhbnNmb3JtPSJyb3RhdGUoMTY4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNTIiIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjU1IiB0cmFuc2Zvcm09InJvdGF0ZSgxOTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii41OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjA0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNjIiIHRyYW5zZm9ybT0icm90YXRlKDIxNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjY2IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjggMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii42OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjQwIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNyIgdHJhbnNmb3JtPSJyb3RhdGUoMjUyIDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuNzIiIHRyYW5zZm9ybT0icm90YXRlKDI2NCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjc2IiB0cmFuc2Zvcm09InJvdGF0ZSgyNzYgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii43OSIgdHJhbnNmb3JtPSJyb3RhdGUoMjg4IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuODMiIHRyYW5zZm9ybT0icm90YXRlKDMwMCAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iLjg2IiB0cmFuc2Zvcm09InJvdGF0ZSgzMTIgMTAwIDEwMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNwIiBmaWxsLW9wYWNpdHk9Ii45MyIgdHJhbnNmb3JtPSJyb3RhdGUoMzI0IDEwMCAxMDApIi8+PHVzZSB4bGluazpocmVmPSIjcCIgZmlsbC1vcGFjaXR5PSIuOTciIHRyYW5zZm9ybT0icm90YXRlKDMzNiAxMDAgMTAwKSIvPjx1c2UgeGxpbms6aHJlZj0iI3AiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoMzQ4IDEwMCAxMDApIi8+PC9nPjwvZz48L3N2Zz4=') no-repeat;
    height: 50px;
    width: 50px;
  }
  @media screen and (max-width: 1200px) {
    .backdrop .content-container .content{
      margin-left: 0px;
      padding: 0 50px;
    }
  }
  @media screen and (max-width: 990px) {
    .backdrop .content-container .content{
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 250px 1fr;
      gap: 20px;
    }
  }
  @media screen and (max-width: 768px) {
    .backdrop .content-container .content img{
      height: auto;
      width: 180px;
      margin-bottom: 20px ;
    }
    .backdrop .content-container .content{
      display: grid;
      grid-auto-flow: rows;
      grid-template-rows: auto 1fr;
      grid-template-columns:  1fr;
      gap: 20px;
    }
  }
  @media screen and (max-width: 576px) {
    .backdrop .content-container .content{
      margin-left: 0px;
      padding: 0 20px;
    }
    .backdrop .content-container .content h3{
      font-weight: 700;
      font-size: 30px;
      margin-bottom: 10px;
      font-family: 'Inter', sans-serif;
    }
  }
</style>