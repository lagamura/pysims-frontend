<template>
  <el-table
    :data="store.user_simulations"
    :flexible="true"
    max-height="300"
    :default-expand-all="true"
    style="width: 100%"
    highlight-current-row
    ref="singleTableRef"
    @current-change="handleCurrentChange"
  >
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="model_name" label="Model Name" :sortable="true" width="180" />
    <el-table-column prop="simulation_name" label="Simulation Name" width="180" />
    <el-table-column prop="csv_path" label="Csv Path" width="180" />
    <el-table-column prop="date" :sortable="true" label="Date" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          trigger="hover"
          effect="light"
          width="auto"
          @confirm="deleteRow(scope.$index)"
        >
          <template #reference>
            <el-button text size="small"> Delete </el-button>
          </template>
        </el-popconfirm>
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
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus/lib/components'

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
  store.cur_simul = -1
  const { error,onFetchError } = useFetch('http://127.0.0.1:8000/delete_simul_by_id/' + (index + 1)).delete()
  // Request will be sent with POST method and data will be parsed as text
  onFetchError((error) => {
    console.log(error.message)
    console.error(error.message)
    ElMessage.error({
      message: 'Problem connecting to API',
      type: 'error'
    })
  })
  store.removeItem(index + 1)
  

}

const router = useRouter()

const url = 'http://127.0.0.1:8000/get_simuls'

const { data } = useFetch(url).get().json()

store.user_simulations = data.value
//set state of user_simulations

function pushNewSimulView() {
  const redirectPath = '/tutor-dashboard' // route.query.redirect || 'tutor-dashboard' throws ts problem
  router.push(redirectPath)
}

//const fields = ["id", "model_name", "simulation_name", "csv_path", "date"];
const fields = computed(() => {
  if (store.user_simulations) {
    return Object.keys(store.user_simulations[0]).slice(0, -1) // here i use slice to exclude json data
  }
})
</script>
