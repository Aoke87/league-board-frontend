<script setup lang="ts">

defineProps<{
    queueName: string,
    timestamp: string,
    matchResult: string,
    matchLength: string,
}>()

</script>

<template>
    <div class="flex flex-col justify-center w-24 text-center flex-auto">
        <p>{{ queueName }}</p>
        <p>{{ timestamp }}</p>
        <hr class="w-16 my-1 m-auto" />
        <p>{{ matchResult }}</p>
        <p>{{ matchLength }}</p>
    </div>
</template>
