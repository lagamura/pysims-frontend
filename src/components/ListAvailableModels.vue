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
          <a class="dropdown-item" @click="emithandler(model)">
            {{ model }}
          </a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useStore } from '../store/SimStore'
import { useFetch } from '@vueuse/core'

const url = 'http://127.0.0.1:8000/get_available_models'

const { isFetching, error, data } = await useFetch(url).get().json()
//console.log(data)

const emit = defineEmits<{(e : 'modelName', model: string): void}>()

const store = useStore()


function emithandler(model: string) {
  emit('modelName', String(model))
  console.log("Button on dropdown-list triggered")
}
</script>
