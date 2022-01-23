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
    </div>
</template>
