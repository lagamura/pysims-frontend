<template>
  <Button justify-center content-center>Model Documentation</Button>
  <el-table v-if="true" :data="model_doc" table-layout="auto">
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
import axios from 'axios'
import { onMounted, computed, ref } from 'vue'
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'

const store = useStore()

const url =
  'http://127.0.0.1:8000/get_model_docs/' + store.simulation.model_name

const { isFetching, error, data, onFetchResponse, onFetchError } =
  await useFetch(url).get().json()

console.log(typeof data)
console.log(data)
const model_doc = Object.values(data.value) // this maybe should be a ref or comp prop
console.log(model_doc)

onFetchResponse((response) => {
  console.log(response.status)
})

// console.log(`model_doc is ${model_doc}`)

const fields = computed(() => {
  if (model_doc.value) {
    return Object.keys(model_doc.value[0])
  }
})
</script>
