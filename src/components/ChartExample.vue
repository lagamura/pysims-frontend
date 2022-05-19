<template>
  <canvas id="myChart" width="300" height="300"></canvas>
</template>
<script setup>
import { ref, reactive, onMounted, computed, toRef } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  simResults: Object | String,
}); //'title','data'
//const sim_results = toRef(props, "simResults");
// console.log("sim_results is:", sim_results);
// console.log("sim_results cumulative case is", sim_results["cumulative cases"]);
console.log(props.simResults);

//console.log(props.simResults);

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

const Dataset = [];

// Dataset.push({
//   label: "Foo Label",
//   backgroundColor: "rgb(255, 99, 132)",
//   borderColor: "rgb(255, 99, 132)",
//   data: props.simResults["cumulative cases"],
// });

for (var key of Object.keys(props.simResults)) {
  if (key.toUpperCase() != key) {
    // in order to avoid constant values
    Dataset.push({
      label: key,
      backgroundColor: getRandomColor(),
      borderColor: self.backgroundColor,
      data: props.simResults[key],
    });
  }
}

const data = {
  //labels: props.labels,
  datasets: Dataset,
};

onMounted(() => {
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
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