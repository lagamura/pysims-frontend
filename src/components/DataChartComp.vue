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
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, toRefs } from "vue";

const state = reactive({
  index: [],
  sim_results: [],
});

function getJsonData() {
  fetch("http://127.0.0.1:8000/get_simul_res_json/1")
    .then((response) => response.json())
    .then((data) => {
      state.sim_results = JSON.parse(data);
      console.log(state.sim_results);
    });
}

onMounted(() => {
  getJsonData();
  
});

const simulVars = computed(() => Object.keys(state.sim_results));
</script>