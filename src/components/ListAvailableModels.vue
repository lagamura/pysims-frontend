<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      Dropdown List
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown v-if="models">
      <el-dropdown-menu>
        <el-dropdown-item v-for="model in models" :key="model.id">
          <a class="dropdown-item" @click="setModelName(model); $emit('renderVariables', model)">
            {{ model }}
          </a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'

const url = 'http://127.0.0.1:8000/get_available_models'

const { isFetching, error, models, execute } = await useFetch(url,{ immediate: false })

const emit = defineEmits(['renderVariables'])

const store = useStore()
console.log(store.simulation)

const state = ref('')

// async function getModels() {
//   // this needs to run asychronous

//   //console.log("button event triggered");

//   try {
//     const response = await fetch(url)
//     models.value = await response.json()
//     //console.log(data.value);
//   } catch (error) {
//     console.log('Error! Could not reach the API. ' + error)
//   }
// }

onMounted(() => {
  execute()
})

function setModelName(model) {
  state.value = model
  store.simulation.model_name = model // this is for pinia state management
  //console.log(state.value);
}
</script>
