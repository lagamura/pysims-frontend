<template>
  <!-- <div class="list-group">
    <h3>List of Available Models</h3>
    <a class="list-group-item" v-for="model in models" :key="model.id">
      {{ model }}
    </a>
  </div> -->
  <div class="dropdown">
    <h3>Step 1 Choose a Simulation Model</h3>
    <a
      class="btn btn-secondary dropdown-toggle"
      href="#"
      role="button"
      id="dropdownMenuLink"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Choose a Simulation Model
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <template v-if="models">
        <li v-for="model in models" :key="model.id">
          <a class="dropdown-item" href="#" @click="setModelName(model)">
            {{ model }}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const url = "http://127.0.0.1:8000/get_available_models";

const models = ref([]); // with axios
const state = ref("");

async function getJsonData() {
  // this needs to run asychronous

  //console.log("button event triggered");

  try {
    const response = await fetch(url);
    models.value = await response.json();
    //console.log(data.value);
  } catch (error) {
    console.log("Error! Could not reach the API. " + error);
  }
}

onMounted(() => {
  getJsonData();
});

function setModelName(model) {
  state.value = model;
  console.log(state.value);
}
</script>