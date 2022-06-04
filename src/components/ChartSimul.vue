<template>
  <canvas id="myChart" width="400" height="400"></canvas>
</template>
<script setup>
import {onMounted, watch} from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  simResults: Object | String,
});

watch(props.simResults, (newValue) => {
  console.log(`Sim Results has changed - new dataset is: ${newValue}`)
})
/* Global configs
Chart.defaults.global = { }
*/

const Dataset = [];

for (var key of Object.keys(props.simResults)) {
  if (key.toUpperCase() != key) {
    // in order to avoid constant values
    const rgba = getRandomRgba()
    Dataset.push({
      label: key,
      backgroundColor: rgba[1],
      borderColor: rgba[0],
      data: props.simResults[key],
    });
  }
}

const data = {
  //labels: props.labels,
  datasets: Dataset,
};

const config = {
  type: "line",
  data: data,
  options: {
    pointRadius: 2,
    pointHoverRadious: 7,
    plugins: {
      title: {
        display: true,
        text: "Simulation Results",
      },
      legend: {
        position: "bottom",
      },
    },
  },
};

onMounted(() => {
  const myChart = new Chart(document.getElementById("myChart"), config);

});

// Chart.defaults.elements.line.borderColor = "rgba(0.3, 0.5, 0.4, 0.1)"; // Change settings globaly
// Chart.defaults.elements.line.backgroundColor = "rgba(0.2, 0.2, 0.6, 0.1)"; // Change settings globaly


function getRandomRgba() {
  const r = Math.random() * 255
  const g = Math.random() * 255
  const b = Math.random() * 255
  const a = 0.4
  return([`rgb(${r},${g},${b})`,`rgba(${r},${g},${b},${a})`])
}
</script>