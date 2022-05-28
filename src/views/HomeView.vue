<template>
  <div>
    <ListAvailableModels @render-variables="pushNewSimulView()" />
  </div>
  <div>
    <h3>Simulations history</h3>
    <TableVue />
  </div>
</template>

<script setup>
import ListAvailableModels from "../components/ListAvailableModels.vue";
import TableVue from "../components/TableVue.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function pushNewSimulView() {
  const redirectPath = route.query.redirect || "/new-simulation";
  router.push(redirectPath);
}

// function pushNewSimulView(query) {
//   router.push({
//     name: "new-simulation",
//     query: {
//       ...route.query,
//     },
//   });
// }
</script>

