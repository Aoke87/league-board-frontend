<script setup lang="ts">

const props = defineProps<{
    headline: string,
    games: any[]
}>();

function getLeagueEmblem(leagueId: string) {
    return `image/ranked/${leagueId.toLowerCase()}.webp`;
}

</script>

<template>
    <div class="w-full flex flex-col">
        <span class="leading-none">Stats Overview</span>
        <span class="text-xs leading-none line block text-gray-500 mb-2">{{ headline }}</span>
        <table class="w-full table-fixed text-left">
            <thead>
                <tr>
                    <th class="text-left">League</th>
                    <th>Points</th>
                    <th class="w-[100px]">Name</th>
                    <th>Win/Loss</th>
                    <th class="text-right">%</th>
                </tr>
            </thead>
            <tbody v-show="games.length > 0">
                <tr v-for="(leagueEntry, index) in games" :key="index">
                    <td class="flex items-center">
                        <img
                            :src="getLeagueEmblem(leagueEntry.tier)"
                            class="w-11 h-11"
                            :alt="leagueEntry.tier"
                        />
                        <span class="ml-2">{{ leagueEntry.rank }}</span>
                    </td>
                    <td class="text-center">{{ leagueEntry.leaguePoints }}</td>
                    <td
                        class="text-left text-ellipsis overflow-hidden whitespace-nowrap"
                    >{{ leagueEntry.summonerName }}</td>
                    <td class="whitespace-nowrap">
                        <span>{{ leagueEntry.wins }}</span>
                        /
                        <span>{{ leagueEntry.losses }}</span>
                    </td>
                    <td class="whitespace-nowrap text-right">
                        <span>
                            {{ Number(leagueEntry.wins / (leagueEntry.wins + leagueEntry.losses) * 100).toFixed(1) }}%
                        </span>
                    </td>
                </tr>
            </tbody>
            <tbody v-show="!games.length" class="skeletonTableBody">
                <tr class="" v-for="fakeData in 10">
                    <td class="skeleton"></td>
                    <td class="skeleton"></td>
                    <td class="skeleton"></td>
                    <td class="skeleton"></td>
                    <td class="skeleton"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">
    table {
        border-spacing: 10px 10px;
        border-collapse: separate;
        td {
            height: 25px;
        }
    }
    .skeleton-text {
        width: 100%;
        height: 0.7rem;
        margin-bottom: 0.5rem;
        border-radius: 0.25rem;
    }
    .skeleton {
        border-radius: 5px;
        animation: skeleton-loading 1s linear infinite alternate;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 80%);
        }
        100% {
            background-color: hsl(200, 20%, 95%);
        }
    }
</style>
