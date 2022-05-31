<template>
  <!-- <div style="display:inline-block; ">
    <div style="display:inline; vertical-align:middle;" class="mr-1">
      <el-icon ><Setting /></el-icon>
    </div>
    <div style="display:inline; vertical-align:middle;">
    <ListAvailableModels @render-variables="pushNewSimulView()" />
    </div>
  </div> -->
  <div>
    <h3>Simulations history</h3>
    <TableVue />
  </div>
</template>

<script setup>
import ListAvailableModels from '../components/ListAvailableModels.vue'
import TableVue from '../components/TableVue.vue'


// function pushNewSimulView(query) {
//   router.push({
//     name: "new-simulation",
//     query: {
//       ...route.query,
//     },
//   });
// }
</script>
