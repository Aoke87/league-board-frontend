<script setup lang="ts">
import GridLayout from './components/GridLayout.vue';
import { computed, ref } from "vue";
import { store } from "./store";
import { SummonerDto } from "./interfaces/summoner.dto";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from './components/AppFooter.vue';

const isAssetLoadingComplete = computed(() => { return store.getters.getIsAssetLoadingComplete });

const summoners = computed(() => {
    return store.getters.getSummoners;
})
</script>

<template>
    <AppHeader class="top"></AppHeader>
    <div style="min-height: 1000px;" v-if="!isAssetLoadingComplete">loading ...</div>
    <GridLayout v-else :summoners="summoners" />
    <AppFooter />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: #e2e1e0;
}
</style>
                                   