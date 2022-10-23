<template>
  <canvas id="radar_chart" :width="props._width" :height="props._height"></canvas>
</template>
<script setup>
import { ref, computed, onMounted, watch, toRef } from 'vue';
import { Chart, registerables } from 'chart.js';
import { storeToRefs } from 'pinia';
import { useStore } from '../store/SimStore';

Chart.register(...registerables);

const store = useStore();
const { simulation } = storeToRefs(store);

//store.simulation.components[1]._value = 200 // Warning - Is Final Time always in the 1st cell?

const props = defineProps({
  simResults: Object | String,
  curSimulCounter: Number,
  chartid: String,
  _width: { type: String, default: '450' },
  _height: { type: String, default: '300' }
});


console.log(`Spider Chart Rendering...`);

params_exposed = Object.keys(simulation.value.components.params)

console.log(params_exposed)

/* Global configs
Chart.defaults.global = { }
*/

const Dataset = [];

// for (var key of Object.keys(props.simResults)) {
//   if (key.toUpperCase() != key && key == props.chartid) {
//     // in order to avoid constant values
//     //const rgba = getRandomRgba()
//     Dataset.push({
//       labels: key,
//       backgroundColor: stringToColour(props.chartid),
//       borderColor: stringToColour(props.chartid),
//       data: props.simResults[key]
//     });
//   }
//}

const data = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    },
    {
      label: 'My Second Dataset',
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }
  ]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
  plugins: [
    {
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'White';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    }
  ]
};

onMounted(() => {
  const myChart = new Chart(document.getElementById('radar_chart'), config);
});
</script>

<style scoped></style>
