<template>
  <el-row :gutter="40">
    <el-col :span="8">
      <template v-if="true">
        <h3>Step 1 Choose an Available Model</h3>
        <suspense>
          <ListAvailableModels @model-name="(model: string) => modelName = model "/>
          <template #fallback> ...Loading </template>
        </suspense>
        <suspense>
          <SimVars :model-name="modelName" />
          <template #fallback> ...Loading SimVars </template>
        </suspense>
      </template>
    </el-col>

    <template v-if="simulations">
      <el-col :span="16">
        <suspense>
          <DocTable :model-name = "modelName"/>
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
    <DataChartComp />
  </el-row>
</template>

<script lang="ts" setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import DataChartComp from '../components/DataChartComp.vue'
import DocTable from '../components/DocTable.vue'
import SimVars from '../components/SimVars.vue'

import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'
import { watch, ref} from 'vue'

const store = useStore()
const { simulations, cur_simul } = storeToRefs(store)

const modelName = ref('')

watch(modelName, (newvalue) => {
  console.log(`modelName in NewSimulation component has changed: ${newvalue}`)
  })

</script>
