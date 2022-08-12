<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :router="true"
  >
    <el-menu-item index="/" h="full">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--el-menu-item-height)"
      >
        <el-icon><HomeFilled /></el-icon>
      </button>
    </el-menu-item>
    <el-menu-item index="/about"> About </el-menu-item>
    <el-menu-item index="/dashboard"> Student Dashboard </el-menu-item>

    <el-menu-item index="/tutor-dashboard">Tutor Dashboard</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--el-menu-item-height)"
      >
        <i inline-flex>
          <el-icon><Moon /></el-icon>
        </i>
      </button>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toggleDark } from '../composables/dark'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-icon {
  color: aliceblue;
}
</style>
