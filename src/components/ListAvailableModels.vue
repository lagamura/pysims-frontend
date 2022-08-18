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
          <span class="dropdown-item" @click="setModelName(model)">
            {{ model }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'
import { ArrowDown } from '@element-plus/icons-vue'

const url = 'https://pysims-github.herokuapp.com/get_available_models'

const { data } = await useFetch(url).get().json()

const store = useStore()

function setModelName(model: string) {
  store.simulation.model_name = model
  store.dropdown_trigger = true
  console.log('Button on dropdown-list triggered')
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
