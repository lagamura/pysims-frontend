<template>
  <div>
    <h3>Simulations history</h3>
    <suspense>
      <TableVue />
      <template #fallback> ...Loading </template>
    </suspense>
  </div>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import TableVue from '../components/TableVue.vue'
</script>
