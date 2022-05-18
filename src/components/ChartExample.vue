<template>
  <canvas id="myChart" width="400" height="400"></canvas>
</template>
<script setup>
import { ref, reactive, onMounted, computed, toRef } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  simResults: Object,
}); //'title','data'
const sim_results = toRef(props, "simResults");
console.log(sim_results);
console.log(props.simResults);

// const datasetsArray = [
//   {
//     label: String(Object.keys(columns)[0]),
//     backgroundColor: "rgb(255, 99, 132)",
//     borderColor: "rgb(255, 99, 132)",
//     data: columns["cumulative cases"],
//   },
// ];

// for (const column in columns) {
//   datasetsArray.push({
//     label: String(column), // fix keys!
//     backgroundColor: getRandomColor(),
//     data: column[0],
//   });
// }

const data = {
  //labels: props.labels,
  datasets: [
    {
      label: "Foo Label",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: sim_results["cumulative cases"],
    },
  ],
};

onMounted(() => {
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {},
  });
});

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
</script>