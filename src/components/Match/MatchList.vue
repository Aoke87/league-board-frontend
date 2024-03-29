<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { MatchDto, ParticipantDto } from "../../interfaces/matchV5.dto";
import type { SummonerDto } from "../../interfaces/summoner.dto";
import Match from "./Match.vue";
import { store } from "../../store";
import LoadingSpinnerVue from "../LoadingSpinner.vue";
import SubNavigation from "../SubNavigation.vue";
import MatchPagination from "./MatchPagination.vue";
import { fetchMatchByPage } from "../../services/requestService";
import { isMobile } from "../../services/utilsService";

export interface NavigationData {
    title: string,
    disabled: boolean,
}

const navData: NavigationData[] = [
    { title: "Show All", disabled: false },
    // { title: 'Solo Queue', disabled: true },
    // { title: 'Flex Queue', disabled: true },
];

const props = defineProps<{
    summoners: SummonerDto[]
}>();

const summonerIds = computed(() => props.summoners.map((sum) => sum.puuid));
const matches = computed(() => {
    if (store.getters.getMatchesByPage(activePage.value).length !== 0) {
        const sortedMatches = (store.getters.getMatchesByPage(activePage.value) as MatchDto[]).sort((a, b) => (a.info.gameEndTimestamp < b.info.gameEndTimestamp ? 1 : -1));
        return sortedMatches;
    }
    return [];
});

const activePage = ref(0);

const matchlist = ref<HTMLElement | null>(null);

function getFriendsInMatch(match: MatchDto): ParticipantDto[] {
    const friends: ParticipantDto[] = [];
    for (const participant of match.info.participants) {
        if (summonerIds.value.includes(participant.puuid)) {
            friends.push(participant);
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

async function loadNewMatches(page: number) {
    if (store.getters.getMatchesByPage(page).length === 0) {
        const matches = await fetchMatchByPage(page);
        store.commit("setMatchesByPage", { page, matches });
    }
    activePage.value = page;
    if (isMobile()) {
        matchlist?.value?.scrollIntoView({ behavior: "smooth" });
    }
}

</script>

<template>
    <div ref="matchlist" class="max-w-full p-3 shadow-md bg-white">
<!--        <SubNavigation :nav-data="navData" />-->
        <template v-if="!matches || matches.length === 0">
            <LoadingSpinnerVue :width="694" />
        </template>
        <template v-else>
            <Match
                v-for="(match, index) in matches"
                :key="index"
                :match="match"
                :is-new-summoner-block="isNewSummonerBlock(index, matches)"
                :friend-in-match="getFriendsInMatch(match)"
            />
        </template>
        <MatchPagination @activate-page="loadNewMatches"></MatchPagination>
    </div>
</template>
