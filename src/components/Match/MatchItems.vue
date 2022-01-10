<script setup lang="ts">

const props = defineProps<{
    items: any[],
    isMobile?: boolean,
}>()

function itemStyles(image: {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number,
}) {
    const modifier = .45;
    const backgroundOriginalWidth = 480;
    if (!image) { return { width: '100%', height: '100%' } }
    return {
        width: '100%',
        height: '100%',
        background: `url(sprite/small_${image.sprite}) -${image.x * modifier}px -${image.y * modifier}px`,
        'background-size': `${backgroundOriginalWidth * modifier}px`,
    };
}
</script>

<template>
    <div class="w-24 h-12 mx-2 grid overflow-hidden grid-cols-4 grid-rows-4 gap-0.5 self-center">
        <div class="box row-span-2">
            <div :style="itemStyles(items[0]?.image)" class="bg-gray-300"></div>
        </div>
        <div class="box row-span-2">
            <div :style="itemStyles(items[1]?.image)" class="bg-gray-300"></div>
        </div>
        <div class="box row-span-2">
            <div :style="itemStyles(items[2]?.image)" class="bg-gray-300"></div>
        </div>
        <div class="box row-start-2 row-span-2 col-start-4">
            <div :style="itemStyles(items[6]?.image)" class="bg-gray-300"></div>
        </div>
        <div class="box row-start-3 row-span-2">
            <div :style="itemStyles(items[3]?.image)" class="bg-gray-300"></div>
        </div>
        <div class="box row-start-3 row-span-2">
            <div :style="itemStyles(items[4]?.image)" class="bg-gray-300"></div>
        </div>
        <div class="box row-start-3 row-span-2">
            <div :style="itemStyles(items[5]?.image)" class="bg-gray-300"></div>
        </div>
    </div>
</template>

<style>
.item-image {
    position: absolute;
}

.item-image:first-child {
    left: 0;
    top: 0;
}

.item-image:nth-child(2) {
    left: 1.3rem;
    top: 0;
}

.item-image:nth-child(3) {
    left: 2.6rem;
    top: 0;
}
.item-image:nth-child(4) {
    left: 0;
    top: 1.3rem;
}

.item-image:nth-child(5) {
    left: 1.3rem;
    top: 1.3rem;
}

.item-image:nth-child(6) {
    left: 2.6rem;
    top: 1.3rem;
}
.item-image:nth-child(7) {
    left: 3.9rem;
    top: 0.65rem;
}
</style>
