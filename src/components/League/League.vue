<script setup lang="ts">

import {
    computed, Ref, ref, watch,
} from "vue";
import { SummonerLeagueDto } from "../../interfaces/summoner.dto";
import { NavigationData } from "../Match/MatchList.vue";
import LeagueTable from "./Table.vue";
import { store } from "../../store";

const enum SEASONDATA {
    CURRENT_ID = "Current Season",
}
const summoners = computed(() => store.getters.getSummoners);
const activeSeason = ref(SEASONDATA.CURRENT_ID);

const soloQueue: Ref<SummonerLeagueDto[]> = ref([]);
const soloQueue2021: Ref<SummonerLeagueDto[]> = ref([]);
const flexQueue: Ref<SummonerLeagueDto[]> = ref([]);
const flexQueue2021: Ref<SummonerLeagueDto[]> = ref([]);
const rankProjection: { [key: string]: number } = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
};
const tierProjection: { [key: string]: number } = {
    CHALLENGER: 1,
    GRANDMASTER: 2,
    MASTER: 3,
    DIAMOND: 4,
    EMERALD: 5,
    PLATINUM: 6,
    GOLD: 7,
    SILVER: 8,
    BRONZE: 9,
    IRON: 10,
};

watch(summoners, (summoners) => {
    summoners.forEach((summoner: any) => {
        summoner.leagues.forEach((league: any) => {
            if (league.queueType === "RANKED_SOLO_5x5") {
                soloQueue.value.push(league);
            }
            if (league.queueType === "RANKED_FLEX_SR") {
                flexQueue.value.push(league);
            }
        });
        summoner.leagues2021.forEach((league: any) => {
            if (league.queueType === "RANKED_SOLO_5x5") {
                soloQueue2021.value.push(league);
            }
            if (league.queueType === "RANKED_FLEX_SR") {
                flexQueue2021.value.push(league);
            }
        });
        soloQueue.value.sort(compareRanks);
        flexQueue.value.sort(compareRanks);
        soloQueue2021.value.sort(compareRanks);
        flexQueue2021.value.sort(compareRanks);
    });
});

function compareRanks(a: SummonerLeagueDto, b: SummonerLeagueDto): number {
    if (a.tier === b.tier && a.rank === b.rank) {
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
    <div class="bg-white p-3">
        <template v-if="activeSeason === SEASONDATA.CURRENT_ID">
            <LeagueTable :headline="'Solo Queue'" :games="soloQueue"></LeagueTable>
        </template>
    </div>
</template>
