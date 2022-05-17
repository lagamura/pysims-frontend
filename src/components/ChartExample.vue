<template>
  <canvas id="myChart" width="400" height="400"></canvas>
</template>
<script setup>
import { reactive, onMounted, computed, toRefs } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
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
</script>