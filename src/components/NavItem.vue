<template>
    <div class="flex gap-2" :class="{'text-red' : navItem.navName === 'home'}">
        <img :src="navItem.icon" alt="waas">
        <span class="hidden lg:flex items-center relative tracking-widest">
            {{ navItem.navName }}
            <div class="line"></div>
        </span>
    </div>
</template>

<script>
export default {
    props: ['navItem'],
}
</script>

<style>
    .line{
        transition: 0.3s ease;
        background: white;
        display: block;
        height: 2px;
        border: 2px;
        position: absolute;
        left: 0;
        bottom: -3px;
        width: 0;
    }

</style>