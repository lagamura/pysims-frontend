<template>
  <div>
    <h3>
      Simulation Variables of Model:
      <i>{{ store.simulation.model_name }}</i>
    </h3>
    <div v-for="vars in simulVars">
      <div class="slider-demo-block">
        <span class="demonstration">{{ vars }}</span>
        <el-slider show-input />
      </div>
    </div>
  </div>
  <div>
    <button type="button" class="btn" @click="getJsonData">
      Run Simulation
    </button>
  </div>
  <div>
    <!-- Conditional Rendering of the component -->
    <ChartExample v-if="flag" :sim-results="JsonObj" />
  </div>

</template>

<script setup>
import { onMounted, computed, watch, ref } from "vue";
import ChartExample from "./ChartExample.vue";
import { useStore } from "../store/SimStore";

const store = useStore();

let flag = ref(false);
let data = ref("");
const params = ref([]);
const JsonObj = ref(null);

const data_namespace = ref("");
const namespace = ref(null);

const url = "http://127.0.0.1:8000/get_simul_res_json/1";
const url_namespace =
  "http://127.0.0.1:8000/get_model_namespace/" + store.simulation.model_name;
console.log(url_namespace);

async function postSim() {
  fetch("https://example.com/profile", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getSimVars(event) {
  if (store.simulation.model_name) {
    try {
      const response = await fetch(url_namespace);
      namespace.value = await response.json();

      console.log("namespace are:", namespace.value);
    } catch (error) {
      console.log("Error! Could not reach the API. " + error);
    }
  }
}

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

async function runSimulation() {}

// instead, use a getter:
watch(data, (newData) => {
  console.log(`newData are ${newData}`);
});

onMounted(() => {
  getSimVars();
  getJsonData();
});

const simulVars = computed(() => {
  if (namespace.value) {
    return Object.keys(namespace.value);
  }
});
</script>


<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: clip;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>