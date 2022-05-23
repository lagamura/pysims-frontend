<template>
  <div class="container pt-5 h-100 d-flex flex-column">
    <!--
    <div class="d-flex justify-content: center">
    </div>
    -->
    <div class="row h-100 mb-2">
      <div class="col">
        <!-- No col class here because it is on component. THIS needs to be refactored and fixed properly for consistency-->
        <DataChartComp />
      </div>
    </div>
  </div>
</template>

<script setup>
import DataChartComp from "../components/DataChartComp.vue";


</script>
