<template>
    <div class="movielist-container pt-5 ">
        <div class="list" v-for="list in lists" :key="list.id">
            <h3 class="font-bold text-2xl text-white">{{ list.name }}</h3>
            <MoviesComponent :genreid="list.id" />
           
        </div>
    </div>
</template>

<script>
import genre from '../genrelist/genre'
import MoviesComponent from './MoviesComponent.vue'
export default {
    components: { MoviesComponent },
    data() {
        return{
            lists: genre
        }
    }
}
</script>

<style>
    .movielist-container{
        /* padding:0 40px; */
        margin: 0 auto;
    }
    .movielist-container h3{
        width: 90%;
        margin: 0 auto;
    }
</style>