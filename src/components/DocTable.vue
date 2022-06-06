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
    <!-- <el-table-column prop="Py Name" label="Py Name" width="180" /> -->
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
import { useFetch } from '@vueuse/core'
import { MutationType } from 'pinia'

const showFlag = ref(true)
const model_doc = ref()
const url = ref('')

const props = defineProps({
  modelName: String
})

async function getModelDoc() {
  const { isFetching, error, data, onFetchResponse, onFetchError } = await useFetch(url.value, {
    refetch: true
  })
    .get()
    .json()
  console.log(data.value)
  model_doc.value = Object.values(data.value)
  // for (var obj of Object.values(data.value)){
  //   model_doc.push(obj)
  // }
  console.log(model_doc)

  onFetchResponse((response) => {
    console.log(`data Fetched! ${response.status}`)
    //console.log(`data on Fetch Response ${model_doc.value}`)
  })

  onFetchError((error) => {
    console.log(`Error Occured in Fetching Doc ${error}`)
  })
}

// const fields = computed(() => {
//   if (model_doc.value) {
//     return Object.keys(model_doc.value[0])
//   }
// })

watch(
  () => props.modelName,
  (before, after) => {
    url.value = 'http://127.0.0.1:8000/get_model_docs/' + props.modelName
    getModelDoc()
  }
)
</script>
