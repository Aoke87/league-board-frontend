<script setup lang="ts">
// registers everything inside chartjs
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import { onMounted } from "vue";
import dayjs from "dayjs";
import { RankDto, SummonerDto } from "../../interfaces/summoner.dto";

Chart.register(...registerables);

const props = defineProps<{
    summoners: SummonerDto[],
}>();

const colors = [
    "FireBrick",
    // "Green",
    "Blue",
    "DarkOrchid",
    "HotPink",
    "Brown",
    "DarkMagenta",
    "Crimson",
    "DarkGreen",
    "Grey",
    "DarkBlue",
    "Gold",
    "BlueViolet",
];

export interface DataSet {
    label: string,
    backgroundColor?: string,
    borderColor?: string,
    data: { x: number, y: number, tooltip: string }[]
    hidden: boolean,
    pointRadius: number
}

const graphData = () => {
    const dataSets: DataSet[] = [];
    props.summoners.forEach((sum, index) => {
        const latestGame = sum.ranking.soloQueueRanks[0];
        const offset = 60 * 60 * 24 * 7 * 1000;

        const dataSet: DataSet = {
            label: sum.name,
            data: [],
            backgroundColor: colors[index] || "black",
            borderColor: colors[index] || "black",
            hidden: latestGame && ((new Date().getTime()) - latestGame.timestamp * 1000 > offset),
            pointRadius: 2,
        };
        if (sum.ranking.soloQueueRanks.length < 7) return;
        sum.ranking.soloQueueRanks
            .filter((rank: RankDto) => (rank.timestamp) > 1672531200)
            .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
            .forEach((rank: RankDto) => {
                dataSet.data.push({
                    x: rank.timestamp * 1000,
                    y: rank.rating,
                    tooltip: `${rank.tier} ${rank.rank} ${rank.points}`,
                });
            });
        dataSets.push(dataSet);
    });
    return {
        datasets: dataSets,
    };
};

const yAxis = [
    { url: `image/ranked/diamond.webp`, color: "#4665B5", start: 2400 },
    { url: `image/ranked/emerald.webp`, color: "#067066", start: 2000 },
    { url: `image/ranked/platinum.webp`, color: "#3F857E", start: 1600 },
    { url: `image/ranked/gold.webp`, color: "#BD811A", start: 1200 },
    { url: `image/ranked/silver.webp`, color: "#999999", start: 800 },
    // { url: `image/ranked/bronze.webp`, color: "#9C5E38", start: 400 },
].map((yAxis) => {
    const image = new Image();
    image.src = yAxis.url;
    return { image, ...yAxis };
});

onMounted(() => {
    const chartContainer: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myChart");
    const firstGamesThisSeason = props.summoners
        .map((sum) => sum?.ranking?.soloQueueRanks?.pop()?.timestamp || 0).filter((num) => num !== 0);
    const firstTimestamp = Math.min(...firstGamesThisSeason) * 1000;

    const plugin = {
        id: "custom_canvas_background_image",
        legend: { display: false },
        beforeDraw: (chart: any) => {
            if (yAxis.every((img) => img.image.complete)) {
                yAxis.forEach((yAxis, index, arr) => {
                    const { ctx } = chart;

                    const { width, height } = chart.chartArea;
                    const barHeight = height / arr.length;
                    const y1 = 5 + (index * barHeight);
                    const widthOffset = 80;
                    const fontSize = 12;

                    // draw backgrounds
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = yAxis.color;
                    ctx.fillRect(0, y1, width + widthOffset, barHeight);
                    ctx.globalAlpha = 1;

                    // draw devision lines
                    ctx.font = `${fontSize}px Roboto`;
                    ctx.strokeStyle = "#999";

                    ctx.fillText("I", widthOffset, y1 + (0.25 * barHeight) - fontSize / 2);
                    ctx.fillText("II", widthOffset, y1 + (0.5 * barHeight) - fontSize / 2);
                    ctx.fillText("III", widthOffset, y1 + (0.75 * barHeight) - fontSize / 2);
                    ctx.fillText("IV", widthOffset, y1 + barHeight - fontSize / 2);

                    ctx.beginPath();
                    ctx.moveTo(widthOffset, y1 + 0.25 * barHeight);
                    ctx.lineTo(width + widthOffset, y1 + 0.25 * barHeight);

                    ctx.moveTo(widthOffset, y1 + 0.5 * barHeight);
                    ctx.lineTo(width + widthOffset, y1 + 0.5 * barHeight);

                    ctx.moveTo(widthOffset, y1 + 0.75 * barHeight);
                    ctx.lineTo(width + widthOffset, y1 + 0.75 * barHeight);

                    ctx.moveTo(widthOffset, y1 + barHeight);
                    if (index !== arr.length - 1) ctx.lineTo(width + widthOffset, y1 + barHeight);
                    ctx.stroke();

                    // draw emblems
                    const imageScale = (100 - index * 3) / 100;
                    const imageSize = widthOffset * imageScale;

                    ctx.drawImage(
                        yAxis.image,
                        index,
                        y1 + (barHeight / 2) - (widthOffset) / 2,
                        imageSize,
                        imageSize,
                    );
                    ctx.restore();
                });
            }
        },
    };
    if (chartContainer) {
        const paddingLeft = 60 * 60 * 24 * 7 * 800;
        new Chart(chartContainer as HTMLCanvasElement, {
            type: "line",
            data: graphData(),
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                    tooltip: {
                        callbacks: {
                            label(context: any) {
                                return context?.raw?.tooltip;
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        display: false,
                        grid: {
                            display: true,
                        },
                        beginAtZero: false,
                        min: Math.min(...yAxis.map((y) => y.start)),
                        max: Math.max(...yAxis.map((y) => y.start)) + 400,
                        ticks: {
                            stepSize: 400,
                        },
                        grace: 0,
                    },
                    x: {
                        display: true,
                        type: "time",
                        time: {
                            unit: "week",
                        },
                        grid: {
                            display: true,
                        },
                        min: (firstTimestamp) - paddingLeft,
                    },
                },
                layout: {
                    padding: {
                        left: 60,
                    },
                },
                maintainAspectRatio: false,
            },
            plugins: [plugin],
        });
    }
});
</script>

<template>
    <div class="bg-white p-3 mt-4">
        <span class="leading-none">Rankings 2022</span>
        <span class="text-xs leading-none line block text-gray-500 mb-2">Solo Queue</span>
        <div style="height: 500px">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<style scoped>
</style>
