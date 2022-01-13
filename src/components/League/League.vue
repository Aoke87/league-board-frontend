<script setup lang="ts">

import { ref } from "vue";
import { SummonerDto, SummonerLeagueDto } from "../../interfaces/summoner.dto";
import LeagueTable from "./Table.vue";

const props = defineProps<{
    summoners: SummonerDto[],
}>()

const activeSeason = ref(2022);

const soloQueue: SummonerLeagueDto[] = [];
const soloQueue2021: SummonerLeagueDto[] = [];
const flexQueue: SummonerLeagueDto[] = [];
const flexQueue2021: SummonerLeagueDto[] = [];
const rankProjection: { [key: string]: number } = {
    'I': 1,
    'II': 2,
    'III': 3,
    'IV': 4
};
const tierProjection: { [key: string]: number } = {
    'CHALLENGER': 1,
    'GRANDMASTER': 2,
    'MASTER': 3,
    'DIAMOND': 4,
    'PLATINUM': 5,
    'GOLD': 6,
    'SILVER': 7,
    'BRONZE': 8,
    'IRON': 9,
};

props.summoners.forEach(summoner => {
    summoner.leagues.forEach(league => {
        if (league.queueType === 'RANKED_SOLO_5x5') {
            soloQueue.push(league)
        }
        if (league.queueType === 'RANKED_FLEX_SR') {
            flexQueue.push(league)
        }
    })
    summoner.leagues2021.forEach(league => {
        if (league.queueType === 'RANKED_SOLO_5x5') {
            soloQueue2021.push(league)
        }
        if (league.queueType === 'RANKED_FLEX_SR') {
            flexQueue2021.push(league)
        }
    })
    soloQueue.sort(compareRanks)
    flexQueue.sort(compareRanks)
    soloQueue2021.sort(compareRanks)
    flexQueue2021.sort(compareRanks)
});

function getLeagueEmblem(leagueId: string) {
    return `image/ranked/Emblem_${leagueId.charAt(0) + leagueId.slice(1).toLowerCase()}.png`
}

function compareRanks(a: SummonerLeagueDto, b: SummonerLeagueDto): number {
    if (a.tier === b.tier && a.rank == b.rank) {
        return a.leaguePoints < b.leaguePoints ? 1 : -1;
    }
    if (a.tier === b.tier) {
        return rankProjection[a.rank] > rankProjection[b.rank] ? 1 : -1;
    }
    return tierProjection[a.tier] > tierProjection[b.tier] ? 1 : -1;
}

</script>

<template>
    <nav class="flex sm:flex-row mb-3">
        <button
            @click="activeSeason = 2022"
            class="text-gray-600 py-4 px-0 sm:px-6 block hover:text-blue-500 focus:outline-none"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': activeSeason === 2022 }"
        >Current Season</button>
        <button
            @click="activeSeason = 2021"
            class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': activeSeason === 2021 }"
        >2021</button>
    </nav>
    <template v-if="activeSeason === 2021">
        <LeagueTable :headline="'Solo Queue'" :games="soloQueue2021"></LeagueTable>
        <LeagueTable :headline="'Flex Queue'" :games="flexQueue2021"></LeagueTable>
    </template>
    <template v-if="activeSeason === 2022">
        <LeagueTable :headline="'Solo Queue'" :games="soloQueue"></LeagueTable>
        <LeagueTable :headline="'Flex Queue'" :games="flexQueue"></LeagueTable>
    </template>
</template>
