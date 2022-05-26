<template>
  <div class="container pt-5">
    <div class="row mb-3">
      <div class="col-md-4 themed-grid-col">
        <ListAvailableModels @render-variables="pushNewSimulView()" />
      </div>
      <div class="col-md-4 themed-grid-col">
        <h3>Simulations history</h3>
        <TableVue />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script setup>
import ListAvailableModels from "../components/ListAvailableModels.vue";
import TableVue from "../components/TableVue.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function pushNewSimulView() {
  const redirectPath = route.query.redirect || '/new-simulation'
  router.push(redirectPath)
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

<!--
export default {
  data() {
    return {
      
      models: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/get_available_models")
      .then((response) => {
        this.models = response.data;
        //console.log(this.models);
      })
      .catch((error) => {
        alert(error);
      });
  },
  components: {
    TableVue,
    ListAvailableModels,
  },
};
-->