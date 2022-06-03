<template>
  <div>
    <el-button class="btn" @click="getJsonData"> Run Simulation </el-button>
    <!-- Conditional Rendering of the component -->
    <ChartExample v-if="flag" :sim-results="JsonObj" />
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import ChartExample from './ChartExample.vue'
import { useStore } from '../store/SimStore'

const store = useStore()

let flag = ref(false)
let data = ref('')
const JsonObj = ref(null)

const url = 'http://127.0.0.1:8000/get_simul_res_json/1'
//console.log(url_namespace);

async function postSim() {
  fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

async function getJsonData(event) {
  // this needs to run asychronous
  if (event) {
    //console.log("button event triggered");

    try {
      const response = await fetch(url)
      data.value = await response.json()
      JsonObj.value = JSON.parse(data.value)
      flag.value = true

      //console.log("SimulVars are:", simulVars.value);
    } catch (error) {
      console.log('Error! Could not reach the API. ' + error)
    }
  }
}

async function runSimulation() {}

// instead, use a getter:
watch(data, (newData) => {
  console.log(`newData are ${JSON.parse(newData)}`)
})

onMounted(() => {
  getJsonData()
})
</script>
