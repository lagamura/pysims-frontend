<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      Dropdown List
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown v-if="data">
      <el-dropdown-menu>
        <el-dropdown-item v-for="model in data" :key="model.id">
          <a class="dropdown-item" @click="setModelName(model)">
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

const { isFetching, error, data } = await useFetch(url).get().json()
console.log(data)

const emit = defineEmits(['renderVariables'])

const store = useStore()
console.log(store.simulation)

const state = ref('')

function setModelName(model) {
  state.value = model
  store.simulation.model_name = model // this is for pinia state management
  emit('renderVariables', model)
  console.log(state.value)
  console.log(store.simulation)
}
</script>
