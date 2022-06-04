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
      <ChartSimul v-if="cur_simul" :sim-results="simulations[cur_simul - 1].json_data" />
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
store.init()

const { simulations, cur_simul } = storeToRefs(store)
console.log(`State Simulations:${simulations}`)

watch(cur_simul, (newvalue) => {
  console.log(`cur_simul has changed ${newvalue}`)
  //console.log(store.cur_simul)
})
</script>
