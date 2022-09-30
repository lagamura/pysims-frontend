<template>
  <NavWind />
  <div class="bg-slate-100 antialiased text-slate-700">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { useStore } from './store/SimStore';
import NavWind from '@/components/NavWind.vue'
const store = useStore();
store.init(); //init of the state
</script>

<style scoped></style>
