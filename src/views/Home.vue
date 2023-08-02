<template>
  <main v-if="user">

    <Slider />

    <ProductionHouse />

    <GenreMovies />
    
  </main>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/UserAuth';

// components
import Nav from '../components/Navigation.vue';
import Slider from '../components/Slider.vue';
import ProductionHouse from '../components/ProductionHouse.vue';
import GenreMovies from '../components/GenreMovies.vue'

export default {
  components: { Nav, Slider, ProductionHouse, GenreMovies},
  data() {
    return{
      userStore: useUserStore(),
      isHovering: false,
      router: useRouter(),
      trending: []
    }
  },
  computed: {
    user() {
      if(this.userStore.user){
        return this.userStore.user
      }else{
        return null
      }
    },
  },
  methods:{

  },

}
</script>

<style >

  .swiper-button-prev{
    transition: 0.3s ease;
    left: 23px !important;
  }
  .swiper-button-next{
    right: 23px !important;
    transition: 0.3s ease;
  }
  :root {
    --swiper-theme-color: rgba(223, 223, 223, 0.3);
    --swiper-navigation-size: 40px;
}
.swiper-button-prev:hover,
.swiper-button-next:hover{
  --swiper-theme-color: #ffffff !important;
}

@media screen and (max-width: 768px) {
  :root {
    --swiper-theme-color: rgba(223, 223, 223, 0.3);
    --swiper-navigation-size: 0px;
  }
}

</style>