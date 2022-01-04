<script setup lang="ts">

    defineProps<{
        stats: string,
        kda: string,
    }>()

</script>

<template>
    <div class="text-sm w-24 flex flex-col justify-center items-center">
        <span class="font-bold tracking-wide">{{ stats }}</span>
        <span>{{ kda }}</span>
        <!-- <span class="mt-1 px-2 py-1 rounded-md bg-green-400">Ace</span> -->
    </div>
</template>
