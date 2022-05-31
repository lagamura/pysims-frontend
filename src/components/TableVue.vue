<template>
  <el-table :data="models_history" :flexible="true" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="model_name" label="Model Name" width="180" />
    <el-table-column
      prop="simulation_name"
      label="Simulation Name"
      width="180"
    />
    <el-table-column prop="csv_path" label="Csv Path" width="180" />
    <el-table-column prop="date" label="Date" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button text size="small" @click.prevent="deleteRow(scope.$index)">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="pushNewSimulView()"
    >Add Simulation</el-button
  >
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'


let models_history = ref([])

const router = useRouter()
const route = useRoute()


onMounted(async () => {
  await axios
    .get('http://127.0.0.1:8000/get_simuls')
    .then((response) => {
      models_history.value = response.data
      console.log(models_history)
    })
    .catch((error) => {
      alert(error)
    })
})

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
