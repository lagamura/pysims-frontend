<template>
  <el-row>
    <h3>Simulations history</h3>
    <suspense>
      <TableVue />
      <template #fallback> ...Loading </template>
    </suspense>
  </el-row>
  <el-row justify="center">
    <el-col :span="10">
      <ChartSimul
        v-if="cur_simul"
        :sim-results="simulations[cur_simul - 1].json_data"
        :cur-simul-counter="cur_simul"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TableVue from '../components/TableVue.vue'
import ChartSimul from '../components/ChartSimul.vue'

import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const store = useStore()

const { simulations, cur_simul } = storeToRefs(store)
console.log(`State Simulations:${simulations}`)
{{simulations}}

watch(cur_simul, (newvalue) => {
  console.log(`cur_simul has changed ${newvalue}`)
  console.log(simulations.value[cur_simul.value - 1].json_data)
})
</script>
