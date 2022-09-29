<template>
  <div class="container">
      <!-- <router-view>
        </router-view> -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
  </div>
</template>

<script setup>
import { useStore } from './store/SimStore';

const store = useStore();
store.init(); //init of the state
</script>

<style scoped></style>
