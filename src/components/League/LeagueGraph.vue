<script setup lang="ts">
//registers everything inside chartjs
import { Chart, registerables } from 'chart.js';
import { computed, onMounted } from 'vue';
import { RankDto, SummonerDto } from '../../interfaces/summoner.dto';
import { store } from './../../store';
Chart.register(...registerables);

const props = defineProps<{
    summoners: SummonerDto[],
}>()

function randomGreyHex() {
    var v = (Math.random() * (256) | 0).toString(16);//bitwise OR. Gives value in the range 0-255 which is then converted to base 16 (hex).
    return "#" + v + v + v;
}

const colors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(132, 99, 255)',
    'rgb(132, 99, 255)',
    'rgb(64, 159, 255)',
];

const graphData = () => {

    const dataSets: { label: string, backgroundColor?: string, borderColor?: string, data: number[] }[] = [];
    props.summoners.forEach((sum, index) => {
        const randomColor = randomGreyHex()
        const dataSet: { label: string, backgroundColor?: string, borderColor?: string, data: number[] } = {
            label: sum.name,
            data: [],
            backgroundColor: colors[index] || 'black',
            borderColor: 'black',
        }
        if (sum.ranking.soloQueueRanks.length < 7) return;
        sum.ranking.soloQueueRanks.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
        sum.ranking.soloQueueRanks.forEach((rank: RankDto) => {
            dataSet.data.push(rank.rating);
        });
        dataSets.push(dataSet);
    })
    return {
        datasets: dataSets,
        labels,
    };
}

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const yAxis = [
    { url: `image/ranked/Emblem_Platinum.png`, color: '#648680' },
    { url: `image/ranked/Emblem_Gold.png`, color: '#BD811A' },
    { url: `image/ranked/Emblem_Silver.png`, color: '#999999' },
    { url: `image/ranked/Emblem_Bronze.png`, color: '#9C5E38' },
].map(img => {
    const image = new Image();
    image.src = img.url;
    return { image, color: img.color, url: img.url };
});

onMounted(() => {
    const chartContainer: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myChart');
    const plugin = {
        id: 'custom_canvas_background_image',
        legend: { display: false },
        beforeDraw: (chart: any) => {
            if (yAxis.every((img) => img.image.complete)) {
                yAxis.forEach((yAxis, index, arr) => {
                    const ctx = chart.ctx;

                    const { width, height } = chart.chartArea;
                    const barHeight = height / arr.length;
                    const x1 = 0;
                    const y1 = 5 + (index * barHeight);
                    const x2 = width + 60;
                    const y2 = barHeight;
                    ctx.globalAlpha = 0.6;
                    ctx.fillStyle = yAxis.color;
                    ctx.fillRect(x1, y1, x2, y2);
                    ctx.globalAlpha = 1;
                    ctx.drawImage(yAxis.image, x1 + 5, y1, height / arr.length, height / arr.length);
                    ctx.restore();
                })
            }
        }
    };
    if (chartContainer) {
        const myChart = new Chart(chartContainer as HTMLCanvasElement, {
            type: 'line',
            data: graphData(),
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                },
                scales: {
                    y: {
                        display: false,
                        grid: {
                            display: true,
                        },
                        beginAtZero: false,
                        min: 400,
                        max: 2000,
                        ticks: {
                            stepSize: 400,
                        },
                        grace: 0
                    },
                    x: {
                        display: true,
                        grid: {
                            display: true
                        }
                    }
                },
                layout: {
                    padding: {
                        left: 60,
                    }
                },
                maintainAspectRatio: false,
            },
            plugins: [plugin],
        });
    }
})

</script>

<template>
    <div class="bg-white p-2 mt-4">
        <h3>Rating 2022</h3>
        <div class="h-72">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<style scoped>
</style>
