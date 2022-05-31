<template>
  <div class="">
    <div>
      <h3>Step 1 Choose an Available Model</h3>
      <ListAvailableModels />
    </div>
    <div class="container pt-5 h-100">
      <DataChartComp />
    </div>
  </div>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import DataChartComp from '../components/DataChartComp.vue'
</script>
