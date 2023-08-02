<template>
  <div class="main bg-cover bg-center bg-no-repeat bg-fix">
    <header v-if="user" class="navigation px-5 py-5 md:px-10 bg-transparent">
          <div class=" flex items-center gap-5 lg:justify-normal">
            <div class="logo me-0 sm:me-5 lg:me-10 ">
              <img class="object-cover" src="./assets/logo-d-plus-horizontal.webp" alt="">
            </div>
            <Nav />
            <div class="user ms-auto relative" 
            >
              <img v-if="user" :src="user.photoURL" alt="" class="showSignOut cursor-pointer">
              <span v-else>loading...</span>
              <transition name="user">
                <div class="signoutshow z-10 absolute right-0 pt-3">
                  <div class=" rounded  mt-0  px-3 py-3 border-gray-700 border-[1px] bg-[#121212]  flex-col gap-4 min-w-[10px]">
                      <li class=" nav-item font-semibold gap-2 flex items-center cursor-pointer" >
                          <div class="flex flex-col gap-2 py-0">
                            <span class="hover:bg-gray-700 user_email text-left px-2 py-2 rounded transition-all" v-if="user"> {{ user.email }} </span>
                            <button @click="signOut" class="hover:bg-gray-700 text-left px-2 py-2 rounded transition-all">Sign Out</button>
                          </div>
                      </li>
                  </div>
                </div>
              </transition>
            </div>
          </div>
    </header>
    <RouterView />    
  </div>


</template>

<script>
import Nav from './components/Navigation.vue';
import { RouterView, RouterLink } from 'vue-router';
import { useUserStore } from './stores/UserAuth';
import { useRouter } from 'vue-router'
export default {
  components: { Nav },
  data(){
    return{
      router: useRouter(),
      isHovering: false,
      userStore: useUserStore()
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
  methods: {
    signOut(){
      console.log('hello')
      this.userStore.signOutStore()
      .then(() => { this.router.push('/') })
    },
    mouse(){
      this.isHovering = false
    }
  },
  mounted() {
    this.mouse()
  }
    
}
</script>

<style>
  .main{
    font-family: 'Inter', sans-serif;
    /* height: 100vh; */
    /* background: #242424; */
    background-image: url('./assets/images/home-background.png');
    background-attachment: fixed;
    background-size: cover;
  }
.logo img{
height: auto;
width: 100px;
}
 header{
color: #fff;
}
 header.navigation .nav-list .nav-item img{
height: auto;
width: 25px !important;
}

header .user img{
height: auto;
width: 50px;
border-radius: 100px;
}
.user-enter-active,
.user-leave-active{
transition: 0.3s;
}

.user-enter-from,
.user-leave-to {
opacity: 0;
}

.signoutshow{
  display: none;
}
.user:hover .signoutshow{
  display: block;
}
</style>