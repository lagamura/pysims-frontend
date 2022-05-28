<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router= "true"
  >
    <el-menu-item index="/" route="/">Home </el-menu-item>
    <el-sub-menu index="/new-simulation">
      <template #title>Workspace</template>
      <el-menu-item index="2-1" route="new-simulation"
        >New Simulation</el-menu-item
      >
      <el-menu-item index="2-2" route="home">item two</el-menu-item>
      <el-menu-item index="2-3" route="HomeView">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="/new-simulation">new-simulation</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
  <router-view />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const activeIndex2 = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>