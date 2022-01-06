<script setup lang="ts">

import { SummonerDto, SummonerLeagueDto } from "../../interfaces/summoner.dto";

const props = defineProps<{
    summoners: SummonerDto[],
}>()

const soloQueue: SummonerLeagueDto[] = [];
const flexQueue: SummonerLeagueDto[] = [];
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
    soloQueue.sort(compareRanks)
    flexQueue.sort(compareRanks)
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
    <div class="w-full flex flex-col">
        <h3>2021</h3>
        <span class="leading-none">Solo Queue</span>
        <table class="w-full table-auto border text-left shadow-sm">
            <thead>
                <tr>
                    <th class="w-5 px-1">#</th>
                    <th>League</th>
                    <th>Points</th>
                    <th>Name</th>
                    <th>Win/Loss</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(leagueEntry, index) in soloQueue" :key="index" class="border">
                    <td class="px-1">
                        <span>{{ index + 1 }}</span>
                    </td>
                    <td class="flex items-center">
                        <img
                            :src="getLeagueEmblem(leagueEntry.tier)"
                            class="w-7 h-7"
                            :alt="leagueEntry.tier"
                        />
                        <span class="ml-2">{{ leagueEntry.rank }}</span>
                    </td>
                    <td>{{ leagueEntry.leaguePoints }}</td>
                    <td class="text-left">{{ leagueEntry.summonerName }}</td>
                    <td>
                        <span>{{ leagueEntry.wins }}</span>
                        /
                        <span>{{ leagueEntry.losses }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <span class="mt-10 leading-none">Flex Queue</span>
        <table class="w-full table-auto border text-left shadow-sm">
            <thead>
                <tr>
                    <th class="w-5 px-1">#</th>
                    <th>League</th>
                    <th>Name</th>
                    <th>Points</th>
                    <th>Win/Loss</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(leagueEntry, index) in flexQueue" :key="index" class="border">
                    <td class="px-1">
                        <span>{{ index + 1 }}</span>
                    </td>
                    <td class="flex items-center">
                        <img
                            :src="getLeagueEmblem(leagueEntry.tier)"
                            class="w-7 h-7"
                            :alt="leagueEntry.tier"
                        />
                        <span class="ml-2">{{ leagueEntry.rank }}</span>
                    </td>
                    <td class="text-left">{{ leagueEntry.summonerName }}</td>
                    <td>{{ leagueEntry.leaguePoints }}</td>
                    <td>
                        <span>{{ leagueEntry.wins }}</span>
                        /
                        <span>{{ leagueEntry.losses }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
