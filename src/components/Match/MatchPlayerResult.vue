<script setup lang="ts">

defineProps<{
    level: number,
    creepScore: string,
    killParticipation: string | null,
    isMobile?: boolean,
    wardsPlaced?: number,
    visionScore?: number,
}>()

</script>

<template>
    <div class="w-20 flex flex-col justify-center">
        <span>Stufe {{ level }}</span>
        <span>{{ creepScore }}</span>
        <span v-if="killParticipation">{{ killParticipation }}</span>
        <div class="flex items-center">
            <img width="15" height="15" src="/image/eye.svg" />
            <span class="ml-1">{{ visionScore }}</span>
        </div>
    </div>
</template>
