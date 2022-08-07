<template>
  <el-row :gutter="40">
    <el-col :span="8">
      <h2>Model: {{ simulation.model_name }}</h2>
      <h3>Choose an Available Model</h3>
      <suspense>
        <ListAvailableModels />
        <template #fallback> ...Loading </template>
      </suspense>
      <h2>Choose Control Variables</h2>
      <TutorSelection />
      <h3>Step 3 - Choose a simulation name</h3>
      <el-input v-model="simulation.simulation_name" placeholder="Your Simulation Name" />
    </el-col>

    <template v-if="user_simulations">
      <el-col :span="16">
        <suspense>
          <DocTable :model-name="simulation.model_name" />
          <template #fallback> ...Loading </template>
        </suspense>
      </el-col>
    </template>
  </el-row>

  <el-row>
    <el-col>
      <template v-if="cur_simul > 0">
        <div class="sim_execute">
          <div class="model_name">
            <h3>
              Choosen model is:
              <i style="color: chartreuse">{{ user_simulations[cur_simul - 1].model_name }}</i>
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
  <!-- 
  <el-row justify="center">
    <el-col :span="10">
      <ChartSimul
        v-if="cur_simul > 0"
        :sim-results="json_data"
        :cur-simul-counter="cur_simul"
        :key="json_data"
      />
    </el-col>
  </el-row>
  -->
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import DocTable from '../components/DocTable.vue'
import { postSim } from '../composables/getjson'
import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'
import TutorSelection from '../components/TutorSelection.vue'

const store = useStore()
const { user_simulations, simulation, cur_simul } = storeToRefs(store)

async function PostSimulation(event) {
  if (event) {
    //console.log("button event triggered");
    const date = new Date()
    simulation.value.timestamp = formatDate(date)
    simulation.value.user = 'to-be-implemented'

    Object.entries(store.params_obj).forEach(([key, value]) => {
      simulation.value.params[value.param_name] = value.param_value
    })
    //console.log(`simulation.value.params: ${simulation.value.params}`)

    try {
      await postSim(simulation.value)

      //return response.json() // mdn guide
    } catch (error) {
      console.log('Error on Posting Simulation!' + error)
    }
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

function formatDate(date) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
      '-'
    ) +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(':')
  )
}
</script>
