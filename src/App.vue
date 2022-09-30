<template>
  <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
</template>

<script setup>
import { useStore } from './store/SimStore';

const store = useStore();
store.init(); //init of the state
</script>

<style scoped></style>
