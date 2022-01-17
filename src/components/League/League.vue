<script setup lang="ts">

import { ref } from "vue";
import { SummonerDto, SummonerLeagueDto } from "../../interfaces/summoner.dto";
import { NavigationData } from "../Match/MatchList.vue";
import LeagueTable from "./Table.vue";
import SubNavigation from "../SubNavigation.vue";


const enum SEASONDATA {
    CURRENT_ID = 'Current Season',
    LAST_ID = '2021',
}
const props = defineProps<{
    summoners: SummonerDto[],
}>()

const activeSeason = ref(SEASONDATA.CURRENT_ID);

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

const navData: NavigationData[] = [
    { title: SEASONDATA.CURRENT_ID, disabled: false },
    { title: SEASONDATA.LAST_ID, disabled: false },
]

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

function compareRanks(a: SummonerLeagueDto, b: SummonerLeagueDto): number {
    if (a.tier === b.tier && a.rank == b.rank) {
        return a.leaguePoints < b.leaguePoints ? 1 : -1;
    }
    if (a.tier === b.tier) {
        return rankProjection[a.rank] > rankProjection[b.rank] ? 1 : -1;
    }
    return tierProjection[a.tier] > tierProjection[b.tier] ? 1 : -1;
}

function activate(value: SEASONDATA) {
    activeSeason.value = value;
}

</script>

<template>
    <div class="bg-white p-2">
        <SubNavigation :nav-data="navData" @active="activate"></SubNavigation>
        <template v-if="activeSeason === SEASONDATA.LAST_ID">
            <LeagueTable :headline="'Solo Queue'" :games="soloQueue2021"></LeagueTable>
            <LeagueTable :headline="'Flex Queue'" :games="flexQueue2021"></LeagueTable>
        </template>
        <template v-if="activeSeason === SEASONDATA.CURRENT_ID">
            <LeagueTable :headline="'Solo Queue'" :games="soloQueue"></LeagueTable>
            <LeagueTable :headline="'Flex Queue'" :games="flexQueue"></LeagueTable>
        </template>
    </div>
</template>
