<template>
  <div class="btn-wrapper">
    <el-button @click="showFlag = !showFlag">Model Documentation</el-button>
  </div>

  <el-table v-if="showFlag" :data="model_doc" :default-expand-all="true" style="width: 100%" height="600" >
    <el-table-column prop="Real Name" label="Real Name" />
    <el-table-column prop="Py Name" label="Py Name" />
    <el-table-column prop="Subscripts" label="Subscripts" />
    <el-table-column prop="Units" label="Units" />
    <el-table-column prop="Limits" label="Limits" />
    <el-table-column prop="Type" label="Type" />
    <el-table-column prop="Subtype" label="Subtype" />
    <el-table-column prop="Comment" label="Comment" />
  </el-table>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'
import { MutationType } from 'pinia'

const store = useStore()

const showFlag = ref(true)
const model_doc = ref()

const url = computed(() => {
  return 'http://127.0.0.1:8000/get_model_docs/' + store.simulation.model_name
})

async function getModelDoc() {
  const { isFetching, error, data, onFetchResponse, onFetchError } = await useFetch(url, { refetch: true }).get().json()
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
}

// const fields = computed(() => {
//   if (model_doc.value) {
//     return Object.keys(model_doc.value[0])
//   }
// })

store.$subscribe((mutation, state) => {
  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('simStore', JSON.stringify(state))
  console.log(localStorage)

  //---//
  //const url = 'http://127.0.0.1:8000/get_model_docs/' + store.simulation.model_name
  //console.log(`Url is: ${url.value}`)
})

onMounted(() => {
  console.log('On Mounted Triggered')
  console.log(url)
  getModelDoc() // Fetch doc data
})
</script>
