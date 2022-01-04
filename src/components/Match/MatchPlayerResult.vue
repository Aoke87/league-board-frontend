<script setup lang="ts">

    defineProps<{
        level: number,
        creepScore: string,
        killParticipation: string|null
    }>()

</script>

<template>
    <div class="w-24 flex flex-col justify-center">
        <span>Stufe {{ level }}</span>
        <span>{{ creepScore }}</span>
        <span v-if="killParticipation">{{ killParticipation }}</span>
        <span>Tier Average</span>
        <span>Platinum</span>
    </div>
</template>
