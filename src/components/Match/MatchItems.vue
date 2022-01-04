<script setup lang="ts">

    const props = defineProps<{
        items: any[],
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
        if (!image) { return }
        const modifier = .45;
        const backgroundOriginalWidth = 480;
        return {
            width: (image.w * modifier) + 'px',
            height: (image.h * modifier) + 'px',
            background: `url(sprite/small_${image.sprite}) -${image.x * modifier}px -${image.y * modifier}px`,
            'background-size': `${backgroundOriginalWidth * modifier}px`,
        };
    }
</script>

<template>
    <div class="w-24 flex flex-grow-2 flex flex-col justify-center">
        <div class="w-24 h-10 relative">
            <div v-for="item in items" class="w-5 h-5 rounded-sm item-image" :style="itemStyles(item?.image)"/>
<!--            <div v-else class="w-5 h-5 rounded-sm bg-black border-1" >-->
<!--                {{ item }}-->
<!--            </div>-->
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
