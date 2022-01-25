<script setup lang="ts">
import { MatchDto, ParticipantDto } from "../../interfaces/matchV5.dto";
import { store } from "../../store";
import dayjs from 'dayjs'
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';
import MatchStats from "./MatchStats.vue";
import MatchSummoner from "./MatchSummoner.vue";
import MatchKda from "./MatchKda.vue";
import MatchPlayerResult from "./MatchPlayerResult.vue";
import MatchItems from "./MatchItems.vue";
import MatchParticipants from "./MatchParticipants.vue";
import { computed } from "vue";

// const relativeTimeOptions = {
//     // future: 'in %s',
//     // past: '%s ago',
//     // s: 'a few seconds',
//     // m: 'a minute',
//     // mm: '%d minutes',
//     // h: 'an hour',
//     // hh: '%d hours',
//     // d: 'a day',
//     dd: 'vor %d Tagen',
//     // M: 'a month',
//     // MM: '%d months',
//     // y: 'a year',
//     // yy: '%d years',
// };

dayjs.extend(relativeTime)
// dayjs.extend(updateLocale)
dayjs.locale('de')
// dayjs.updateLocale('de', { relativeTime: relativeTimeOptions })

const isMobile = computed(() => store.getters.getIsMobile);

const props = defineProps<{
    match: MatchDto
    isNewSummonerBlock: boolean,
    friendInMatch: ParticipantDto[],
}>()


function isPlayerMatchResultWin(): boolean {
    return props.friendInMatch[0]?.win;
}

function colorizeBackground() {
    const isWin = props.friendInMatch[0]?.win;
    if (isWin) { return { 'background-color': '#a3cfec', 'border-color': '#99b9cf' }; }
    if (!isWin) { return { 'background-color': '#e2b6b3', 'border-color': '#CEA7A6' }; }
}

function secondsToTime(seconds: number) {
    const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');

    return m + 'm ' + s + 's';
}

function translateQueueId(queueId: number) {
    switch (queueId) {
        case 420:
            return 'Solo Rangliste';
        case 440:
            return 'Flex Rangliste';
        default:
            return 'Aram';
    }
}

function getSummonerSpells() {
    if (props.friendInMatch.length === 0) { return []; }
    return [props.friendInMatch[0].summoner1Id, props.friendInMatch[0].summoner2Id]
        .map(id => store.getters.getSummonerSpell(id).image);
}

function getChampionName() {
    return store.getters.getChampion(props.friendInMatch[0]?.championName)
}

function getTimeStamp() {
    const timeStamp = props.match.info.gameEndTimestamp || props.match.info.gameCreation + props.match.info.gameDuration * 1000;
    return dayjs(timeStamp).fromNow();
}

function translatePlayerKdaValue() {
    return +((props.friendInMatch[0]?.kills + props.friendInMatch[0]?.assists) / props.friendInMatch[0]?.deaths).toFixed(1) + ' KDA';
}

function translatePlayerStats() {
    return `${props.friendInMatch[0]?.kills} / ${props.friendInMatch[0]?.deaths} / ${props.friendInMatch[0]?.assists}`;
}

function getCreepScore() {
    const minionKills = props.friendInMatch[0]?.totalMinionsKilled ?? 0;
    const neutralMinionsKilled = props.friendInMatch[0]?.neutralMinionsKilled ?? 0;
    const totalCreepScore = minionKills + neutralMinionsKilled;
    const minutesPlayed = parseFloat((props.match.info.gameDuration / 60).toFixed(1));
    const csPerMinute = (totalCreepScore / minutesPlayed).toFixed(1);

    return `${totalCreepScore} (${csPerMinute}) CS`;
}

function getLevel() {
    return props.friendInMatch[0]?.champLevel || 0;
}

function getVisionScore() {
    return props.friendInMatch[0]?.visionScore || 0;
}

function itemIds(): Array<number | null> {
    const itemIds = [
        props.friendInMatch[0]?.item0 ?? null,
        props.friendInMatch[0]?.item1 ?? null,
        props.friendInMatch[0]?.item2 ?? null,
        props.friendInMatch[0]?.item3 ?? null,
        props.friendInMatch[0]?.item4 ?? null,
        props.friendInMatch[0]?.item5 ?? null,
        props.friendInMatch[0]?.item6 ?? null
    ]
    return itemIds.map(itemId => store.getters.getItem(itemId));
}

function getTeams(): Array<ParticipantDto[]> {
    const team1: ParticipantDto[] = [];
    const team2: ParticipantDto[] = [];
    props.match?.info.participants?.forEach((participantIdentity: ParticipantDto) => {
        if (participantIdentity?.teamId === 100) {
            team1.push(participantIdentity);
        } else if (participantIdentity?.teamId === 200) {
            team2.push(participantIdentity);
        }
    });
    return [team1, team2];
}

function getZindex(index: number) {
    return {
        'zIndex': 5 - index
    }
}

function getImageSource(profileIcon: number) {
    return `http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/${profileIcon}.png`
}
</script>

<template>
    <div v-if="isNewSummonerBlock" class="text-base flex items-center">
        <template v-if="friendInMatch.length === 1">
            <img
                class="rounded-full leading-none w-6 h-6 mr-1"
                :src="getImageSource(friendInMatch[0].profileIcon)"
            />
            <div class="mb-2">
                <span class="leading-none">{{ friendInMatch[0].summonerName }}</span>
                <span
                    class="text-xs leading-none line block text-gray-500"
                >Level {{ friendInMatch[0].summonerLevel }}</span>
            </div>
        </template>
        <div v-if="friendInMatch.length > 1" class="flex items-center mb-2">
            <img
                v-for="(friend, index) in friendInMatch"
                :key="index"
                :class="{ '-ml-3': index !== 0 }"
                class="rounded-full leading-none w-6 h-6 z-10"
                :src="getImageSource(friend.profileIcon)"
                :style="[
                    getZindex(index)
                ]"
            />
            <div class="ml-1">
                <span>{{ friendInMatch[0].summonerName }}, {{ friendInMatch[1].summonerName }}</span>
                <span v-if="friendInMatch.length > 2">{{ ` + ${friendInMatch.length - 2} more` }}</span>
            </div>
        </div>
    </div>
    <div
        :style="colorizeBackground()"
        class="mb-4 border p-1 flex flex-row text-xs match-container justify-start shadow-sm overflow-x-scroll"
    >
        <MatchStats
            v-if="match"
            :queue-name="translateQueueId(match.info.queueId)"
            :timestamp="getTimeStamp()"
            :match-result="isPlayerMatchResultWin() ? 'Sieg' : 'Niederlage'"
            :match-length="secondsToTime(match.info.gameDuration)"
        />
        <template v-if="!isMobile">
            <MatchSummoner :champion="getChampionName()" :summoner-spells="getSummonerSpells()" />
            <MatchKda :kda="translatePlayerKdaValue()" :stats="translatePlayerStats()" />
        </template>
        <template v-else>
            <div class="flex flex-col justify-center w-20 sm:w-auto">
                <MatchSummoner
                    :champion="getChampionName()"
                    :summoner-spells="getSummonerSpells()"
                    :is-mobile="true"
                />
                <MatchKda
                    :kda="translatePlayerKdaValue()"
                    :stats="translatePlayerStats()"
                    :is-mobile="true"
                />
            </div>
        </template>
        <template v-if="!isMobile">
            <MatchPlayerResult
                :creep-score="getCreepScore()"
                :level="getLevel()"
                :kill-participation="null"
                :wards-placed="getVisionScore()"
                :vision-score="getVisionScore()"
            />
            <MatchItems v-if="itemIds().length > 0" :items="itemIds()" />
        </template>
        <template v-else>
            <div class="flex flex-col items-center justify-center">
                <MatchItems v-if="itemIds().length > 0" :items="itemIds()" :is-mobile="true" />
                <MatchPlayerResult
                    :creep-score="getCreepScore()"
                    :level="getLevel()"
                    :kill-participation="null"
                    :is-mobile="true"
                    :wards-placed="getVisionScore()"
                    :vision-score="getVisionScore()"
                />
            </div>
        </template>

        <MatchParticipants :teams="getTeams()" />
    </div>
</template>

<style scoped>
</style>
