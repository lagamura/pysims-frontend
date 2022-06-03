<template>
  <el-row :gutter="40">
    <el-col :span="8">
      <template v-if="!store.simulation.model_name">
        <h3>Step 1 Choose an Available Model</h3>
        <suspense>
          <ListAvailableModels />
          <template #fallback> ...Loading </template>
        </suspense>
      </template>
      <template v-else>
        <SimVars />
      </template>
    </el-col>

    <template v-if="store.simulation.model_name">
      <el-col :span="16">
        <suspense>
          <DocTable />
          <template #fallback> ...Loading </template>
        </suspense>
      </el-col>
    </template>
  </el-row>
  <el-row>
    <el-col>
      <template v-if="store.simulation.model_name">
        <div class="sim_execute">
          <div class="model_name">
            <h3>
              Choosen model is:
              <i style="color: chartreuse">{{ store.simulation.model_name }}</i>
            </h3>
            <el-button @click="resetState">Choose Again</el-button>
          </div>
        </div>
      </template>
    </el-col>
  </el-row>
  <el-divider />

  <el-row justify="center">
    <DataChartComp />
  </el-row>
</template>

<script lang="ts" setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import DataChartComp from '../components/DataChartComp.vue'
import DocTable from '../components/DocTable.vue'
import SimVars from '../components/SimVars.vue'

import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'

const store = useStore()

function resetState() {
  store.$reset()
}
</script>
