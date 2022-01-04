<script setup lang="ts">

import MatchList from './Match/MatchList.vue'
import { SummonerDto } from "../interfaces/summoner.dto";
import League from "./League/League.vue";

defineProps<{
    summoners: SummonerDto[]
}>()



</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-row flex-wrap py-4">
            <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
                <div class="sticky top-0 p-4 w-full">
                    <League v-if="summoners.length > 0" :summoners="summoners"></League>
                </div>
            </aside>
            <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2 flex flex-col items-start">
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
