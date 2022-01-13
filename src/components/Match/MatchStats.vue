<script setup lang="ts">

defineProps<{
    queueName: string,
    timestamp: string,
    matchResult: string,
    matchLength: string,
}>()

</script>

<template>
    <div class="flex flex-col justify-center w-auto mx-2 sm:mx-0 sm:w-24 text-center flex-auto">
        <p class="whitespace-nowrap">{{ queueName }}</p>
        <p class="whitespace-nowrap">{{ timestamp }}</p>
        <hr class="w-16 my-1 m-auto" />
        <p class="whitespace-nowrap">{{ matchResult }}</p>
        <p class="whitespace-nowrap">{{ matchLength }}</p>
    </div>
</template>
