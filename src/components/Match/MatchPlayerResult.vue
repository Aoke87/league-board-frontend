<script setup lang="ts">

defineProps<{
    level: number,
    creepScore: string,
    killParticipation: string | null,
    isMobile?: boolean,
}>()

</script>

<template>
    <div class="w-20 flex flex-col justify-center">
        <span>Stufe {{ level }}</span>
        <span>{{ creepScore }}</span>
        <span v-if="killParticipation">{{ killParticipation }}</span>
        <span v-if="!isMobile">Tier Average</span>
        <span v-if="!isMobile">Platinum</span>
    </div>
</template>
