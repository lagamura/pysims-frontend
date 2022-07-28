<template>
  <el-row :gutter="40">
    <el-col :span="8">
      <h3>Step 1 - Choose an Available Model</h3>
      <suspense>
        <ListAvailableModels />
        <template #fallback> ...Loading </template>
      </suspense>
      <suspense>
        <SimVars />
        <template #fallback> ...Loading SimVars </template>
      </suspense>
      <h3>Step 3 - Choose a simulation name</h3>
      <el-input v-model="simul.name" placeholder="Your Simulation Name" />
    </el-col>

    <template v-if="simulations">
      <el-col :span="16">
        <suspense>
          <DocTable :model-name="simul.model_name" />
          <template #fallback> ...Loading </template>
        </suspense>
      </el-col>
    </template>
  </el-row>

  <el-row>
    <el-col>
      <template v-if="cur_simul">
        <div class="sim_execute">
          <div class="model_name">
            <h3>
              Choosen model is:
              <i style="color: chartreuse">{{ simulations[cur_simul - 1].model_name }}</i>
            </h3>
            <el-button>Choose Again</el-button>
          </div>
        </div>
      </template>
    </el-col>
  </el-row>
  <el-divider />

  <el-row justify="center">
    <el-button class="btn" @click="PostSimulation"> Run Simulation </el-button>
  </el-row>

  <el-row justify="center">
    <DataChartComp />
  </el-row>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import DataChartComp from '../components/DataChartComp.vue'
import DocTable from '../components/DocTable.vue'
import SimVars from '../components/SimVars.vue'
import { postSim } from '../composables/getjson'

import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'

const store = useStore()
const { simulations, cur_simul, simul } = storeToRefs(store)

async function PostSimulation(event) {
  if (event) {
    //console.log("button event triggered");

    try {
      const response = await postSim(simul.value)
      data.value = await response.json()
      JsonObj.value = JSON.parse(data.value)

    } catch (error) {
      console.log('Error! Could not reach the API. ' + error)
    }
  }
}
</script>
