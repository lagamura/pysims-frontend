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
      <ChartSimul v-if="simulation.json_data" :sim-results="simulation.json_data" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TableVue from '../components/TableVue.vue'
import ChartSimul from '../components/ChartSimul.vue'

import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue';

const store = useStore()
const { simulation } = storeToRefs(store)

watch(simulation, (newvalue) => {
  console.log(`state has changed ${newvalue}`)
})

</script>
