<template>
  <NavWind />
  <div class="min-h-screen bg-slate-100 antialiased text-slate-700 dark:bg-black dark:text-gray-200">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <FooterComp />
</template>

<script setup>
import { useStore } from './store/SimStore';
import NavWind from '@/components/NavWind.vue';
import FooterComp from '@/components/FooterComp.vue';

const store = useStore();
store.init(); //init of the state
</script>

<style scoped></style>
