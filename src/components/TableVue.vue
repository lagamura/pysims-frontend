<template>
  <el-table :data="models_history" :flexible="true" max-height="300" :default-expand-all="true" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="model_name" label="Model Name" width="180" />
    <el-table-column prop="simulation_name" label="Simulation Name" width="180" />
    <el-table-column prop="csv_path" label="Csv Path" width="180" />
    <el-table-column prop="date" label="Date" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button text size="small" @click.prevent="deleteRow(scope.$index)"> Remove </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="pushNewSimulView()">Add Simulation</el-button>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useFetch } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

const url = 'http://127.0.0.1:8000/get_simuls'

const { isFetching, error, data } = await useFetch(url).get().json()
//console.log(typeof(data))
//console.log(`data is: ${data}`)
//console.log(`data value is: ${data.value}`)

const models_history = ref(data)
//console(`models_history = ${models_history}`)

function pushNewSimulView() {
  const redirectPath = route.query.redirect || '/new-simulation'
  router.push(redirectPath)
}

//const fields = ["id", "model_name", "simulation_name", "csv_path", "date"];
const fields = computed(() => {
  if (models_history.value) {
    return Object.keys(models_history.value[0]).slice(0, -1)
  }
})
</script>
