<template>
  <el-table :data="models_history" flexible = true style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="model_name" label="Model Name" width="180" />
    <el-table-column prop="simulation_name" label="Simulation Name" width="180" />
    <el-table-column prop="csv_path" label="Csv Path" width="180" />
    <el-table-column prop="date" label="Date" />
  </el-table>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

let models_history = ref([]);

onMounted(async () => {
  await axios
    .get("http://127.0.0.1:8000/get_simuls")
    .then((response) => {
      models_history.value = response.data;
      console.log(models_history)
    })
    .catch((error) => {
      alert(error);
    });
});

//const fields = ["id", "model_name", "simulation_name", "csv_path", "date"];
const fields = computed(() => {
  if (models_history.value) {
    return Object.keys(models_history.value[0]).slice(0, -1);
  }
});
</script>
