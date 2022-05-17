<template>
  <div class="container pt-5">
    <div class="d-flex justify-content: center">
      <!--not working centered-->
      <h3 class="pb-5">Results of your Simulation</h3>
    </div>
    <div class="row mb-2">
      <div>
        <!-- No col class here because it is on component. THIS needs to be refactored and fixed properly for consistency-->
        <DataChartComp />
      </div>
    </div>
    <div class="row mb-2">
      <h3>ChartExample Component</h3>
      <ChartExample />
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