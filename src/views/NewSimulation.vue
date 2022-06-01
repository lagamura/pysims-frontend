<template>
  <template v-if="!store.simulation.model_name">
    <div>
      <h3>Step 1 Choose an Available Model</h3>
      <suspense>
        <ListAvailableModels />
        <template #fallback> ...Loading </template>
      </suspense>
    </div>
  </template>
  <template v-else-if="store.simulation.model_name">
    <div class="sim_execute" flex>
      <div class="model_name">
        <h3>
          Choosen model is:
          <i style="color: chartreuse">{{ store.simulation.model_name }}</i>
        </h3>
      </div>
      <div>
        <DataChartComp />
      </div>
    </div>
  </template>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import DataChartComp from '../components/DataChartComp.vue'
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'

const store = useStore()
</script>
