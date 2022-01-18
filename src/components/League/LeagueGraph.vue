<script setup lang="ts">
//registers everything inside chartjs
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import { onMounted } from 'vue';
import { RankDto, SummonerDto } from '../../interfaces/summoner.dto';
Chart.register(...registerables);

const props = defineProps<{
    summoners: SummonerDto[],
}>()

const colors = [
    'FireBrick',
    'Green',
    'Blue',
    'DarkOrchid',
    'Brown',
    'DarkMagenta',
    'Crimson',
    'DarkGreen',
    'HotPink',
    'Grey',
    'DarkBlue',
    'Gold',
    'BlueViolet',
];

export interface DataSet {
    label: string,
    backgroundColor?: string,
    borderColor?: string,
    data: { x: number, y: number, tooltip: string }[]
}

const graphData = () => {
    const dataSets: DataSet[] = [];
    props.summoners.forEach((sum, index) => {
        const dataSet: DataSet = {
            label: sum.name,
            data: [],
            backgroundColor: colors[index] || 'black',
            borderColor: colors[index] || 'black',
        }
        if (sum.ranking.soloQueueRanks.length < 7) return;
        sum.ranking.soloQueueRanks.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
        sum.ranking.soloQueueRanks.forEach((rank: RankDto) => {
            dataSet.data.push({
                x: rank.timestamp * 1000,
                y: rank.rating,
                tooltip: `${rank.tier} ${rank.rank} ${rank.points}`
            });
        });
        dataSets.push(dataSet);
    })
    return {
        datasets: dataSets,
    };
}


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
                    const widthOffset = 70;

                    // draw backgrounds
                    ctx.globalAlpha = 0.6;
                    ctx.fillStyle = yAxis.color;
                    ctx.fillRect(x1, y1, width + widthOffset, barHeight);
                    ctx.globalAlpha = 1;

                    // draw devision lines
                    ctx.font = "14px Roboto";
                    ctx.strokeStyle = '#999'

                    ctx.fillText("I", x1 + widthOffset - 10, y1 + .25 * barHeight);
                    ctx.fillText("II", x1 + widthOffset - 10, y1 + .5 * barHeight);
                    ctx.fillText("III", x1 + widthOffset - 10, y1 + .75 * barHeight);
                    if (index !== 3) {
                        ctx.fillText("IV", x1 + widthOffset - 10, y1 + barHeight);
                    }
                    ctx.beginPath();
                    ctx.moveTo(x1 + widthOffset + 10, y1 + .25 * barHeight);
                    ctx.lineTo(width + widthOffset + 10, y1 + .25 * barHeight);


                    ctx.moveTo(x1 + widthOffset + 10, y1 + .5 * barHeight);
                    ctx.lineTo(width + widthOffset + 10, y1 + .5 * barHeight);


                    ctx.moveTo(x1 + widthOffset + 10, y1 + .75 * barHeight);
                    ctx.lineTo(width + widthOffset + 10, y1 + .75 * barHeight);

                    ctx.moveTo(x1 + widthOffset + 10, y1 + barHeight);
                    ctx.lineTo(width + widthOffset + 10, y1 + barHeight);
                    ctx.stroke();

                    // draw emblems
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
                    tooltip: {
                        callbacks: {
                            label: function (context: any) {
                                console.log(context)
                                return context?.raw?.tooltip;
                            }
                        }
                    }
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
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                        grid: {
                            display: true
                        },
                        min: 1641772800000, // Monday, 10. January 2022 00:00:00
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
        <span class="leading-none">Rankings 2022</span>
        <span class="text-xs leading-none line block text-gray-500 mb-2">Solo Queue</span>
        <div class="h-80">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<style scoped>
</style>
