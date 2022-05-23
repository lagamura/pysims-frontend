<template>
  <canvas id="myChart" width="300" height="300"></canvas>
</template>
<script setup>
import {onMounted} from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  simResults: Object | String,
});

console.log(props.simResults);

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
    pointRadius: 0,
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

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomRgba() {
  const r = parseInt(Math.random() * 255)
  const g = parseInt(Math.random() * 255)
  const b = parseInt(Math.random() * 255)
  const a = 0.4
  return([`rgb(${r},${g},${b})`,`rgba(${r},${g},${b},${a})`])
}
</script>