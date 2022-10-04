<template>
  <div class="btn-wrapper">
    <el-button @click="showFlag = !showFlag">Model Documentation</el-button>
  </div>

  <el-table
    v-if="showFlag"
    :data="model_doc"
    :default-expand-all="true"
    style="width: 100%"
    max-height="600"
  >
    <el-table-column prop="Real Name" label="Real Name" width="180" />
    <el-table-column prop="Py Name" label="Py Name" width="180" />
    <!-- <el-table-column prop="Subscripts" label="Subscripts" /> -->
    <el-table-column prop="Units" label="Units" width="180" />
    <el-table-column prop="Limits" label="Limits" />
    <el-table-column prop="Type" label="Type" />
    <el-table-column prop="Subtype" label="Subtype" />
    <el-table-column prop="Comment" label="Comment" :show-overflow-tooltip="true" />
  </el-table>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useStore } from '../store/SimStore'
import { ElMessage } from 'element-plus'
import { useMyFetch } from '@/composables/getjson'

const store = useStore()

const showFlag = ref(true)
const model_doc = ref()
const url_endpoint = ref('')

const props = defineProps({
  modelName: String
})

async function getModelDoc() {
  const { data, onFetchResponse, onFetchError } = await useMyFetch(url_endpoint.value, {
    refetch: true
  })
    .get()
    .json()
  //console.log(data.value)
  model_doc.value = Object.values(data.value)
  store.simulation.components = Object.values(data.value)
  //console.log(JSON.stringify(store.simulation.components))
  
  // This is on comments because it will change every time vars exposed!
  // store.simulation.components.forEach((component) => {
  //   component.student_control = false
  //   component._value = null
  // })

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

async function get_components_values() {
  const url_endpoint = '/get_components_values/' + props.modelName
  const { data, onFetchResponse, onFetchError } = await useMyFetch(url_endpoint, {}).get().json()
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

watch(
  () => props.modelName,
  (before, after) => {
    url_endpoint.value = '/get_model_docs/' + props.modelName
    getModelDoc().then(() => get_components_values())
  }
)
</script>
