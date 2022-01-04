<script setup lang="ts">
import GridLayout from './components/GridLayout.vue';
import { computed, ref } from "vue";
import { MatchDto } from "./interfaces/matchV5.dto";
import { store } from "./store";
import { SummonerDto } from "./interfaces/summoner.dto";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from './components/AppFooter.vue';

const matches = ref<MatchDto[]>([]);
const summoners = ref<SummonerDto[]>([]);

const isAssetLoadingComplete = computed(() => { return store.getters.getIsAssetLoadingComplete });

(async function fetchAllSummoners() {
    const response = await fetch('http://localhost:3000/summoner/all');
    summoners.value = await response.json();
})();
</script>

<template>
    <AppHeader class="top"></AppHeader>
    <div v-if="!isAssetLoadingComplete">loading ...</div>
    <GridLayout v-if="isAssetLoadingComplete" :summoners="summoners" />
    <AppFooter />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
}
</style>
