<template>
    <ul class="nav-list flex gap-6 sm:gap-10 md:gap-10 lg:gap-9 lg:me-5 ">
        <li class="nav-item font-semibold gap-2 flex items-center justify-center cursor-pointer " v-for="navItem in nav_list" :key="navItem">
            <routerLink :to="{ name: navItem.routerName }">
                <NavItem :navItem="navItem" />
            </routerLink>
           
        </li>
        <li class="hidden sm:flex nav-item font-semibold gap-2 items-center justify-center cursor-pointer " v-for="navItem in nav_collapse" :key="navItem">
            <NavItem :navItem="navItem" />
        </li>

        <div class="cursor-pointer relative sm:hidden"
        @mouseenter="isActive = true"
            @mouseleave="isActive = false">
            <img src="../assets/images/icons8-three-dots-30.png" alt=""
            >

            <Transition name="hiddenLinks">
                <div class="absolute rounded right-0 pt-9 " style="width: 160px; z-index: 99;"
                v-if="isActive">
                    <div class="list border-gray-700 border-[1px] py-3 p-3 bg-[#121212] flex flex-col gap-4 z-10">
                        <li class="mb-1 nav-item font-semibold gap-2 flex items-center cursor-pointer" v-for="navItem in nav_list" :key="navItem">
                            <div class="flex gap-2 ">
                                <img :src="navItem.icon" alt="waas">
                                <span class="flex gap-2 relative">
                                    {{ navItem.navName }}
                                    <div class="line"></div>
                                </span>
                            </div>
                        </li>
                    </div>
                   
                </div>
            </Transition>
        </div>
   
    </ul>
</template>

<script>
import NavItem from './NavItem.vue'
import homeicon from '../assets/images/home-icon.svg'
import searchicon from '../assets/images/search-icon.svg'
import watchicon from '../assets/images/watchlist-icon.svg'
import originalsicon from '../assets/images/original-icon.svg'
import moviesicon from '../assets/images/movie-icon.svg'
import seriesicon from '../assets/images/series-icon.svg'

export default {
    components: { NavItem },
    data() {
        return {
            nav_list: [
                { navName: 'HOME', icon: homeicon, routerName: 'movies'},
                { navName: 'SEARCH', icon: searchicon},
                { navName: 'WATCHLIST', icon: watchicon},
            ],
            nav_collapse: [
                { navName: 'ORIGINALS', icon: originalsicon},
                { navName: 'MOVIES', icon: moviesicon},
                { navName: 'SERIES', icon: seriesicon},
            ],
            isActive: false
        }
    },
    methods:{
        toggleDots(){
            this.isActive = !this.isActive
        }
    }
}
</script>

<style>
    .hiddenLinks-enter-active,
    .hiddenLinks-leave-active{
        transition: all 0.2s cubic-bezier(0.52,0.02,0.19,1.02) 0.15s;
    }

    .hiddenLinks-enter-from,
    .hiddenLinks-leave-to {
        opacity: 0;
    }
    .nav-item:hover .line {
        width: 100%;
    }
</style>