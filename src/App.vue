<script setup lang="ts">
import GridLayout from './components/GridLayout.vue';
import AppHeader from "./components/AppHeader.vue";
import AppFooter from './components/AppFooter.vue';
</script>

<template>
    <AppHeader class="top"></AppHeader>
    <GridLayout />
    <AppFooter />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: #e2e1e0;
}
</style>
                                   