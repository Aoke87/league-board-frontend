<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { NavigationData } from './Match/MatchList.vue';

const props = defineProps<{
    navData: NavigationData[],
}>()

const emit = defineEmits(['active'])

const showQueue = ref(props.navData[0].title)

function activate(title: string) {
    showQueue.value = title;
    emit('active', title);
}

</script>

<template>
    <nav class="sm:flex flex-col sm:flex-row mb-3 hidden">
        <button
            v-for="(nav, index) in navData"
            :key="index"
            @click="activate(nav.title)"
            class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
            :class="[{ 'text-blue-500 border-b-2 border-blue-500': showQueue === nav.title }, { 'disabled': nav.disabled }]"
            :disabled="nav.disabled"
        >{{ nav.title }}</button>
    </nav>
</template>