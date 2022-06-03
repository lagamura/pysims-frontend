<template>
  <el-row>
    <h3>Simulations history</h3>
    <suspense>
      <TableVue />
      <template #fallback> ...Loading </template>
    </suspense>
  </el-row>
  <el-row>
    <ChartSimul v-if="flag" :sim-results="store.simulation.json_data" />
  </el-row>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import TableVue from '../components/TableVue.vue'
import ChartSimul from '../components/ChartSimul.vue'
</script>
