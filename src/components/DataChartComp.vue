<template>
  <div class="row mb-3 justify-content-center">
    <div class="col">
      <button @click="getJsonData">Fetch Data</button>

      <h3>Simulation Variables</h3>
      <li v-for="vars in simulVars">
        {{ vars }}
      </li>
    </div>
    <div class="col">
      <!-- Conditional Rendering of the component -->
      <ChartExample v-if="flag" :sim-results="JsonObj" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import ChartExample from "./ChartExample.vue";

// const state = reactive({
//   flag: false,
//   sim_results: [],
// });

let flag = ref(false);
let data = ref("");
const JsonObj = ref(null);

const url = "http://127.0.0.1:8000/get_simul_res_json/1";

async function getJsonData(event) {
  // this needs to run asychronous
  if (event) {
    //console.log("button event triggered");

    try {
      const response = await fetch(url);
      data.value = await response.json();
      JsonObj.value = JSON.parse(data.value);
      flag.value = true;

      //console.log("SimulVars are:", simulVars.value);
    } catch (error) {
      console.log("Error! Could not reach the API. " + error);
    }
  }
}

// instead, use a getter:
watch(data, (newData) => {
  console.log(`newData are ${newData}`);
});

onMounted(() => {
  getJsonData();
});

const simulVars = computed(() => {
  if (JsonObj.value) {
    return Object.keys(JsonObj.value);
  }
});
</script>

<!-- jsonify and object
    .then((response) => response.json())
    .then((data) => {
      state.sim_results = JSON.parse(data);
      console.log(state.sim_results);
-->