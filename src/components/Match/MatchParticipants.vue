<script setup lang="ts">

import { ParticipantDto } from "../../interfaces/matchV5.dto";
import { championStyle } from '../../services/imageSprites';
import { store } from "../../store";

defineProps<{
    teams: Array<ParticipantDto[]>,
}>()

function getChampionStyle(championName: string, scale: number) {
    return championStyle(store.getters.getChampion(championName)?.image, scale)
}
</script>

<template>
    <div class="flex mx-2">
        <div v-for="(team, index) in teams" :key="index" class="w-28 flex flex-col">
            <div
                v-for="(player, index) in team"
                :key="index"
                class="flex"
                style="margin-bottom: 1px;"
            >
                <div
                    class="w-3 h-3"
                    style="margin-bottom: 1px"
                    :style="getChampionStyle(player.championName, .35)"
                ></div>
                <span
                    class="ml-1 whitespace-nowrap overflow-hidden overflow-ellipsis flex-grow-0"
                >{{ player.summonerName }}</span>
            </div>
        </div>
    </div>
</template>
