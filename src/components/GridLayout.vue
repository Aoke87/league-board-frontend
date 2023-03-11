<script setup lang="ts">

import { computed } from "vue";
import MatchList from "./Match/MatchList.vue";
import League from "./League/League.vue";
import { store } from "../store";
import LeagueGraph from "./League/LeagueGraph.vue";

const summoners = computed(() => store.getters.getSummoners);
</script>

<template>
    <div class="w-full xl:max-w-screen-2xl xl:mx-auto">
        <div class="flex flex-row flex-wrap pt-4 md:pt-2">
            <aside class="w-full sm:w-1/3 md:w-1/3 xl:w-1/3 px-2 mb-2 sm:mb-0">
                <div class="sticky top-0 w-full shadow-md">
                    <League></League>
                    <LeagueGraph v-if="summoners.length > 0" :summoners="summoners"></LeagueGraph>
                </div>
            </aside>
            <main
                class="w-full sm:w-2/3 md:w-2/3 xl:w-2/3 px-2 flex flex-col items-start"
                role="main"
            >
                <MatchList :summoners="summoners" />
            </main>
        </div>
    </div>
</template>

<!--display: flex;-->
<!--flex-direction: column;-->
<!--justify-content: flex-start;-->
<!--align-items: flex-start;-->

<style scoped>
</style>
