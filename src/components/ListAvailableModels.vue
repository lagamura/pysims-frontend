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
          <span class="dropdown-item" @click="setModelName(model); resetdashboard.set_reset(true)">
            {{ model }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from '../store/SimStore'
import { useMyFetch } from '@/composables/getjson'
import { ArrowDown } from '@element-plus/icons-vue'
import { resetdashboard } from '@/store/EventsStore';

const url_endpoint = '/get_available_models'

const { data } = await useMyFetch(url_endpoint).get().json()

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