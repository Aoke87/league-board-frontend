<script setup lang="ts">

const props = defineProps<{
    headline: string,
    games: any[]
}>()

function getLeagueEmblem(leagueId: string) {
    return `image/ranked/Emblem_${leagueId.charAt(0) + leagueId.slice(1).toLowerCase()}.png`
}

</script>

<template>
    <div class="w-full flex flex-col mt-4">
        <h3 class="leading-2">{{ headline }}</h3>
        <table class="w-full table-auto text-left">
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
                <tr v-for="(leagueEntry, index) in games" :key="index">
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
    </div>
</template>
