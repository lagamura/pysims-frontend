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
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ElTable } from 'element-plus'
import { useStore } from '../store/SimStore'
import { useMyFetch } from '@/composables/getjson'
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const store = useStore()

interface SimRow {
  id: number
  model_name: string
  simulation_name: string
  csv_path: string
  date: string
}

const currentRow = ref<SimRow>()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

const setCurrent = (row?: SimRow) => {
  singleTableRef.value!.setCurrentRow(row)
}

const handleCurrentChange = (val: SimRow) => {
  currentRow.value = val
  console.log(currentRow.value)
  console.log(`id is: ${currentRow.value.id}`)
  // State change//
  store.cur_simul = currentRow.value.id
  store.JsonObj = store.user_simulations[val.id -1 ].json_data
  store.simulation.model_name = store.user_simulations[val.id - 1].model_name

  // rerouting & render components
  getModelDoc(val.model_name).then(() => {
    get_components_values(val.model_name)
    const redirectPath = '/dashboard' // route.query.redirect || 'tutor-dashboard' throws ts problem
    router.push(redirectPath)
  })
}

const deleteRow = (index: number) => {
  console.log(index)
  store.cur_simul = -1
  const { error, onFetchError } = useMyFetch('/delete_simul_by_id/' + (index + 1)).delete()
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

const url_endpoint = '/get_simuls'

const { data } = await useMyFetch(url_endpoint).get().json()

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

async function getModelDoc(model_name: string) {
  const { data, onFetchResponse, onFetchError } = await useMyFetch('/get_model_docs/' + model_name)
    .get()
    .json()
  console.log(data.value)
  store.simulation.components = Object.values(data.value)
  //console.log(JSON.stringify(store.simulation.components))
  store.simulation.components.forEach((component) => {
    component.student_control = false
    component._value = 0
  })

  onFetchResponse((response) => {
    console.log(`data Fetched! ${response.status}`)
  })

  onFetchError((error) => {
    console.log(error.message)
    console.error(error.message)
    ElMessage.error({
      message: 'Problem connecting to API',
      type: 'error'
    })
  })
}

async function get_components_values(model_name: string) {
  const url_endpoint = '/get_components_values/' + model_name
  const { data, onFetchError } = await useMyFetch(url_endpoint, {}).get().json()
  console.log('data are', data)
  store.simulation.components.forEach((component) => {
    component._value = data.value[component['Real Name']] // be carefull there is a glitch in .Real_name property, we cannot access it by simulation.Real_Name
  })
  store.simulation.start_time = 0
  store.simulation.end_time = store.simulation.components.filter(
    (component) => component['Real Name'] == 'TIME STEP'
  )[0]._value

  onFetchError((error) => {
    console.log(error.message)
    console.error(error.message)
    ElMessage.error({
      message: 'Problem connecting to API',
      type: 'error'
    })
  })
}
</script>