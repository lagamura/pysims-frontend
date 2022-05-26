<template>
      <h4 class="text-center">Model Documentation</h4>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Real Name</th>
        <th scope="col">Py Name</th>
        <th scope="col">Subscripts</th>
        <th scope="col">Units</th>
        <th scope="col">Limits</th>
        <th scope="col">Type</th>
        <th scope="col">Subtype</th>
        <th scope="col">Comment</th>

      </tr>
    </thead>
    <tbody>
      <!-- Loop through the list get the each student data -->
      <tr v-for="item in model_doc" :key="item">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import axios from "axios";
import { onMounted, computed,ref} from "vue";
import { useStore } from "../store/SimStore";

const store = useStore();

let model_doc = ref([]);
const url = "http://127.0.0.1:8000/get_model_docs/"+ store.simulation.model_name

onMounted(async () => {
  await axios
    .get(url)
    .then((response) => {
      model_doc.value = response.data;
      console.log(`Bootstrap table response:${model_doc.value}`)
    })
    .catch((error) => {
      alert(error);
    });
});

const fields = computed(() => {
  if (model_doc.value) {
    return Object.keys(model_doc.value[0]);
  }
});

</script>
