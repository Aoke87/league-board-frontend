<script setup lang="ts">

import { ref } from "vue";
import { SummonerDto, SummonerLeagueDto } from "../../interfaces/summoner.dto";

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
    <div class="bg-white">
        <nav class="flex flex-col sm:flex-row">
            <button
                @click="activeSeason = 2022"
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
                :class="{ 'text-blue-500 border-b-2 border-blue-500': activeSeason === 2022 }"
            >Current Season</button>
            <button
                @click="activeSeason = 2021"
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
                :class="{ 'text-blue-500 border-b-2 border-blue-500': activeSeason === 2021 }"
            >2021</button>
        </nav>
    </div>
    <template v-if="activeSeason === 2021">
        <div class="w-full flex flex-col mt-3">
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
                    <tr v-for="(leagueEntry, index) in soloQueue2021" :key="index" class="border">
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
                    <tr v-for="(leagueEntry, index) in flexQueue2021" :key="index" class="border">
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
    <template v-if="activeSeason === 2022">
        <div class="w-full flex flex-col mt-3">
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
</template>
