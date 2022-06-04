<template>
  <el-table
    :data="models_history"
    :flexible="true"
    max-height="300"
    :default-expand-all="true"
    style="width: 100%"
    highlight-current-row
    ref="singleTableRef"
    @current-change="handleCurrentChange"
  >
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

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { ElTable } from 'element-plus'
import { useFetch } from '@vueuse/core'
import { useStore } from '../store/SimStore'
import { useGetJsonData } from '../composables/getjson'

const store = useStore()

interface SimRow {
  id: number
  model_name: string
  simulation_name: string
  csv_path: string
  date: string
}

const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

const setCurrent = (row?: SimRow) => {
  singleTableRef.value!.setCurrentRow(row)
}

const handleCurrentChange = (val: SimRow | undefined) => {
  currentRow.value = val
  console.log(currentRow.value)
  console.log(`id is: ${currentRow.value.id}`)
  // State change//
  store.cur_simul = currentRow.value.id
}

const deleteRow = (index: number) => {
  console.log(index)
  store.removeItem(index)
}

const router = useRouter()
const route = useRoute()

const url = 'http://127.0.0.1:8000/get_simuls'

const { isFetching, error, data} = await useFetch(url).get().json()

const models_history = ref(data)

function pushNewSimulView() {
  const redirectPath = '/new-simulation' // route.query.redirect || 'new-simulation' throws ts problem
  router.push(redirectPath)
}

//const fields = ["id", "model_name", "simulation_name", "csv_path", "date"];
const fields = computed(() => {
  if (models_history.value) {
    return Object.keys(models_history.value[0]).slice(0, -1)
  }
})
</script>
