<template>
  <el-row :gutter="40">
    <el-col :span="8">
      <template v-if="simulations">
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

    <template v-if="simulations">
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
      <template v-if="cur_simul">
        <div class="sim_execute">
          <div class="model_name">
            <h3>
              Choosen model is:
              <i style="color: chartreuse">{{ simulations[cur_simul-1].json_data }}</i>
            </h3>
            <el-button >Choose Again</el-button>
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
import { storeToRefs } from 'pinia'

const store = useStore()
const {simulations, cur_simul} = storeToRefs(store)


</script>
