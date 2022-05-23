<template>
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Model name</th>
        <th scope="col">Simulation Name</th>
        <th scope="col">csv_path</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop through the list get the each student data -->
      <tr v-for="item in models_history" :key="item">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
      </tr>
    </tbody>
  </table>
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
