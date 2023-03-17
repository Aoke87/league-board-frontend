<script setup lang="ts">

const props = defineProps<{
    champion: any,
    summonerSpells: Array<{
        full: string,
        sprite: string,
        group: string,
        x: number,
        y: number,
        w: number,
        h: number,
    }>,
    isMobile?: boolean;
}>();

function championStyle(image: {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number,
}) {
    if (!image) { return; }
    const modifier = props.isMobile ? 0.8 : 1;
    const backgroundOriginalWidth = 480;
    return {
        width: `${image.w * modifier}px`,
        height: `${image.h * modifier}px`,
        background: `url(sprite/${image.sprite}) -${image.x * modifier}px -${image.y * modifier}px`,
        "background-size": `${backgroundOriginalWidth * modifier}px`,
    };
}

function summonerSpellStyles(image: {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number,
}) {
    const modifier = props.isMobile ? 0.4 : 0.5;
    const backgroundOriginalWidth = 480;
    return {
        width: `${image.w * modifier}px`,
        height: `${image.h * modifier}px`,
        background: `url(sprite/spell0.png) -${image.x * modifier}px -${image.y * modifier}px`,
        "background-size": `${backgroundOriginalWidth * modifier}px`,
    };
}

</script>

<template>
    <div class="flex flex-row justify-center items-center content-center flex-grow-1 flex-shrink-0">
        <div v-if="champion !== null" class="mr-1 rounded" :style="championStyle(champion?.image)"></div>
        <div class="display flex flex-col">
            <div
                v-for="(spell, index) in summonerSpells"
                :key="index"
                :style="summonerSpellStyles(spell)"
                class="rounded-md"
            ></div>
        </div>
    </div>
</template>
