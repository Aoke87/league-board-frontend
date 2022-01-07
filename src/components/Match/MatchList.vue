<script setup lang="ts">
import { computed } from 'vue';
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
    <Match
        v-for="(match, index) in matches"
        :key="index"
        :match="match"
        :is-new-summoner-block="isNewSummonerBlock(index, matches)"
        :friend-in-match="getFriendsInMatch(match)"
    />
</template>