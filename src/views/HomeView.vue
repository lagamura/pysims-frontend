<template>
  <el-row>
    <h3>user_simulations history</h3>
    <suspense>
      <TableVue />
      <template #fallback> ...Loading </template>
    </suspense>
  </el-row>
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
</template>

<script lang="ts" setup>
import TableVue from '../components/TableVue.vue'
import ChartSimul from '../components/ChartSimul.vue'
import TestComp from '../components/TestComp.vue'

import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'
import { watch, computed } from 'vue'

const store = useStore()

const { user_simulations, cur_simul } = storeToRefs(store)

console.log(`State user_simulations:${user_simulations.value}`)

watch(cur_simul, (newvalue) => {
  console.log(`cur_simul has changed ${newvalue}`)
  //console.log(user_simulations.value[cur_simul.value - 1].json_data)
})

const json_data = computed(() => {
  if (cur_simul.value > 0) {
    return user_simulations.value[cur_simul.value - 1].json_data //hardcoded
  }
})

/*
      <TestComp
        v-if="cur_simul > 0"
        :cur-simul-counter="cur_simul"
        :sim-results="json_data"
      />
*/
</script>
