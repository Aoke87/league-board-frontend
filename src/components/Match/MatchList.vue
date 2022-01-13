<script setup lang="ts">
import { computed, ref } from 'vue';
import type { MatchDto, ParticipantDto } from "../../interfaces/matchV5.dto";
import type { SummonerDto } from "../../interfaces/summoner.dto";
import Match from './Match.vue'
import { store } from "../../store";

const props = defineProps<{
    summoners: SummonerDto[]
}>()

const summonerIds = computed(() => props.summoners.map(sum => sum.puuid))

const matches = computed(() => {
    return store.getters.getInitialMatches;
})

const showQueue = ref('all')

function getFriendsInMatch(match: MatchDto): ParticipantDto[] {
    const friends: ParticipantDto[] = [];
    for (const participant of match.info.participants) {
        if (summonerIds.value.includes(participant.puuid)) {
            friends.push(participant)
        }
    }
    return friends;
}

function isNewSummonerBlock(index: number, matches: MatchDto[]): boolean {
    if (index === 0) { return true; }

    const currentGame: MatchDto = matches[index];
    const previousGame: MatchDto = matches[index - 1];
    const summonersInCurrentGame = getFriendsInMatch(currentGame);
    const summonersInPreviousGame = getFriendsInMatch(previousGame);

    if (summonersInCurrentGame.length === 0) { return false; }
    if (summonersInCurrentGame.length !== summonersInPreviousGame.length) { return true; }
    return summonersInCurrentGame[0].puuid !== summonersInPreviousGame[0].puuid;
}
</script>

<template>
    <div class="px-2 pt-2 sm:pt-0 shadow-md bg-white">
        <nav class="sm:flex flex-col sm:flex-row mb-3 hidden">
            <button
                @click="showQueue = 'all'"
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
                :class="{ 'text-blue-500 border-b-2 border-blue-500': showQueue === 'all' }"
            >Show All</button>
            <button
                @click="showQueue = 'solo'"
                disabled
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none disabled"
                :class="{ 'text-blue-500 border-b-2 border-blue-500': showQueue === 'solo' }"
            >Solo Queue</button>
            <button
                @click="showQueue = 'flex'"
                disabled
                class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none disabled"
                :class="{ 'text-blue-500 border-b-2 border-blue-500': showQueue === 'flex' }"
            >Flex Queue</button>
        </nav>
        <Match
            v-for="(match, index) in matches"
            :key="index"
            :match="match"
            :is-new-summoner-block="isNewSummonerBlock(index, matches)"
            :friend-in-match="getFriendsInMatch(match)"
        />
    </div>
</template>