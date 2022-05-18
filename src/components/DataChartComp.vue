<template>
  <div class="row mb-3">
    <div class="col-md-4 themed-grid-col">
      <h3>Simulation Variables</h3>
      <li v-for="vars in simulVars">
        {{ vars }}
      </li>
    </div>
    <div class="col-md-4 themed-grid-col">
      <h3>Simulation Results</h3>
      <button @click="getJsonData">Fetch Data</button>
      <!-- Conditional Rendering of the component -->
      <ChartExample v-if="state.flag" :sim-results="state.sim_results" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, watch } from "vue";
import ChartExample from "./ChartExample.vue";

const state = reactive({
  flag: false,
  sim_results: [],
});

function getJsonData(event) {
  // this needs to run asychronous
  if (event) {
    //console.log("button event triggered");

    fetch("http://127.0.0.1:8000/get_simul_res_json/1")
      .then((response) => response.json())
      .then((data) => {
        state.sim_results = JSON.parse(data);
        console.log(state.sim_results);
      });
    state.flag = true;
  }
}

// instead, use a getter:
watch(
  () => state.sim_results,
  (sim_results) => {
    console.log(`sim_results is: ${sim_results}`)
  }
)

onMounted(() => {
  getJsonData();
});

const simulVars = computed(() => {
  console.log("Computed property triggered");

  return Object.keys(state.sim_results);
});
</script>

<!-- jsonify and object
    .then((response) => response.json())
    .then((data) => {
      state.sim_results = JSON.parse(data);
      console.log(state.sim_results);
-->