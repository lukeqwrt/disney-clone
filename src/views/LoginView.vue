<template v-if="!userStore.user">
  <div >
    <main class="bg-cover bg-no-repeat" >
    <div class="gradient flex justify-center items-center">
      <header class="px-4 py-6 absolute top-0 left-0 w-full">
        <button @click="loginClick" class="login-button rounded-lg py-2 font-[700] px-8 flex justify-center items-center text-white outline-none">Log in</button>
      </header>
  
      <div class="content_signup flex flex-col justify-center items-center">
        <img src="../assets/logo-d-plus-horizontal.webp" alt="logo">
        <h3 class="text-white text-3xl font-[600] pt-5 text-center">Home of your favorite stories</h3>
        <div class="action w-full px-5">
          <button class="login-button mt-7 rounded-lg flex justify-center items-center py-3 w-full text-white gap-3 font-[600] text-lg outline-none hover:scale-110 transition-all">
            Subscribe Now
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
  </div>

  
</template>

<script>

import { useUserStore } from '../stores/UserAuth'
import { useRouter } from 'vue-router';
// API KEY = 26617760514df61b0f12c1c0143ce722
// https://api.themoviedb.org/3/trending/all/day?api_key=26617760514df61b0f12c1c0143ce722


export default {
  data() {
    return {
      router: useRouter(),
      userStore: useUserStore()
    }
  },
  methods:{
    loginClick(){
      this.userStore.handleAuth()
      .then(() => { 
        this.router.push('/home')
    })
    }
  },
  computed:{
    user() {
      if(this.userStore.user){
        return this.userStore.user
      }else{
        return null
      }
    },
  }
}
</script>

<style scoped>
  main{
    height: 100vh;
    background-image: url('../assets/19-07-2023-ph-background-desktop.webp');
      /* linear-gradient(0deg,#101218 27.6%,rgba(16,18,24,0)); */
  /* linear-gradient(180deg,#081734,#0d1628 73px,#0e1420 168px,#0f1014 256px,#0f1014); */
    position: relative;
  }
  .gradient{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg,#101218 27.6%,rgba(16,18,24,0)); 
    
  }
  button{
    font-family: 'Inter', sans-serif;
    background: linear-gradient(93.87deg,#095ae6,#062794);
    
  }
  .login-button{
    transition: 0.3s ease-in-out;
  }
  .login-button:hover{
    transform: scale(1.05);
  }
</style>