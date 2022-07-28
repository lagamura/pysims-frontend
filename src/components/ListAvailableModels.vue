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

<script lang="ts" setup>
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'

const url = 'http://127.0.0.1:8000/get_available_models'

const { data } = await useFetch(url).get().json()


const store = useStore()



function setModelName(model: string) {
  store.simul.model_name = model
  console.log("Button on dropdown-list triggered")
}
</script>
