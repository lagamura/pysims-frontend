<template>
  <div class="container pt-5">
    <!--
    <div class="d-flex justify-content: center">
    </div>
    -->
    <div class="row mb-2">
      <!-- No col class here because it is on component. THIS needs to be refactored and fixed properly for consistency-->
      <DataChartComp />
    </div>
  </div>
</template>

<script setup>
import ResultsGraph from "../components/ResultsGraph.vue";
import Posts from "../components/Posts.vue";
import DataChartComp from "../components/DataChartComp.vue";
import ChartExample from "../components/ChartExample.vue";
import BarChart from "../components/BarChart.vue";
</script>